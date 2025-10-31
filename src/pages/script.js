import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  writeBatch,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZ0j398VfiI0rrXf5VyQ6qUr4iKFBPW4s",
  authDomain: "abqar-store.firebaseapp.com",
  projectId: "abqar-store",
  storageBucket: "abqar-store.firebasestorage.app",
  messagingSenderId: "119184115173",
  appId: "1:119184115173:web:46d08d93578b02970e1b0c",
  measurementId: "G-LFF1FP9YNH",
};

let salesData = [];
let customersData = {};
let currentLanguage = "en";
let dailyGoal = 5000;
let salesCollection, customersCollection, db;
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingMessage = document.getElementById("loadingMessage");
const loadingError = document.getElementById("loadingError");

const translations = {
  en: {
    app_title: "Abqar Store Sales",
    dashboard: "Dashboard",
    sales_log: "Sales & Log",
    ai_insights: "AI Insights",
    customers: "Customers",
    debt_management: "Debt Management",
    reports: "Reports & Tools",
    export: "Export",
    todays_revenue: "Today's Revenue",
    from_yesterday: "from yesterday",
    weekly_revenue: "Weekly Revenue",
    from_last_week: "from last week",
    monthly_revenue: "Monthly Revenue",
    from_last_month: "from last month",
    top_selling_service: "Top Selling Service",
    profit_by_date: "Profit by Date",
    total_debt: "Total Debt",
    daily_goal: "Daily Goal",
    of_goal_text: "of EGP goal",
    sales_by_service_type: "Sales by Service Type",
    monthly_sales_trend: "Monthly Sales Trend",
    service_profitability: "Service Profitability",
    service: "Service",
    orders: "Orders",
    revenue: "Revenue",
    avg_profit: "Avg. Profit",
    new_sale_entry: "New Sale Entry",
    date: "Date",
    service_type: "Service Type",
    select_service_type: "Select Service Type",
    price: "Price",
    service_cost: "Service Cost",
    client_name: "Client Name",
    whatsapp_number: "WhatsApp Number (Optional)",
    payment_status: "Payment Status",
    paid: "Paid",
    unpaid: "Unpaid",
    notes: "Notes (Optional)",
    save_sale: "Save Sale",
    sales_history: "Sales History",
    profit: "Profit",
    status: "Status",
    no_sales_records_found: "No sales records found",
    customer_database: "Customer Database",
    customer: "Customer",
    whatsapp: "WhatsApp",
    last_purchase: "Last Purchase",
    total_orders: "Total Orders",
    total_spent: "Total Spent",
    no_customer_records_found: "No customer records found",

    unpaid_orders: "Unpaid Orders",
    amount_due: "Amount Due",
    no_unpaid_orders: "No unpaid orders",
    notification: "Notification",
    delete_sale_title: "Delete Sale",
    delete_sale_message:
      "Are you sure you want to delete this sale? This action cannot be undone.",
    currency: "EGP",
    edit: "Edit",
    delete: "Delete",
    details: "Details",
    mark_as_paid: "Mark as Paid",
    filter: "Filter",
    enter_daily_goal: "Enter new daily goal",
    goal_updated: "Daily goal updated successfully!",
    customer_details: "Customer Details",
    purchase_history: "Purchase History",
    close: "Close",
    customer_name: "Name",
    confirm: "Confirm",
    cancel: "Cancel",
    tags: "Tags",
    add: "Add",
    notes_timeline: "Notes Timeline",
    pl_reports: "P&L Reports",
    monthly: "Monthly",
    quarterly: "Quarterly",
    generate: "Generate",
    total_income: "Total Income",
    total_expenses: "Total Expenses",
    net_profit: "Net Profit",
    net_loss: "Net Loss",
    whatsapp_marketing: "WhatsApp Marketing",
    inactive_customers_placeholder: "Inactive customer numbers appear here...",
    copy: "Copy",
    copied: "Copied!",
    goal_simulator: "Financial Goal Simulator",
    profit_goal_placeholder: "Enter profit goal",
    calculate: "Calculate",
    goal_sim_intro_1: "To reach a profit goal of",
    goal_sim_intro_2: "you need to sell:",
    goal_sim_orders_of: "orders of",
    basket_analysis: "Basket Analysis",
    analyze: "Analyze",
    ai_assistant_title: "AI Assistant",
    ai_welcome_message: "Welcome! Ask me a question about your sales data.",
    ai_input_placeholder: "Ask your question here...",
    ai_response_not_found:
      "Sorry, I couldn't understand the question. You can ask about 'total profit today' or 'who is the best customer?'.",
    loading_data: "Loading Data...",
    firebase_error:
      "Connection to database failed. Please check your Firebase configuration and internet connection.",
  },
  ar: {
    app_title: "مبيعات متجر عبقر",
    dashboard: "لوحة التحكم",
    sales_log: "المبيعات والسجل",
    ai_insights: "رؤى الذكاء الاصطناعي",
    customers: "العملاء",
    debt_management: "إدارة الديون",
    reports: "تقارير وأدوات",
    export: "تصدير",
    todays_revenue: "إيرادات اليوم",
    from_yesterday: "عن أمس",
    weekly_revenue: "إيرادات الأسبوع",
    from_last_week: "عن الأسبوع الماضي",
    monthly_revenue: "إيرادات الشهر",
    from_last_month: "عن الشهر الماضي",
    top_selling_service: "الخدمة الأكثر مبيعاً",
    profit_by_date: "أرباح حسب اليوم",
    total_debt: "إجمالي الديون",
    daily_goal: "الهدف اليومي",
    daily_goal_sentence: "% من هدف الربح",
    sales_by_service_type: "المبيعات حسب نوع الخدمة",
    monthly_sales_trend: "اتجاه المبيعات الشهري",
    service_profitability: "ربحية الخدمة",
    service: "الخدمة",
    orders: "الطلبات",
    revenue: "الإيرادات",
    avg_profit: "متوسط الربح",
    new_sale_entry: "إدخال عملية بيع جديدة",
    date: "التاريخ",
    service_type: "نوع الخدمة",
    select_service_type: "اختر نوع الخدمة",
    price: "السعر",
    service_cost: "تكلفة الخدمة",
    client_name: "اسم العميل",
    whatsapp_number: "رقم الواتساب (اختياري)",
    payment_status: "حالة الدفع",
    paid: "مدفوع",
    unpaid: "غير مدفوع",
    notes: "ملاحظات (اختياري)",
    save_sale: "حفظ البيع",
    sales_history: "سجل المبيعات",
    profit: "الربح",
    status: "الحالة",
    no_sales_records_found: "لم يتم العثور على سجلات مبيعات",
    customer_database: "قاعدة بيانات العملاء",
    customer: "العميل",
    whatsapp: "واتساب",
    last_purchase: "آخر عملية شراء",
    total_orders: "إجمالي الطلبات",
    total_spent: "إجمالي الإنفاق",
    no_customer_records_found: "لم يتم العثور على سجلات عملاء",

    unpaid_orders: "الطلبات غير المدفوعة",
    amount_due: "المبلغ المستحق",
    no_unpaid_orders: "لا توجد طلبات غير مدفوعة",
    notification: "إشعار",
    delete_sale_title: "حذف عملية البيع",
    delete_sale_message:
      "هل أنت متأكد أنك تريد حذف هذا البيع؟ لا يمكن التراجع عن هذا الإجراء.",
    currency: "ج.م",
    edit: "تعديل",
    delete: "حذف",
    details: "تفاصيل",
    mark_as_paid: "تحديد كمدفوع",
    filter: "تصفية",
    enter_daily_goal: "أدخل الهدف اليومي الجديد",
    goal_updated: "تم تحديث الهدف اليومي بنجاح!",
    customer_details: "تفاصيل العميل",
    purchase_history: "سجل الشراء",
    close: "إغلاق",
    customer_name: "الاسم",
    confirm: "تأكيد",
    cancel: "إلغاء",
    tags: "العلامات",
    add: "إضافة",
    notes_timeline: "الجدول الزمني للملاحظات",
    pl_reports: "تقارير الأرباح والخسائر",
    monthly: "شهري",
    quarterly: "ربع سنوي",
    generate: "إنشاء",
    total_income: "إجمالي الدخل",
    total_expenses: "إجمالي المصاريف",
    net_profit: "صافي الربح",
    net_loss: "صافي الخسارة",
    whatsapp_marketing: "أداة واتساب للتسويق",
    inactive_customers_placeholder: "أرقام العملاء غير النشطين ستظهر هنا...",
    copy: "نسخ",
    copied: "تم النسخ!",
    goal_simulator: "محاكي الهدف المالي",
    profit_goal_placeholder: "أدخل هدف الربح",
    calculate: "احسب",
    goal_sim_intro_1: "للوصول إلى هدف ربح قدره",
    goal_sim_intro_2: "تحتاج لبيع:",
    goal_sim_orders_of: "طلبات من",
    basket_analysis: "تحليل السلة",
    analyze: "تحليل",
    ai_assistant_title: "المساعد الذكي",
    ai_welcome_message: "أهلاً بك! يمكنك طرح سؤال حول بيانات مبيعاتك.",
    ai_input_placeholder: "اطرح سؤالك هنا...",
    ai_response_not_found:
      "عفواً، لم أفهم السؤال. يمكنك أن تسأل عن 'ما هو إجمالي الربح اليوم؟' أو 'من هو أفضل عميل؟'.",
    loading_data: "جاري تحميل البيانات...",
    firebase_error:
      "فشل الاتصال بقاعدة البيانات. يرجى التحقق من إعدادات Firebase واتصالك بالإنترنت.",
  },
};

