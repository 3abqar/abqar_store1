# Deployment and Execution Guide

## Overview

This comprehensive guide provides step-by-step instructions for deploying and running the Abqar Store Sales Management System. The guide covers local development setup, production deployment, system requirements, configuration, and troubleshooting procedures.

## System Requirements

### 1. Minimum System Requirements

**Hardware Requirements**:
- **CPU**: Dual-core processor (2.0 GHz or higher)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 2 GB free disk space
- **Network**: Stable internet connection for Firebase services

**Operating System Support**:
- **Windows**: Windows 10 or later
- **macOS**: macOS 10.14 (Mojave) or later
- **Linux**: Ubuntu 18.04 LTS or equivalent

### 2. Software Dependencies

**Required Software**:
- **Node.js**: Version 16.0.0 or higher (tested with v22.17.1)
- **npm**: Version 8.0.0 or higher (tested with v10.9.2)
- **Git**: Latest version for version control
- **Modern Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

**Development Tools** (Optional):
- **VS Code**: Recommended IDE with extensions
- **Firebase CLI**: For advanced Firebase operations
- **Postman**: For API testing

### 3. Browser Compatibility

**Supported Browsers**:
- ✅ **Chrome**: Version 90 and above
- ✅ **Firefox**: Version 88 and above
- ✅ **Safari**: Version 14 and above
- ✅ **Edge**: Version 90 and above
- ⚠️ **Internet Explorer**: Not supported

**Mobile Browsers**:
- ✅ **Chrome Mobile**: Android 8.0+
- ✅ **Safari Mobile**: iOS 14+
- ✅ **Samsung Internet**: Version 14+

## Installation Guide

### 1. Prerequisites Setup

**Install Node.js and npm**:

**Windows**:
```powershell
# Download from https://nodejs.org/
# Or using Chocolatey
choco install nodejs

# Verify installation
node --version
npm --version
```

**macOS**:
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
# Verify installation
node --version
npm --version
```

**Linux (Ubuntu/Debian)**:
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

**Install Git**:
```bash
# Windows (using Chocolatey)
choco install git

# macOS (using Homebrew)
brew install git

# Linux (Ubuntu/Debian)
sudo apt-get install git
```

### 2. Project Setup

**Step 1: Clone the Repository**
```bash
# Clone the project repository
git clone https://github.com/3abqar/feastly.git

# Navigate to project directory
cd feastly
```

**Step 2: Install Dependencies**
```bash
# Install all project dependencies
npm install

# This will install:
# - Vite (build tool)
# - TailwindCSS (styling framework)
# - Firebase (backend services)
# - Chart.js (data visualization)
# - Vitest (testing framework)
# - Other development dependencies
```

**Step 3: Environment Configuration**
```bash
# Create environment file
cp .env.example .env

# Edit the .env file with your configuration
# (See Environment Configuration section below)
```

### 3. Environment Configuration

**Create `.env` file** in the project root:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
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

**Firebase Setup Instructions**:

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Enter project name: "abqar-store"
   - Enable Google Analytics (optional)

2. **Configure Firestore Database**:
   ```javascript
   // Firestore Security Rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

3. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Anonymous authentication
   - Configure other providers as needed

4. **Get Configuration Keys**:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Web app" and register your app
   - Copy the configuration object values to your `.env` file

## Development Environment

### 1. Local Development Server

**Start Development Server**:
```bash
# Start the development server with hot reload
npm run dev

# The application will be available at:
# http://localhost:3000
```

**Development Server Features**:
- ✅ **Hot Module Replacement (HMR)**: Instant updates without page refresh
- ✅ **Source Maps**: Debug original source code
- ✅ **Error Overlay**: Visual error reporting
- ✅ **Fast Refresh**: Preserve component state during updates

**Development Commands**:
```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint

# Format code (if configured)
npm run format
```

### 2. Development Workflow

**Daily Development Process**:
1. **Pull latest changes**: `git pull origin main`
2. **Install new dependencies**: `npm install`
3. **Start development server**: `npm run dev`
4. **Make changes** and test in browser
5. **Run tests**: `npm test`
6. **Commit changes**: `git add . && git commit -m "description"`
7. **Push changes**: `git push origin main`

**File Watching**:
- Vite automatically watches for file changes
- TailwindCSS rebuilds styles on change
- Browser automatically refreshes on updates
- Console shows build status and errors

### 3. Testing Environment

**Run Tests**:
```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- ui.test.js
```

**Test Configuration**:
- **Framework**: Vitest
- **Environment**: jsdom (browser simulation)
- **Test Files**: `*.test.js` files
- **Coverage**: Built-in coverage reporting

## Production Deployment

### 1. Build Process

**Create Production Build**:
```bash
# Build the application for production
npm run build

# This creates a 'dist' directory with optimized files
```

