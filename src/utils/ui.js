// ui.js - الكود الكامل والصحيح
let serviceTypeChart, salesTrendChart;
window.currentLanguage = "ar";
// window.translations will be set from main.js

function setTranslations(data) {
  window.translations = data;
}

function setCurrentLanguage(lang) {
  window.currentLanguage = lang;
}

function initializeCharts() {
  Chart.defaults.font.family = "'Cairo', sans-serif";
  const serviceTypeCtx = document.getElementById("serviceTypeChart")?.getContext("2d");
  
  // --- الرسم البياني الشريطي الأفقي (Horizontal Bar Chart) ---
  if (serviceTypeCtx) {
      serviceTypeChart = new Chart(serviceTypeCtx, {
        type: "bar", // 1. تغيير النوع إلى شريطي
        data: {
          labels: [],
          datasets: [{
            label: 'المبيعات',
            data: [],
            backgroundColor: ["#4A90E2", "#7ED321", "#F5A623", "#9013FE", "#BD10E0", "#4A4A4A", "#FF6384", "#36A2EB", "#FFCE56"],
            borderColor: 'transparent',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y', // 2. هذا السطر يجعله أفقيًا
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false // 3. إخفاء مفتاح الألوان لأننا لم نعد بحاجة إليه
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.x !== null) {
                    label += new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(context.parsed.x);
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151'
              }
            },
            y: {
              ticks: {
                color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151'
              }
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const serviceName = serviceTypeChart.data.labels[index];
              if (window.filterSalesByService) {
                window.filterSalesByService(serviceName);
              }
            }
          }
        }
      });
  }
  
  const salesTrendCtx = document.getElementById("salesTrendChart")?.getContext("2d");

  // --- الرسم البياني الخطي (Line Chart) ---
  if(salesTrendCtx) {
    salesTrendChart = new Chart(salesTrendCtx, { 
      type: "line", 
      data: { 
        labels: [], 
        datasets: [
          { label: "Revenue", data: [], borderColor: "#4A90E2", tension: 0.1 }, 
          { label: "Profit", data: [], borderColor: "#7ED321", tension: 0.1 }
        ] 
      }, 
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        scales: { y: { beginAtZero: true } },
        onClick: (event, elements) => {
           if (elements.length > 0) {
             const chartElement = elements[0];
             const index = chartElement.index;
             if (window.filterSalesByMonth) {
                const monthKey = salesTrendChart.config.data.monthKeys[index];
                window.filterSalesByMonth(monthKey);
             }
           }
        }
      } 
    });
  }
}

function composeLoyaltyMessage(points) {
  const pts = Number(points || 0);
  const ptsText = pts.toLocaleString('ar-EG');
  const lines = [
    "أهلًا بك عميلنا المميز! ✨",
    "",
    `يسعدنا إعلامك بأن رصيدك الحالي في برنامج الولاء هو ${ptsText} نقطة. 🥳`,
    "",
    "يمكنك استبدالها نقدًا أو بأي من منتجاتنا! شكرًا لثقتك في متجر عبقر."
  ];
  return lines.join("\n");
}

function toEgyptIntl(whats) {
  if (!whats) return null;
  let n = String(whats).replace(/\D+/g, "");
  if (n.startsWith("20")) return n;
  if (n.startsWith("0"))  return "20" + n.slice(1);
  if (n.length === 10 || n.length === 11) return "20" + n;
  return n;
}

function buildWhatsAppLink(msisdn, message) {
  const intl = toEgyptIntl(msisdn);
  if (!intl) return null;
  const text = encodeURIComponent(message);
  return `https://wa.me/${intl}?text=${text}`;
}

function updateCharts(salesData) {
  if (!salesData) return;
  const isDarkMode = document.documentElement.classList.contains("dark");
  const textColor = isDarkMode ? "#f3f4f6" : "#374151";

  if (serviceTypeChart) {
    const serviceCounts = salesData.reduce((acc, sale) => { acc[sale.serviceType] = (acc[sale.serviceType] || 0) + sale.price; return acc; }, {});
    serviceTypeChart.data.labels = Object.keys(serviceCounts);
    serviceTypeChart.data.datasets[0].data = Object.values(serviceCounts);
    serviceTypeChart.options.scales.x.ticks.color = textColor;
    serviceTypeChart.options.scales.y.ticks.color = textColor;
    serviceTypeChart.update();
  }

  if (salesTrendChart) {
    const monthlyData = {};
    salesData.forEach((sale) => {
      const month = sale.date.substring(0, 7);
      if (!monthlyData[month]) { monthlyData[month] = { revenue: 0, profit: 0 }; }
      monthlyData[month].revenue += sale.price;
      monthlyData[month].profit += sale.profit;
    });
    const sortedMonths = Object.keys(monthlyData).sort();
    
    salesTrendChart.config.data.monthKeys = sortedMonths;

    salesTrendChart.data.labels = sortedMonths.map(m => {
        const [year, month] = m.split('-');
        return new Date(year, month-1).toLocaleString(window.currentLanguage === 'ar' ? 'ar-EG' : 'en-US', {month: 'short', year: 'numeric'})
    });
    salesTrendChart.data.datasets[0].data = sortedMonths.map((m) => monthlyData[m].revenue);
    salesTrendChart.data.datasets[0].label = window.translations[window.currentLanguage]?.revenue || 'Revenue';
    salesTrendChart.data.datasets[1].data = sortedMonths.map((m) => monthlyData[m].profit);
    salesTrendChart.data.datasets[1].label = window.translations[window.currentLanguage]?.profit || 'Profit';
    salesTrendChart.options.plugins.legend.labels.color = textColor;
    salesTrendChart.options.scales.x.ticks.color = textColor;
    salesTrendChart.options.scales.y.ticks.color = textColor;
    salesTrendChart.update();
  }
}