// --- CORE APP LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    const auth = getAuth(app);

    initializeCharts();

    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Set initial toggle states
    document.querySelectorAll('[id^="darkmode-toggle"]').forEach((toggle) => {
      toggle.checked = isDarkMode;
    });
    currentLanguage = localStorage.getItem("language") || "ar"; // Default to Arabic
    dailyGoal = parseFloat(localStorage.getItem("dailyGoal")) || 5000;

    setLanguage(currentLanguage);

    document.getElementById("date").valueAsDate = new Date();
    document.getElementById("profitDateSelector").valueAsDate = new Date();

    setupEventListeners();
    initializeAnimations();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        salesCollection = collection(db, "sales");
        customersCollection = collection(db, "customers");
        loadDataAndSetupRealtimeListener();
      } else {
        signInAnonymously(auth).catch((error) => handleLoadingError(error));
      }
    });
  } catch (error) {
    handleLoadingError(error);
  }
});

function handleLoadingError(error) {
  console.error("Firebase Initialization Error:", error);
  loadingMessage.classList.add("hidden");
  loadingError.textContent = translations[currentLanguage].firebase_error;
  loadingError.classList.remove("hidden");
}

function hideLoadingOverlay() {
  if (loadingOverlay) {
    loadingOverlay.classList.add("opacity-0");
    setTimeout(() => {
      loadingOverlay.classList.add("hidden");
      document.body.classList.remove("loading");
    }, 300);
  }
}

function loadDataAndSetupRealtimeListener() {
  onSnapshot(
    query(collection(db, "sales")),
    (snapshot) => {
      salesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      salesData.sort((a, b) => new Date(b.date) - new Date(a.date));

      onSnapshot(
        query(collection(db, "customers")),
        (custSnapshot) => {
          const customerDocs = {};
          custSnapshot.forEach((doc) => {
            customerDocs[doc.id] = { id: doc.id, ...doc.data() };
          });
          customersData = customerDocs; // Directly assign from DB
          updateCustomerAggregates(); // Then aggregate sales data into it
          updateAllViews();
          hideLoadingOverlay();
        },
        (error) => handleLoadingError(error)
      );
    },
    (error) => handleLoadingError(error)
  );
}

function updateAllViews() {
  renderSalesLog(salesData);
  renderCustomerDatabase();
  renderDebtManagement();
  updateDashboard();
  if (window.serviceTypeChart && window.salesTrendChart) {
    updateCharts();
  }
  setLanguage(currentLanguage); // Re-apply translations
}

