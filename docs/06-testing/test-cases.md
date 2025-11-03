# Test Cases Specification

## Overview

This document contains detailed test cases for all system functionalities of the Abqar Store Sales Management System. Each test case includes preconditions, test steps, expected results, and acceptance criteria.

## Test Case Categories

1. [Sales Management](#sales-management)
2. [Customer Management](#customer-management)
3. [Dashboard and Analytics](#dashboard-and-analytics)
4. [Authentication and Security](#authentication-and-security)
5. [Reporting and Export](#reporting-and-export)
6. [UI/UX and Accessibility](#uiux-and-accessibility)
7. [Data Validation](#data-validation)
8. [Performance](#performance)

---

## Sales Management

### TC-SM-001: Create New Sale
**Priority**: High  
**Requirements**: 2.2, 2.3  

**Preconditions**:
- User is authenticated and on sales entry page
- Service types are available in dropdown

**Test Steps**:
1. Navigate to "New Sale Entry" tab
2. Select current date in date field
3. Choose service type from dropdown
4. Enter price: 150.00
5. Enter service cost: 50.00
6. Enter client name: "Ahmed Mohamed"
7. Enter WhatsApp number: "01234567890"
8. Select payment status: "Paid"
9. Add notes: "Test sale entry"
10. Click "Save Sale" button

**Expected Results**:
- Sale is saved successfully to Firebase
- Success notification appears
- Form is reset to default values
- Profit is calculated automatically (100.00)
- Customer loyalty points are updated (+150 points)
- Sale appears in sales history table

**Acceptance Criteria**:
- Sale data is persisted in Firebase sales collection
- Customer record is created/updated with purchase history
- Audit log entry is created
- Real-time dashboard updates reflect new sale

### TC-SM-002: Edit Existing Sale
**Priority**: High  
**Requirements**: 2.2, 2.3  

**Preconditions**:
- At least one sale exists in the system
- User is on sales log page

**Test Steps**:
1. Navigate to "Sales & Log" tab
2. Locate existing sale in table
3. Click "Edit" button for the sale
4. Modify price from 150.00 to 200.00
5. Update service cost from 50.00 to 75.00
6. Change payment status to "Unpaid"
7. Click "Save Sale" button

**Expected Results**:
- Sale is updated successfully in Firebase
- Updated notification appears
- Profit recalculated automatically (125.00)
- Customer loyalty points adjusted accordingly
- Updated sale appears in sales history
- Changes reflected in dashboard metrics

**Acceptance Criteria**:
- Original sale data is overwritten with new values
- Customer total spent and loyalty points are recalculated
- Audit log records the modification
- All dependent calculations are updated

### TC-SM-003: Delete Sale
**Priority**: Medium  
**Requirements**: 2.2, 2.3  

**Preconditions**:
- At least one sale exists in the system
- User is on sales log page

**Test Steps**:
1. Navigate to "Sales & Log" tab
2. Locate sale to delete in table
3. Click "Delete" button for the sale
4. Confirm deletion in modal dialog
5. Click "Confirm" button

**Expected Results**:
- Confirmation modal appears with warning message
- Sale is removed from Firebase after confirmation
- Success notification appears
- Sale disappears from sales history table
- Dashboard metrics are updated
- Customer statistics are recalculated

**Acceptance Criteria**:
- Sale document is deleted from Firebase
- Customer loyalty points are adjusted
- Dependent calculations are updated
- Audit log records the deletion

### TC-SM-004: Filter Sales by Date Range
**Priority**: Medium  
**Requirements**: 2.2  

**Preconditions**:
- Multiple sales exist with different dates
- User is on sales log page

**Test Steps**:
1. Navigate to "Sales & Log" tab
2. Set start date filter to "2024-01-01"
3. Set end date filter to "2024-01-31"
4. Click "Filter" button

**Expected Results**:
- Only sales within specified date range are displayed
- Pagination is updated for filtered results
- Filter can be cleared to show all sales
- Export functions work with filtered data

**Acceptance Criteria**:
- Date filtering logic works correctly
- UI updates to show filtered results
- Pagination handles filtered data properly
- Clear filter functionality restores full dataset

---

## Customer Management

### TC-CM-001: Create New Customer
**Priority**: High  
**Requirements**: 2.1, 2.4  

**Preconditions**:
- User is authenticated
- Customer management page is accessible

**Test Steps**:
1. Navigate to "Customers" tab
2. Click "Add Customer" button
3. Enter name: "Sara Ahmed"
4. Enter WhatsApp number: "01987654321"
5. Click "Save Customer" button

**Expected Results**:
- Customer is created in Firebase customers collection
- Success notification appears
- Customer appears in customer database table
- Initial loyalty points (250) are assigned
- Customer tier is set to "Bronze"
- Modal closes automatically

**Acceptance Criteria**:
- Customer document is created in Firebase
- WhatsApp number is formatted correctly
- Default values are set properly
- Customer appears in search results

### TC-CM-002: View Customer Details
**Priority**: High  
**Requirements**: 2.1, 2.4  

**Preconditions**:
- Customer exists with purchase history
- User is on customers page

**Test Steps**:
1. Navigate to "Customers" tab
2. Locate customer in table
3. Click "Details" button for customer

**Expected Results**:
- Customer details modal opens
- Customer information is displayed correctly
- Purchase history is shown with all sales
- Loyalty points balance is accurate
- Customer tier is displayed
- Tags and notes sections are visible

**Acceptance Criteria**:
- All customer data is retrieved from Firebase
- Purchase history calculations are correct
- Modal displays responsive design
- Close functionality works properly

### TC-CM-003: Add Customer Tag
**Priority**: Medium  
**Requirements**: 2.1  

**Preconditions**:
- Customer exists in system
- Customer details modal is open

**Test Steps**:
1. Open customer details modal
2. Navigate to tags section
3. Enter new tag: "VIP"
4. Click "Add" button

**Expected Results**:
- Tag is added to customer record
- Tag appears in customer's tag list
- Customer document is updated in Firebase
- Success notification appears
- Tag is available for filtering

**Acceptance Criteria**:
- Tag is persisted in Firebase
- Duplicate tags are prevented
- Tag appears in filter dropdown
- Audit log records the action

### TC-CM-004: Redeem Loyalty Points
**Priority**: High  
**Requirements**: 2.4  

**Preconditions**:
- Customer has sufficient loyalty points (≥250)
- User is creating a new sale

**Test Steps**:
1. Navigate to "New Sale Entry" tab
2. Enter customer name with loyalty points
3. Click "Redeem" button
4. Enter points to redeem: 200
5. Confirm redemption
6. Complete sale entry

**Expected Results**:
- Redemption modal opens with current balance
- Discount value is calculated (200/40 = 5.00)
- Sale price is reduced by discount amount
- Customer loyalty points are deducted
- Sale is saved with redemption note

**Acceptance Criteria**:
- Points are deducted from customer balance
- Discount is applied to sale price
- Redemption is recorded in sale notes
- Customer tier is maintained correctly

### TC-CM-005: Customer Tier Upgrade
**Priority**: Medium  
**Requirements**: 2.4  

**Preconditions**:
- Customer exists with total spending near tier threshold
- User creates sale that pushes customer over threshold

**Test Steps**:
1. Create sale for customer with 1900 total spent
2. Enter sale amount: 200.00
3. Save the sale
4. Check customer details

**Expected Results**:
- Customer total spent becomes 2100.00
- Customer tier is automatically upgraded to "Silver"
- Loyalty point multiplier increases to 1.15x
- Tier change is recorded in audit log
- Customer appears with Silver badge in table

**Acceptance Criteria**:
- Tier calculation logic works correctly
- Point multiplier is applied to future purchases
- Tier upgrade is persisted in Firebase
- UI reflects tier change immediately

---

## Dashboard and Analytics

### TC-DA-001: Dashboard KPI Display
**Priority**: High  
**Requirements**: 1.5, 3.1  

**Preconditions**:
- Sales data exists in system
- User is on dashboard page

**Test Steps**:
1. Navigate to "Dashboard" tab
2. Observe KPI cards display
3. Verify revenue calculations
4. Check profit margin calculation
5. Validate new customers count

**Expected Results**:
- Total revenue displays sum of all sales
- Profit margin shows correct percentage
- New customers count shows current month additions
- Top service displays most sold service
- Daily goal progress shows current percentage

**Acceptance Criteria**:
- All calculations are mathematically correct
- KPIs update in real-time with new data
- Currency formatting is consistent
- Percentage calculations are accurate

### TC-DA-002: Sales Charts Rendering
**Priority**: High  
**Requirements**: 3.5, 4.1  

**Preconditions**:
- Sales data exists across multiple service types
- User is on dashboard page

**Test Steps**:
1. Navigate to "Dashboard" tab
2. Observe service type chart rendering
3. Check monthly sales trend chart
4. Verify chart data accuracy
5. Test chart interactivity

**Expected Results**:
- Service type chart displays horizontal bars
- Monthly trend shows line chart with revenue/profit
- Charts render without errors
- Data matches underlying sales data
- Charts are responsive to screen size

**Acceptance Criteria**:
- Chart.js renders properly
- Data aggregation is correct
- Charts update with new sales data
- Interactive features work (click to filter)

### TC-DA-003: Real-time Data Updates
**Priority**: High  
**Requirements**: 3.1  

**Preconditions**:
- Dashboard is open in browser
- Another user/session can create sales

**Test Steps**:
1. Open dashboard in first browser tab
2. Open sales entry in second tab
3. Create new sale in second tab
4. Observe dashboard updates in first tab

**Expected Results**:
- Dashboard KPIs update automatically
- Charts refresh with new data
- No page refresh required
- Updates appear within 2-3 seconds
- Activity feed shows new sale

**Acceptance Criteria**:
- Firebase real-time listeners work correctly
- UI updates reflect data changes
- Performance remains smooth during updates
- No memory leaks from listeners

---

## Authentication and Security

### TC-AS-001: Anonymous Authentication
**Priority**: High  
**Requirements**: 6.4  

**Preconditions**:
- User opens application for first time
- No existing authentication state

**Test Steps**:
1. Open application URL
2. Wait for loading screen
3. Observe authentication process
4. Verify access to application features

**Expected Results**:
- Firebase anonymous authentication succeeds
- Loading overlay disappears
- User gains access to all features
- No login form is required
- Session persists across page refreshes

**Acceptance Criteria**:
- Anonymous user is created in Firebase Auth
- Application functions normally
- Security rules allow anonymous access
- Session management works correctly

### TC-AS-002: Data Security Validation
**Priority**: High  
**Requirements**: 6.1, 6.4  

**Preconditions**:
- User is authenticated
- Firebase security rules are configured

**Test Steps**:
1. Attempt to access Firebase directly via console
2. Try to modify data without authentication
3. Verify read/write permissions
4. Test data validation rules

**Expected Results**:
- Direct database access is restricted
- Only authenticated users can read/write
- Data validation rules prevent invalid data
- Security rules enforce proper access control

**Acceptance Criteria**:
- Firebase security rules are properly configured
- Data integrity is maintained
- Unauthorized access is prevented
- Validation rules work as expected

---

## Reporting and Export

### TC-RE-001: PDF Sales Report Generation
**Priority**: Medium  
**Requirements**: 8.2, 8.3  

**Preconditions**:
- Sales data exists in system
- User is on reports page

**Test Steps**:
1. Navigate to "Reports & Tools" tab
2. Click "Sales PDF" button
3. Wait for PDF generation
4. Verify PDF content

**Expected Results**:
- PDF file is generated and downloaded
- PDF contains all sales data
- Arabic text is rendered correctly
- Table formatting is proper
- File name includes timestamp

**Acceptance Criteria**:
- PDF library (pdfMake) works correctly
- Arabic font rendering is accurate
- Data export is complete and accurate
- File download works in all browsers

### TC-RE-002: Customer Data Export
**Priority**: Medium  
**Requirements**: 8.2  

**Preconditions**:
- Customer data exists in system
- User is on reports page

**Test Steps**:
1. Navigate to "Reports & Tools" tab
2. Click "Customers PDF" button
3. Wait for PDF generation
4. Verify PDF content and formatting

**Expected Results**:
- Customer PDF is generated successfully
- All customer data is included
- Formatting is consistent and readable
- Arabic names are displayed correctly

**Acceptance Criteria**:
- Customer data export is complete
- PDF formatting meets requirements
- Download functionality works properly
- Data accuracy is maintained

### TC-RE-003: P&L Report Generation
**Priority**: Medium  
**Requirements**: 8.2  

**Preconditions**:
- Sales data exists for current period
- User is on reports page

**Test Steps**:
1. Navigate to "Reports & Tools" tab
2. Select "Monthly" period
3. Click "Generate" button
4. Review P&L calculations

**Expected Results**:
- P&L report displays income, expenses, net profit
- Calculations are mathematically correct
- Period filtering works properly
- Report updates with new data

**Acceptance Criteria**:
- Financial calculations are accurate
- Period filtering logic is correct
- Report formatting is professional
- Data reflects actual business performance

---

## UI/UX and Accessibility

### TC-UX-001: Responsive Design Validation
**Priority**: Medium  
**Requirements**: 5.1, 5.2  

**Preconditions**:
- Application is loaded in browser
- Browser developer tools are available

**Test Steps**:
1. Open application in desktop browser
2. Resize browser window to tablet size (768px)
3. Resize to mobile size (375px)
4. Test navigation and functionality at each size

**Expected Results**:
- Layout adapts to different screen sizes
- Navigation menu collapses on mobile
- Tables become horizontally scrollable
- All functionality remains accessible
- Text remains readable at all sizes

**Acceptance Criteria**:
- Responsive breakpoints work correctly
- Mobile navigation is functional
- Content is accessible on all devices
- Performance remains acceptable

### TC-UX-002: Dark Mode Toggle
**Priority**: Low  
**Requirements**: 5.2  

**Preconditions**:
- User is on any page of application
- Dark mode toggle is visible

**Test Steps**:
1. Locate dark mode toggle in settings
2. Click toggle to enable dark mode
3. Navigate through different pages
4. Toggle back to light mode

**Expected Results**:
- Dark mode applies to entire application
- All text remains readable
- Charts and graphics adapt to dark theme
- Mode preference is saved in localStorage
- Toggle state persists across sessions

**Acceptance Criteria**:
- Dark mode styling is complete
- Accessibility contrast ratios are maintained
- User preference is persisted
- All components support both themes

### TC-UX-003: Language Switching
**Priority**: Medium  
**Requirements**: 5.2  

**Preconditions**:
- Application supports Arabic and English
- User is on any page

**Test Steps**:
1. Locate language toggle button
2. Switch from Arabic to English
3. Verify text translation
4. Check RTL/LTR layout changes
5. Switch back to Arabic

**Expected Results**:
- All interface text translates correctly
- Layout direction changes (RTL/LTR)
- Currency symbols update appropriately
- Date formats adjust to language
- Language preference is saved

**Acceptance Criteria**:
- Translation coverage is complete
- Layout direction works properly
- Cultural formatting is correct
- Language preference persists

---

## Data Validation

### TC-DV-001: Required Field Validation
**Priority**: High  
**Requirements**: 2.3, 2.4  

**Preconditions**:
- User is on sales entry form
- Form is empty

**Test Steps**:
1. Navigate to "New Sale Entry" tab
2. Leave required fields empty
3. Click "Save Sale" button
4. Observe validation messages

**Expected Results**:
- Form submission is prevented
- Error notification appears
- Required fields are highlighted
- User is guided to complete form
- No invalid data is saved

**Acceptance Criteria**:
- Client-side validation works correctly
- Error messages are clear and helpful
- Form state is preserved during validation
- No server requests are made with invalid data

### TC-DV-002: Phone Number Formatting
**Priority**: Medium  
**Requirements**: 2.1  

**Preconditions**:
- User is entering customer information
- Phone number field is available

**Test Steps**:
1. Enter phone number: "1234567890"
2. Enter phone number: "01234567890"
3. Enter phone number: "201234567890"
4. Verify formatting in each case

**Expected Results**:
- 10-digit number becomes "201234567890"
- 11-digit number starting with 0 becomes "201234567890"
- 12-digit number starting with 20 remains unchanged
- Invalid formats show error message

**Acceptance Criteria**:
- Phone number normalization works correctly
- Egyptian phone format is enforced
- Invalid numbers are rejected
- Formatting is consistent across application

### TC-DV-003: Currency Validation
**Priority**: Medium  
**Requirements**: 2.3  

**Preconditions**:
- User is entering price or cost values
- Numeric input fields are available

**Test Steps**:
1. Enter valid price: "150.50"
2. Enter invalid price: "abc"
3. Enter negative price: "-50"
4. Enter very large number: "999999999"

**Expected Results**:
- Valid numbers are accepted and formatted
- Invalid characters are rejected
- Negative numbers are handled appropriately
- Large numbers are validated against limits
- Currency formatting is applied consistently

**Acceptance Criteria**:
- Numeric validation prevents invalid input
- Currency formatting is consistent
- Edge cases are handled properly
- User feedback is clear and helpful

---

## Performance

### TC-PF-001: Page Load Performance
**Priority**: Medium  
**Requirements**: 1.5  

**Preconditions**:
- Application is deployed and accessible
- Browser developer tools are available

**Test Steps**:
1. Open browser developer tools
2. Navigate to application URL
3. Measure page load time
4. Analyze network requests
5. Check resource loading

**Expected Results**:
- Initial page load completes within 3 seconds
- Firebase connection establishes quickly
- JavaScript bundles load efficiently
- Images and assets are optimized
- No blocking resources delay rendering

**Acceptance Criteria**:
- Page load time meets performance targets
- Critical rendering path is optimized
- Resource loading is efficient
- User experience is smooth

### TC-PF-002: Data Loading Performance
**Priority**: Medium  
**Requirements**: 1.5  

**Preconditions**:
- Large dataset exists in Firebase
- User navigates to data-heavy pages

**Test Steps**:
1. Navigate to sales log with 1000+ records
2. Measure data loading time
3. Test pagination performance
4. Verify real-time update performance

**Expected Results**:
- Data loads within 2 seconds
- Pagination is responsive
- Real-time updates don't impact performance
- UI remains responsive during data operations
- Memory usage stays within acceptable limits

**Acceptance Criteria**:
- Data loading meets performance benchmarks
- Pagination handles large datasets efficiently
- Real-time features don't degrade performance
- Memory leaks are prevented

### TC-PF-003: Chart Rendering Performance
**Priority**: Low  
**Requirements**: 3.5  

**Preconditions**:
- Dashboard contains multiple charts
- Large dataset is available for charting

**Test Steps**:
1. Navigate to dashboard
2. Measure chart rendering time
3. Test chart updates with new data
4. Verify responsiveness during interactions

**Expected Results**:
- Charts render within 1 second
- Updates are smooth and responsive
- Interactions don't cause lag
- Charts scale well with data size
- Animation performance is acceptable

**Acceptance Criteria**:
- Chart rendering meets performance targets
- User interactions are responsive
- Data updates are handled efficiently
- Visual performance is smooth

---

## Test Execution Summary

### Test Coverage Matrix

| Module | Total Tests | Critical | High | Medium | Low |
|--------|-------------|----------|------|--------|-----|
| Sales Management | 4 | 3 | 1 | 0 | 0 |
| Customer Management | 5 | 2 | 2 | 1 | 0 |
| Dashboard & Analytics | 3 | 3 | 0 | 0 | 0 |
| Authentication & Security | 2 | 2 | 0 | 0 | 0 |
| Reporting & Export | 3 | 0 | 0 | 3 | 0 |
| UI/UX & Accessibility | 3 | 0 | 0 | 2 | 1 |
| Data Validation | 3 | 1 | 0 | 2 | 0 |
| Performance | 3 | 0 | 0 | 2 | 1 |
| **Total** | **26** | **11** | **3** | **10** | **2** |

### Acceptance Criteria Summary

Each test case includes specific acceptance criteria that must be met for the test to pass. These criteria ensure:

1. **Functional Requirements**: All specified functionality works correctly
2. **Data Integrity**: Data consistency is maintained across operations
3. **User Experience**: Interface is intuitive and responsive
4. **Performance**: System meets performance benchmarks
5. **Security**: Data protection and access control work properly
6. **Accessibility**: Application is usable by all users
7. **Cross-browser Compatibility**: Functionality works across browsers
8. **Error Handling**: System handles errors gracefully

### Test Execution Guidelines

1. **Prerequisites**: Ensure all preconditions are met before test execution
2. **Test Data**: Use consistent test data across test runs
3. **Environment**: Execute tests in controlled environment
4. **Documentation**: Record all test results and observations
5. **Bug Reporting**: Document any failures with detailed reproduction steps
6. **Regression Testing**: Re-run tests after bug fixes
7. **Sign-off**: Obtain stakeholder approval for test results

This comprehensive test case specification ensures thorough validation of all system functionality and provides clear acceptance criteria for each test scenario.