function updateDashboardAuditLog(logs) {
  const list = document.getElementById('audit-log-body');
  if (!list) return;
  list.innerHTML = '';
  logs.forEach((log) => {
    const li = document.createElement('li');
    const time = log.timestamp && log.timestamp.toDate ? log.timestamp.toDate() : new Date();
    const formatted = time.toLocaleString(window.currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
    const amount = typeof log.amount === 'number' ? formatCurrency(log.amount) : '';
    const client = log.client ? ` - ${log.client}` : '';
    li.textContent = `${formatted} - ${log.action}${client}${amount ? ' (' + amount + ')' : ''}`;
    list.appendChild(li);
  });
}

function salesRowContent(sale) {
    const paymentStatusText = window.translations[window.currentLanguage]?.[sale.paymentStatus] || sale.paymentStatus;
    return `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${formatDate(sale.date)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${sale.serviceType}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${sale.clientName}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${formatCurrency(sale.price)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm ${sale.profit >= 0 ? "text-green-500" : "text-red-500"}">${formatCurrency(sale.profit)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.paymentStatus === "paid" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}">
                ${paymentStatusText}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium actions-cell">
            <button class="edit-btn" data-id="${sale.id}" data-translate="edit"></button>
            <button class="delete-btn" data-id="${sale.id}" data-translate="delete"></button>
        </td>`;
}

function customerRowContent(customer) {
    const isVip = (customer.tags && customer.tags.includes('VIP')) || (customer.totalSpent || 0) > 10000;
    const lastPurchase = new Date(customer.lastPurchase);
    let typeKey = 'type_new';
    let badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';

    if (customer.tags && customer.tags.includes('مستورد')) {
        typeKey = 'type_imported';
        badgeClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    } else if ((customer.totalOrders || 0) > 1) {
        typeKey = 'type_returning';
        badgeClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }

    return `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            ${customer.name} ${isVip ? '<span class="vip-badge" data-translate="vip"></span>' : ''}
            <span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}" data-translate="${typeKey}"></span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${formatEgyptianPhoneNumber(customer.whatsappNumber)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${formatDate(customer.lastPurchase)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${customer.totalOrders || 0}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${formatCurrency(customer.totalSpent)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium actions-cell space-x-2">
            <button class="details-btn" data-id="${customer.whatsappNumber}" data-translate="details"></button>
            <button class="delete-btn delete-customer-btn" data-id="${customer.whatsappNumber}" data-name="${customer.name}" data-translate="delete"></button>
        </td>`;
}

function renderPaginationControls(elementId, pagination, onPageChange) {
  const pagDiv = document.getElementById(elementId);
  if (!pagDiv) return;
  if (pagination.totalPages <= 1) {
    pagDiv.innerHTML = '';
    return;
  }
  const prevText = window.translations[window.currentLanguage]?.previous || 'Previous';
  const nextText = window.translations[window.currentLanguage]?.next || 'Next';
  pagDiv.innerHTML = `
    <button id="prevBtn_${elementId}" class="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded" ${pagination.currentPage === 1 ? 'disabled' : ''}>${prevText}</button>
    <span class="dark:text-white">${pagination.currentPage} / ${pagination.totalPages}</span>
    <button id="nextBtn_${elementId}" class="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded" ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}>${nextText}</button>
  `;
  document.getElementById(`prevBtn_${elementId}`).onclick = () => onPageChange(pagination.currentPage - 1);
  document.getElementById(`nextBtn_${elementId}`).onclick = () => onPageChange(pagination.currentPage + 1);
}

function renderSalesLog(dataToRender, editSaleCallback, deleteSaleCallback, pagination, onPageChange) {
  const tableBody = document.getElementById("salesTableBody");
  if (!tableBody) return;
  tableBody.innerHTML = ""; 
  if (!dataToRender || dataToRender.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-4 text-center" data-translate="no_sales_records_found"></td></tr>`;
    document.getElementById('salesPagination').innerHTML = '';
    setLanguage(window.currentLanguage);
    return;
  }
  dataToRender.forEach(sale => {
      const row = tableBody.insertRow();
      row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
      row.dataset.id = sale.id;
      row.innerHTML = salesRowContent(sale);
      row.querySelector(".delete-btn").onclick = () => deleteSaleCallback(sale.id);
      row.querySelector(".edit-btn").onclick = () => editSaleCallback(sale.id);
  });
  renderPaginationControls('salesPagination', pagination, onPageChange);
  setLanguage(window.currentLanguage);
}

function renderCustomerDatabase(customersArray, showCustomerDetailsCallback, pagination, onPageChange, quickOrderCallback, deleteCustomerCallback) {
    const tableBody = document.getElementById("customersTableBody");
    if(!tableBody) return;
    tableBody.innerHTML = "";
    if (!customersArray || customersArray.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center" data-translate="no_customer_records_found"></td></tr>`;
        document.getElementById('customersPagination').innerHTML = '';
        setLanguage(window.currentLanguage);
        return;
    }
    customersArray.forEach(customer => {
        const row = tableBody.insertRow();
        row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
        row.dataset.id = customer.whatsappNumber || customer.id;
        row.innerHTML = customerRowContent(customer);
        row.querySelector(".details-btn").onclick = () => showCustomerDetailsCallback(customer.whatsappNumber);
        
        const deleteBtn = row.querySelector('.delete-customer-btn');
        if(deleteBtn) {
            deleteBtn.onclick = () => deleteCustomerCallback(deleteBtn.dataset.id, deleteBtn.dataset.name);
        }
    });
    renderPaginationControls('customersPagination', pagination, onPageChange);
    setLanguage(window.currentLanguage);
}

function renderDebtManagement(salesData, markAsPaidCallback) {
  const tableBody = document.getElementById("debtTableBody");
  if (!tableBody) return;
  tableBody.innerHTML = ""; 
  const unpaidOrders = salesData.filter((sale) => sale.paymentStatus === "unpaid");
  if (unpaidOrders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center" data-translate="no_unpaid_orders"></td></tr>`;
    setLanguage(window.currentLanguage);
    return;
  }
  unpaidOrders.forEach((sale) => {
    const row = tableBody.insertRow();
    row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
    const cellDate = row.insertCell();
    cellDate.className = "px-6 py-4 whitespace-nowrap text-sm font-medium";
    cellDate.textContent = formatDate(sale.date);
    const cellClient = row.insertCell();
    cellClient.className = "px-6 py-4 whitespace-nowrap text-sm";
    cellClient.textContent = sale.clientName;
    const cellAmount = row.insertCell();
    cellAmount.className = "px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold";
    cellAmount.textContent = formatCurrency(sale.price);
    const cellActions = row.insertCell();
    cellActions.className = "px-6 py-4 whitespace-nowrap text-right text-sm font-medium actions-cell";
    const button = document.createElement('button');
    button.className = "mark-paid-btn";
    button.dataset.id = sale.id;
    button.dataset.translate = "mark_as_paid";
    button.onclick = () => markAsPaidCallback(sale.id);
    cellActions.appendChild(button);
  });
  setLanguage(window.currentLanguage);
}

function updateKpiCards(salesData, customersData) {
    const now = new Date();
    const thisMonthStr = now.toISOString().substring(0, 7);
    
    const totalRevenue = salesData.reduce((sum, s) => sum + s.price, 0);
    const totalProfit = salesData.reduce((sum, s) => sum + s.profit, 0);
    const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : '0.0';
    document.getElementById("profitMargin").textContent = profitMargin;
    
    const salesByCustomer = {};
    salesData.forEach(sale => {
        if (sale.whatsappNumber) {
            if (!salesByCustomer[sale.whatsappNumber]) {
                salesByCustomer[sale.whatsappNumber] = [];
            }
            salesByCustomer[sale.whatsappNumber].push(sale.date);
        }
    });
    
    let newCustomersThisMonth = 0;
    for (const customer in salesByCustomer) {
        const firstSaleDate = salesByCustomer[customer].sort()[0];
        if (firstSaleDate.substring(0, 7) === thisMonthStr) {
            newCustomersThisMonth++;
        }
    }
    document.getElementById("newCustomers").textContent = newCustomersThisMonth;

    const thisMonthSales = salesData.filter(s => s.date.substring(0, 7) === thisMonthStr);
    const monthSalesByCustomer = {};
    thisMonthSales.forEach(sale => {
        monthSalesByCustomer[sale.clientName] = (monthSalesByCustomer[sale.clientName] || 0) + sale.price;
    });
    const topClient = Object.entries(monthSalesByCustomer).sort((a,b) => b[1]-a[1])[0];
    const topClientEl = document.getElementById('topClientThisMonth');
    if (topClientEl) topClientEl.textContent = topClient ? `${topClient[0]} (${formatCurrency(topClient[1])})` : 'N/A';

    const profitByCustomer = {};
    salesData.forEach(sale => {
        profitByCustomer[sale.clientName] = (profitByCustomer[sale.clientName] || 0) + sale.profit;
    });
    const topProfit = Object.entries(profitByCustomer).sort((a,b)=> b[1]-a[1])[0];
    const mpEl = document.getElementById('mostProfitableClient');
    if (mpEl) mpEl.textContent = topProfit ? `${topProfit[0]} (${formatCurrency(topProfit[1])})` : 'N/A';
}

function renderActivityFeed(salesData) {
    const feedContainer = document.getElementById("activityFeed");
    if (!feedContainer) return;
    feedContainer.innerHTML = "";

    const recentSales = salesData.slice(0, 5);

    if (recentSales.length === 0) {
        feedContainer.innerHTML = `<p class="text-gray-500 dark:text-slate-400" data-translate="no_recent_activity"></p>`;
        setLanguage(window.currentLanguage);
        return;
    }

    recentSales.forEach(sale => {
        const item = document.createElement("div");
        item.className = "activity-item";
        
        let iconBg = sale.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500';
        let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`;

        item.innerHTML = `
          <div class="activity-icon ${iconBg}">
            ${iconSvg}
          </div>
          <div>
            <p class="text-sm font-medium dark:text-white">New sale to ${sale.clientName}</p>
            <p class="text-xs text-gray-500 dark:text-slate-400">${sale.serviceType} - ${formatCurrency(sale.price)}</p>
          </div>
        `;
        feedContainer.appendChild(item);
    });
}

function renderNotifications(messages) {
    const container = document.getElementById('notificationsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (!messages || messages.length === 0) return;
    messages.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'stat-card p-4 flex items-center bg-white dark:bg-slate-800 rounded-lg';
        card.innerHTML = `<p class="text-sm text-gray-700 dark:text-slate-200">${msg}</p>`;
        container.appendChild(card);
    });
}

function updateActivityList(activities) {
    const list = document.getElementById('activityList');
    if (!list) return;
    list.innerHTML = '';
    if (!activities || activities.length === 0) {
        list.innerHTML = `<p class="text-gray-500 dark:text-slate-400 p-2">No recent activity.</p>`;
        return;
    }
    activities.forEach(act => {
        const item = document.createElement('div');
        item.className = 'p-2 border-b dark:border-slate-700';
        const message = act.action;
        const time = act.timestamp && act.timestamp.toDate ? act.timestamp.toDate() : new Date(act.timestamp);
        const meta = [act.user, act.device].filter(Boolean).join(' - ');
        item.innerHTML = `<p class="text-sm dark:text-white">${message}</p><p class="text-xs text-gray-500 dark:text-slate-400">${time.toLocaleString()}${meta ? ' - ' + meta : ''}</p>`;
        list.appendChild(item);
    });
    setLanguage(window.currentLanguage);
}

function updateDashboardUI(salesData, dailyGoal) {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const dashboardTotalOrdersEl = document.getElementById("dashboardTotalOrders");
    if(dashboardTotalOrdersEl) dashboardTotalOrdersEl.textContent = salesData.length;

    const serviceCounts = salesData.reduce((acc, sale) => { acc[sale.serviceType] = (acc[sale.serviceType] || 0) + 1; return acc; }, {});
    const topService = Object.keys(serviceCounts).reduce((a, b) => serviceCounts[a] > serviceCounts[b] ? a : b, "N/A");
    const topServiceEl = document.getElementById("dashboardTopService");
    if(topServiceEl) {
        topServiceEl.textContent = topService;
        topServiceEl.title = topService;
    }
    
    updateDynamicKpi(salesData, 24, 'revenue');
    updateDynamicKpi(salesData, 24, 'profit');

    const totalDebt = salesData.filter(s => s.paymentStatus === "unpaid").reduce((sum, s) => sum + s.price, 0);
    const totalDebtEl = document.getElementById("totalDebt");
    if(totalDebtEl) totalDebtEl.textContent = totalDebt.toFixed(2);

    const todaySales = salesData.filter(s => s.date === todayStr);
    const todayProfit = todaySales.reduce((sum, s) => sum + s.profit, 0);
    const goalPercentage = dailyGoal > 0 ? Math.round(Math.min((todayProfit / dailyGoal) * 100, 100)) : 0;

    const dailyGoalProgress = document.getElementById("dailyGoalProgress");
    if(dailyGoalProgress) {
        dailyGoalProgress.style.width = `${goalPercentage}%`;
    }

    const goalTextElement = document.getElementById("dailyGoalFullText");
    if(goalTextElement) {
        const sentenceTemplate = window.translations[window.currentLanguage]?.daily_goal_sentence || "% of profit goal";
        goalTextElement.textContent = `${goalPercentage}${sentenceTemplate}`;
    }

    renderServiceProfitability(salesData);
    setLanguage(window.currentLanguage);
}

function updateDynamicKpi(salesData, range, type) {
    const now = new Date();
    let startDate = new Date(now);

    if (range === 24) {
        startDate.setHours(0, 0, 0, 0);
    } else if (range === 7) {
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
    } else if (range === 30) {
        startDate.setDate(now.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);
    }

    const relevantSales = salesData.filter(s => {
        const saleDate = new Date(s.date);
        return saleDate >= startDate;
    });

    let value = 0;
    if (type === 'revenue') {
        value = relevantSales.reduce((sum, s) => sum + s.price, 0);
        document.getElementById("dynamicRevenue").textContent = value.toFixed(2);
    } else if (type === 'profit') {
        value = relevantSales.reduce((sum, s) => sum + s.profit, 0);
        document.getElementById("dynamicProfit").textContent = value.toFixed(2);
    }
}


function renderServiceProfitability(salesData) {
    const body = document.getElementById("serviceProfitabilityBody");
    if(!body) return;
    body.innerHTML = "";
    const serviceStats = {};
    salesData.forEach((sale) => {
        if (!serviceStats[sale.serviceType]) serviceStats[sale.serviceType] = { orders: 0, revenue: 0, profit: 0 };
        serviceStats[sale.serviceType].orders++;
        serviceStats[sale.serviceType].revenue += sale.price;
        serviceStats[sale.serviceType].profit += sale.profit;
    });
    if (Object.keys(serviceStats).length === 0) {
        body.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center" data-translate="no_data_available"></td></tr>`;
    } else {
        Object.entries(serviceStats).sort(([, a], [, b]) => b.revenue - a.revenue).forEach(([service, stats]) => {
            const avgProfit = stats.orders > 0 ? stats.profit / stats.orders : 0;
            const row = document.createElement("tr");
            row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${service}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">${stats.orders}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${formatCurrency(stats.revenue)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${avgProfit >= 0 ? "text-green-500" : "text-red-500"}">${formatCurrency(avgProfit)}</td>
            `;
            body.appendChild(row);
        });
    }
    setLanguage(window.currentLanguage);
}

function showDeleteConfirmationUI(confirmDeleteCallback, title = "حذف", message = "هل أنت متأكد؟") {
    const dialog = document.getElementById("deleteConfirmationModal");
    const modalTitle = dialog.querySelector('h3');
    const modalMessage = dialog.querySelector('p');
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    dialog.classList.remove("hidden");
    const confirmBtn = document.getElementById("confirmDeleteBtn");
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    newConfirmBtn.addEventListener("click", () => {
        confirmDeleteCallback();
        hideDeleteConfirmationUI();
    }, { once: true });
    setLanguage(window.currentLanguage); 
}

function hideDeleteConfirmationUI() {
    document.getElementById("deleteConfirmationModal").classList.add("hidden");
}

function fillSaleForm(sale) {
  document.getElementById("editingSaleId").value = sale.id;
  document.getElementById("date").value = sale.date;
  document.getElementById("serviceType").value = sale.serviceType;
  document.getElementById("price").value = sale.price;
  document.getElementById("serviceCost").value = sale.serviceCost;
  document.getElementById("clientName").value = sale.clientName;
  document.getElementById("whatsappNumber").value = sale.whatsappNumber;
  document.getElementById("paymentStatus").value = sale.paymentStatus;
  document.getElementById("notes").value = sale.notes;
  document.querySelector('[data-tab="sales-entry"]').click();
  window.scrollTo(0,0);
}

function resetSaleForm() {
  document.getElementById("salesForm").reset();
  document.getElementById("editingSaleId").value = "";
  document.getElementById("date").valueAsDate = new Date();
  toggleRedeemButton(false);
}

function showNotification(message, type = "info", duration = 3000) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");
  notificationMessage.textContent = message;
  const colors = {success: 'green', error: 'red', info: 'blue', warning: 'yellow'};
  const color = colors[type] || 'blue';
  notification.className = `fixed top-4 left-4 w-80 rounded-lg shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out z-50 bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-200`;
  notification.classList.remove("-translate-x-full");
  setTimeout(() => { notification.classList.add("-translate-x-full"); }, duration);
}

function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
    document.body.classList.remove('loading');
}

function handleLoadingErrorUI(error) {
    const loadingMessage = document.getElementById('loadingMessage');
    const loadingError = document.getElementById('loadingError');
    console.error("Firebase Initialization Error:", error);
    const errorText = window.translations[window.currentLanguage]?.firebase_error || "Connection to database failed.";
    if (loadingMessage) loadingMessage.classList.add('hidden');
    if (loadingError) {
        loadingError.textContent = errorText;
        loadingError.classList.remove('hidden');
    }
}

function setLanguage(lang) {
  window.currentLanguage = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.dataset.translate;
    if (window.translations[lang]?.[key]) {
      el.textContent = window.translations[lang][key];
    }
  });
  document.querySelectorAll(".currency-symbol").forEach((el) => {
    el.textContent = window.translations[lang].currency;
  });
  const placeHolderMapping = {
    'profitGoalInput': 'profit_goal_placeholder',
    'inactiveCustomersList': 'inactive_customers_placeholder',
    'customerSearch': 'search',
    'newTagInput': 'new_tag_placeholder',
    'newNoteInput': 'new_note_placeholder',
    'newReminderText': 'new_reminder_placeholder',
    'catalogSearch': 'search_services'
  }
  for (const [id, key] of Object.entries(placeHolderMapping)) {
      const element = document.getElementById(id);
      if (element && window.translations[lang]?.[key]) {
          element.placeholder = window.translations[lang][key];
      }
  }
}

function formatCurrency(value) {
  const currencySymbol = window.translations[window.currentLanguage]?.currency || '';
  return `${(value || 0).toFixed(2)} ${currencySymbol}`;
}

function formatDate(dateString) {
  if (!dateString || dateString.startsWith('1970')) return 'N/A';
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString(window.currentLanguage === "ar" ? "ar-EG" : "en-US", options);
}

function showCustomerDetailsUI(customer, history, totalProfit, avgProfit, reminders, addTagCallback, removeTagCallback, addNoteCallback, addReminderCallback, removeReminderCallback, handleCashBackRedemption, addBonusPointsCallback) {
    document.getElementById("modalCustomerName").textContent = customer.name;
    document.getElementById("modalCustomerWhatsapp").textContent = formatEgyptianPhoneNumber(customer.whatsappNumber);
    document.getElementById("modalCustomerTotalOrders").textContent = history.length;
    document.getElementById("modalCustomerTotalSpent").textContent = formatCurrency(history.reduce((s, h) => s + h.price, 0));
    document.getElementById("modalCustomerTotalProfit").textContent = formatCurrency(totalProfit);
    document.getElementById("modalCustomerAvgProfit").textContent = formatCurrency(avgProfit);
    
    const ptsEl = document.getElementById("modalCustomerLoyaltyPoints");
    if (ptsEl) {
      const pts = Number(customer?.loyaltyPoints || 0);
      ptsEl.textContent = pts.toLocaleString('ar-EG');
    }

    const sendBtn = document.getElementById("sendPointsBtn");
    if (sendBtn) {
      const freshBtn = sendBtn.cloneNode(true);
      sendBtn.replaceWith(freshBtn);

      if (!customer?.whatsappNumber) {
        freshBtn.disabled = true;
        freshBtn.classList.add("opacity-50", "cursor-not-allowed");
      } else {
        freshBtn.disabled = false;
        freshBtn.classList.remove("opacity-50", "cursor-not-allowed");
        freshBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const msg = composeLoyaltyMessage(customer?.loyaltyPoints || 0);
          const link = buildWhatsAppLink(customer?.whatsappNumber, msg);
          if (link) window.open(link, "_blank");
        });
      }
    }

    const copyBtn = document.getElementById("copyPointsBtn");
    if (copyBtn) {
      const freshCopyBtn = copyBtn.cloneNode(true);
      copyBtn.replaceWith(freshCopyBtn);
      freshCopyBtn.addEventListener("click", () => {
        const msg = composeLoyaltyMessage(customer?.loyaltyPoints || 0);
        navigator.clipboard.writeText(msg).then(() => showNotification(window.translations[window.currentLanguage].copied, 'success'));
      });
    }

    const cashBackBtn = document.getElementById("cashBackBtn");
    if (cashBackBtn) {
        const newCashBackBtn = cashBackBtn.cloneNode(true);
        cashBackBtn.parentNode.replaceChild(newCashBackBtn, cashBackBtn);
        if (customer.loyaltyPoints < 1000) {
            newCashBackBtn.disabled = true;
            newCashBackBtn.classList.add("opacity-50", "cursor-not-allowed");
        } else {
            newCashBackBtn.disabled = false;
            newCashBackBtn.classList.remove("opacity-50", "cursor-not-allowed");
            newCashBackBtn.onclick = handleCashBackRedemption;
        }
    }
    
    // --- ربط زر إضافة البونص ---
    const bonusPointsBtn = document.getElementById("addBonusPointsBtn");
    if (bonusPointsBtn) {
        const newBonusBtn = bonusPointsBtn.cloneNode(true);
        bonusPointsBtn.parentNode.replaceChild(newBonusBtn, bonusPointsBtn);
        newBonusBtn.onclick = () => showBonusPointsModal(customer.whatsappNumber, addBonusPointsCallback);
    }
    // --- نهاية الربط ---

    const historyBody = document.getElementById("modalPurchaseHistory");
    historyBody.innerHTML = "";
    if (history && history.length > 0) {
        history.sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(sale => {
            const row = historyBody.insertRow();
            row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
            row.innerHTML = `<td class="px-4 py-2 text-sm">${formatDate(sale.date)}</td><td class="px-4 py-2 text-sm">${sale.serviceType}</td><td class="px-4 py-2 text-sm">${formatCurrency(sale.price)}</td>`;
        });
    }
    
    renderCustomerTagsUI(customer, removeTagCallback);
    const addTagBtn = document.getElementById("addTagBtn");
    const newTagInput = document.getElementById("newTagInput");
    const newAddTagBtn = addTagBtn.cloneNode(true);
    addTagBtn.parentNode.replaceChild(newAddTagBtn, addTagBtn);
    newAddTagBtn.onclick = () => { 
        addTagCallback(customer.whatsappNumber, newTagInput.value.trim()); 
        newTagInput.value = '';
    };
    
    renderCustomerNotesUI(customer);
    const addNoteBtn = document.getElementById("addNoteBtn");
    const newNoteInput = document.getElementById("newNoteInput");
    const newAddNoteBtn = addNoteBtn.cloneNode(true);
    addNoteBtn.parentNode.replaceChild(newAddNoteBtn, addNoteBtn);
    newAddNoteBtn.onclick = () => { addNoteCallback(customer.whatsappNumber, newNoteInput.value.trim()); };
    
    renderCustomerRemindersUI(reminders, customer.whatsappNumber, removeReminderCallback);
    const addReminderBtn = document.getElementById("addReminderBtn");
    const newReminderDate = document.getElementById("newReminderDate");
    const newReminderText = document.getElementById("newReminderText");
    const newAddReminderBtn = addReminderBtn.cloneNode(true);
    addReminderBtn.parentNode.replaceChild(newAddReminderBtn, addReminderBtn);
    newAddReminderBtn.onclick = () => { addReminderCallback(customer.whatsappNumber, newReminderDate.value, newReminderText.value.trim()); };
    
    document.getElementById("customerDetailsModal").classList.remove("hidden");
    setLanguage(window.currentLanguage);
}

function hideCustomerDetailsUI() {
    document.getElementById("customerDetailsModal").classList.add("hidden");
}

function renderCustomerTagsUI(customer, removeTagCallback) {
    const tagsContainer = document.getElementById("modalCustomerTags");
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = ""; 
    
    if (customer.tags && customer.tags.length > 0) {
        customer.tags.forEach(tag => {
            const badge = document.createElement("span");
            badge.className = "inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300";
            
            const tagText = document.createTextNode(tag);
            
            const removeBtn = document.createElement("button");
            removeBtn.className = "ml-2 mr-1 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 font-bold";
            removeBtn.innerHTML = "&times;";
            removeBtn.onclick = () => removeTagCallback(customer.whatsappNumber, tag);
            
            badge.appendChild(tagText);
            badge.appendChild(removeBtn);
            tagsContainer.appendChild(badge);
        });
    }
}
function renderCustomerNotesUI(customer) {
    const notesContainer = document.getElementById("modalNotesTimeline");
    if (!notesContainer) return;
    notesContainer.innerHTML = "";
    if (customer.notes && customer.notes.length > 0) {
        customer.notes.sort((a,b) => b.timestamp - a.timestamp).forEach(note => {
            const noteEl = document.createElement("div");
            noteEl.className = "p-2 bg-gray-100 dark:bg-slate-600 rounded-md";
            noteEl.innerHTML = `<p class="text-sm">${note.text}</p><p class="text-xs text-gray-500 dark:text-slate-400 mt-1">${new Date(note.timestamp).toLocaleString()}</p>`;
            notesContainer.appendChild(noteEl);
        });
    }
}

function renderCustomerRemindersUI(reminders, whatsapp, removeReminderCallback) {
    const container = document.getElementById('modalReminders');
    if(!container) return;
    container.innerHTML = '';
    if (reminders && reminders.length > 0) {
        reminders.forEach((rem, index) => {
            const el = document.createElement('div');
            el.className = 'p-2 bg-gray-100 dark:bg-slate-600 rounded-md flex justify-between items-center';
            el.innerHTML = `<span class="text-sm">${rem.date}: ${rem.text}</span><button class="text-red-500" data-index="${index}">&times;</button>`;
            el.querySelector('button').onclick = () => removeReminderCallback(whatsapp, index);
            container.appendChild(el);
        });
    }
}

function updatePLReportResult(period, income, expenses, net) {
    const resultDiv = document.getElementById('plReportResult');
    if(!resultDiv) return;
    const trans = window.translations[window.currentLanguage];
    resultDiv.innerHTML = `
        <h4 class="font-bold mb-2">${period.charAt(0).toUpperCase() + period.slice(1)} Report</h4>
        <p><strong>${trans.total_income}:</strong> ${formatCurrency(income)}</p>
        <p><strong>${trans.total_expenses}:</strong> ${formatCurrency(expenses)}</p>
        <hr class="my-2 dark:border-slate-600">
        <p class="font-bold ${net >= 0 ? 'text-green-500' : 'text-red-500'}">
            <strong>${net >= 0 ? trans.net_profit : trans.net_loss}:</strong>
            ${formatCurrency(Math.abs(net))}
        </p>
    `;
    resultDiv.classList.remove('hidden');
    setLanguage(window.currentLanguage);
}

function updateInactiveCustomersList(inactiveCustomers) {
    const listArea = document.getElementById('inactiveCustomersList');
    if(listArea) listArea.value = inactiveCustomers.map(c => c.whatsappNumber).join('\n');
    setLanguage(window.currentLanguage);
}

function updateGoalSimulatorResult(goal, serviceStats) {
    const resultDiv = document.getElementById('goalSimulatorResult');
    if(!resultDiv) return;
    const trans = window.translations[window.currentLanguage];
    if (!goal) {
        resultDiv.innerHTML = `<p class="text-red-500">${trans.profit_goal_placeholder}</p>`;
        setLanguage(window.currentLanguage);
        return;
    }
    let resultHTML = `<p class="mb-2">${trans.goal_sim_intro_1} <strong>${formatCurrency(goal)}</strong>, ${trans.goal_sim_intro_2}</p><ul class="list-disc list-inside">`;
    for (const service in serviceStats) {
        const avgProfit = serviceStats[service].profit / serviceStats[service].count;
        if (avgProfit > 0) {
            const salesNeeded = Math.ceil(goal / avgProfit);
            resultHTML += `<li><strong>${salesNeeded}</strong> ${trans.goal_sim_orders_of} '${service}'</li>`;
        }
    }
    resultHTML += `</ul>`;
    resultDiv.innerHTML = resultHTML;
    setLanguage(window.currentLanguage);
}

function updateBasketAnalysisResult(sortedPairs) {
    const resultDiv = document.getElementById('basketAnalysisResult');
    if(!resultDiv) return;
    if(sortedPairs.length === 0) {
        resultDiv.innerHTML = `<p>Not enough data for analysis.</p>`;
        setLanguage(window.currentLanguage);
        return;
    }
    let resultHTML = `<p class="mb-2"><strong>Frequently Bought Together:</strong></p><ul class="list-disc list-inside">`;
    sortedPairs.slice(0, 3).forEach(pair => {
        resultHTML += `<li>${pair[0]} (${pair[1]} times)</li>`;
    });
    resultHTML += `</ul>`;
    resultDiv.innerHTML = resultHTML;
    setLanguage(window.currentLanguage);
}

function renderClientNameSuggestions(suggestions, onSelectCallback) {
    const container = document.getElementById('clientNameSuggestions');
    if (!container) return;
    container.innerHTML = '';
    if (suggestions.length === 0) {
        container.classList.add('hidden');
        return;
    }
    suggestions.forEach(customer => {
        const item = document.createElement('div');
        item.className = 'suggestion-item border-b dark:border-slate-500';
        item.textContent = `${customer.name} (${customer.whatsappNumber})`;
        item.onmousedown = () => {
            onSelectCallback(customer);
        };
        container.appendChild(item);
    });
    container.classList.remove('hidden');
}

function hideClientNameSuggestions() {
    const container = document.getElementById('clientNameSuggestions');
    if (container) {
        container.classList.add('hidden');
    }
}
function populateTagFilterDropdown(tags) {
    const select = document.getElementById('tagFilterSelect');
    if (!select) return;

    const firstOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(firstOption);

    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        select.appendChild(option);
    });
}
function displayFilteredNumbers(numbers) {
    const textarea = document.getElementById('filteredNumbersTextarea');
    if (!textarea) return;
    textarea.value = numbers.join('\n');
}

function toggleActivityPanel(show) {
    const panel = document.getElementById('activityPanel');
    const overlay = document.getElementById('activityOverlay');
    if (!panel || !overlay) return;

    if (show) {
        document.body.classList.add('activity-panel-open');
        panel.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        document.body.classList.remove('activity-panel-open');
        panel.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }
}

function populateServiceDropdown(services) {
    const select = document.getElementById('serviceType');
    if (!select) return;
    select.innerHTML = '<option value="" data-translate="select_service_type">Select Service Type</option>';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.name;
        option.textContent = service.name;
        select.appendChild(option);
    });
    setLanguage(window.currentLanguage);
}

function renderServicesTable(services, editCallback, deleteCallback) {
    const tableBody = document.getElementById('servicesTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    if (services.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" class="px-6 py-4 text-center">${window.translations[window.currentLanguage].no_services_found}</td></tr>`;
        setLanguage(window.currentLanguage);
        return;
    }
    services.forEach(service => {
        const row = tableBody.insertRow();
        row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${service.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">${service.categories.map(c => c.name).join(', ')}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium actions-cell">
                <button class="edit-btn" data-id="${service.id}" data-translate="edit"></button>
                <button class="delete-btn" data-id="${service.id}" data-name="${service.name}" data-translate="delete"></button>
            </td>
        `;
        row.querySelector('.edit-btn').onclick = () => editCallback(service.id);
        row.querySelector('.delete-btn').onclick = () => deleteCallback(service.id, service.name);
    });
    setLanguage(window.currentLanguage);
}

function addCategoryField(category = { name: '', items: [] }) {
    const categoriesContainer = document.getElementById('categoriesContainer');
    const categoryGroup = document.createElement('div');
    categoryGroup.className = 'category-group border p-3 rounded-md mb-3 dark:border-slate-700';
    categoryGroup.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <input type="text" class="category-name-input w-2/3 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm dark:bg-slate-700 dark:text-white" placeholder="${window.translations[window.currentLanguage].category_name}" value="${category.name}">
            <button type="button" class="remove-category-btn text-red-500 hover:text-red-700">&times;</button>
        </div>
        <div class="items-container space-y-2 ml-4">
            <h4 class="text-md font-medium dark:text-white">Items</h4>
            <button type="button" class="add-item-btn px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">${window.translations[window.currentLanguage].add_item}</button>
        </div>
    `;
    categoriesContainer.appendChild(categoryGroup);

    const itemsContainer = categoryGroup.querySelector('.items-container');
    category.items.forEach(item => addItemField(itemsContainer, item));

    categoryGroup.querySelector('.remove-category-btn').onclick = () => categoryGroup.remove();
    categoryGroup.querySelector('.add-item-btn').onclick = () => addItemField(itemsContainer);
    setLanguage(window.currentLanguage);
}

function addItemField(container, item = { name: '', price: '' }) {
    const itemGroup = document.createElement('div');
    itemGroup.className = 'item-group flex gap-2 mb-2';
    itemGroup.innerHTML = `
        <input type="text" class="item-name-input flex-grow px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm dark:bg-slate-700 dark:text-white" placeholder="${window.translations[window.currentLanguage].item_name}" value="${item.name}">
        <input type="number" class="item-price-input w-24 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm dark:bg-slate-700 dark:text-white" placeholder="${window.translations[window.currentLanguage].item_price}" value="${item.price}">
        <button type="button" class="remove-item-btn text-red-500 hover:text-red-700">&times;</button>
    `;
    container.appendChild(itemGroup);
    itemGroup.querySelector('.remove-item-btn').onclick = () => itemGroup.remove();
    setLanguage(window.currentLanguage);
}

function fillServiceForm(service) {
    document.getElementById('editingServiceId').value = service.id;
    document.getElementById('serviceName').value = service.name;
    const categoriesContainer = document.getElementById('categoriesContainer');
    categoriesContainer.innerHTML = `
        <h3 class="text-lg font-medium dark:text-white">Categories</h3>
        <button type="button" id="addCategoryBtn" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">${window.translations[window.currentLanguage].add_category}</button>
    `;
    document.getElementById('addCategoryBtn').onclick = () => addCategoryField();

    service.categories.forEach(cat => addCategoryField(cat));
    document.getElementById('cancelEditServiceBtn').classList.remove('hidden');
    setLanguage(window.currentLanguage);
}

function resetServiceForm() {
    document.getElementById('editingServiceId').value = '';
    document.getElementById('serviceName').value = '';
    const categoriesContainer = document.getElementById('categoriesContainer');
    categoriesContainer.innerHTML = `
        <h3 class="text-lg font-medium dark:text-white">Categories</h3>
        <button type="button" id="addCategoryBtn" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">${window.translations[window.currentLanguage].add_category}</button>
    `;
    document.getElementById('addCategoryBtn').onclick = () => addCategoryField();
    document.getElementById('cancelEditServiceBtn').classList.add('hidden');
    setLanguage(window.currentLanguage);
    hideServicePanel();
}

function renderCatalogServiceList(services, selectServiceCallback) {
    const listContainer = document.getElementById('catalogServiceList');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = service.name;

        li.onclick = () => {
            const currentSelected = listContainer.querySelector('.selected');
            if (currentSelected) {
                currentSelected.classList.remove('selected');
            }
            li.classList.add('selected');
            selectServiceCallback(service.id);
        };

        listContainer.appendChild(li);
    });
    setLanguage(window.currentLanguage);
}

function renderCatalogContent(service, discountMode, discountPercentage, checkboxChangeCallback) {
    const titleEl = document.getElementById('selectedServiceTitle');
    const contentEl = document.getElementById('catalogContent');
    if (!titleEl || !contentEl) return;

    titleEl.textContent = service.name;
    contentEl.innerHTML = '';

    if (service.categories && service.categories.length > 0) {
        service.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-section p-4 border rounded-lg dark:border-slate-700';
            categoryDiv.innerHTML = `<h3 class="text-lg font-bold mb-3 dark:text-white">${category.name}</h3>`;
            
            const itemsGrid = document.createElement('div');
            itemsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

            category.items.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.className = 'item-card flex items-center justify-between p-3 border rounded-md dark:border-slate-600 dark:bg-slate-700';
                
                const originalPrice = item.price;
                let displayPrice = originalPrice;
                let priceHtml = formatCurrency(originalPrice);

                if (discountMode && discountPercentage > 0) {
                    displayPrice = originalPrice * (1 - discountPercentage / 100);
                    priceHtml = `<del class="text-gray-500">${formatCurrency(originalPrice)}</del> <span class="text-green-500">${formatCurrency(displayPrice)}</span>`;
                }

                itemCard.innerHTML = `
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" class="item-checkbox sr-only" data-service-id="${service.id}" data-category-name="${category.name}" data-item-name="${item.name}" data-original-price="${originalPrice}" data-current-price="${displayPrice}">
                        <div class="checkbox-custom w-5 h-5 border-2 border-blue-500 rounded-md mr-2 flex items-center justify-center">
                            <svg class="hidden w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span class="text-gray-800 dark:text-white">${item.name}</span>
                    </label>
                    <span class="font-semibold dark:text-white">${priceHtml}</span>
                `;
                itemsGrid.appendChild(itemCard);

                const checkbox = itemCard.querySelector('.item-checkbox');
                const customCheckbox = itemCard.querySelector('.checkbox-custom');
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        customCheckbox.classList.add('bg-blue-500');
                        customCheckbox.querySelector('svg').classList.remove('hidden');
                    } else {
                        customCheckbox.classList.remove('bg-blue-500');
                        customCheckbox.querySelector('svg').classList.add('hidden');
                    }
                    checkboxChangeCallback({
                        id: `${service.id}-${category.name}-${item.name}`,
                        serviceName: service.name,
                        categoryName: category.name,
                        itemName: item.name,
                        price: parseFloat(e.target.dataset.currentPrice)
                    }, e.target.checked);
                });
            });
            categoryDiv.appendChild(itemsGrid);
            contentEl.appendChild(categoryDiv);
        });
    } else {
        contentEl.innerHTML = `<p class="text-gray-500 dark:text-slate-400">No categories or items found for this service.</p>`;
    }
    setLanguage(window.currentLanguage);
}