function setupEventListeners() {
  // Tab Navigation with enhanced animations
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Animate tab content transition
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.add("hidden");
        content.style.opacity = "0";
      });

      const targetTab = document.getElementById(this.dataset.tab);
      targetTab.classList.remove("hidden");

      // Fade in the new tab content
      setTimeout(() => {
        targetTab.style.opacity = "1";
        targetTab.style.transform = "translateY(0)";
      }, 50);
    });

    // Add hover sound effect simulation (visual feedback)
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "";
      }
    });
  });

  // Main Actions
  document.getElementById("salesForm").addEventListener("submit", (e) => {
    e.preventDefault();
    saveSale();
  });
  // Dark mode toggle event listeners
  document.querySelectorAll('[id^="darkmode-toggle"]').forEach((toggle) => {
    toggle.addEventListener("change", toggleDarkMode);
  });
  document
    .getElementById("languageToggle")
    .addEventListener("click", toggleLanguage);
  document
    .getElementById("editGoalBtn")
    .addEventListener("click", setDailyGoal);
  document
    .getElementById("exportBtn")
    .addEventListener("click", () => exportData(salesData, "sales_export.csv"));
  document
    .getElementById("filterSalesBtn")
    .addEventListener("click", filterSales);
  document
    .getElementById("profitDateSelector")
    .addEventListener("change", (e) => updateProfitByDate(e.target.value));

  // Modals Close Buttons
  document
    .getElementById("closeNotification")
    .addEventListener("click", () =>
      document.getElementById("notification").classList.add("-translate-x-full")
    );
  document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", () =>
      document.getElementById("deleteConfirmationModal").classList.add("hidden")
    );
  document
    .getElementById("closeCustomerModalBtn")
    .addEventListener("click", () =>
      document.getElementById("customerDetailsModal").classList.add("hidden")
    );
  document
    .getElementById("closeCustomerModalBtn2")
    .addEventListener("click", () =>
      document.getElementById("customerDetailsModal").classList.add("hidden")
    );

  // Reports & Tools Event Listeners
  document
    .getElementById("generatePlReportBtn")
    .addEventListener("click", generatePLReport);
  document
    .getElementById("filterInactiveBtn")
    .addEventListener("click", filterInactiveCustomers);
  document
    .getElementById("copyNumbersBtn")
    .addEventListener("click", copyInactiveNumbers);
  document
    .getElementById("exportNumbersBtn")
    .addEventListener("click", exportInactiveNumbers);
  document
    .getElementById("simulateGoalBtn")
    .addEventListener("click", simulateGoal);
  document
    .getElementById("runAnalysisBtn")
    .addEventListener("click", analyzeBaskets);

  // AI Chat
  document
    .getElementById("aiChatSendBtn")
    .addEventListener("click", handleAIChat);
  document.getElementById("aiChatInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAIChat();
  });
}

async function saveSale() {
  const form = document.getElementById("salesForm");
  const formData = new FormData(form);
  const editingId = formData.get("editingSaleId");

  const saleData = {
    date: formData.get("date"),
    serviceType: formData.get("serviceType"),
    price: parseFloat(formData.get("price")) || 0,
    serviceCost: parseFloat(formData.get("serviceCost")) || 0,
    clientName: formData.get("clientName") || "N/A",
    whatsappNumber: formData.get("whatsappNumber") || null,
    paymentStatus: formData.get("paymentStatus"),
    notes: formData.get("notes") || "",
  };
  saleData.profit = saleData.price - saleData.serviceCost;

  if (!saleData.date || !saleData.serviceType || !saleData.price) {
    showNotification("Please fill all required fields", "error");
    return;
  }

  try {
    if (editingId) {
      await updateDoc(doc(db, "sales", editingId), saleData);
      showNotification("Sale updated successfully!", "success");
    } else {
      await addDoc(salesCollection, saleData);
      showNotification("Sale saved successfully!", "success");
    }

    // NEW: Robustly create or update customer profile
    if (saleData.whatsappNumber) {
      const customerRef = doc(db, "customers", saleData.whatsappNumber);
      const customerSnap = await getDoc(customerRef);
      if (!customerSnap.exists()) {
        await setDoc(customerRef, {
          name: saleData.clientName,
          whatsappNumber: saleData.whatsappNumber,
          tags: [],
          notes: [],
        });
      } else {
        await updateDoc(customerRef, { name: saleData.clientName });
      }
    }

    form.reset();
    document.getElementById("editingSaleId").value = "";
    document.getElementById("date").valueAsDate = new Date();
  } catch (error) {
    console.error("Error saving sale: ", error);
    showNotification("Error saving sale.", "error");
  }
}

function editSale(saleId) {
  const sale = salesData.find((s) => s.id === saleId);
  if (!sale) return;

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
  window.scrollTo(0, 0);
}

function showDeleteConfirmation(saleId) {
  const dialog = document.getElementById("deleteConfirmationModal");
  dialog.classList.remove("hidden");
  const confirmBtn = document.getElementById("confirmDeleteBtn");

  const confirmAction = () => {
    deleteSale(saleId);
    dialog.classList.add("hidden");
  };

  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  newConfirmBtn.addEventListener("click", confirmAction, { once: true });
  newConfirmBtn.setAttribute("data-translate", "delete");
  setLanguage(currentLanguage);
}

async function deleteSale(saleId) {
  try {
    await deleteDoc(doc(db, "sales", saleId));
    showNotification("Sale deleted successfully", "success");
  } catch (error) {
    console.error("Error deleting sale: ", error);
    showNotification("Error deleting sale.", "error");
  }
}

async function markAsPaid(saleId) {
  try {
    await updateDoc(doc(db, "sales", saleId), { paymentStatus: "paid" });
    showNotification("Order marked as paid", "success");
  } catch (error) {
    console.error("Error marking as paid: ", error);
    showNotification("Error updating order.", "error");
  }
}

function filterSales() {
  const startDate = document.getElementById("startDateFilter").value;
  const endDate = document.getElementById("endDateFilter").value;

  if (!startDate || !endDate) {
    renderSalesLog(salesData);
    return;
  }

  const filteredData = salesData.filter((sale) => {
    const saleDate = new Date(sale.date);
    return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
  });
  renderSalesLog(filteredData);
}

function renderSalesLog(dataToRender) {
  const tableBody = document.getElementById("salesTableBody");
  tableBody.innerHTML = "";

  if (!dataToRender || dataToRender.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-4 text-center" data-translate="no_sales_records_found"></td></tr>`;
    return;
  }

  dataToRender.forEach((sale) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${formatDate(
          sale.date
        )}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${sale.serviceType}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${sale.clientName}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${formatCurrency(
          sale.price
        )}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm ${
          sale.profit >= 0 ? "text-green-500" : "text-red-500"
        }">${formatCurrency(sale.profit)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              sale.paymentStatus === "paid"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }">
                ${
                  translations[currentLanguage][sale.paymentStatus] ||
                  sale.paymentStatus
                }
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium actions-cell">
            <button class="edit-btn" data-id="${
              sale.id
            }" data-translate="edit"></button>
            <button class="delete-btn" data-id="${
              sale.id
            }" data-translate="delete"></button>
        </td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", function () {
      showDeleteConfirmation(this.dataset.id);
    })
  );
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", function () {
      editSale(this.dataset.id);
    })
  );
}