**Build Output Structure**:
```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style-[hash].css # Minified CSS
│   ├── js/
│   │   └── main-[hash].js   # Minified JavaScript
│   └── images/
│       └── [optimized-images] # Compressed images
└── [other-static-files]
```

**Build Optimizations**:
- ✅ **Code Minification**: JavaScript and CSS minified
- ✅ **Asset Optimization**: Images compressed and optimized
- ✅ **Bundle Splitting**: Automatic code splitting for better caching
- ✅ **Tree Shaking**: Unused code removed
- ✅ **CSS Purging**: Unused TailwindCSS classes removed

### 2. Firebase Hosting Deployment

**Install Firebase CLI**:
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login
```

**Initialize Firebase Hosting**:
```bash
# Initialize Firebase in your project
firebase init hosting

# Select your Firebase project
# Set public directory to 'dist'
# Configure as single-page app: Yes
# Set up automatic builds: No (optional)
```

**Deploy to Firebase Hosting**:
```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy with custom message
firebase deploy -m "Production deployment v1.0.0"
```

**Firebase Hosting Configuration** (`firebase.json`):
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### 3. Alternative Deployment Options

**Netlify Deployment**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

**Vercel Deployment**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

**Traditional Web Server**:
```bash
# Build the project
npm run build

# Copy dist/ contents to web server
# Configure server to serve index.html for all routes
```

## Configuration Management

### 1. Environment Variables

**Development Environment** (`.env`):
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=development-api-key
VITE_FIREBASE_AUTH_DOMAIN=dev-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=dev-project-id

# Application Settings
VITE_APP_TITLE=Abqar Store (Dev)
VITE_DEFAULT_LANGUAGE=ar
VITE_DEBUG_MODE=true
```

**Production Environment** (`.env.production`):
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=production-api-key
VITE_FIREBASE_AUTH_DOMAIN=abqar-store.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=abqar-store

# Application Settings
VITE_APP_TITLE=Abqar Store
VITE_DEFAULT_LANGUAGE=ar
VITE_DEBUG_MODE=false
```

### 2. Firebase Configuration

**Firestore Collections Structure**:
```javascript
// Collections used by the application
collections = {
  sales: {
    // Document structure
    id: "auto-generated",
    date: "YYYY-MM-DD",
    serviceType: "string",
    price: "number",
    serviceCost: "number",
    clientName: "string",
    whatsappNumber: "string",
    paymentStatus: "paid|unpaid",
    notes: "string",
    profit: "number"
  },
  customers: {
    // Document ID is whatsappNumber
    name: "string",
    whatsappNumber: "string",
    tags: ["array", "of", "strings"],
    notes: [
      {
        text: "string",
        timestamp: "number"
      }
    ],
    loyaltyPoints: "number",
    tier: "Bronze|Silver|Gold"
  },
  services: {
    id: "auto-generated",
    name: "string",
    categories: [
      {
        name: "string",
        items: [
          {
            name: "string",
            price: "number"
          }
        ]
      }
    ]
  },
  auditLogs: {
    id: "timestamp-string",
    action: "string",
    timestamp: "Firebase.Timestamp",
    user: "string",
    amount: "number (optional)",
    client: "string (optional)"
  }
}
```

**Security Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write all documents
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // More restrictive rules for production:
    // match /sales/{saleId} {
    //   allow read, write: if request.auth != null && 
    //     request.auth.uid == resource.data.userId;
    // }
  }
}
```

### 3. Application Configuration

**Default Settings** (`src/config/env.js`):
```javascript
window.ENV_CONFIG = {
  // Firebase configuration loaded from environment variables
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

  // Application settings
  APP_NAME: import.meta.env.VITE_APP_TITLE || "Abqar Store",
  APP_VERSION: "1.0.0",
  DEFAULT_LANGUAGE: import.meta.env.VITE_DEFAULT_LANGUAGE || "ar",
  DEFAULT_DAILY_GOAL: parseInt(import.meta.env.VITE_DEFAULT_DAILY_GOAL) || 5000
};
```

## Troubleshooting Guide

### 1. Common Installation Issues

**Node.js Version Issues**:
```bash
# Problem: Node.js version too old
# Solution: Update Node.js
nvm install 18
nvm use 18

# Or download latest from nodejs.org
```

**npm Installation Failures**:
```bash
# Problem: npm install fails
# Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Permission Issues (macOS/Linux)**:
```bash
# Problem: Permission denied during npm install
# Solution: Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### 2. Development Server Issues

