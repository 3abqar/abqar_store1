# Abqar Store Sales Management System - User Manual

## Table of Contents

1. [Getting Started](#getting-started)
2. [System Overview](#system-overview)
3. [Dashboard Features](#dashboard-features)
4. [Sales Management](#sales-management)
5. [Customer Management](#customer-management)
6. [Debt Management](#debt-management)
7. [Reports and Analytics](#reports-and-analytics)
8. [Services Management](#services-management)
9. [Catalog Features](#catalog-features)
10. [System Settings](#system-settings)
11. [Troubleshooting](#troubleshooting)
12. [Frequently Asked Questions](#frequently-asked-questions)

---

## Getting Started

### System Requirements

- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Internet Connection**: Required for Firebase database connectivity
- **Screen Resolution**: Minimum 1024x768 (responsive design supports mobile devices)
- **JavaScript**: Must be enabled in browser

### First Time Setup

1. **Access the System**
   - Open your web browser
   - Navigate to the Abqar Store application URL
   - The system will automatically initialize and connect to the database

2. **Language Selection**
   - Click the "EN/AR" button in the top-right corner
   - Choose between English and Arabic interface
   - Your preference will be saved automatically

3. **Dark Mode Setup**
   - Toggle the sun/moon icon to switch between light and dark themes
   - The system automatically enables dark mode after 8 PM
   - Your theme preference is saved for future sessions

### Navigation Overview

The system features a responsive navigation bar with the following main sections:

- **Dashboard**: Overview of key metrics and analytics
- **Sales & Log**: Record new sales and view sales history
- **Customers**: Manage customer database and profiles
- **Debt Management**: Track unpaid orders and payments
- **Reports & Tools**: Generate reports and analytics
- **Services**: Manage service offerings and pricing
- **Catalog**: Browse and select services for sales

---

## System Overview

### Key Features

The Abqar Store Sales Management System is a comprehensive digital solution that replaces traditional paper-based retail operations with:

- **Real-time Sales Tracking**: Instant recording and monitoring of all sales transactions
- **Customer Relationship Management**: Complete customer profiles with purchase history
- **Financial Analytics**: Detailed profit/loss analysis and performance metrics
- **Inventory Management**: Service catalog with pricing and category organization
- **Debt Tracking**: Automated tracking of unpaid orders and payment status
- **Multi-language Support**: Full Arabic and English interface
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

### User Interface Elements

- **Navigation Tabs**: Located at the top (desktop) or hamburger menu (mobile)
- **Action Buttons**: Clearly labeled buttons for primary actions
- **Data Tables**: Sortable and filterable tables for data display
- **Modal Dialogs**: Pop-up windows for detailed information and confirmations
- **Notification System**: Success, error, and information messages
- **Loading Indicators**: Visual feedback during data operations

---

## Dashboard Features

### Key Performance Indicators (KPIs)

The dashboard displays six main KPI cards:

#### 1. Revenue Card
- **Purpose**: Shows total revenue with time period selection
- **Time Periods**: 24 hours, 7 days, 30 days
- **How to Use**:
  - Click the time period buttons (24h, 7d, 30d) to change the view
  - Revenue is displayed in Egyptian Pounds (EGP)
  - Automatically updates in real-time

#### 2. Profit Margin Card
- **Purpose**: Displays current profit margin percentage
- **Features**: 
  - Daily goal progress bar
  - Goal achievement percentage
  - Edit goal functionality
- **How to Use**:
  - Click the edit icon to set a new daily goal
  - Enter your target amount and confirm
  - Progress bar shows current achievement level

#### 3. New Customers Card
- **Purpose**: Shows new customers acquired this month
- **Features**:
  - Click to filter and view new customers
  - Automatically counts first-time buyers
- **How to Use**:
  - Click the card to navigate to filtered customer list
  - View detailed information about new customer acquisitions

#### 4. Profit by Date Card
- **Purpose**: Shows profit for selected time periods
- **Time Periods**: 24 hours, 7 days, 30 days
- **How to Use**:
  - Select time period using the buttons
  - View profit calculations in real-time
  - Compare performance across different periods

#### 5. Total Orders Card
- **Purpose**: Displays total number of orders
- **Features**:
  - Click to view detailed order list
  - Real-time order counting
- **How to Use**:
  - Click the card to navigate to sales history
  - View comprehensive order details

#### 6. Top Selling Service Card
- **Purpose**: Shows the most popular service
- **Features**:
  - Automatically calculates based on order volume
  - Updates in real-time
- **How to Use**:
  - View which service generates most orders
  - Click to filter sales by this service

### Charts and Analytics

#### Sales by Service Type Chart
- **Type**: Doughnut chart
- **Purpose**: Visual breakdown of sales by service category
- **Features**:
  - Interactive segments
  - Percentage and value display
  - Color-coded categories

#### Monthly Sales Trend Chart
- **Type**: Line chart
- **Purpose**: Shows sales performance over time
- **Features**:
  - Month-by-month comparison
  - Trend line visualization
  - Hover for detailed values

#### Service Profitability Table
- **Purpose**: Detailed breakdown of each service's performance
- **Columns**:
  - Service name
  - Number of orders
  - Average profit per order
  - Total revenue
- **Features**:
  - Sortable columns
  - Click service name to filter sales

---

## Sales Management

### Recording New Sales

#### Step-by-Step Process

1. **Navigate to Sales Entry**
   - Click "Sales & Log" in the navigation menu
   - The sales entry form appears at the top of the page

2. **Fill Required Information**
   - **Date**: Automatically set to today (can be changed)
   - **Service Type**: Select from dropdown menu
   - **Price**: Enter the selling price
   - **Service Cost**: Enter the cost of providing the service
   - **Client Name**: Enter customer's name
   - **WhatsApp Number**: Optional - enter for customer tracking
   - **Payment Status**: Select "Paid" or "Unpaid"
   - **Notes**: Optional additional information

3. **Save the Sale**
   - Click "Save Sale" button
   - System will show confirmation message
   - Form automatically resets for next entry

#### Important Notes

- **Profit Calculation**: Automatically calculated as (Price - Service Cost)
- **Customer Creation**: If WhatsApp number is provided, customer profile is automatically created or updated
- **Loyalty Points**: Customers earn points based on purchase amount (if WhatsApp number provided)
- **Real-time Updates**: Dashboard and reports update immediately after saving

### Viewing Sales History

#### Sales Table Features

- **Sortable Columns**: Click column headers to sort data
- **Date Range Filter**: Use date filters to view specific periods
- **Search Functionality**: Find specific sales records
- **Action Buttons**: Edit or delete individual sales records

#### Editing Sales Records

1. **Locate the Sale**: Find the record in the sales history table
2. **Click Edit**: Click the "Edit" button in the actions column
3. **Modify Information**: Update any field in the sales form
4. **Save Changes**: Click "Save Sale" to update the record

#### Deleting Sales Records

1. **Click Delete**: Click the "Delete" button for the specific record
2. **Confirm Action**: Confirm deletion in the popup dialog
3. **Permanent Removal**: Record is permanently removed from the system

**⚠️ Warning**: Deleted sales cannot be recovered. Use this feature carefully.

### Payment Status Management

#### Marking Orders as Paid

- **From Sales History**: Click "Mark as Paid" button
- **From Debt Management**: Use the debt management section
- **Automatic Updates**: Customer profiles and analytics update automatically

#### Payment Status Indicators

- **Green Badge**: Paid orders
- **Red Badge**: Unpaid orders
- **Real-time Updates**: Status changes reflect immediately across all views

---

## Customer Management

### Customer Database Overview

The customer database automatically tracks all customers who have provided WhatsApp numbers during sales transactions.

### Customer Information Display

#### Customer Profile Data

- **Name**: Latest name used in transactions
- **WhatsApp Number**: Contact information
- **Last Purchase**: Date of most recent transaction
- **Total Orders**: Number of completed orders
- **Total Spent**: Lifetime spending amount
- **Customer Type**: New, Returning, or Inactive status
- **Loyalty Points**: Accumulated reward points
- **Tier Status**: Bronze, Silver, or Gold tier

### Customer Tier System

#### Tier Levels and Benefits

1. **Bronze Tier** (Default)
   - **Requirement**: New customers
   - **Benefits**: 1x loyalty points earning rate
   - **Welcome Bonus**: 250 loyalty points

2. **Silver Tier**
   - **Requirement**: Spend 2,000 EGP or more
   - **Benefits**: 1.15x loyalty points earning rate
   - **Automatic Upgrade**: System automatically promotes customers

3. **Gold Tier**
   - **Requirement**: Spend 10,000 EGP or more
   - **Benefits**: 1.25x loyalty points earning rate
   - **VIP Status**: Premium customer recognition

### Loyalty Points System

#### How Points Are Earned

- **Standard Rate**: 1 point per 1 EGP spent
- **Silver Multiplier**: 1.15x points for Silver tier customers
- **Gold Multiplier**: 1.25x points for Gold tier customers
- **Exclusions**: Customers tagged as "تاجر" (Trader) or "يوتيوبر" (YouTuber) don't earn points

#### Point Redemption

1. **Access Redemption**: Click "Redeem" button in customer profile
2. **Enter Points**: Specify number of points to redeem
3. **Calculate Discount**: System calculates discount value (1 point = 1 EGP discount)
4. **Apply to Sale**: Discount is applied to current transaction
5. **Point Deduction**: Points are automatically deducted from customer balance

### Customer Details View

#### Accessing Customer Details

1. **From Customer Database**: Click "Details" button for any customer
2. **Customer Information**: View complete profile information
3. **Purchase History**: See all transactions for this customer
4. **Loyalty Points**: View current balance and redemption options

#### Customer Tagging System

- **Add Tags**: Categorize customers (VIP, Trader, YouTuber, etc.)
- **Filter by Tags**: Use tags for targeted marketing
- **Special Handling**: Some tags affect loyalty point earning

### Customer Notes and Timeline

#### Adding Customer Notes

1. **Open Customer Details**: Click "Details" for any customer
2. **Add Note**: Use the notes section to add observations
3. **Timeline View**: Notes are displayed chronologically
4. **Edit/Delete**: Modify or remove notes as needed

---

## Debt Management

### Unpaid Orders Overview

The debt management section automatically tracks all orders with "Unpaid" status.

### Viewing Unpaid Orders

#### Debt Management Table

- **Date**: When the unpaid order was created
- **Customer Name**: Who owes the payment
- **Amount Due**: Outstanding payment amount
- **Actions**: Mark as paid option

### Payment Processing

#### Marking Orders as Paid

1. **Locate Order**: Find the unpaid order in the debt management table
2. **Click "Mark as Paid"**: Use the action button
3. **Confirmation**: System updates payment status immediately
4. **Automatic Updates**: Customer profile and analytics update automatically

#### Payment Tracking Features

- **Total Debt Display**: Dashboard shows total outstanding debt
- **Real-time Updates**: Debt amounts update as payments are processed
- **Customer Impact**: Payment status affects customer profiles and analytics

---

## Reports and Analytics

### Profit & Loss Reports

#### Monthly Reports

1. **Access Reports**: Navigate to "Reports & Tools" section
2. **Select Period**: Choose "Monthly" option
3. **Generate Report**: Click "Generate" button
4. **View Results**:
   - Total Income
   - Total Expenses (service costs)
   - Net Profit/Loss
   - Profit margin percentage

#### Quarterly Reports

- **Extended Period**: 3-month analysis
- **Trend Analysis**: Compare quarterly performance
- **Strategic Planning**: Use for business planning

### WhatsApp Marketing Tools

#### Inactive Customer Identification

1. **Filter Inactive**: Click "Filter Inactive Customers"
2. **Review List**: System identifies customers with no recent purchases
3. **Copy Numbers**: Use "Copy Numbers" to get WhatsApp numbers
4. **Marketing Outreach**: Use numbers for re-engagement campaigns

#### Targeted Marketing by Tags

1. **Select Tag**: Choose customer tag for filtering
2. **View Filtered List**: See customers matching the tag
3. **Copy Numbers**: Extract WhatsApp numbers for campaigns
4. **Personalized Messaging**: Create targeted marketing messages

### Financial Goal Simulator

#### Setting and Tracking Goals

1. **Enter Goal**: Input desired profit target
2. **Calculate Requirements**: System calculates needed sales volume
3. **Service Breakdown**: Shows how many orders of each service needed
4. **Progress Tracking**: Monitor goal achievement in real-time

### Basket Analysis

#### Understanding Customer Behavior

1. **Run Analysis**: Click "Analyze" in the basket analysis section
2. **View Patterns**: See which services are commonly purchased together
3. **Optimize Offerings**: Use insights to improve service bundling
4. **Increase Sales**: Implement cross-selling strategies

### Export Functionality

#### Data Export Options

1. **Sales Export**: Export all sales data to CSV format
2. **Customer Export**: Export customer database
3. **Custom Filters**: Export filtered data sets
4. **Report Generation**: Create formatted reports for external use

---

## Services Management

### Service Catalog Overview

The services management section allows you to create, edit, and organize your service offerings.

### Adding New Services

#### Step-by-Step Process

1. **Navigate to Services**: Click "Services" in the navigation menu
2. **Service Information**:
   - **Service Name**: Enter descriptive name
   - **Categories**: Organize services into categories
   - **Items**: Add individual items with prices
3. **Save Service**: Click "Save Service" to add to catalog

### Service Categories

#### Category Management

- **Add Category**: Create new service categories
- **Organize Services**: Group related services together
- **Easy Navigation**: Customers can browse by category

### Editing Services

#### Modifying Existing Services

1. **Locate Service**: Find service in the existing services table
2. **Click Edit**: Use the edit button
3. **Update Information**: Modify name, categories, or items
4. **Save Changes**: Click "Save Service" to update

### Deleting Services

1. **Select Service**: Choose service to remove
2. **Click Delete**: Use the delete button
3. **Confirm Action**: Confirm deletion in popup
4. **Permanent Removal**: Service is removed from catalog

**⚠️ Note**: Deleting services doesn't affect historical sales data.

---

## Catalog Features

### Service Catalog Browser

#### Browsing Services

1. **Navigate to Catalog**: Click "Catalog" in navigation
2. **Browse Categories**: View services organized by category
3. **Search Services**: Use search box to find specific services
4. **View Details**: Click services to see detailed information

### Service Selection for Sales

#### Quick Sale Entry

1. **Select Service**: Click on service in catalog
2. **Auto-fill Form**: Service information populates sales form
3. **Add Customer Info**: Enter customer details
4. **Complete Sale**: Save the transaction

### Discount Mode

#### Applying Discounts

1. **Enable Discount Mode**: Toggle discount mode in catalog
2. **Set Discount Percentage**: Enter discount amount
3. **Select Items**: Choose items for discount
4. **Apply to Sale**: Discount is automatically calculated

---

## System Settings

### Language Settings

#### Switching Languages

- **Toggle Button**: Click "EN/AR" button
- **Instant Change**: Interface updates immediately
- **Persistent Setting**: Language preference is saved
- **Complete Translation**: All text elements are translated

### Theme Settings

#### Dark/Light Mode

- **Manual Toggle**: Click sun/moon icon
- **Automatic Mode**: Dark mode activates after 8 PM
- **Saved Preference**: Theme choice is remembered
- **System-wide**: Affects all interface elements

### Daily Goal Management

#### Setting Financial Goals

1. **Access Goal Setting**: Click edit icon on profit margin card
2. **Enter Amount**: Input daily profit target
3. **Save Goal**: Confirm new goal amount
4. **Track Progress**: Monitor achievement on dashboard

### Data Backup and Sync

#### Automatic Data Management

- **Real-time Sync**: All data syncs with Firebase database
- **Automatic Backup**: Data is continuously backed up
- **Multi-device Access**: Access from any device with internet
- **Data Security**: Encrypted data transmission and storage

---

## Troubleshooting

### Common Issues and Solutions

#### Connection Problems

**Issue**: "Connection to database failed" error message

**Solutions**:
1. **Check Internet**: Ensure stable internet connection
2. **Refresh Browser**: Reload the page (Ctrl+F5 or Cmd+Shift+R)
3. **Clear Cache**: Clear browser cache and cookies
4. **Try Different Browser**: Test with another browser
5. **Check Firewall**: Ensure Firebase domains aren't blocked

#### Loading Issues

**Issue**: Page loads slowly or gets stuck on loading screen

**Solutions**:
1. **Wait Patiently**: Initial load may take 10-30 seconds
2. **Check Connection**: Verify internet speed and stability
3. **Close Other Tabs**: Free up browser memory
4. **Restart Browser**: Close and reopen browser completely
5. **Clear Storage**: Clear local storage and try again

#### Data Not Saving

**Issue**: Sales or customer data not saving properly

**Solutions**:
1. **Check Required Fields**: Ensure all required fields are filled
2. **Verify Connection**: Check internet connectivity
3. **Refresh and Retry**: Reload page and try again
4. **Check Browser Console**: Look for JavaScript errors (F12)
5. **Contact Support**: If issue persists, contact technical support

#### Display Problems

**Issue**: Interface elements not displaying correctly

**Solutions**:
1. **Update Browser**: Use latest browser version
2. **Enable JavaScript**: Ensure JavaScript is enabled
3. **Check Screen Resolution**: Minimum 1024x768 recommended
4. **Disable Extensions**: Temporarily disable browser extensions
5. **Try Incognito Mode**: Test in private browsing mode

### Performance Optimization

#### Improving System Speed

1. **Regular Cleanup**: Clear browser cache weekly
2. **Close Unused Tabs**: Keep only necessary tabs open
3. **Update Browser**: Use latest browser versions
4. **Stable Internet**: Ensure reliable internet connection
5. **Restart Periodically**: Restart browser daily for optimal performance

### Data Recovery

#### If Data Appears Missing

1. **Check Filters**: Ensure no filters are hiding data
2. **Refresh Page**: Reload to sync latest data
3. **Check Date Range**: Verify date filters aren't excluding data
4. **Wait for Sync**: Allow time for database synchronization
5. **Contact Support**: For persistent data issues

---

## Frequently Asked Questions

### General Questions

**Q: Is my data secure?**
A: Yes, all data is encrypted and stored securely in Firebase, Google's enterprise-grade database platform.

**Q: Can I access the system from multiple devices?**
A: Yes, the system works on any device with a web browser and internet connection.

**Q: Is there a mobile app?**
A: The web application is fully responsive and works excellently on mobile devices through your browser.

**Q: Can multiple users access the system simultaneously?**
A: Yes, the system supports multiple concurrent users with real-time data synchronization.

### Sales and Customer Management

**Q: What happens if I enter a sale with the wrong information?**
A: You can edit any sale record using the edit button in the sales history table.

**Q: How are loyalty points calculated?**
A: Customers earn 1 point per 1 EGP spent, with multipliers for Silver (1.15x) and Gold (1.25x) tier customers.

**Q: Can I delete a customer profile?**
A: Customer profiles are automatically managed based on sales data. You can add tags and notes but cannot delete profiles.

**Q: How do I handle returns or refunds?**
A: Delete the original sale record or create a negative sale entry to account for refunds.

### Technical Questions

**Q: What browsers are supported?**
A: Chrome, Firefox, Safari, and Edge (latest versions). Chrome is recommended for best performance.

**Q: Do I need to install any software?**
A: No, the system runs entirely in your web browser. No installation required.

**Q: What happens if my internet connection is lost?**
A: The system requires internet connectivity. Reconnect and refresh the page to continue working.

**Q: How often is data backed up?**
A: Data is continuously synchronized and backed up in real-time with every change.

### Business Operations

**Q: How do I track inventory?**
A: The system focuses on service-based businesses. For physical inventory, use the notes fields to track stock levels.

**Q: Can I generate tax reports?**
A: Use the P&L reports and export functionality to generate data for tax reporting purposes.

**Q: How do I handle different currencies?**
A: The system is designed for Egyptian Pounds (EGP). For other currencies, manually convert values before entry.

**Q: Can I customize the service categories?**
A: Yes, you can create, edit, and organize service categories in the Services management section.

### Support and Maintenance

**Q: How do I get technical support?**
A: Contact your system administrator or technical support team for assistance with technical issues.

**Q: Are there regular updates?**
A: The system is continuously updated with improvements and new features automatically.

**Q: How do I suggest new features?**
A: Contact your system administrator to submit feature requests and suggestions.

**Q: Is training available?**
A: This user manual provides comprehensive guidance. Additional training can be arranged if needed.

---

## Contact Information

For technical support, feature requests, or additional training:

- **System Administrator**: Contact your designated system administrator
- **Technical Support**: Available during business hours
- **User Manual Updates**: This manual is updated regularly with new features and improvements

---

*Last Updated: November 2024*
*Version: 1.0*
*Abqar Store Sales Management System*