function updateCustomerAggregates() {
  // الخطوة 1: إعادة تعيين الإحصائيات للعملاء المحفوظين بالفعل
  for (const id in customersData) {
    customersData[id].totalOrders = 0;
    customersData[id].totalSpent = 0;
    customersData[id].purchaseHistory = [];
    customersData[id].lastPurchase = "1970-01-01";
  }

  // الخطوة 2: المرور على المبيعات وتجميع البيانات، مع إنشاء العميل إذا لم يكن موجودًا
  salesData.forEach((sale) => {
    if (sale.whatsappNumber) {
      // التأكد من وجود العميل، وإن لم يكن موجودًا يتم إنشاء ملف تعريف أساسي له
      if (!customersData[sale.whatsappNumber]) {
        customersData[sale.whatsappNumber] = {
          name: sale.clientName,
          whatsappNumber: sale.whatsappNumber,
          totalOrders: 0,
          totalSpent: 0,
          purchaseHistory: [],
          lastPurchase: "1970-01-01",
          tags: [], // إضافة وسوم فارغة كقيمة افتراضية
          notes: [], // إضافة ملاحظات فارغة كقيمة افتراضية
        };
      }

      // الآن بعد التأكد من وجود العميل، نقوم بتحديث بياناته
      const customer = customersData[sale.whatsappNumber];
      customer.totalOrders++;
      customer.totalSpent += sale.price;

      if (!customer.purchaseHistory) {
        customer.purchaseHistory = [];
      }
      customer.purchaseHistory.push(sale);

      if (
        new Date(sale.date) > new Date(customer.lastPurchase || "1970-01-01")
      ) {
        customer.lastPurchase = sale.date;
        customer.name = sale.clientName; // تحديث الاسم لآخر اسم مسجل
      }
    }
  });
}
// Aggregate sales data
salesData.forEach((sale) => {
  if (sale.whatsappNumber && customersData[sale.whatsappNumber]) {
    const customer = customersData[sale.whatsappNumber];
    customer.totalOrders = (customer.totalOrders || 0) + 1;
    customer.totalSpent = (customer.totalSpent || 0) + sale.price;

    if (!customer.purchaseHistory) customer.purchaseHistory = [];
    customer.purchaseHistory.push(sale);

    if (new Date(sale.date) > new Date(customer.lastPurchase || "1970-01-01")) {
      customer.lastPurchase = sale.date;
      customer.name = sale.clientName; // Update name to the latest one
    }
  }
});

function renderCustomerDatabase() {
  const tableBody = document.getElementById("customersTableBody");
  const customersArray = Object.values(customersData);
  tableBody.innerHTML = "";

  if (customersArray.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center" data-translate="no_customer_records_found"></td></tr>`;
    return;
  }

  customersArray.sort(
    (a, b) => new Date(b.lastPurchase || 0) - new Date(a.lastPurchase || 0)
  );

  customersArray.forEach((customer) => {
    const isVip = customer.tags && customer.tags.includes("VIP");
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            ${customer.name} ${
      isVip ? '<span class="vip-badge">VIP</span>' : ""
    }
            <div class="text-sm text-gray-500 dark:text-slate-400">${
              (customer.totalOrders || 0) > 1 ? "Returning" : "New"
            }</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${
          customer.whatsappNumber || "N/A"
        }</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${formatDate(
          customer.lastPurchase
        )}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${
          customer.totalOrders || 0
        }</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${formatCurrency(
          customer.totalSpent
        )}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium actions-cell">
            <button class="details-btn" data-id="${
              customer.whatsappNumber
            }" data-translate="details"></button>
        </td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".details-btn").forEach((btn) =>
    btn.addEventListener("click", function () {
      showCustomerDetails(this.dataset.id);
    })
  );
}

function renderDebtManagement() {
  const tableBody = document.getElementById("debtTableBody");
  const unpaidOrders = salesData.filter(
    (sale) => sale.paymentStatus === "unpaid"
  );
  tableBody.innerHTML = "";

  if (unpaidOrders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center" data-translate="no_unpaid_orders"></td></tr>`;
    return;
  }

  unpaidOrders.forEach((sale) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${formatDate(
          sale.date
        )}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${sale.clientName}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">${formatCurrency(
          sale.price
        )}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium actions-cell">
            <button class="mark-paid-btn" data-id="${
              sale.id
            }" data-translate="mark_as_paid"></button>
        </td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".mark-paid-btn").forEach((btn) =>
    btn.addEventListener("click", function () {
      markAsPaid(this.dataset.id);
    })
  );
}

function updateDashboard() {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const getMetrics = (sales) => ({
    revenue: sales.reduce((sum, s) => sum + s.price, 0),
    profit: sales.reduce((sum, s) => sum + s.profit, 0),
  });

  // Today vs Yesterday
  const todaySales = salesData.filter((s) => s.date === todayStr);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const yesterdaySales = salesData.filter((s) => s.date === yesterdayStr);
  updateStatCard(
    "today",
    getMetrics(todaySales).revenue,
    getMetrics(yesterdaySales).revenue
  );

  // This Week vs Last Week (FIXED: Fair comparison)
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(
    now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1)
  );
  const thisWeekSales = salesData.filter(
    (s) => new Date(s.date) >= startOfWeek
  );

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfWeek.getDate() - 7);
  const endOfLastWeekPeriod = new Date(now);
  endOfLastWeekPeriod.setDate(now.getDate() - 7);
  const lastWeekSales = salesData.filter((s) => {
    const d = new Date(s.date);
    return d >= startOfLastWeek && d <= endOfLastWeekPeriod;
  });
  updateStatCard(
    "weekly",
    getMetrics(thisWeekSales).revenue,
    getMetrics(lastWeekSales).revenue
  );

  // This Month vs Last Month
  const thisMonthSales = salesData.filter(
    (s) => s.date.substring(0, 7) === todayStr.substring(0, 7)
  );
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = lastMonthDate.toISOString().substring(0, 7);
  const lastMonthSales = salesData.filter(
    (s) => s.date.substring(0, 7) === lastMonthStr
  );
  updateStatCard(
    "monthly",
    getMetrics(thisMonthSales).revenue,
    getMetrics(lastMonthSales).revenue
  );

  // Other Dashboard metrics
  document.getElementById("dashboardTotalOrders").textContent =
    salesData.length;
  const serviceCounts = salesData.reduce((acc, sale) => {
    acc[sale.serviceType] = (acc[sale.serviceType] || 0) + 1;
    return acc;
  }, {});
  const topService = Object.keys(serviceCounts).reduce(
    (a, b) => (serviceCounts[a] > serviceCounts[b] ? a : b),
    "N/A"
  );
  const topServiceEl = document.getElementById("dashboardTopService");
  topServiceEl.textContent = topService;
  topServiceEl.title = topService;

  // Profit by Date (initialize with today) & Total Debt
  updateProfitByDate(todayStr);
  const totalDebt = salesData
    .filter((s) => s.paymentStatus === "unpaid")
    .reduce((sum, s) => sum + s.price, 0);
  document.getElementById("totalDebt").textContent = totalDebt.toFixed(2);

  // Daily Goal (FIXED: Based on PROFIT and text format)
  const todayProfit = getMetrics(todaySales).profit;
  const goalPercentage =
    dailyGoal > 0
      ? Math.round(Math.min((todayProfit / dailyGoal) * 100, 100))
      : 0;

  // 1. تحديث شريط التقدم
  document.getElementById(
    "dailyGoalProgress"
  ).style.width = `${goalPercentage}%`;

  // 2. تكوين الجملة الكاملة وتحديث النص
  const goalTextElement = document.getElementById("dailyGoalFullText");
  const sentenceTemplate =
    translations[currentLanguage].daily_goal_sentence || "% of profit goal";
  goalTextElement.textContent = `${goalPercentage}${sentenceTemplate}`;

  renderServiceProfitability();
}

