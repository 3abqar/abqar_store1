<p align="center"><img src="https://github.com/3abqar/feastly/blob/main/src/assets/images/abqarLogo.png" alt="Abqar Store Logo" width="200"/></p>

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
- Bishoy Labib Ezzat
- Youssef Ebraam Melad

---

## 🛠️ Technology Stack

**Frontend:** HTML5, CSS3, JavaScript (Vanilla), TailwindCSS
**Backend:** Firebase
**Charts:** Chart.js
**PDF Generation:** PDFMake
**Icons:** Heroicons
**Build Tool:** Vite
**Testing:** Vitest

## 🎨 UI/UX Design

**Figma Design:** [View Design System](https://www.figma.com/design/8OPjvTt4koPXAYCrUZEd1q/Abqar-Store?node-id=0-1&t=76Pe2ywLsGG5sz01-1)

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
git clone https://github.com/3abqar/abqar_store1.git
cd abqar_store1
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

1. Create a `.env` file in the project root
2. Add your Firebase configuration variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Application Configuration
VITE_APP_TITLE=Abqar Store Sales
VITE_DEFAULT_LANGUAGE=ar
VITE_DEFAULT_DAILY_GOAL=5000
```

### 4️⃣ Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Authentication
3. Copy your Firebase configuration to the `.env` file

### 5️⃣ Run the application

```bash
npm run dev
```

For production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

### 6️⃣ Access the application

- **Development:** Open `http://localhost:3000` in your browser
- **Production:** The built files will be in the `dist/` directory

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

## 📁 Project Structure

The project has been refactored with a modern, organized structure:

```
project-root/
├── .env                          # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite build configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
└── src/                         # All source code
    ├── backend/                 # Firebase and backend logic
    │   ├── firebase.js          # Firebase configuration
    │   └── auditLog.js          # Audit logging functionality
    ├── pages/                   # UI components and page logic
    │   ├── main.js              # Main application logic
    │   └── script.js            # Additional page functionality
    ├── assets/                  # Static assets
    │   ├── images/              # Images and icons
    │   │   ├── logo.png
    │   │   └── image_fx_.jpg
    │   └── styles/              # Stylesheets
    │       └── globals.css      # Global Tailwind styles
    ├── utils/                   # Helper functions and utilities
    │   └── ui.js                # UI utility functions
    └── config/                  # Configuration files
        └── env.js               # Environment configuration
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for secure configuration. Create a `.env` file in the project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Application Configuration
VITE_APP_TITLE=Abqar Store Sales
VITE_DEFAULT_LANGUAGE=ar
VITE_DEFAULT_DAILY_GOAL=5000
```

**Important:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

### Firebase Configuration

The Firebase configuration is now automatically loaded from environment variables. The system will read these values from your `.env` file and configure Firebase accordingly.

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

## 🔨 Development & Build Process

### Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/3abqar/abqar_store1.git
cd abqar_store1
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

This will:
- Start Vite development server on `http://localhost:3000`
- Enable hot module replacement for instant updates
- Compile Tailwind CSS with all utilities available
- Load environment variables from `.env` file

### Production Build

Create an optimized production build:

```bash
npm run build
```

This will:
- Minify HTML, CSS, and JavaScript
- Optimize and purge unused Tailwind CSS classes
- Generate optimized asset file names with hashes
- Create a `dist/` directory with all production files

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Testing

Run the test suite:

```bash
npm test
```

### Performance Optimizations

The build process includes several optimizations:
- **CSS Purging:** Unused Tailwind classes are removed in production
- **Asset Optimization:** Images and other assets are optimized and hashed
- **Code Minification:** JavaScript and CSS are minified using esbuild
- **Bundle Splitting:** Automatic code splitting for better caching

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

## 📞 Support

For support and questions, please contact the development team or create an issue in the GitHub repository.

---