function updateFloatingActionBar(count) {
    const fab = document.getElementById('floatingActionBar');
    const countSpan = document.getElementById('selectedItemsCount');
    const catalogPage = document.getElementById('catalog'); 

    if (!fab || !countSpan || !catalogPage) return;

    if (count > 0) {
        countSpan.textContent = window.translations[window.currentLanguage].items_selected.replace('{count}', count);
        fab.classList.remove('hidden');

        setTimeout(() => {
            const barHeight = fab.offsetHeight;
            catalogPage.style.paddingBottom = `${barHeight + 16}px`;
        }, 50);

    } else {
        fab.classList.add('hidden');
        catalogPage.style.paddingBottom = '0px';
    }
    setLanguage(window.currentLanguage);
}

function clearCatalogCheckboxes() {
    document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        const customCheckbox = checkbox.nextElementSibling;
        if (customCheckbox) {
            customCheckbox.classList.remove('bg-blue-500');
            customCheckbox.querySelector('svg').classList.add('hidden');
        }
    });
}

function toggleRedeemButton(show, points = 0) {
    const btn = document.getElementById("redeemPointsBtn");
    if (!btn) return;
    if (show) {
        btn.style.display = "inline-block";
        btn.textContent = `${window.translations[window.currentLanguage].redeem} (${points} ${window.translations[window.currentLanguage].loyalty_points})`;
    } else {
        btn.style.display = "none";
    }
    setLanguage(window.currentLanguage);
}