function updateProfitByDate(dateStr) {
  if (!dateStr) return;
  const salesForDate = salesData.filter((s) => s.date === dateStr);
  const profitForDate = salesForDate.reduce((sum, s) => sum + s.profit, 0);
  document.getElementById("dateProfitValue").textContent =
    profitForDate.toFixed(2);
}

function updateStatCard(period, current, previous) {
  document.getElementById(`${period}Revenue`).textContent = current.toFixed(2);
  const trendEl = document.getElementById(`${period}Trend`);
  const trendContainer = document.getElementById(`${period}TrendContainer`);
  const trendArrow = trendContainer.querySelector(".trend-arrow");

  let trend = 0;
  if (previous > 0) {
    trend = ((current - previous) / previous) * 100;
  } else if (current > 0) {
    trend = 100;
  }

  trendEl.textContent = Math.abs(Math.round(trend));
  trendContainer.classList.remove(
    "text-green-500",
    "text-red-500",
    "text-gray-500"
  );
  trendArrow.style.transform = "";

  if (trend > 0.1) {
    trendContainer.classList.add("text-green-500");
    trendArrow.style.transform = "rotate(0deg)";
  } else if (trend < -0.1) {
    trendContainer.classList.add("text-red-500");
    trendArrow.style.transform = "rotate(180deg)";
  } else {
    trendContainer.classList.add("text-gray-500");
  }
}

