// Firebase exports and UI will be accessed from global scope

// --- Global Variables ---
let salesData = [];
let customersData = {};
let servicesData = [];
// window.currentLanguage is declared in ui.js
let dailyGoal = 5000;
let currentSalesPage = 1;
let currentCustomerPage = 1;
const rowsPerPage = 10;
let customerSearchTerm = '';
let filteredSales = null;
let filteredCustomers = null;
let isNavigatingProgrammatically = false;
let reminders = JSON.parse(localStorage.getItem('reminders') || '{}');
let recentActivities = [];
let notifications = [];
let selectedCatalogItems = [];
let discountMode = false;
let discountPercentage = 0;

// --- Utility Functions ---
function toEgyptIntl(phone) {
    if (!phone) return '';
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('20')) return cleaned;
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    return '20' + cleaned;
}

// --- TRANSLATION DATA ---
window.translations = {
    en: {
        app_title: "Abqar Store",
        dashboard: "Dashboard",
        sales_log: "Sales & Log",
        customers: "Customers",
        debt_management: "Debt Management",
        reports: "Reports & Tools",
        services: "Services",
        catalog: "Catalog",
        export: "Export",
        revenue: "Revenue",
        top_selling_service: "Top Selling Service",
        profit_by_date: "Profit by Date",
        total_debt: "Total Debt",
        daily_goal: "Daily Goal",
        daily_goal_sentence: "% of profit goal",
        profit_margin: "Profit Margin",
        sales_by_service_type: "Sales by Service Type",
        monthly_sales_trend: "Monthly Sales Trend",
        service_profitability: "Service Profitability",
        service: "Service",
        orders: "Orders",
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
        delete_sale_message: "Are you sure you want to delete this sale? This action cannot be undone.",
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
        new_customers: "New Customers (Month)",
        inactive_customers_placeholder: "Inactive customer numbers appear here...",
        copy: "Copy",
        copied: "Copied!",
        top_client_month: "Top Client This Month",
        type_returning: "Returning",
        type_new: "New",
        type_inactive: "Inactive",
        type_imported: "Imported",
        inactive_tooltip: "Customer inactive – consider follow-up.",
        search: "Search",
        total_profit: "Total Profit",
        avg_profit_order: "Avg Profit/Order",
        next: "Next",
        previous: "Previous",
        reminders: "Reminders",
        audit_log: "Audit Log",
        pdf_reports: "PDF Reports",
        sales_pdf: "Sales PDF",
        customers_pdf: "Customers PDF",
        most_profitable_client: "Most Profitable Client",
        vip: "VIP",
        alert_inactive: "Inactive clients: {count}",
        alert_sales_drop: "Sales dropped compared to yesterday",
        alert_target_not_met: "Daily target not met",
        goal_simulator: "Financial Goal Simulator",
        profit_goal_placeholder: "Enter profit goal",
        calculate: "Calculate",
        goal_sim_intro_1: "To reach a profit goal of",
        goal_sim_intro_2: "you need to sell:",
        goal_sim_orders_of: "orders of",
        basket_analysis: "Basket Analysis",
        analyze: "Analyze",
        loading_data: "Loading Data...",
        firebase_error: "Connection to database failed. Please check your Firebase configuration and internet connection.",
        customer_data_management: "Customer Data Management",
        import_helper_text: "Export your contacts from Google as a Google CSV, then upload the file here.",
        import: "Import",
        delete_imported: "Delete Imported",
        targeted_marketing_tool: "Targeted Marketing Tool",
        select_a_tag: "Select a tag to filter...",
        copy_numbers: "Copy Numbers",
        loyalty_points: "Loyalty Points",
        service_management: "Service Management",
        service_name: "Service Name",
        categories: "Categories",
        add_category: "Add Category",
        category_name: "Category Name",
        add_item: "Add Item",
        item_name: "Item Name",
        item_price: "Item Price",
        save_service: "Save Service",
        cancel_edit: "Cancel Edit",
        existing_services: "Existing Services",
        no_services_found: "No services found",
        service_saved: "Service saved successfully!",
        service_updated: "Service updated successfully!",
        service_deleted: "Service deleted successfully!",
        service_catalog: "Service Catalog",
        select_a_service: "Select a Service",
        search_services: "Search services...",
        discount_mode: "Discount Mode",
        items_selected: "{count} items selected",
        copy_selected: "Copy Selected",
        send_whatsapp: "Send via WhatsApp",
        no_recent_activity: "No recent activity.",
        no_data_available: "No data available.",
        redeem: "Redeem",
        cash_back: "Cash Back",
        redeem_points_modal_title: "Redeem Loyalty Points",
        current_balance: "Current Balance",
        points_to_redeem: "Points to Redeem",
        discount_value: "Discount Value",
        apply_discount: "Apply Discount",
        add_customer: "Add Customer",
        bronze: "Bronze",
        silver: "Silver",
        gold: "Gold"
    },
    ar: {
        app_title: "متجر عبقر",
        dashboard: "لوحة التحكم",
        sales_log: "المبيعات والسجل",
        customers: "العملاء",
        debt_management: "إدارة الديون",
        reports: "تقارير وأدوات",
        services: "الخدمات",
        catalog: "الكتالوج",
        export: "تصدير",
        revenue: "الإيرادات",
        top_selling_service: "الخدمة الأكثر مبيعاً",
        profit_by_date: "أرباح حسب اليوم",
        total_debt: "إجمالي الديون",
        daily_goal: "الهدف اليومي",
        daily_goal_sentence: "% من هدف الربح",
        profit_margin: "هامش الربح",
        sales_by_service_type: "المبيعات حسب نوع الخدمة",
        monthly_sales_trend: "اتجاه المبيعات الشهري",
        service_profitability: "ربحية الخدمة",
        service: "الخدمة",
        orders: "الطلبات",
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
        delete_sale_message: "هل أنت متأكد أنك تريد حذف هذا البيع؟ لا يمكن التراجع عن هذا الإجراء.",
        currency: "ج.م",
        edit: "تعديل",
        delete: "حذف",
        details: "تفاصيل",
        mark_as_paid: "تحديد كمدفوع",
        filter: "فلترة",
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
        new_customers: "العملاء الجدد (هذا الشهر)",
        inactive_customers_placeholder: "أرقام العملاء غير النشطين ستظهر هنا...",
        copy: "نسخ",
        copied: "تم النسخ!",
        top_client_month: "أعلى عميل هذا الشهر",
        type_returning: "عائد",
        type_new: "جديد",
        type_inactive: "غير نشط",
        type_imported: "مستورد",
        inactive_tooltip: "عميل غير نشط - يُفضل المتابعة",
        search: "بحث",
        total_profit: "إجمالي الربح",
        avg_profit_order: "متوسط الربح/طلب",
        next: "التالي",
        previous: "السابق",
        reminders: "تذكيرات",
        audit_log: "سجل التدقيق",
        pdf_reports: "تقارير PDF",
        sales_pdf: "تقرير المبيعات PDF",
        customers_pdf: "تقرير العملاء PDF",
        most_profitable_client: "العميل الأكثر ربحاً",
        vip: "عميل مميز",
        alert_inactive: "عملاء غير نشطين: {count}",
        alert_sales_drop: "انخفاض المبيعات عن الأمس",
        alert_target_not_met: "لم يتم تحقيق الهدف اليومي",
        goal_simulator: "محاكي الهدف المالي",
        profit_goal_placeholder: "أدخل هدف الربح",
        calculate: "احسب",
        goal_sim_intro_1: "للوصول إلى هدف ربح قدره",
        goal_sim_intro_2: "تحتاج لبيع:",
        goal_sim_orders_of: "طلبات من",
        basket_analysis: "تحليل السلة",
        analyze: "تحليل",
        loading_data: "جاري تحميل البيانات...",
        firebase_error: "فشل الاتصال بقاعدة البيانات. يرجى التحقق من إعدادات Firebase واتصالك بالإنترنت.",
        customer_data_management: "إدارة بيانات العملاء",
        import_helper_text: "قم بتصدير جهات الاتصال من جوجل بصيغة Google CSV، ثم قم برفع الملف هنا.",
        import: "استيراد",
        delete_imported: "حذف المستوردين",
        targeted_marketing_tool: "أداة التسويق الموجهة",
        select_a_tag: "اختر علامة للفلترة...",
        copy_numbers: "نسخ الأرقام",
        loyalty_points: "نقاط الولاء",
        service_management: "إدارة الخدمات",
        service_name: "اسم الخدمة",
        categories: "الفئات",
        add_category: "إضافة فئة",
        category_name: "اسم الفئة",
        add_item: "إضافة عنصر",
        item_name: "اسم العنصر",
        item_price: "سعر العنصر",
        save_service: "حفظ الخدمة",
        cancel_edit: "إلغاء التعديل",
        existing_services: "الخدمات الموجودة",
        no_services_found: "لم يتم العثور على خدمات",
        service_saved: "تم حفظ الخدمة بنجاح!",
        service_updated: "تم تحديث الخدمة بنجاح!",
        service_deleted: "تم حذف الخدمة بنجاح!",
        service_catalog: "كتالوج الخدمات",
        select_a_service: "اختر خدمة",
        search_services: "ابحث عن خدمات...",
        discount_mode: "وضع الخصم",
        items_selected: "{count} عنصر محدد",
        copy_selected: "نسخ المحدد",
        send_whatsapp: "إرسال عبر واتساب",
        no_recent_activity: "لا يوجد نشاط حديث.",
        no_data_available: "لا توجد بيانات متاحة.",
        redeem: "استبدال",
        cash_back: "استرداد نقدي",
        redeem_points_modal_title: "استبدال نقاط الولاء",
        current_balance: "الرصيد الحالي",
        points_to_redeem: "النقاط المراد استبدالها",
        discount_value: "قيمة الخصم",
        apply_discount: "تطبيق الخصم",
        add_customer: "إضافة عميل",
        bronze: "برونزي",
        silver: "فضي",
        gold: "ذهبي"
    }
};