function showRedeemPointsModal(customerData, onApplyCallback, rate) {
    const modal = document.getElementById("redeemPointsModal");
    const pointsInput = document.getElementById("pointsToRedeem");
    const discountDisplay = document.getElementById("discountValue");

    document.getElementById("currentPointsBalance").textContent = customerData.loyaltyPoints;
    pointsInput.value = "";
    discountDisplay.textContent = "0.00";
    pointsInput.max = customerData.loyaltyPoints;

    pointsInput.oninput = () => {
        let enteredPoints = parseInt(pointsInput.value) || 0;
        if (enteredPoints > customerData.loyaltyPoints) {
            enteredPoints = customerData.loyaltyPoints;
            pointsInput.value = enteredPoints;
        }
        const discount = enteredPoints / rate;
        discountDisplay.textContent = discount.toFixed(2);
    };

    document.getElementById("applyRedeemBtn").onclick = () => {
        const pointsUsed = parseInt(pointsInput.value) || 0;
        if (pointsUsed > 0) {
            onApplyCallback(pointsUsed);
        }
        modal.classList.add("hidden");
    };

    modal.classList.remove("hidden");
    setLanguage(window.currentLanguage);
}

function formatEgyptianPhoneNumber(numberString) {
    if (!numberString || typeof numberString !== 'string') return 'N/A';
    const digitsOnly = numberString.replace(/\D/g, '');
    if (digitsOnly.startsWith('201') && digitsOnly.length === 12) {
        return '0' + digitsOnly.substring(2);
    }
    if (digitsOnly.startsWith('01') && digitsOnly.length === 11) {
        return digitsOnly;
    }
    if (digitsOnly.startsWith('1') && digitsOnly.length === 10) {
        return '0' + digitsOnly;
    }
    return numberString;
}