function renderServiceProfitability() {
  const body = document.getElementById("serviceProfitabilityBody");
  body.innerHTML = "";
  const serviceStats = {};
  salesData.forEach((sale) => {
    if (!serviceStats[sale.serviceType]) {
      serviceStats[sale.serviceType] = { orders: 0, revenue: 0, profit: 0 };
    }
    serviceStats[sale.serviceType].orders++;
    serviceStats[sale.serviceType].revenue += sale.price;
    serviceStats[sale.serviceType].profit += sale.profit;
  });

  if (Object.keys(serviceStats).length === 0) {
    body.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center" data-translate="no_data_available"></td></tr>`;
  } else {
    Object.entries(serviceStats)
      .sort(([, a], [, b]) => b.revenue - a.revenue)
      .forEach(([service, stats]) => {
        const avgProfit = stats.orders > 0 ? stats.profit / stats.orders : 0;
        const row = document.createElement("tr");
        row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${service}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">${
                      stats.orders
                    }</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${formatCurrency(
                      stats.revenue
                    )}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm ${
                      avgProfit >= 0 ? "text-green-500" : "text-red-500"
                    }">${formatCurrency(avgProfit)}</td>
                `;
        body.appendChild(row);
      });
  }
}

// --- Customer Details Modal ---
async function showCustomerDetails(whatsappNumber) {
  const customer = customersData[whatsappNumber];
  if (!customer) return;

  document.getElementById("modalCustomerName").textContent = customer.name;
  document.getElementById("modalCustomerWhatsapp").textContent =
    customer.whatsappNumber;
  document.getElementById("modalCustomerTotalOrders").textContent =
    customer.totalOrders || 0;
  document.getElementById("modalCustomerTotalSpent").textContent =
    formatCurrency(customer.totalSpent);

  const historyBody = document.getElementById("modalPurchaseHistory");
  historyBody.innerHTML = "";
  if (customer.purchaseHistory && customer.purchaseHistory.length > 0) {
    customer.purchaseHistory
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach((sale) => {
        const row = historyBody.insertRow();
        row.className = "hover:bg-gray-50 dark:hover:bg-slate-700";
        row.innerHTML = `<td class="px-4 py-2 text-sm">${formatDate(
          sale.date
        )}</td><td class="px-4 py-2 text-sm">${
          sale.serviceType
        }</td><td class="px-4 py-2 text-sm">${formatCurrency(sale.price)}</td>`;
      });
  }

  renderCustomerTags(customer);
  const addTagBtn = document.getElementById("addTagBtn");
  const newTagInput = document.getElementById("newTagInput");
  addTagBtn.onclick = () =>
    addCustomerTag(customer.whatsappNumber, newTagInput.value.trim());

  renderCustomerNotes(customer);
  const addNoteBtn = document.getElementById("addNoteBtn");
  const newNoteInput = document.getElementById("newNoteInput");
  addNoteBtn.onclick = () =>
    addCustomerNote(customer.whatsappNumber, newNoteInput.value.trim());

  document.getElementById("customerDetailsModal").classList.remove("hidden");
  setLanguage(currentLanguage);
}

function renderCustomerTags(customer) {
  const tagsContainer = document.getElementById("modalCustomerTags");
  tagsContainer.innerHTML = "";
  if (customer.tags && customer.tags.length > 0) {
    customer.tags.forEach((tag) => {
      const badge = document.createElement("span");
      badge.className = "tag-badge";
      badge.textContent = tag;
      const removeBtn = document.createElement("button");
      removeBtn.className = "ml-2 text-red-500 hover:text-red-700";
      removeBtn.innerHTML = "&times;";
      removeBtn.onclick = () => removeCustomerTag(customer.whatsappNumber, tag);
      badge.appendChild(removeBtn);
      tagsContainer.appendChild(badge);
    });
  } else {
    tagsContainer.textContent = "No tags yet.";
  }
}

async function addCustomerTag(whatsapp, tag) {
  if (!tag || !whatsapp) return;
  const customer = customersData[whatsapp];
  const updatedTags = [...(customer.tags || []), tag];
  await updateDoc(doc(db, "customers", whatsapp), { tags: updatedTags });
  document.getElementById("newTagInput").value = "";
  showNotification("Tag added!", "success");
}

async function removeCustomerTag(whatsapp, tag) {
  if (!tag || !whatsapp) return;
  const customer = customersData[whatsapp];
  const updatedTags = customer.tags.filter((t) => t !== tag);
  await updateDoc(doc(db, "customers", whatsapp), { tags: updatedTags });
  showNotification("Tag removed!", "success");
}

function renderCustomerNotes(customer) {
  const notesContainer = document.getElementById("modalNotesTimeline");
  notesContainer.innerHTML = "";
  if (customer.notes && customer.notes.length > 0) {
    customer.notes
      .sort((a, b) => b.timestamp - a.timestamp)
      .forEach((note) => {
        const noteEl = document.createElement("div");
        noteEl.className = "p-2 bg-gray-100 dark:bg-slate-700 rounded-md";
        noteEl.innerHTML = `<p class="text-sm">${
          note.text
        }</p><p class="text-xs text-gray-500 dark:text-slate-400 mt-1">${new Date(
          note.timestamp
        ).toLocaleString()}</p>`;
        notesContainer.appendChild(noteEl);
      });
  } else {
    notesContainer.textContent = "No notes yet.";
  }
}

async function addCustomerNote(whatsapp, text) {
  if (!text || !whatsapp) return;
  const customer = customersData[whatsapp];
  const newNote = { text: text, timestamp: Date.now() };
  const updatedNotes = [...(customer.notes || []), newNote];
  try {
    await updateDoc(doc(db, "customers", whatsapp), { notes: updatedNotes });
    // FIXED: Manually update local state and re-render for instant feedback
    customersData[whatsapp].notes = updatedNotes;
    renderCustomerNotes(customersData[whatsapp]);
    document.getElementById("newNoteInput").value = "";
    showNotification("Note added!", "success");
  } catch (error) {
    console.error("Error adding note:", error);
    showNotification("Failed to add note.", "error");
  }
}

// --- P&L Reports ---
function generatePLReport() {
  const period = document.getElementById("plReportPeriod").value;
  const now = new Date();
  let startDate;

  if (period === "monthly") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    // quarterly
    const quarter = Math.floor(now.getMonth() / 3);
    startDate = new Date(now.getFullYear(), quarter * 3, 1);
  }

  const relevantSales = salesData.filter((s) => new Date(s.date) >= startDate);
  const income = relevantSales.reduce((sum, s) => sum + s.price, 0);
  const expenses = relevantSales.reduce((sum, s) => sum + s.serviceCost, 0);
  const net = income - expenses;

  const resultDiv = document.getElementById("plReportResult");
  resultDiv.innerHTML = `
        <h4 class="font-bold mb-2">${
          period.charAt(0).toUpperCase() + period.slice(1)
        } Report</h4>
        <p><strong>${
          translations[currentLanguage].total_income
        }:</strong> ${formatCurrency(income)}</p>
        <p><strong>${
          translations[currentLanguage].total_expenses
        }:</strong> ${formatCurrency(expenses)}</p>
        <hr class="my-2 dark:border-slate-600">
        <p class="font-bold ${net >= 0 ? "text-green-500" : "text-red-500"}">
            <strong>${
              net >= 0
                ? translations[currentLanguage].net_profit
                : translations[currentLanguage].net_loss
            }:</strong>
            ${formatCurrency(Math.abs(net))}
        </p>
    `;
  resultDiv.classList.remove("hidden");
}

// --- WhatsApp Marketing Tool ---
function filterInactiveCustomers() {
  const days = parseInt(document.getElementById("inactivityDays").value) || 30;
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;

  const inactive = Object.values(customersData).filter(
    (c) => c.whatsappNumber && new Date(c.lastPurchase).getTime() < threshold
  );

  const listArea = document.getElementById("inactiveCustomersList");
  listArea.value = inactive.map((c) => c.whatsappNumber).join("\n");
  showNotification(`${inactive.length} inactive customers found.`, "success");
}
function copyInactiveNumbers() {
  const listArea = document.getElementById("inactiveCustomersList");
  navigator.clipboard.writeText(listArea.value).then(() => {
    showNotification(translations[currentLanguage].copied, "success");
  });
}
function exportInactiveNumbers() {
  const listArea = document.getElementById("inactiveCustomersList");
  const numbers = listArea.value
    .split("\n")
    .map((n) => ({ whatsappNumber: n }));
  exportData(numbers, "inactive_customers.csv");
}

// --- Financial Tools ---
function simulateGoal() {
  const goal = parseFloat(document.getElementById("profitGoalInput").value);
  const resultDiv = document.getElementById("goalSimulatorResult");
  if (!goal) {
    resultDiv.innerHTML = `<p class="text-red-500">Please enter a valid profit goal.</p>`;
    return;
  }

  const serviceStats = {};
  salesData.forEach((sale) => {
    if (!serviceStats[sale.serviceType]) {
      serviceStats[sale.serviceType] = { profit: 0, count: 0 };
    }
    serviceStats[sale.serviceType].profit += sale.profit;
    serviceStats[sale.serviceType].count++;
  });

  let resultHTML = `<p class="mb-2">${
    translations[currentLanguage].goal_sim_intro_1
  } <strong>${formatCurrency(goal)}</strong>, ${
    translations[currentLanguage].goal_sim_intro_2
  }</p><ul class="list-disc list-inside">`;
  for (const service in serviceStats) {
    const avgProfit =
      serviceStats[service].profit / serviceStats[service].count;
    if (avgProfit > 0) {
      const salesNeeded = Math.ceil(goal / avgProfit);
      resultHTML += `<li><strong>${salesNeeded}</strong> ${translations[currentLanguage].goal_sim_orders_of} '${service}'</li>`;
    }
  }
  resultHTML += `</ul>`;
  resultDiv.innerHTML = resultHTML;
}

function analyzeBaskets() {
  const resultDiv = document.getElementById("basketAnalysisResult");
  const baskets = {};
  salesData.forEach((sale) => {
    const key = `${sale.clientName}-${sale.date}`;
    if (!baskets[key]) baskets[key] = new Set();
    baskets[key].add(sale.serviceType);
  });

  const pairs = {};
  Object.values(baskets).forEach((basket) => {
    if (basket.size > 1) {
      const items = Array.from(basket);
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const pair = [items[i], items[j]].sort().join(" & ");
          pairs[pair] = (pairs[pair] || 0) + 1;
        }
      }
    }
  });

  const sortedPairs = Object.entries(pairs).sort((a, b) => b[1] - a[1]);
  if (sortedPairs.length === 0) {
    resultDiv.innerHTML = `<p>Not enough data for analysis.</p>`;
    return;
  }

  let resultHTML = `<p class="mb-2"><strong>Frequently Bought Together:</strong></p><ul class="list-disc list-inside">`;
  sortedPairs.slice(0, 3).forEach((pair) => {
    resultHTML += `<li>${pair[0]} (${pair[1]} times)</li>`;
  });
  resultHTML += `</ul>`;
  resultDiv.innerHTML = resultHTML;
}

// --- AI Chat Assistant (IMPROVED) ---
function handleAIChat() {
  const input = document.getElementById("aiChatInput");
  const query = input.value.trim();
  if (!query) return;

  addChatMessage(query, "user");
  input.value = "";
  input.disabled = true;

  // Simulate thinking
  addChatMessage("Thinking...", "ai", true);
  setTimeout(() => {
    const response = getAIResponse(query);
    addChatMessage(response, "ai");
    input.disabled = false;
    input.focus();
  }, 800);
}

function addChatMessage(message, sender, isTyping = false) {
  const messagesContainer = document.getElementById("aiChatMessages");

  if (isTyping) {
    const typingDiv = document.createElement("div");
    typingDiv.className = "flex justify-start mb-2 typing-indicator";
    typingDiv.innerHTML = `<div class="p-3 rounded-lg bg-slate-200 dark:bg-slate-700 w-fit max-w-md"><p class="text-sm"><i>${message}</i></p></div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return;
  }

  // Remove previous typing indicator
  const typingIndicator = messagesContainer.querySelector(".typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }

  const messageDiv = document.createElement("div");
  const textDiv = document.createElement("div");
  textDiv.innerHTML = `<p class="text-sm">${message}</p>`;

  if (sender === "user") {
    messageDiv.className = "flex justify-end mb-2";
    textDiv.className = "p-3 rounded-lg bg-blue-500 text-white w-fit max-w-md";
  } else {
    messageDiv.className = "flex justify-start mb-2";
    textDiv.className =
      "p-3 rounded-lg bg-slate-200 dark:bg-slate-700 w-fit max-w-md";
  }

  messageDiv.appendChild(textDiv);
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(query) {
  const q = query.toLowerCase();
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  // Keywords
  const isProfit = q.includes("ربح") || q.includes("profit");
  const isRevenue =
    q.includes("إيراد") || q.includes("revenue") || q.includes("دخل");
  const isToday = q.includes("اليوم") || q.includes("today");
  const isThisMonth = q.includes("الشهر") || q.includes("month");
  const isTop =
    q.includes("أفضل") ||
    q.includes("اعلى") ||
    q.includes("top") ||
    q.includes("best") ||
    q.includes("most");
  const isService = q.includes("خدمة") || q.includes("service");
  const isCustomer =
    q.includes("عميل") || q.includes("زبون") || q.includes("customer");
  const isDebt =
    q.includes("دين") ||
    q.includes("ديون") ||
    q.includes("debt") ||
    q.includes("unpaid");

  // --- Analysis ---

  // Top profitable service
  if (isTop && isService && isProfit) {
    const serviceProfits = salesData.reduce((acc, sale) => {
      acc[sale.serviceType] = (acc[sale.serviceType] || 0) + sale.profit;
      return acc;
    }, {});
    if (Object.keys(serviceProfits).length === 0)
      return "No sales data available.";
    const topService = Object.keys(serviceProfits).reduce((a, b) =>
      serviceProfits[a] > serviceProfits[b] ? a : b
    );
    return `The most profitable service overall is: <strong>${topService}</strong> with a total profit of ${formatCurrency(
      serviceProfits[topService]
    )}.`;
  }

  // Top customer
  if (isTop && isCustomer) {
    const customerSpending = Object.values(customersData).sort(
      (a, b) => (b.totalSpent || 0) - (a.totalSpent || 0)
    );
    if (customerSpending.length === 0) return "No customer data available.";
    const topCustomer = customerSpending[0];
    return `The best customer is <strong>${
      topCustomer.name
    }</strong>, with a total spending of ${formatCurrency(
      topCustomer.totalSpent
    )}.`;
  }

  // Total debt
  if (isDebt) {
    const totalDebt = salesData
      .filter((s) => s.paymentStatus === "unpaid")
      .reduce((sum, s) => sum + s.price, 0);
    return `The total outstanding debt from all customers is ${formatCurrency(
      totalDebt
    )}.`;
  }

  // Today's numbers
  if (isToday) {
    const todaySales = salesData.filter((s) => s.date === todayStr);
    const revenue = todaySales.reduce((sum, s) => sum + s.price, 0);
    const profit = todaySales.reduce((sum, s) => sum + s.profit, 0);
    if (isProfit) return `Today's net profit is ${formatCurrency(profit)}.`;
    if (isRevenue)
      return `Today's total revenue is ${formatCurrency(revenue)}.`;
    return `For today: Total Revenue is ${formatCurrency(
      revenue
    )} and Net Profit is ${formatCurrency(profit)}.`;
  }

  // Monthly numbers
  if (isThisMonth) {
    const thisMonthStr = todayStr.substring(0, 7);
    const monthSales = salesData.filter(
      (s) => s.date.substring(0, 7) === thisMonthStr
    );
    const revenue = monthSales.reduce((sum, s) => sum + s.price, 0);
    const profit = monthSales.reduce((sum, s) => sum + s.profit, 0);
    if (isProfit)
      return `This month's net profit so far is ${formatCurrency(profit)}.`;
    if (isRevenue)
      return `This month's total revenue so far is ${formatCurrency(revenue)}.`;
    return `For this month so far: Total Revenue is ${formatCurrency(
      revenue
    )} and Net Profit is ${formatCurrency(profit)}.`;
  }

  // Default response
  return translations[currentLanguage].ai_response_not_found;
}

// --- UTILITY & HELPER FUNCTIONS ---
function formatCurrency(value) {
  return `${(value || 0).toFixed(2)} ${translations[currentLanguage].currency}`;
}

function formatDate(dateString) {
  if (!dateString || dateString.startsWith("1970")) return "N/A";
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  ).toLocaleDateString(currentLanguage === "ar" ? "ar-EG" : "en-US", options);
}

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");
  notificationMessage.textContent = message;
  notification.classList.remove(
    "bg-green-100",
    "text-green-800",
    "bg-red-100",
    "text-red-800",
    "dark:bg-green-900",
    "dark:text-green-200",
    "dark:bg-red-900",
    "dark:text-red-200"
  );
  const color = type === "error" ? "red" : "green";
  notification.classList.add(
    `bg-${color}-100`,
    `text-${color}-800`,
    `dark:bg-${color}-900`,
    `dark:text-${color}-200`
  );
  notification.classList.remove("-translate-x-full");
  setTimeout(() => {
    notification.classList.add("-translate-x-full");
  }, 3000);
}

function toggleDarkMode(event) {
  const isChecked = event
    ? event.target.checked
    : !document.documentElement.classList.contains("dark");

  // Add smooth transition class to body
  document.body.classList.add("dark-mode-transitioning");

  // Apply dark mode change with smooth transition
  setTimeout(() => {
    document.documentElement.classList.toggle("dark", isChecked);
    localStorage.setItem("darkMode", isChecked ? "enabled" : "disabled");

    // Update all toggle states with animation
    document.querySelectorAll('[id^="darkmode-toggle"]').forEach((toggle) => {
      toggle.checked = isChecked;

      // Add a subtle animation to the toggle
      const label = toggle.nextElementSibling;
      if (label) {
        label.style.transform = "scale(1.1)";
        setTimeout(() => {
          label.style.transform = "scale(1)";
        }, 200);
      }
    });

    // Update charts with new theme
    updateCharts();

    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove("dark-mode-transitioning");
    }, 500);
  }, 50);
}

