<p align="center"><img src="https://github.com/3abqar/abqar-store-sales/blob/main/public/logo.png" alt="Abqar Store Logo" width="120"/></p>

# 🛍️ Abqar Store Sales

**Abqar Store Sales** is a comprehensive digital sales management system designed to replace traditional paper-based operations with a fast, user-friendly, and efficient workflow for retail stores.

It provides:
- 📊 Real-time sales dashboard with analytics
- 💰 Complete sales entry and tracking system
- 👥 Customer database with loyalty points
- 📋 Debt management and payment tracking
- 🎯 Service catalog and inventory management
- 📈 Advanced reporting and business insights
- 🌐 Multi-language support (Arabic/English)

---

## 🎯 Objective

Enhance retail store efficiency, reduce manual errors, and increase profitability by digitalizing all sales operations in a seamless and intelligent way. The system provides comprehensive analytics and customer management tools to help store owners make data-driven decisions.

---

## 👨‍💻 Team Members

- **TL:** Ziad Hisham
- Ahmed Khaled Ahmed
- Ahmed Mohamed Salah
- Beshoy Labib Ezzat
- Youssef Ebraam Melad

---

## 🛠️ Technology Stack

**Frontend:** HTML5, CSS3, JavaScript (Vanilla), TailwindCSS
**Backend:** Firebase (Firestore, Authentication)
**Charts:** Chart.js
**PDF Generation:** PDFMake
**Icons:** Heroicons

---

## 📅 Project Plan & Timeline

### **Week 1 – Setup & Design**
- Define requirements & finalize features
- Create UI/UX wireframes & style guide
- Setup project structure & Firebase configuration
- Implement basic dashboard layout
- Setup multi-language support system

### **Week 2 – Core Features Development**
- Sales entry system with real-time validation
- Customer database with CRUD operations
- Firebase integration for data persistence
- Loyalty points system implementation
- Service catalog management

### **Week 3 – Advanced Features & Analytics**
- Dashboard analytics with Chart.js
- Debt management system
- PDF report generation
- Customer tier system (Bronze, Silver, Gold)
- Advanced filtering and search functionality

### **Week 4 – Testing & Deployment**
- Bug fixing & UI/UX polishing
- Performance optimization
- Cross-browser testing
- Deploy to Firebase Hosting
- Prepare final documentation & demo

---

## 👥 Tasks Distribution & Roles

- **UI/UX & Documentation:** Youssef Ebraam
- **Frontend Development & Dashboard:** Bishoy Labib, Ahmed Mohamed
- **Backend Integration & Firebase:** Ziad Hisham, Ahmed Khaled
- **Analytics & Reporting:** Team Collaboration

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/3abqar/abqar-store-sales.git
cd abqar-store-sales
```

### 2️⃣ Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Authentication
3. Update the Firebase configuration in `firebase.js` with your project credentials

### 3️⃣ Run the application
```bash
# Serve the files using a local server (e.g., Live Server in VS Code)
# Or use Python's built-in server:
python -m http.server 8000

# Or use Node.js http-server:
npx http-server
```

### 4️⃣ Access the application
Open your browser and navigate to `http://localhost:8000` (or the port shown in your terminal)

---

## 📱 Features Overview

### 🏠 Dashboard
- Real-time sales metrics and KPIs
- Interactive charts showing sales trends
- Daily goal tracking with progress indicators
- Top-performing services and customers
- Recent activity feed

### 💼 Sales Management
- Quick sales entry with service selection
- Customer auto-complete and suggestions
- Profit calculation and payment status tracking
- Edit and delete sales records
- Advanced filtering by date, service, and customer

### 👥 Customer Management
- Comprehensive customer database
- Loyalty points system with tier levels
- Customer tags and notes
- Purchase history tracking
- Automated customer insights

### 💳 Debt Management
- Track unpaid orders
- Mark orders as paid
- Customer debt overview
- Payment reminders and notifications

### 📊 Reports & Analytics
- Profit & Loss reports
- Service profitability analysis
- Customer behavior insights
- Export data to PDF
- WhatsApp marketing tools

### 🛍️ Service Catalog
- Digital service catalog
- Category-based organization
- Discount mode for bulk selections
- Service performance tracking

---

## 🌟 Key Features

- **Real-time Data Sync:** All data is synchronized in real-time using Firebase
- **Offline Support:** Basic functionality works offline with data sync when online
- **Multi-language:** Full Arabic and English language support
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode:** Automatic dark mode based on time or manual toggle
- **Export Capabilities:** Generate PDF reports for sales and customer data
- **Customer Loyalty:** Advanced loyalty points system with tier benefits

---

## 🔧 Configuration

### Firebase Configuration
Update the `firebaseConfig` object in `firebase.js` with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📈 Future Enhancements

- Mobile app development (React Native/Flutter)
- Advanced inventory management
- Multi-store support
- Integration with payment gateways
- Advanced analytics and AI insights
- Automated marketing campaigns
- Barcode scanning support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support and questions, please contact the development team or create an issue in the GitHub repository.

---

**Made with ❤️ by the 3abqar Team**