function showServicePanel() {
    const panel = document.getElementById('serviceFormPanel');
    const overlay = document.getElementById('serviceFormPanelOverlay');
    if (!panel || !overlay) return;
    panel.classList.remove('translate-x-full', 'invisible');
    overlay.classList.remove('hidden');
}

function hideServicePanel() {
    const panel = document.getElementById('serviceFormPanel');
    const overlay = document.getElementById('serviceFormPanelOverlay');
    if (!panel || !overlay) return;
    panel.classList.add('translate-x-full', 'invisible');
    overlay.classList.add('hidden');
}

// --- دالة جديدة لإظهار نافذة إضافة نقاط البونص ---
function showBonusPointsModal(customerId, onApplyCallback) {
    const modal = document.getElementById('bonusPointsModal');
    const amountInput = document.getElementById('bonusPointsAmount');
    const reasonInput = document.getElementById('bonusPointsReason');
    const saveBtn = document.getElementById('saveBonusPointsBtn');
    const cancelBtn = document.getElementById('cancelBonusPointsBtn');

    amountInput.value = '';
    reasonInput.value = '';

    const newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

    newSaveBtn.onclick = () => {
        const points = parseInt(amountInput.value);
        const reason = reasonInput.value.trim();
        if (isNaN(points) || points <= 0) {
            showNotification("يرجى إدخال عدد صحيح من النقاط.", "error");
            return;
        }
        onApplyCallback(customerId, points, reason);
        modal.classList.add('hidden');
    };

    cancelBtn.onclick = () => {
        modal.classList.add('hidden');
    };
    
    modal.classList.remove('hidden');
}