function toggleLanguage() {
  // Add switching animation class
  const languageButtons = document.querySelectorAll(".language-switch");
  languageButtons.forEach((btn) => {
    btn.classList.add("switching");

    // Remove animation class after animation completes
    setTimeout(() => {
      btn.classList.remove("switching");
    }, 500);
  });

  // Add page transition effect
  document.body.classList.add("language-transitioning");

  // Change language after a brief delay for smooth transition
  setTimeout(() => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    localStorage.setItem("language", currentLanguage);
    updateAllViews();

    // Remove transition class
    setTimeout(() => {
      document.body.classList.remove("language-transitioning");
    }, 100);
  }, 150);
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // يمر على كل العناصر التي تحتاج لترجمة
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.dataset.translate;
    if (translations[lang]?.[key]) {
      // هذا هو السطر الموحد الذي يعالج كل الحالات الآن
      el.textContent = translations[lang][key];
    }
  });

  // يقوم بتحديث رمز العملة في كل مكان
  document.querySelectorAll(".currency-symbol").forEach((el) => {
    el.textContent = translations[lang].currency;
  });

  // يقوم بتحديث النصوص المؤقتة (placeholders) في حقول الإدخال
  document.getElementById("aiChatInput").placeholder =
    translations[lang].ai_input_placeholder;
  document.getElementById("profitGoalInput").placeholder =
    translations[lang].profit_goal_placeholder;
}
function setDailyGoal() {
  const newGoal = prompt(
    translations[currentLanguage].enter_daily_goal,
    dailyGoal
  );
  if (newGoal && !isNaN(newGoal) && parseFloat(newGoal) > 0) {
    dailyGoal = parseFloat(newGoal);
    localStorage.setItem("dailyGoal", dailyGoal);
    showNotification(translations[currentLanguage].goal_updated, "success");
    updateDashboard();
  }
}