// Placeholder for Amiri font (you need to add the actual base64-encoded font)
const amiriFont = ""; // Add your base64 encoded Amiri font here

// Wait for all dependencies to load
function initializeApp() {
    if (!window.firebaseExports || !window.UI || !window.auditLogExports) {
        setTimeout(initializeApp, 100);
        return;
    }

    // Firebase exports and UI are now available from global scope

    document.addEventListener("DOMContentLoaded", () => {
        try {
            window.UI.initializeCharts();
            window.UI.setTranslations(window.translations);

            const storedTheme = localStorage.getItem("darkMode");
            const shouldBeDarkMode = storedTheme === "enabled" || (!storedTheme && new Date().getHours() >= 20);

            document.querySelectorAll('[id^="darkmode-toggle"]').forEach(toggle => {
                toggle.checked = shouldBeDarkMode;
            });

            if (shouldBeDarkMode) {
                document.documentElement.classList.add("dark");
                document.body.classList.remove("light-mode");
            } else {
                document.documentElement.classList.remove("dark");
                document.body.classList.add("light-mode");
            }

            window.currentLanguage = localStorage.getItem("language") || "ar";
            dailyGoal = parseFloat(localStorage.getItem("dailyGoal")) || 5000;
            window.UI.setCurrentLanguage(window.currentLanguage);
            window.UI.setLanguage(window.currentLanguage);

            const dateInput = document.getElementById("date");
            if (dateInput) {
                dateInput.valueAsDate = new Date();
            }

            setupEventListeners();
            checkRemindersOnLoad();

            window.firebaseExports.onAuthStateChanged(window.firebaseExports.auth, (user) => {
                if (user) {
                    loadDataAndSetupRealtimeListener();
                    window.auditLogExports.listenToAuditLogs((logs) => {
                        recentActivities = logs;
                        window.UI.updateActivityList(logs);
                    });
                } else {
                    window.firebaseExports.signInAnonymously(window.firebaseExports.auth).catch((error) => window.UI.handleLoadingErrorUI(error));
                }
            });
        } catch (error) {
            window.UI.handleLoadingErrorUI(error);
        }
    });

    function loadDataAndSetupRealtimeListener() {
        window.firebaseExports.onSnapshot(window.firebaseExports.salesCollection, (snapshot) => {
            const tempSales = [];
            snapshot.forEach(docSnap => tempSales.push({ id: docSnap.id, ...docSnap.data() }));
            salesData = tempSales.sort((a, b) => new Date(b.date) - new Date(a.date));
            updateAllViews();
        }, (error) => window.UI.handleLoadingErrorUI(error));

        window.firebaseExports.onSnapshot(window.firebaseExports.customersCollection, (custSnapshot) => {
            const tempCustomers = {};
            custSnapshot.forEach(docSnap => {
                tempCustomers[docSnap.id] = { id: docSnap.id, ...docSnap.data() };
            });
            customersData = tempCustomers;
            updateAllViews();
            window.UI.hideLoadingOverlay();
        }, (error) => window.UI.handleLoadingErrorUI(error));

        window.firebaseExports.onSnapshot(window.firebaseExports.servicesCollection, (serviceSnapshot) => {
            servicesData = serviceSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
            window.UI.populateServiceDropdown(servicesData);
            window.UI.renderServicesTable(servicesData, editService, deleteService);
            window.UI.renderCatalogServiceList(servicesData, displayServiceInCatalog);
            updateAllViews();
        }, (error) => window.UI.handleLoadingErrorUI(error));
    }

    function updateAllViews() {
        updateCustomerAggregates();
        updateSalesTable();
        updateCustomerTable();

        const allTags = new Set();
        Object.values(customersData).forEach(customer => {
            if (customer.tags) {
                customer.tags.forEach(tag => allTags.add(tag));
            }
        });
        window.UI.populateTagFilterDropdown(Array.from(allTags));
        window.UI.renderDebtManagement(salesData, markAsPaid);
        window.UI.updateDashboardUI(salesData, dailyGoal);
        window.UI.updateKpiCards(salesData, customersData);
        window.UI.renderActivityFeed(salesData);
        window.UI.updateCharts(salesData);
        checkNotifications();
        window.UI.setLanguage(window.currentLanguage);
    }

    async function handleSaveSale(e) {
        e.preventDefault();
        const form = document.getElementById("salesForm");
        const formData = new FormData(form);
        const editingId = formData.get("editingSaleId");

        const newSaleData = {
            date: formData.get("date"),
            serviceType: formData.get("serviceType"),
            price: parseFloat(formData.get("price")) || 0,
            serviceCost: parseFloat(formData.get("serviceCost")) || 0,
            clientName: formData.get("clientName") || "N/A",
            whatsappNumber: window.UI.formatEgyptianPhoneNumber(formData.get("whatsappNumber")),
            paymentStatus: formData.get("paymentStatus"),
            notes: formData.get("notes") || "",
        };
        newSaleData.profit = newSaleData.price - newSaleData.serviceCost;

        if (!newSaleData.date || !newSaleData.serviceType) {
            window.UI.showNotification("Please fill all required fields", "error");
            return;
        }

        try {
            let priceDifference = 0;
            let oldWhatsappNumber = null;

            if (editingId) {
                const oldSaleDoc = await window.firebaseExports.getDoc(window.firebaseExports.doc(window.firebaseExports.db, "sales", editingId));
                if (oldSaleDoc.exists()) {
                    const oldSaleData = oldSaleDoc.data();
                    const oldPrice = oldSaleData.price || 0;
                    oldWhatsappNumber = oldSaleData.whatsappNumber;
                    priceDifference = newSaleData.price - oldPrice;
                }
                await window.firebaseExports.updateDoc(window.firebaseExports.doc(window.firebaseExports.db, "sales", editingId), newSaleData);
                window.UI.showNotification("Sale updated successfully!", "success");
                addActivity(`Sale updated for ${newSaleData.clientName}`, { amount: newSaleData.price, client: newSaleData.clientName });
            } else {
                await window.firebaseExports.addDoc(window.firebaseExports.salesCollection, newSaleData);
                window.UI.showNotification("Sale saved successfully!", "success");
                addActivity(`Sale added for ${newSaleData.clientName}`, { amount: newSaleData.price, client: newSaleData.clientName });
            }

            if (newSaleData.whatsappNumber) {
                const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", newSaleData.whatsappNumber);
                const customerSnap = await window.firebaseExports.getDoc(customerRef);

                let pointMultiplier = 1;
                let currentCustomerTier = "Bronze";

                if (customerSnap.exists()) {
                    const customerData = customerSnap.data();
                    currentCustomerTier = customerData.tier || "Bronze";
                    const isExcluded = (customerData.tags || []).includes('تاجر') || (customerData.tags || []).includes('يوتيوبر');

                    if (!isExcluded && !(window.tempRedeemedPoints > 0)) {
                        if (currentCustomerTier === "Silver") {
                            pointMultiplier = 1.15;
                        } else if (currentCustomerTier === "Gold") {
                            pointMultiplier = 1.25;
                        }

                        let pointsToAdd = Math.floor(newSaleData.price * pointMultiplier);

                        if (editingId) {
                            const oldSaleDoc = await window.firebaseExports.getDoc(window.firebaseExports.doc(window.firebaseExports.db, "sales", editingId));
                            const oldSaleData = oldSaleDoc.data();
                            const oldPrice = oldSaleData.price || 0;
                            const oldPointsEarned = Math.floor(oldPrice * pointMultiplier);
                            pointsToAdd = Math.floor(newSaleData.price * pointMultiplier) - oldPointsEarned;
                        }

                        await window.firebaseExports.updateDoc(customerRef, {
                            loyaltyPoints: (customerData.loyaltyPoints || 0) + pointsToAdd
                        });
                    }
                } else {
                    const pointsToAdd = (window.tempRedeemedPoints > 0) ? 0 : Math.floor(newSaleData.price * pointMultiplier);
                    await window.firebaseExports.setDoc(customerRef, {
                        name: newSaleData.clientName,
                        whatsappNumber: newSaleData.whatsappNumber,
                        tags: [],
                        notes: [],
                        loyaltyPoints: 250 + pointsToAdd,
                        tier: "Bronze"
                    });
                }
            }

            if (editingId && oldWhatsappNumber && oldWhatsappNumber !== newSaleData.whatsappNumber) {
                const oldSalePrice = newSaleData.price - priceDifference;
                const oldCustomerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", oldWhatsappNumber);
                const oldCustomerSnap = await window.firebaseExports.getDoc(oldCustomerRef);
                if (oldCustomerSnap.exists()) {
                    const oldCustomerData = oldCustomerSnap.data();
                    let oldCustomerPointMultiplier = 1;
                    if (oldCustomerData.tier === "Silver") oldCustomerPointMultiplier = 1.15;
                    else if (oldCustomerData.tier === "Gold") oldCustomerPointMultiplier = 1.25;

                    await window.firebaseExports.updateDoc(oldCustomerRef, {
                        loyaltyPoints: (oldCustomerData.loyaltyPoints || 0) - Math.floor(oldSalePrice * oldCustomerPointMultiplier)
                    });
                }
            }

            if (window.tempDiscountAmount && window.tempRedeemedPoints) {
                const whatsappNumber = newSaleData.whatsappNumber;
                if (whatsappNumber) {
                    const customerRef = window.firebaseExports.doc(window.firebaseExports.customersCollection, whatsappNumber);
                    const customerSnap = await window.firebaseExports.getDoc(customerRef);
                    if (customerSnap.exists()) {
                        const customer = customerSnap.data();
                        await window.firebaseExports.updateDoc(customerRef, {
                            loyaltyPoints: customer.loyaltyPoints - window.tempRedeemedPoints
                        });
                        addActivity(`Redeemed ${window.tempRedeemedPoints} points for discount`);
                    }
                }
                window.tempDiscountAmount = null;
                window.tempRedeemedPoints = null;
            }

            window.UI.resetSaleForm();
        } catch (error) {
            console.error("Error saving sale: ", error);
            window.UI.showNotification("Error saving sale.", "error");
        }
    }

    function updateCustomerAggregates() {
        Object.values(customersData).forEach(c => {
            c.totalOrders = 0;
            c.totalSpent = 0;
            c.purchaseHistory = [];
            c.lastPurchase = "1970-01-01";
        });

        salesData.forEach((sale) => {
            if (sale.whatsappNumber && customersData[sale.whatsappNumber]) {
                const customer = customersData[sale.whatsappNumber];
                customer.totalOrders++;
                customer.totalSpent += sale.price;
                customer.purchaseHistory.push(sale);
                if (new Date(sale.date) > new Date(customer.lastPurchase || "1970-01-01")) {
                    customer.lastPurchase = sale.date;
                    customer.name = sale.clientName;
                }
            }
        });

        // Tier Assignment Logic
        Object.values(customersData).forEach(async (customer) => {
            const currentTotalSpent = customer.totalSpent || 0;
            let newTier = "Bronze";

            if (currentTotalSpent >= 10000) {
                newTier = "Gold";
            } else if (currentTotalSpent >= 2000) {
                newTier = "Silver";
            } else {
                newTier = "Bronze";
            }

            if (customer.tier !== newTier && customer.whatsappNumber) {
                const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", customer.whatsappNumber);
                try {
                    await window.firebaseExports.updateDoc(customerRef, { tier: newTier });
                    addActivity(`Customer ${customer.name} tier updated to ${newTier}`);
                } catch (error) {
                    console.error(`Error updating tier for ${customer.name}:`, error);
                }
            }
        });
    }

    window.filterSalesByService = (serviceName) => {
        filteredSales = salesData.filter(sale => sale.serviceType === serviceName);
        currentSalesPage = 1;
        isNavigatingProgrammatically = true;
        document.querySelector('[data-tab="sales-entry"]').click();
        isNavigatingProgrammatically = false;
        updateSalesTable();
        window.UI.showNotification(`يتم الآن عرض مبيعات: ${serviceName}`, "info");
    };

    window.filterSalesByMonth = (monthKey) => {
        if (!monthKey) return;
        filteredSales = salesData.filter(sale => sale.date.startsWith(monthKey));
        currentSalesPage = 1;
        isNavigatingProgrammatically = true;
        document.querySelector('[data-tab="sales-entry"]').click();
        isNavigatingProgrammatically = false;
        updateSalesTable();
        window.UI.showNotification(`يتم الآن عرض مبيعات شهر: ${monthKey}`, "info");
    };

    window.filterNewCustomers = () => {
        const now = new Date();
        const thisMonthStr = now.toISOString().substring(0, 7);
        const newCustomerNumbers = new Set();
        const salesByCustomer = {};

        salesData.forEach(sale => {
            if (sale.whatsappNumber) {
                if (!salesByCustomer[sale.whatsappNumber]) {
                    salesByCustomer[sale.whatsappNumber] = [];
                }
                salesByCustomer[sale.whatsappNumber].push(sale.date);
            }
        });

        for (const number in salesByCustomer) {
            const firstSaleDate = salesByCustomer[number].sort()[0];
            if (firstSaleDate.substring(0, 7) === thisMonthStr) {
                newCustomerNumbers.add(number);
            }
        }

        filteredCustomers = Array.from(newCustomerNumbers).map(num => customersData[num]).filter(Boolean);
        currentCustomerPage = 1;
        isNavigatingProgrammatically = true;
        document.querySelector('[data-tab="customers"]').click();
        isNavigatingProgrammatically = false;
        updateCustomerTable();
        window.UI.showNotification(`يتم الآن عرض العملاء الجدد لهذا الشهر (${filteredCustomers.length} عميل)`, "info");
    };

    async function recalculateAllCustomerPoints() {
        window.UI.showNotification("بدء عملية إعادة حساب نقاط الولاء... قد تستغرق بعض الوقت.", "info");

        const customerSpending = {};
        salesData.forEach(sale => {
            if (sale.whatsappNumber) {
                customerSpending[sale.whatsappNumber] = (customerSpending[sale.whatsappNumber] || 0) + sale.price;
            }
        });

        const batch = window.firebaseExports.writeBatch(window.firebaseExports.db);
        let updatesCount = 0;

        Object.values(customersData).forEach(customer => {
            if (!customer.whatsappNumber) return;

            const isExcluded = (customer.tags || []).includes('تاجر') || (customer.tags || []).includes('يوتيوبر');
            let correctPoints = 0;

            let pointMultiplier = 1;
            if (customer.tier === "Silver") {
                pointMultiplier = 1.15;
            } else if (customer.tier === "Gold") {
                pointMultiplier = 1.25;
            }

            if (isExcluded) {
                correctPoints = 0;
            } else {
                const totalSpent = customerSpending[customer.whatsappNumber] || 0;
                correctPoints = 250 + Math.floor(totalSpent * pointMultiplier);
            }

            if (customer.loyaltyPoints !== correctPoints) {
                const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", customer.whatsappNumber);
                batch.update(customerRef, { loyaltyPoints: correctPoints });
                updatesCount++;
            }
        });

        try {
            if (updatesCount > 0) {
                await batch.commit();
                window.UI.showNotification(`اكتملت العملية! تم تحديث نقاط ${updatesCount} عميل بنجاح.`, "success");
            } else {
                window.UI.showNotification("لا توجد تغييرات، نقاط جميع العملاء محدثة بالفعل.", "info");
            }
        } catch (error) {
            console.error("Error recalculating points: ", error);
            window.UI.showNotification("حدث خطأ أثناء إعادة الحساب.", "error");
        }
    }

    function exportSalesPDF() {
        if (typeof pdfMake === 'undefined') {
            window.UI.showNotification('PDF library is not loaded yet. Please try again.', 'error');
            return;
        }

        if (amiriFont) {
            pdfMake.vfs['Amiri-Regular.ttf'] = amiriFont;
            pdfMake.fonts = {
                Amiri: {
                    normal: 'Amiri-Regular.ttf',
                    bold: 'Amiri-Regular.ttf',
                    italics: 'Amiri-Regular.ttf',
                    bolditalics: 'Amiri-Regular.ttf'
                }
            };
        }

        const headerRow = ['الربح', 'السعر', 'الخدمة', 'العميل', 'التاريخ'].map(text => ({ text, style: 'tableHeader' }));
        const data = (filteredSales || salesData);
        const bodyRows = data.map(sale => {
            return [
                { text: window.UI.formatCurrency(sale.profit), alignment: 'right' },
                { text: window.UI.formatCurrency(sale.price), alignment: 'right' },
                sale.serviceType,
                sale.clientName,
                window.UI.formatDate(sale.date)
            ];
        });

        const docDefinition = {
            content: [
                { text: 'تقرير المبيعات', style: 'header' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', '*', 'auto', 'auto'],
                        body: [headerRow, ...bodyRows]
                    }
                }
            ],
            styles: {
                header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
                tableHeader: { bold: true, fontSize: 12, color: 'black', alignment: 'center' }
            },
            defaultStyle: amiriFont ? {
                font: 'Amiri',
                alignment: 'right'
            } : {
                alignment: 'right'
            }
        };

        pdfMake.createPdf(docDefinition).download('sales_report.pdf');
    }

    function exportCustomersPDF() {
        if (typeof pdfMake === 'undefined') {
            window.UI.showNotification('PDF library is not loaded yet. Please try again.', 'error');
            return;
        }

        if (amiriFont) {
            pdfMake.vfs['Amiri-Regular.ttf'] = amiriFont;
            pdfMake.fonts = {
                Amiri: {
                    normal: 'Amiri-Regular.ttf',
                    bold: 'Amiri-Regular.ttf',
                    italics: 'Amiri-Regular.ttf',
                    bolditalics: 'Amiri-Regular.ttf'
                }
            };
        }

        const headerRow = ['إجمالي الإنفاق', 'إجمالي الطلبات', 'واتساب', 'الاسم'].map(text => ({ text, style: 'tableHeader' }));
        const bodyRows = Object.values(customersData).map(c => {
            return [
                { text: window.UI.formatCurrency(c.totalSpent), alignment: 'right' },
                c.totalOrders || 0,
                c.whatsappNumber || 'N/A',
                c.name
            ];
        });

        const docDefinition = {
            content: [
                { text: 'تقرير العملاء', style: 'header' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto', '*'],
                        body: [headerRow, ...bodyRows]
                    }
                }
            ],
            styles: {
                header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
                tableHeader: { bold: true, fontSize: 12, color: 'black', alignment: 'center' }
            },
            defaultStyle: amiriFont ? {
                font: 'Amiri',
                alignment: 'right'
            } : {
                alignment: 'right'
            }
        };

        pdfMake.createPdf(docDefinition).download('customers_report.pdf');
    }

    function setupEventListeners() {
        const settingsBtn = document.getElementById('settingsToggleBtn');
        const settingsPopover = document.getElementById('settingsPopover');
        if (settingsBtn && settingsPopover) {
            settingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                settingsPopover.classList.toggle('hidden');
            });
        }

        document.addEventListener('click', (e) => {
            if (settingsPopover && !settingsPopover.classList.contains('hidden') &&
                !settingsPopover.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsPopover.classList.add('hidden');
            }
        });

        document.querySelectorAll('[id^="darkmode-toggle"]').forEach(toggle => {
            toggle.addEventListener('change', handleDarkModeToggle);
        });

        document.querySelectorAll('[id^="languageToggle"]').forEach(toggle => {
            toggle.addEventListener('click', handleLanguageToggle);
        });

        const activityToggle = document.getElementById('activityToggle');
        if (activityToggle) {
            activityToggle.addEventListener('click', () => {
                window.UI.toggleActivityPanel(true);
                if (window.innerWidth < 640 && document.getElementById('navLinks').classList.contains('open')) {
                    toggleMobileMenu();
                }
            });
        }

        const activityToggleDesktop = document.getElementById('activityToggleDesktop');
        if (activityToggleDesktop) {
            activityToggleDesktop.addEventListener('click', () => window.UI.toggleActivityPanel(true));
        }

        const newCustomersCard = document.getElementById('newCustomers')?.parentElement.closest('.stat-card');
        if (newCustomersCard) {
            newCustomersCard.style.cursor = 'pointer';
            newCustomersCard.addEventListener('click', window.filterNewCustomers);
        }

        const totalDebtCard = document.getElementById('totalDebtCard');
        if (totalDebtCard) {
            totalDebtCard.addEventListener('click', () => {
                isNavigatingProgrammatically = true;
                document.querySelector('[data-tab="debt-management"]').click();
                isNavigatingProgrammatically = false;
            });
        }

        const totalOrdersCard = document.getElementById('totalOrdersCard');
        if (totalOrdersCard) {
            totalOrdersCard.addEventListener('click', () => {
                isNavigatingProgrammatically = true;
                document.querySelector('[data-tab="sales-entry"]').click();
                isNavigatingProgrammatically = false;
            });
        }

        document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", handleTabClick));

        const salesForm = document.getElementById("salesForm");
        if (salesForm) {
            salesForm.addEventListener("submit", handleSaveSale);
        }

        const filterSalesBtn = document.getElementById("filterSalesBtn");
        if (filterSalesBtn) {
            filterSalesBtn.addEventListener("click", handleFilterSales);
        }

        document.querySelectorAll('.sales-range-btn').forEach(button => {
            button.addEventListener('click', handleSalesRangeChange);
        });

        const customerSearch = document.getElementById('customerSearch');
        if (customerSearch) {
            customerSearch.addEventListener('input', (e) => {
                customerSearchTerm = e.target.value.toLowerCase();
                filteredCustomers = null;
                currentCustomerPage = 1;
                updateCustomerTable();
            });
        }

        const recalculatePointsBtn = document.getElementById('recalculatePointsBtn');
        if (recalculatePointsBtn) {
            recalculatePointsBtn.addEventListener('click', recalculateAllCustomerPoints);
        }

        const salesPdfBtn = document.getElementById('salesPdfBtn');
        if (salesPdfBtn) {
            salesPdfBtn.addEventListener('click', exportSalesPDF);
        }

        const customersPdfBtn = document.getElementById('customersPdfBtn');
        if (customersPdfBtn) {
            customersPdfBtn.addEventListener('click', exportCustomersPDF);
        }

        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        const closeActivity = document.getElementById('closeActivity');
        if (closeActivity) {
            closeActivity.addEventListener('click', () => window.UI.toggleActivityPanel(false));
        }

        const activityOverlay = document.getElementById('activityOverlay');
        if (activityOverlay) {
            activityOverlay.addEventListener('click', () => {
                if (document.getElementById('navLinks').classList.contains('open')) {
                    toggleMobileMenu();
                }
                window.UI.toggleActivityPanel(false);
            });
        }

        const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
        if (cancelDeleteBtn) {
            cancelDeleteBtn.addEventListener("click", window.UI.hideDeleteConfirmationUI);
        }

        const closeCustomerModalBtn = document.getElementById("closeCustomerModalBtn");
        if (closeCustomerModalBtn) {
            closeCustomerModalBtn.addEventListener("click", window.UI.hideCustomerDetailsUI);
        }

        const closeCustomerModalBtn2 = document.getElementById("closeCustomerModalBtn2");
        if (closeCustomerModalBtn2) {
            closeCustomerModalBtn2.addEventListener("click", window.UI.hideCustomerDetailsUI);
        }

        const generatePlReportBtn = document.getElementById('generatePlReportBtn');
        if (generatePlReportBtn) {
            generatePlReportBtn.addEventListener('click', generatePLReport);
        }

        const filterInactiveBtn = document.getElementById('filterInactiveBtn');
        if (filterInactiveBtn) {
            filterInactiveBtn.addEventListener('click', filterInactiveCustomers);
        }

        const copyNumbersBtn = document.getElementById('copyNumbersBtn');
        if (copyNumbersBtn) {
            copyNumbersBtn.addEventListener('click', copyInactiveNumbers);
        }

        const exportNumbersBtn = document.getElementById('exportNumbersBtn');
        if (exportNumbersBtn) {
            exportNumbersBtn.addEventListener("click", exportInactiveNumbers);
        }

        const simulateGoalBtn = document.getElementById('simulateGoalBtn');
        if (simulateGoalBtn) {
            simulateGoalBtn.addEventListener('click', simulateGoal);
        }

        const importCsvBtn = document.getElementById('importCsvBtn');
        if (importCsvBtn) {
            importCsvBtn.addEventListener("click", handleImportCustomers);
        }

        const deleteImportedBtn = document.getElementById("deleteImportedBtn");
        if (deleteImportedBtn) {
            deleteImportedBtn.addEventListener("click", handleDeleteImportedCustomers);
        }

        const clientName = document.getElementById('clientName');
        if (clientName) {
            clientName.addEventListener('input', handleClientNameInput);
            clientName.addEventListener('blur', () => setTimeout(() => window.UI.hideClientNameSuggestions(), 200));
        }

        const filterByTagBtn = document.getElementById('filterByTagBtn');
        if (filterByTagBtn) {
            filterByTagBtn.addEventListener('click', handleFilterByTag);
        }

        const copyFilteredNumbersBtn = document.getElementById('copyFilteredNumbersBtn');
        if (copyFilteredNumbersBtn) {
            copyFilteredNumbersBtn.addEventListener('click', handleCopyFilteredNumbers);
        }

        const serviceForm = document.getElementById('serviceForm');
        if (serviceForm) {
            serviceForm.addEventListener('submit', handleSaveService);
        }

        const cancelEditServiceBtn = document.getElementById('cancelEditServiceBtn');
        if (cancelEditServiceBtn) {
            cancelEditServiceBtn.addEventListener('click', window.UI.resetServiceForm);
        }

        const catalogSearch = document.getElementById('catalogSearch');
        if (catalogSearch) {
            catalogSearch.addEventListener('input', handleCatalogSearch);
        }

        const discountModeToggle = document.getElementById('discountModeToggle');
        if (discountModeToggle) {
            discountModeToggle.addEventListener('change', handleDiscountModeToggle);
        }

        const discountPercentage = document.getElementById('discountPercentage');
        if (discountPercentage) {
            discountPercentage.addEventListener('input', handleDiscountPercentageChange);
        }

        const copySelectionBtn = document.getElementById('copySelectionBtn');
        if (copySelectionBtn) {
            copySelectionBtn.addEventListener('click', handleCopySelection);
        }

        const sendSelectionBtn = document.getElementById('sendSelectionBtn');
        if (sendSelectionBtn) {
            sendSelectionBtn.addEventListener('click', handleSendSelection);
        }

        const closeWhatsAppModalBtn = document.getElementById('closeWhatsAppModalBtn');
        if (closeWhatsAppModalBtn) {
            closeWhatsAppModalBtn.addEventListener('click', hideWhatsAppCustomerModal);
        }

        const whatsappCustomerSearch = document.getElementById('whatsappCustomerSearch');
        if (whatsappCustomerSearch) {
            whatsappCustomerSearch.addEventListener('input', (e) => renderWhatsAppCustomerList(e.target.value));
        }

        const editGoalBtn = document.getElementById('editGoalBtn');
        if (editGoalBtn) {
            editGoalBtn.addEventListener('click', handleSetDailyGoal);
        }

        const addServiceBtn = document.getElementById('addServiceBtn');
        if (addServiceBtn) {
            addServiceBtn.addEventListener('click', () => {
                window.UI.resetServiceForm();
                window.UI.showServicePanel();
            });
        }

        const closeServiceFormBtn = document.getElementById('closeServiceFormBtn');
        if (closeServiceFormBtn) {
            closeServiceFormBtn.addEventListener('click', window.UI.hideServicePanel);
        }

        const serviceFormPanelOverlay = document.getElementById('serviceFormPanelOverlay');
        if (serviceFormPanelOverlay) {
            serviceFormPanelOverlay.addEventListener('click', window.UI.hideServicePanel);
        }

        const goalModal = document.getElementById('dailyGoalModal');
        const cancelGoalBtn = document.getElementById('cancelGoalBtn');
        if (cancelGoalBtn && goalModal) {
            cancelGoalBtn.addEventListener('click', () => { goalModal.classList.add('hidden'); });
        }

        const confirmGoalBtn = document.getElementById('confirmGoalBtn');
        if (confirmGoalBtn && goalModal) {
            confirmGoalBtn.addEventListener('click', () => {
                const input = document.getElementById('newGoalInput');
                const newGoal = input.value;
                if (newGoal && !isNaN(newGoal) && parseFloat(newGoal) > 0) {
                    dailyGoal = parseFloat(newGoal);
                    localStorage.setItem("dailyGoal", dailyGoal);
                    window.UI.showNotification(window.translations[window.currentLanguage].goal_updated, "success");
                    updateAllViews();
                    goalModal.classList.add('hidden');
                } else {
                    window.UI.showNotification("Please enter a valid number.", "error");
                }
            });
        }

        const redeemPointsBtn = document.getElementById("redeemPointsBtn");
        if (redeemPointsBtn) {
            redeemPointsBtn.addEventListener("click", () => {
                const whatsapp = document.getElementById("whatsappNumber").value.trim();
                const customer = customersData[whatsapp];
                if (customer && customer.loyaltyPoints > 0) {
                    window.UI.showRedeemPointsModal(customer, (pointsToRedeem) => {
                        const discountValue = pointsToRedeem / 40;
                        const currentPrice = parseFloat(document.getElementById("price").value) || 0;
                        window.tempDiscountAmount = discountValue;
                        window.tempRedeemedPoints = pointsToRedeem;
                        document.getElementById("price").value = (currentPrice - discountValue).toFixed(2);
                        window.UI.showNotification(`تم تطبيق خصم بقيمة ${discountValue.toFixed(2)}`, "success");
                    }, 40);
                }
            });
        }

        const addCustomerBtn = document.getElementById('addCustomerBtn');
        if (addCustomerBtn) {
            addCustomerBtn.addEventListener('click', () => {
                document.getElementById('addCustomerModal').classList.remove('hidden');
            });
        }

        const cancelAddCustomerBtn = document.getElementById('cancelAddCustomerBtn');
        if (cancelAddCustomerBtn) {
            cancelAddCustomerBtn.addEventListener('click', () => {
                document.getElementById('addCustomerModal').classList.add('hidden');
                document.getElementById('addCustomerForm').reset();
            });
        }

        const saveNewCustomerBtn = document.getElementById('saveNewCustomerBtn');
        if (saveNewCustomerBtn) {
            saveNewCustomerBtn.addEventListener('click', handleAddNewCustomer);
        }

        const cancelBonusPointsBtn = document.getElementById('cancelBonusPointsBtn');
        if (cancelBonusPointsBtn) {
            cancelBonusPointsBtn.addEventListener('click', () => {
                document.getElementById('bonusPointsModal').classList.add('hidden');
            });
        }
    }

    function handleSalesRangeChange(event) {
        const range = parseInt(event.target.dataset.range);
        const type = event.target.dataset.type;
        window.UI.updateDynamicKpi(salesData, range, type);
    }

    function toggleMobileMenu() {
        const links = document.getElementById('navLinks');
        const menuIcon = document.getElementById('mobileMenuIcon');
        const overlay = document.getElementById('activityOverlay');
        const menuToggle = document.getElementById('mobileMenuToggle');

        if (!links || !menuIcon || !overlay) return;

        // Add click animation to the toggle button
        if (menuToggle) {
            menuToggle.style.transform = 'scale(0.9) rotate(90deg)';
            setTimeout(() => {
                menuToggle.style.transform = '';
            }, 200);
        }

        const isOpen = links.classList.toggle('open');
        
        if (isOpen) {
            // Opening animation
            overlay.classList.remove('hidden');
            links.style.transform = 'translateY(-10px)';
            links.style.opacity = '0';
            
            setTimeout(() => {
                links.style.transform = 'translateY(0)';
                links.style.opacity = '1';
            }, 50);

            // Animate menu icon to X with rotation
            menuIcon.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
                menuIcon.style.transform = 'rotate(0deg)';
            }, 150);
        } else {
            // Closing animation
            links.style.transform = 'translateY(-10px)';
            links.style.opacity = '0';
            
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 200);

            // Animate menu icon back to hamburger
            menuIcon.style.transform = 'rotate(-180deg)';
            setTimeout(() => {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
                menuIcon.style.transform = 'rotate(0deg)';
            }, 150);
        }
    }

    function handleTabClick() {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        if (!isNavigatingProgrammatically) {
            filteredSales = null;
            filteredCustomers = null;
        }

        document.querySelectorAll(".tab-content").forEach(content => {
            content.classList.add("hidden");
            content.style.animation = 'none';
            void content.offsetWidth;
            content.style.animation = null;
        });

        const targetTab = document.getElementById(this.dataset.tab);
        if (targetTab) {
            targetTab.classList.remove("hidden");
        }

        if (window.innerWidth < 640 && document.getElementById('navLinks').classList.contains('open')) {
            toggleMobileMenu();
        }

        selectedCatalogItems = [];
        window.UI.updateFloatingActionBar(selectedCatalogItems.length);
        window.UI.clearCatalogCheckboxes();

        if (this.dataset.tab === 'dashboard') {
            window.UI.updateDynamicKpi(salesData, 24, 'revenue');
            window.UI.updateDynamicKpi(salesData, 24, 'profit');
        }
    }

    function updateSalesTable() {
        const data = filteredSales || salesData;
        const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
        if (currentSalesPage > totalPages) currentSalesPage = totalPages;
        const start = (currentSalesPage - 1) * rowsPerPage;
        const paged = data.slice(start, start + rowsPerPage);
        window.UI.renderSalesLog(paged, editSale, showDeleteConfirmation, {
            currentPage: currentSalesPage,
            totalPages
        }, (p) => {
            currentSalesPage = p;
            updateSalesTable();
        });
    }

    function updateCustomerTable() {
        let baseData = filteredCustomers !== null ? filteredCustomers : Object.values(customersData);

        const term = customerSearchTerm.toLowerCase();
        const arr = baseData.filter(c =>
            !term ||
            (c.name && c.name.toLowerCase().includes(term)) ||
            (c.whatsappNumber && c.whatsappNumber.includes(term))
        ).sort((a, b) => new Date(b.lastPurchase || 0) - new Date(a.lastPurchase || 0));

        const totalPages = Math.ceil(arr.length / rowsPerPage) || 1;
        if (currentCustomerPage > totalPages) currentCustomerPage = totalPages;
        const start = (currentCustomerPage - 1) * rowsPerPage;
        const paged = arr.slice(start, start + rowsPerPage);

        window.UI.renderCustomerDatabase(paged, showCustomerDetails, {
            currentPage: currentCustomerPage,
            totalPages
        }, (p) => {
            currentCustomerPage = p;
            updateCustomerTable();
        }, quickCreateOrder, showDeleteCustomerConfirmation);
    }

    function quickCreateOrder(name, number) {
        const salesTab = document.querySelector('[data-tab="sales-entry"]');
        if (salesTab) salesTab.click();

        const clientNameInput = document.getElementById('clientName');
        const whatsappInput = document.getElementById('whatsappNumber');

        if (clientNameInput) clientNameInput.value = name;
        if (whatsappInput) whatsappInput.value = number || '';
    }

    function addActivity(text, extra = {}) {
        window.auditLogExports.addAuditLog({
            action: text,
            user: auth.currentUser ? auth.currentUser.uid.slice(0, 5) : 'anon',
            ...extra
        });
    }

    function addCustomerReminder(whatsapp, date, text) {
        if (!date || !text) return;
        if (!reminders[whatsapp]) reminders[whatsapp] = [];
        reminders[whatsapp].push({ date, text, done: false });
        localStorage.setItem('reminders', JSON.stringify(reminders));
        window.UI.showNotification('Reminder added!', 'success');
        addActivity(`Reminder added for ${customersData[whatsapp]?.name || whatsapp}`);
        window.UI.renderCustomerRemindersUI(reminders[whatsapp], whatsapp, removeCustomerReminder);
    }

    function removeCustomerReminder(whatsapp, index) {
        if (!reminders[whatsapp]) return;
        reminders[whatsapp].splice(index, 1);
        if (reminders[whatsapp].length === 0) delete reminders[whatsapp];
        localStorage.setItem('reminders', JSON.stringify(reminders));
        window.UI.renderCustomerRemindersUI(reminders[whatsapp], whatsapp, removeCustomerReminder);
    }

    function checkRemindersOnLoad() {
        const today = new Date().toISOString().split('T')[0];
        Object.entries(reminders).forEach(([whatsapp, rems]) => {
            rems.forEach(rem => {
                if (rem.date <= today && !rem.done) {
                    window.UI.showNotification(`Reminder: ${rem.text} for ${customersData[whatsapp]?.name || whatsapp}`, 'warning', 10000);
                }
            });
        });
    }

    function checkNotifications() {
        notifications = [];
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const todaySales = salesData.filter(s => s.date === todayStr).reduce((sum, s) => sum + s.price, 0);
        const yesterdaySales = salesData.filter(s => s.date === yesterdayStr).reduce((sum, s) => sum + s.price, 0);

        if (yesterdaySales > 0 && todaySales < yesterdaySales) {
            notifications.push(window.translations[window.currentLanguage].alert_sales_drop);
        }

        const todayProfit = salesData.filter(s => s.date === todayStr).reduce((sum, s) => sum + s.profit, 0);
        if (todayProfit < dailyGoal) {
            notifications.push(window.translations[window.currentLanguage].alert_target_not_met);
        }

        window.UI.renderNotifications(notifications);
    }

    function editSale(saleId) {
        const sale = salesData.find((s) => s.id === saleId);
        if (!sale) return;
        window.UI.fillSaleForm(sale);
    }

    function showDeleteConfirmation(saleId) {
        window.UI.showDeleteConfirmationUI(() => deleteSale(saleId), "حذف عملية بيع", "هل أنت متأكد؟ لا يمكن التراجع عن هذا.");
    }

    async function deleteSale(saleId) {
        try {
            const sale = salesData.find(s => s.id === saleId);
            await window.firebaseExports.deleteDoc(window.firebaseExports.doc(window.firebaseExports.db, "sales", saleId));
            window.UI.showNotification("Sale deleted successfully", "success");
            if (sale) addActivity(`Sale deleted for ${sale.clientName}`);
        } catch (error) {
            console.error("Error deleting sale: ", error);
            window.UI.showNotification("Error deleting sale.", "error");
        }
    }

    async function markAsPaid(saleId) {
        try {
            await window.firebaseExports.updateDoc(window.firebaseExports.doc(window.firebaseExports.db, "sales", saleId), { paymentStatus: "paid" });
            window.UI.showNotification("Order marked as paid", "success");
            const sale = salesData.find(s => s.id === saleId);
            if (sale) {
                addActivity(`Payment received for ${sale.clientName}`, { amount: sale.price, client: sale.clientName });
            }
        } catch (error) {
            console.error("Error marking as paid: ", error);
            window.UI.showNotification("Error updating order.", "error");
        }
    }

    function handleFilterSales() {
        const startDate = document.getElementById('startDateFilter')?.value;
        const endDate = document.getElementById('endDateFilter')?.value;

        if (!startDate || !endDate) {
            filteredSales = null;
        } else {
            filteredSales = salesData.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
            });
        }
        currentSalesPage = 1;
        updateSalesTable();
    }

    async function showCustomerDetails(whatsappNumber) {
        const customer = customersData[whatsappNumber];
        if (!customer) return;

        const history = salesData.filter(s => s.whatsappNumber === whatsappNumber);
        const totalProfit = history.reduce((sum, s) => sum + s.profit, 0);
        const avgProfit = history.length ? totalProfit / history.length : 0;

        window.UI.showCustomerDetailsUI(
            customer,
            history,
            totalProfit,
            avgProfit,
            reminders[whatsappNumber] || [],
            addCustomerTag,
            removeCustomerTag,
            addCustomerNote,
            addCustomerReminder,
            removeCustomerReminder,
            () => handleCashBackRedemption(whatsappNumber),
            handleAddBonusPoints
        );
    }

    async function addCustomerTag(whatsapp, tag) {
        if (!tag.trim() || !whatsapp) return;

        const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", whatsapp);
        const customer = customersData[whatsapp];
        const updatedTags = [...new Set([...(customer.tags || []), tag.trim()])];

        try {
            await window.firebaseExports.updateDoc(customerRef, { tags: updatedTags });
            addActivity(`Tag '${tag}' added to ${customer.name}`);
        } catch (error) {
            console.error("Error adding tag:", error);
        }
    }

    async function removeCustomerTag(whatsapp, tag) {
        if (!tag || !whatsapp) return;

        const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", whatsapp);
        const customer = customersData[whatsapp];
        const updatedTags = (customer.tags || []).filter(t => t !== tag);

        try {
            await window.firebaseExports.updateDoc(customerRef, { tags: updatedTags });
            addActivity(`Tag '${tag}' removed from ${customer.name}`);
        } catch (error) {
            console.error("Error removing tag:", error);
        }
    }

    async function addCustomerNote(whatsapp, text) {
        if (!text.trim() || !whatsapp) return;

        const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", whatsapp);
        const customer = customersData[whatsapp];
        const newNote = { text: text.trim(), timestamp: Date.now() };
        const updatedNotes = [...(customer.notes || []), newNote];

        try {
            await window.firebaseExports.updateDoc(customerRef, { notes: updatedNotes });
            const newNoteInput = document.getElementById('newNoteInput');
            if (newNoteInput) newNoteInput.value = '';
            addActivity(`Note added for ${customer.name}`);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }

    function handleDarkModeToggle(event) {
        document.documentElement.classList.toggle('dark', event.target.checked);
        document.body.classList.toggle('light-mode', !event.target.checked);
        localStorage.setItem('darkMode', event.target.checked ? 'enabled' : 'disabled');
        
        // Sync all dark mode toggles
        document.querySelectorAll('[id^="darkmode-toggle"]').forEach(toggle => {
            if (toggle !== event.target) {
                toggle.checked = event.target.checked;
            }
        });
        
        updateAllViews();
    }

    function handleLanguageToggle() {
        window.currentLanguage = window.currentLanguage === "en" ? "ar" : "en";
        localStorage.setItem("language", window.currentLanguage);
        window.UI.setCurrentLanguage(window.currentLanguage);
        window.UI.setLanguage(window.currentLanguage);
        updateAllViews();
    }

    function handleSetDailyGoal() {
        const modal = document.getElementById('dailyGoalModal');
        const input = document.getElementById('newGoalInput');

        if (modal && input) {
            input.value = '';
            modal.classList.remove('hidden');
            input.focus();
            window.UI.setLanguage(window.currentLanguage);
        }
    }

    function exportData(data, filename) {
        if (!data || data.length === 0) {
            window.UI.showNotification("No data to export.", "error");
            return;
        }

        const headers = Object.keys(data[0]);
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";

        data.forEach(item => {
            const row = headers.map(header => {
                let value = item[header];
                if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
                if (Array.isArray(value)) return `"${value.join(';')}"`;
                return value;
            }).join(',');
            csvContent += row + "\r\n";
        });

        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = filename;
        link.click();
    }

    function generatePLReport() {
        const periodSelect = document.getElementById('plReportPeriod');
        if (!periodSelect) return;

        const period = periodSelect.value;
        const now = new Date();
        let startDate;

        if (period === 'monthly') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else {
            const quarter = Math.floor(now.getMonth() / 3);
            startDate = new Date(now.getFullYear(), quarter * 3, 1);
        }

        const relevantSales = salesData.filter(s => new Date(s.date) >= startDate);
        const income = relevantSales.reduce((sum, s) => sum + s.price, 0);
        const expenses = relevantSales.reduce((sum, s) => sum + s.serviceCost, 0);
        const net = income - expenses;

        window.UI.updatePLReportResult(period, income, expenses, net);
    }

    function filterInactiveCustomers() {
        const inactivityDaysInput = document.getElementById('inactivityDays');
        const days = parseInt(inactivityDaysInput?.value) || 30;
        const threshold = Date.now() - days * 24 * 60 * 60 * 1000;

        const inactive = Object.values(customersData).filter(c =>
            c.whatsappNumber && new Date(c.lastPurchase).getTime() < threshold
        );

        window.UI.updateInactiveCustomersList(inactive);
        window.UI.showNotification(`${inactive.length} inactive customers found.`, 'success');
    }

    function copyInactiveNumbers() {
        const listArea = document.getElementById('inactiveCustomersList');
        if (listArea) {
            navigator.clipboard.writeText(listArea.value).then(() =>
                window.UI.showNotification(window.translations[window.currentLanguage].copied, 'success')
            );
        }
    }

    function exportInactiveNumbers() {
        const listArea = document.getElementById('inactiveCustomersList');
        if (listArea) {
            const numbers = listArea.value.split('\n').map(n => ({ whatsappNumber: n }));
            exportData(numbers, 'inactive_customers.csv');
        }
    }

    function simulateGoal() {
        const profitGoalInput = document.getElementById('profitGoalInput');
        const goal = parseFloat(profitGoalInput?.value);

        if (!goal) return window.UI.updateGoalSimulatorResult(null);

        const serviceStats = salesData.reduce((acc, sale) => {
            if (!acc[sale.serviceType]) acc[sale.serviceType] = { profit: 0, count: 0 };
            acc[sale.serviceType].profit += sale.profit;
            acc[sale.serviceType].count++;
            return acc;
        }, {});

        window.UI.updateGoalSimulatorResult(goal, serviceStats);
    }

    async function handleImportCustomers() {
        const fileInput = document.getElementById('csvFileInput');
        if (!fileInput || fileInput.files.length === 0) {
            window.UI.showNotification("الرجاء اختيار ملف أولاً", "error");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async function (event) {
            const csvData = event.target.result;
            const lines = csvData.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());

            const nameIndex = headers.findIndex(h => h.includes("Name"));
            const phoneIndex = headers.findIndex(h => h.includes("Phone 1 - Value"));

            if (nameIndex === -1 || phoneIndex === -1) {
                window.UI.showNotification("لم يتم العثور على أعمدة الاسم أو الرقم في الملف", "error");
                return;
            }

            const allCustomers = [];
            for (let i = 1; i < lines.length; i++) {
                const data = lines[i].split(',');
                const name = data[nameIndex]?.trim();
                const phone = data[phoneIndex]?.trim().replace(/\s+/g, '');

                if (name && phone) {
                    allCustomers.push({ name, phone });
                }
            }

            const batchSize = 400;
            let importedCount = 0;

            window.UI.showNotification("بدء عملية الاستيراد... قد تستغرق هذه العملية عدة دقائق.", "info");

            for (let i = 0; i < allCustomers.length; i += batchSize) {
                const batch = allCustomers.slice(i, i + batchSize);
                const promises = batch.map(customer => {
                    const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", customer.phone);
                    return window.firebaseExports.setDoc(customerRef, {
                        name: customer.name,
                        whatsappNumber: customer.phone,
                        tags: ["مستورد"],
                        loyaltyPoints: 250,
                        notes: [],
                        tier: "Bronze"
                    }, { merge: true });
                });

                await Promise.all(promises);
                importedCount += batch.length;
                window.UI.showNotification(`جاري الاستيراد... تم حفظ ${importedCount} من ${allCustomers.length} عميل`, "info");
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            window.UI.showNotification(`اكتمل الاستيراد بنجاح! تم حفظ ${importedCount} عميل.`, "success");
            fileInput.value = '';
        };

        reader.readAsText(file);
    }

    async function handleDeleteImportedCustomers() {
        const confirmation = confirm("هل أنت متأكد أنك تريد حذف جميع العملاء الذين تم استيرادهم؟ لا يمكن التراجع عن هذا الإجراء.");
        if (!confirmation) return;

        window.UI.showNotification("بدء عملية الحذف... قد تستغرق عدة دقائق.", "info");

        try {
            const q = query(window.firebaseExports.customersCollection, where("tags", "array-contains", "مستورد"));
            const querySnapshot = await window.firebaseExports.getDocs(q);
            const customersToDelete = querySnapshot.docs;
            const totalToDelete = customersToDelete.length;
            let deletedCount = 0;

            if (totalToDelete === 0) {
                window.UI.showNotification("لا يوجد عملاء مستوردون للحذف", "info");
                return;
            }

            const batchSize = 400;
            for (let i = 0; i < totalToDelete; i += batchSize) {
                const batch = customersToDelete.slice(i, i + batchSize);
                const deleteBatch = window.firebaseExports.writeBatch(window.firebaseExports.db);
                batch.forEach(docSnapshot => deleteBatch.delete(docSnapshot.ref));
                await deleteBatch.commit();
                deletedCount += batch.length;
                window.UI.showNotification(`جاري الحذف... تم حذف ${deletedCount} من ${totalToDelete} عميل`, "info");
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            window.UI.showNotification(`اكتمل الحذف بنجاح! تم حذف ${deletedCount} عميل.`, "success");
        } catch (error) {
            console.error("Error deleting imported customers: ", error);
            window.UI.showNotification("حدث خطأ أثناء عملية الحذف.", "error");
        }
    }

    function handleClientNameInput(e) {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm.length < 2) {
            window.UI.hideClientNameSuggestions();
            window.UI.toggleRedeemButton(false);
            return;
        }

        const customersArray = Object.values(customersData);
        const suggestions = customersArray.filter(customer =>
            customer.name && customer.name.toLowerCase().includes(searchTerm)
        ).slice(0, 7);

        window.UI.renderClientNameSuggestions(suggestions, (selectedCustomer) => {
            const clientNameInput = document.getElementById('clientName');
            const whatsappInput = document.getElementById('whatsappNumber');

            if (clientNameInput) clientNameInput.value = selectedCustomer.name;
            if (whatsappInput) whatsappInput.value = selectedCustomer.whatsappNumber;

            window.UI.hideClientNameSuggestions();

            if (selectedCustomer.loyaltyPoints >= 250) {
                window.UI.toggleRedeemButton(true, selectedCustomer.loyaltyPoints);
            } else {
                window.UI.toggleRedeemButton(false);
            }
        });
    }

    function handleFilterByTag() {
        const tagFilterSelect = document.getElementById('tagFilterSelect');
        const selectedTag = tagFilterSelect?.value;

        if (!selectedTag) {
            window.UI.displayFilteredNumbers([]);
            return;
        }

        const filteredCustomers = Object.values(customersData).filter(customer =>
            customer.tags && customer.tags.includes(selectedTag)
        );

        const phoneNumbers = filteredCustomers.map(customer => customer.whatsappNumber);
        window.UI.displayFilteredNumbers(phoneNumbers);
    }

    function handleCopyFilteredNumbers() {
        const textarea = document.getElementById('filteredNumbersTextarea');
        if (textarea && textarea.value) {
            navigator.clipboard.writeText(textarea.value)
                .then(() => window.UI.showNotification(window.translations[window.currentLanguage].copied, 'success'))
                .catch(err => window.UI.showNotification('Failed to copy numbers', 'error'));
        }
    }

    async function handleSaveService(e) {
        e.preventDefault();

        const serviceNameInput = document.getElementById('serviceName');
        const editingServiceIdInput = document.getElementById('editingServiceId');

        const serviceName = serviceNameInput?.value.trim();
        const editingServiceId = editingServiceIdInput?.value;

        if (!serviceName) {
            window.UI.showNotification("Service name cannot be empty.", "error");
            return;
        }

        const categories = [];
        document.querySelectorAll('.category-group').forEach(catGroup => {
            const categoryName = catGroup.querySelector('.category-name-input')?.value.trim();
            if (!categoryName) return;

            const items = [];
            catGroup.querySelectorAll('.item-group').forEach(itemGroup => {
                const itemName = itemGroup.querySelector('.item-name-input')?.value.trim();
                const itemPrice = parseFloat(itemGroup.querySelector('.item-price-input')?.value);

                if (itemName && !isNaN(itemPrice)) {
                    items.push({ name: itemName, price: itemPrice });
                }
            });

            categories.push({ name: categoryName, items: items });
        });

        const serviceData = { name: serviceName, categories: categories };

        try {
            if (editingServiceId) {
                await window.firebaseExports.updateDoc(window.firebaseExports.doc(window.firebaseExports.db, "services", editingServiceId), serviceData);
                window.UI.showNotification(window.translations[window.currentLanguage].service_updated, "success");
                addActivity(`Service updated: ${serviceName}`);
            } else {
                await window.firebaseExports.addDoc(window.firebaseExports.servicesCollection, serviceData);
                window.UI.showNotification(window.translations[window.currentLanguage].service_saved, "success");
                addActivity(`Service added: ${serviceName}`);
            }
            window.UI.resetServiceForm();
            window.UI.hideServicePanel();
        } catch (error) {
            console.error("Error saving service:", error);
            window.UI.showNotification("Error saving service.", "error");
        }
    }

    function editService(serviceId) {
        const service = servicesData.find(s => s.id === serviceId);
        if (!service) return;
        window.UI.fillServiceForm(service);
        window.UI.showServicePanel();
    }

    async function deleteService(serviceId, serviceName) {
        if (confirm(`Are you sure you want to delete service "${serviceName}"? This action cannot be undone.`)) {
            try {
                await window.firebaseExports.deleteDoc(window.firebaseExports.doc(window.firebaseExports.db, "services", serviceId));
                window.UI.showNotification(window.translations[window.currentLanguage].service_deleted, "success");
                addActivity(`Service deleted: ${serviceName}`);
            } catch (error) {
                console.error("Error deleting service:", error);
                window.UI.showNotification("Error deleting service.", "error");
            }
        }
    }

    let currentSelectedService = null;

    function displayServiceInCatalog(serviceId) {
        currentSelectedService = servicesData.find(s => s.id === serviceId);
        if (currentSelectedService) {
            window.UI.renderCatalogContent(currentSelectedService, discountMode, discountPercentage, handleCatalogItemCheckboxChange);
        }
    }

    function handleCatalogSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredServices = servicesData.filter(service => {
            const serviceNameMatch = service.name.toLowerCase().includes(searchTerm);
            const categoryMatch = service.categories.some(cat => cat.name.toLowerCase().includes(searchTerm));
            const itemMatch = service.categories.some(cat =>
                cat.items.some(item => item.name.toLowerCase().includes(searchTerm))
            );
            return serviceNameMatch || categoryMatch || itemMatch;
        });
        window.UI.renderCatalogServiceList(filteredServices, displayServiceInCatalog);
    }

    function handleCatalogItemCheckboxChange(item, isChecked) {
        selectedCatalogItems = selectedCatalogItems.filter(selected => selected.id !== item.id);
        if (isChecked) {
            selectedCatalogItems.push(item);
        }
        window.UI.updateFloatingActionBar(selectedCatalogItems.length);
    }

    function handleDiscountModeToggle(e) {
        discountMode = e.target.checked;
        const discountInput = document.getElementById('discountPercentage');

        if (discountMode && discountInput) {
            discountInput.classList.remove('hidden');
            discountPercentage = parseFloat(discountInput.value) || 0;
        } else if (discountInput) {
            discountInput.classList.add('hidden');
            discountPercentage = 0;
        }

        if (currentSelectedService) {
            window.UI.renderCatalogContent(currentSelectedService, discountMode, discountPercentage, handleCatalogItemCheckboxChange);
        }
    }

    function handleDiscountPercentageChange(e) {
        discountPercentage = parseFloat(e.target.value) || 0;
        if (currentSelectedService) {
            window.UI.renderCatalogContent(currentSelectedService, discountMode, discountPercentage, handleCatalogItemCheckboxChange);
        }
    }

    function calculateDiscountedPrice(originalPrice) {
        if (discountMode && discountPercentage > 0) {
            return originalPrice * (1 - discountPercentage / 100);
        }
        return originalPrice;
    }

    function handleCopySelection() {
        if (selectedCatalogItems.length === 0) return;

        let summary = "";
        selectedCatalogItems.forEach(item => {
            const priceToUse = calculateDiscountedPrice(item.price);
            summary += `${item.itemName}: ${window.UI.formatCurrency(priceToUse)}\n`;
        });

        navigator.clipboard.writeText(summary.trim()).then(() =>
            window.UI.showNotification(window.translations[window.currentLanguage].copied, 'success')
        );
    }

    function handleSendSelection() {
        if (selectedCatalogItems.length === 0) return;
        showWhatsAppCustomerModal();
    }

    function showWhatsAppCustomerModal() {
        const searchInput = document.getElementById('whatsappCustomerSearch');
        if (searchInput) searchInput.value = '';

        renderWhatsAppCustomerList();

        const modal = document.getElementById('whatsappCustomerModal');
        if (modal) modal.classList.remove('hidden');
    }

    function hideWhatsAppCustomerModal() {
        const modal = document.getElementById('whatsappCustomerModal');
        if (modal) modal.classList.add('hidden');
    }

    function renderWhatsAppCustomerList(searchTerm = '') {
        const listContainer = document.getElementById('customerSelectList');
        if (!listContainer) return;

        listContainer.innerHTML = '';

        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        const customersArray = Object.values(customersData)
            .filter(c => c.whatsappNumber && (
                c.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                c.whatsappNumber.includes(lowerCaseSearchTerm)
            ))
            .sort((a, b) => a.name.localeCompare(b.name));

        if (customersArray.length === 0) {
            listContainer.innerHTML = `<p class="text-center text-gray-500 dark:text-slate-400 p-4">لم يتم العثور على عملاء.</p>`;
            return;
        }

        customersArray.forEach(customer => {
            const customerDiv = document.createElement('div');
            customerDiv.className = 'p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md cursor-pointer flex justify-between items-center transition-colors';
            customerDiv.innerHTML = `
                <div>
                    <p class="font-semibold text-gray-800 dark:text-white">${customer.name}</p>
                    <p class="text-sm text-gray-500 dark:text-slate-400">${customer.whatsappNumber}</p>
                </div>
                <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.003.004-1.22 4.409 4.524-1.193z"/>
                </svg>
            `;
            customerDiv.onclick = () => sendWhatsAppToCustomer(customer.whatsappNumber);
            listContainer.appendChild(customerDiv);
        });
    }

    function sendWhatsAppToCustomer(customerNumber) {
        let message = "مرحبًا! إليك قائمة بالمنتجات المختارة:\n\n";
        let total = 0;

        selectedCatalogItems.forEach(item => {
            const priceToUse = calculateDiscountedPrice(item.price);
            total += priceToUse;
            message += `• ${item.itemName}: ${window.UI.formatCurrency(priceToUse)}\n`;
        });

        message += `\n*الإجمالي: ${window.UI.formatCurrency(total)}*`;

        const cleanNumber = toEgyptIntl(customerNumber);
        const whatsappLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappLink, '_blank');
        hideWhatsAppCustomerModal();
    }

    async function handleCashBackRedemption(whatsappNumber) {
        const customer = customersData[whatsappNumber];
        if (!customer) return;

        window.UI.showRedeemPointsModal(customer, async (pointsToRedeem) => {
            if (pointsToRedeem > customer.loyaltyPoints) {
                window.UI.showNotification("لا يمكن استبدال نقاط أكثر من الرصيد الحالي", "error");
                return;
            }

            const customerRef = window.firebaseExports.doc(window.firebaseExports.customersCollection, whatsappNumber);
            const cashValue = (pointsToRedeem / 50) * -1;

            await window.firebaseExports.updateDoc(customerRef, {
                loyaltyPoints: customer.loyaltyPoints - pointsToRedeem
            });

            const saleData = {
                date: new Date().toISOString().split('T')[0],
                serviceType: "Cash Back Redemption",
                price: cashValue,
                serviceCost: 0,
                clientName: customer.name,
                whatsappNumber: whatsappNumber,
                paymentStatus: "paid",
                notes: `Loyalty points cash back: ${pointsToRedeem} points`,
                profit: cashValue
            };

            await window.firebaseExports.addDoc(window.firebaseExports.salesCollection, saleData);
            addActivity(`Cash back redemption: ${pointsToRedeem} points for ${Math.abs(cashValue)} cash`);
            window.UI.showNotification("Cash back redeemed successfully!", "success");
            window.UI.hideCustomerDetailsUI();
        }, 50);
    }

    function showDeleteCustomerConfirmation(customerId, customerName) {
        const message = `هل أنت متأكد أنك تريد حذف العميل '${customerName}' وجميع سجلات مبيعاته؟ لا يمكن التراجع عن هذا الإجراء.`;
        window.UI.showDeleteConfirmationUI(() => handleDeleteCustomer(customerId), "حذف العميل", message);
    }

    async function handleDeleteCustomer(customerId) {
        if (!customerId) return;

        window.UI.showNotification("جاري حذف العميل وجميع سجلاته...", "info");

        try {
            const salesQuery = query(window.firebaseExports.salesCollection, where("whatsappNumber", "==", customerId));
            const salesSnapshot = await window.firebaseExports.getDocs(salesQuery);

            const batch = window.firebaseExports.writeBatch(window.firebaseExports.db);

            salesSnapshot.forEach(saleDoc => {
                batch.delete(saleDoc.ref);
            });

            const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", customerId);
            batch.delete(customerRef);

            await batch.commit();

            addActivity(`تم حذف العميل وجميع سجلات مبيعاته: ${customerId}`);
            window.UI.showNotification("تم حذف العميل وجميع مبيعاته بنجاح!", "success");
        } catch (error) {
            console.error("Error deleting customer and their sales: ", error);
            window.UI.showNotification("حدث خطأ أثناء حذف العميل وسجلاته.", "error");
        }
    }

    async function handleAddNewCustomer() {
        const nameInput = document.getElementById('newCustomerName');
        const whatsappInput = document.getElementById('newCustomerWhatsapp');

        const name = nameInput?.value.trim();
        const whatsapp = window.UI.formatEgyptianPhoneNumber(whatsappInput?.value.trim());

        if (!name || !whatsapp || whatsapp === 'N/A') {
            window.UI.showNotification("يرجى إدخال الاسم ورقم الواتساب بشكل صحيح.", "error");
            return;
        }

        const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", whatsapp);
        const customerSnap = await window.firebaseExports.getDoc(customerRef);

        if (customerSnap.exists()) {
            window.UI.showNotification("هذا العميل موجود بالفعل.", "error");
            return;
        }

        try {
            await window.firebaseExports.setDoc(customerRef, {
                name: name,
                whatsappNumber: whatsapp,
                tags: [],
                notes: [],
                loyaltyPoints: 250,
                tier: "Bronze"
            });

            window.UI.showNotification("تم إضافة العميل بنجاح!", "success");

            const modal = document.getElementById('addCustomerModal');
            const form = document.getElementById('addCustomerForm');

            if (modal) modal.classList.add('hidden');
            if (form) form.reset();

            addActivity(`تم إضافة عميل جديد: ${name}`);
        } catch (error) {
            window.UI.showNotification("حدث خطأ أثناء إضافة العميل.", "error");
            console.error("Error adding new customer: ", error);
        }
    }

    async function handleAddBonusPoints(customerId, points, reason) {
        if (!customerId || !points) return;

        const customerRef = window.firebaseExports.doc(window.firebaseExports.db, "customers", customerId);
        const customerSnap = await window.firebaseExports.getDoc(customerRef);

        if (!customerSnap.exists()) {
            window.UI.showNotification("لم يتم العثور على العميل.", "error");
            return;
        }

        try {
            const customerData = customerSnap.data();
            const newPoints = (customerData.loyaltyPoints || 0) + points;

            const newNote = {
                text: `تمت إضافة ${points} نقطة بونص. السبب: ${reason || 'بدون سبب محدد'}.`,
                timestamp: Date.now()
            };
            const updatedNotes = [...(customerData.notes || []), newNote];

            await window.firebaseExports.updateDoc(customerRef, {
                loyaltyPoints: newPoints,
                notes: updatedNotes
            });

            window.UI.showNotification("تمت إضافة النقاط بنجاح!", "success");
            window.UI.hideCustomerDetailsUI();

            addActivity(`تمت إضافة ${points} نقطة بونص للعميل ${customerData.name}`);
        } catch (error) {
            window.UI.showNotification("حدث خطأ أثناء إضافة النقاط.", "error");
            console.error("Error adding bonus points: ", error);
        }
    }
}

// Initialize the app
initializeApp();