// Language translation function
function setLanguage(lang) {
    if (!window.translations || !window.translations[lang]) return;
    
    const translations = window.translations[lang];
    
    // Update document title
    const titleElement = document.querySelector('title[data-translate]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-translate');
        if (translations[key]) {
            document.title = translations[key];
        }
    }
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email' || element.type === 'password')) {
                element.placeholder = translations[key];
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translations[key];
            } else if (element.tagName === 'TITLE') {
                // Already handled above
                return;
            } else {
                element.textContent = translations[key];
            }
        }
    });
    
    // Update document direction based on language
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
    }
}

// Export all functions to global scope
window.UI = {
  setTranslations,
  setCurrentLanguage,
  initializeCharts,
  updateCharts,
  updateDashboardAuditLog,
  renderSalesLog,
  renderCustomerDatabase,
  renderDebtManagement,
  updateKpiCards,
  renderActivityFeed,
  renderNotifications,
  updateActivityList,
  updateDashboardUI,
  updateDynamicKpi,
  renderServiceProfitability,
  showDeleteConfirmationUI,
  hideDeleteConfirmationUI,
  fillSaleForm,
  resetSaleForm,
  showNotification,
  hideLoadingOverlay,
  handleLoadingErrorUI,
  setLanguage,
  formatCurrency,
  formatDate,
  showCustomerDetailsUI,
  hideCustomerDetailsUI,
  renderCustomerTagsUI,
  renderCustomerNotesUI,
  renderCustomerRemindersUI,
  updatePLReportResult,
  updateInactiveCustomersList,
  updateGoalSimulatorResult,
  updateBasketAnalysisResult,
  renderClientNameSuggestions,
  hideClientNameSuggestions,
  populateTagFilterDropdown,
  displayFilteredNumbers,
  toggleActivityPanel,
  populateServiceDropdown,
  renderServicesTable,
  addCategoryField,
  fillServiceForm,
  resetServiceForm,
  renderCatalogServiceList,
  renderCatalogContent,
  updateFloatingActionBar,
  clearCatalogCheckboxes,
  toggleRedeemButton,
  showRedeemPointsModal,
  formatEgyptianPhoneNumber,
  showServicePanel,
  hideServicePanel,
  showBonusPointsModal
};