function exportData(data, filename) {
  if (!data || data.length === 0) {
    showNotification("No data to export.", "error");
    return;
  }
  const headers = Object.keys(data[0]);
  let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";

  data.forEach((item) => {
    const row = headers
      .map((header) => {
        let value = item[header];
        if (typeof value === "string" && value.includes(",")) {
          return `"${value}"`;
        }
        if (Array.isArray(value)) {
          return `"${value.join(";")}"`; // Handle arrays
        }
        return value;
      })
      .join(",");
    csvContent += row + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- ANIMATIONS INITIALIZATION ---
function initializeAnimations() {
  // Add stagger animation to dashboard cards
  const dashboardCards = document.querySelectorAll("#dashboard .stat-card");
  dashboardCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add("animate-fade-in-up");
  });

  // Add ripple effect to buttons
  document.querySelectorAll("button:not(.no-ripple)").forEach((button) => {
    button.classList.add("btn-ripple");
  });

  // Add hover animations to interactive elements
  document
    .querySelectorAll(".interactive-hover, .stat-card")
    .forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px) scale(1.02)";
      });

      element.addEventListener("mouseleave", function () {
        this.style.transform = "";
      });
    });

  // Add smooth transitions to all tab content
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.transition =
      "opacity 0.3s ease-smooth, transform 0.3s ease-smooth";
    tab.style.transform = "translateY(10px)";
  });

  // Show the active tab with animation
  const activeTab = document.querySelector(".tab-content:not(.hidden)");
  if (activeTab) {
    setTimeout(() => {
      activeTab.style.opacity = "1";
      activeTab.style.transform = "translateY(0)";
    }, 100);
  }
}

// --- CHARTS ---
let serviceTypeChart, salesTrendChart;
function initializeCharts() {
  Chart.defaults.font.family = "'Cairo', sans-serif";
  const serviceTypeCtx = document
    .getElementById("serviceTypeChart")
    .getContext("2d");
  serviceTypeChart = new Chart(serviceTypeCtx, {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#4A90E2",
            "#7ED321",
            "#F5A623",
            "#9013FE",
            "#BD10E0",
            "#4A4A4A",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top" } },
    },
  });

  const salesTrendCtx = document
    .getElementById("salesTrendChart")
    .getContext("2d");
  salesTrendChart = new Chart(salesTrendCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "Revenue", data: [], borderColor: "#4A90E2", tension: 0.1 },
        { label: "Profit", data: [], borderColor: "#7ED321", tension: 0.1 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
    },
  });
}

function updateCharts() {
  if (!serviceTypeChart || !salesTrendChart || !salesData) return;
  const isDarkMode = document.documentElement.classList.contains("dark");
  const textColor = isDarkMode ? "#f3f4f6" : "#374151";

  // Service Type Chart
  const serviceCounts = salesData.reduce((acc, sale) => {
    acc[sale.serviceType] = (acc[sale.serviceType] || 0) + sale.price;
    return acc;
  }, {});
  serviceTypeChart.data.labels = Object.keys(serviceCounts);
  serviceTypeChart.data.datasets[0].data = Object.values(serviceCounts);
  serviceTypeChart.options.plugins.legend.labels.color = textColor;
  serviceTypeChart.update();

  // Monthly Sales Trend Chart
  const monthlyData = {};
  salesData.forEach((sale) => {
    const month = sale.date.substring(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { revenue: 0, profit: 0 };
    }
    monthlyData[month].revenue += sale.price;
    monthlyData[month].profit += sale.profit;
  });
  const sortedMonths = Object.keys(monthlyData).sort();
  salesTrendChart.data.labels = sortedMonths.map((m) => {
    const [year, month] = m.split("-");
    return new Date(year, month - 1).toLocaleString(
      currentLanguage === "ar" ? "ar-EG" : "en-US",
      { month: "short", year: "numeric" }
    );
  });
  salesTrendChart.data.datasets[0].data = sortedMonths.map(
    (m) => monthlyData[m].revenue
  );
  salesTrendChart.data.datasets[0].label =
    translations[currentLanguage].revenue;
  salesTrendChart.data.datasets[1].data = sortedMonths.map(
    (m) => monthlyData[m].profit
  );
  salesTrendChart.data.datasets[1].label = translations[currentLanguage].profit;

  salesTrendChart.options.plugins.legend.labels.color = textColor;
  salesTrendChart.options.scales.x.ticks.color = textColor;
  salesTrendChart.options.scales.y.ticks.color = textColor;
  salesTrendChart.update();
}