**Port Already in Use**:
```bash
# Problem: Port 3000 is already in use
# Solution: Use different port
npm run dev -- --port 3001

# Or kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

**Hot Reload Not Working**:
```bash
# Problem: Changes not reflected in browser
# Solutions:
1. Check if files are being watched correctly
2. Restart development server
3. Clear browser cache (Ctrl+Shift+R)
4. Check file permissions
```

**Build Errors**:
```bash
# Problem: Build fails with errors
# Solutions:
1. Check for TypeScript/JavaScript syntax errors
2. Verify all imports are correct
3. Check TailwindCSS configuration
4. Clear node_modules and reinstall
```

### 3. Firebase Connection Issues

**Authentication Errors**:
```javascript
// Problem: Firebase authentication fails
// Check:
1. Firebase project configuration
2. Authentication methods enabled
3. API keys are correct
4. Network connectivity

// Debug:
console.log('Firebase config:', firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  console.log('Auth state changed:', user);
});
```

**Firestore Permission Errors**:
```javascript
// Problem: Firestore read/write fails
// Check:
1. Security rules configuration
2. User authentication status
3. Collection/document paths
4. Network connectivity

// Debug:
db.collection('sales').get()
  .then((snapshot) => console.log('Success:', snapshot.size))
  .catch((error) => console.error('Error:', error));
```

**Network Connectivity Issues**:
```bash
# Problem: Cannot connect to Firebase
# Solutions:
1. Check internet connection
2. Verify Firebase project status
3. Check firewall settings
4. Try different network
```

### 4. Production Deployment Issues

**Build Failures**:
```bash
# Problem: npm run build fails
# Solutions:
1. Check for build errors in console
2. Verify all dependencies are installed
3. Check environment variables
4. Clear build cache: rm -rf dist
```

**Firebase Deployment Errors**:
```bash
# Problem: firebase deploy fails
# Solutions:
1. Check Firebase CLI authentication: firebase login
2. Verify project selection: firebase use --add
3. Check firebase.json configuration
4. Verify build output in dist/ directory
```

**Environment Variable Issues**:
```bash
# Problem: Environment variables not loaded
# Solutions:
1. Check .env file exists and has correct format
2. Verify variable names start with VITE_
3. Restart development server after changes
4. Check for typos in variable names
```

### 5. Performance Issues

**Slow Loading Times**:
```bash
# Solutions:
1. Optimize images and assets
2. Enable compression on server
3. Use CDN for static assets
4. Implement lazy loading
5. Check network tab in browser dev tools
```

**Memory Issues**:
```bash
# Solutions:
1. Check for memory leaks in dev tools
2. Optimize large data sets
3. Implement pagination
4. Clear browser cache
5. Restart browser/development server
```

## Monitoring and Maintenance

### 1. Application Monitoring

**Firebase Analytics**:
- Monitor user engagement
- Track application performance
- Analyze user behavior
- Monitor error rates

**Browser Developer Tools**:
```javascript
// Performance monitoring
console.time('page-load');
// ... application code
console.timeEnd('page-load');

// Memory usage monitoring
console.log('Memory usage:', performance.memory);

// Network monitoring
// Check Network tab in DevTools
```

### 2. Error Tracking

**Client-Side Error Handling**:
```javascript
// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error tracking service
});
```

**Firebase Error Monitoring**:
```javascript
// Monitor Firebase operations
db.collection('sales').add(data)
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
    // Log error for monitoring
  });
```

### 3. Backup and Recovery

**Data Backup**:
- Firebase automatically backs up Firestore data
- Export data regularly for additional backup
- Version control for code backup
- Document configuration settings

**Recovery Procedures**:
1. **Code Recovery**: Restore from Git repository
2. **Data Recovery**: Use Firebase backup/restore features
3. **Configuration Recovery**: Restore from documented settings
4. **Deployment Recovery**: Redeploy from known good build

## Security Considerations

### 1. Environment Security

**Secure Environment Variables**:
- Never commit `.env` files to version control
- Use different configurations for dev/prod
- Rotate API keys regularly
- Limit Firebase project permissions

**Firebase Security**:
```javascript
// Secure Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Restrict access to authenticated users only
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // More specific rules for production
    match /sales/{saleId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### 2. Application Security

**Input Validation**:
```javascript
// Validate user inputs
function validateSaleData(data) {
  if (!data.date || !data.serviceType || !data.price) {
    throw new Error('Required fields missing');
  }
  
  if (typeof data.price !== 'number' || data.price < 0) {
    throw new Error('Invalid price value');
  }
  
  // Additional validation...
}
```

**XSS Prevention**:
- Sanitize user inputs
- Use textContent instead of innerHTML
- Validate data from external sources
- Implement Content Security Policy

## Conclusion

This deployment and execution guide provides comprehensive instructions for setting up, developing, and deploying the Abqar Store Sales Management System. Following these procedures ensures a reliable and secure deployment process while maintaining code quality and system performance.

For additional support or questions not covered in this guide, refer to the project documentation or contact the development team.