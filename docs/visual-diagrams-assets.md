# Visual Diagrams and Assets Documentation

## Overview

This document consolidates all visual diagrams and assets required for the Abqar Store Sales Management System documentation. All diagrams are created using Mermaid syntax for consistency and maintainability.

## Entity Relationship Diagrams

### 1. Complete Database ER Diagram

```mermaid
erDiagram
    SALES {
        string id PK
        string date
        string serviceType
        number price
        number serviceCost
        number profit
        string clientName
        string whatsappNumber FK
        string paymentStatus
        string notes
        timestamp createdAt
        timestamp updatedAt
    }
    
    CUSTOMERS {
        string whatsappNumber PK
        string name
        array tags
        array notes
        number loyaltyPoints
        string tier
        timestamp createdAt
        timestamp updatedAt
        number totalOrders
        number totalSpent
        string lastPurchase
        array purchaseHistory
    }
    
    SERVICES {
        string id PK
        string name
        string category
        number price
        number cost
        string description
        boolean active
        timestamp createdAt
        timestamp updatedAt
    }
    
    AUDIT_LOGS {
        string id PK
        string action
        string userId
        string entityType
        string entityId
        object oldData
        object newData
        timestamp timestamp
        string ipAddress
        string userAgent
    }
    
    CATEGORIES {
        string id PK
        string name
        string description
        number sortOrder
        boolean active
        timestamp createdAt
        timestamp updatedAt
    }
    
    NOTES {
        string id PK
        string customerId FK
        string content
        string type
        timestamp createdAt
        string createdBy
    }
    
    SALES ||--o{ CUSTOMERS : "belongs_to"
    SERVICES ||--o{ SALES : "used_in"
    CUSTOMERS ||--o{ NOTES : "has_many"
    CATEGORIES ||--o{ SERVICES : "categorizes"
    AUDIT_LOGS ||--o{ SALES : "tracks"
    AUDIT_LOGS ||--o{ CUSTOMERS : "tracks"
    AUDIT_LOGS ||--o{ SERVICES : "tracks"
```

### 2. Simplified Business Entity Relationships

```mermaid
erDiagram
    CUSTOMER {
        string whatsappNumber
        string name
        number loyaltyPoints
        string tier
    }
    
    SALE {
        string id
        string date
        number price
        number profit
        string paymentStatus
    }
    
    SERVICE {
        string id
        string name
        number price
        number cost
    }
    
    CUSTOMER ||--o{ SALE : "makes"
    SERVICE ||--o{ SALE : "includes"
```

## Data Flow Diagrams

### 1. Context-Level DFD (Level 0)

```mermaid
graph TD
    subgraph "External Entities"
        StoreOwner[Store Owner]
        SalesStaff[Sales Staff]
        Manager[Store Manager]
        Customer[Customer]
    end
    
    subgraph "Abqar Store Sales System"
        System[Abqar Store Sales Management System]
    end
    
    subgraph "External Systems"
        WhatsApp[WhatsApp Service]
        Firebase[Firebase Backend]
        PDFService[PDF Generation Service]
    end
    
    StoreOwner -->|Sales Data, Customer Info, Service Details| System
    SalesStaff -->|Transaction Data, Customer Updates| System
    Manager -->|Report Requests, Analytics Queries| System
    Customer -->|Purchase Information, Contact Details| System
    
    System -->|Sales Reports, Analytics, Notifications| StoreOwner
    System -->|Transaction Confirmations, Customer Data| SalesStaff
    System -->|Business Reports, Performance Metrics| Manager
    System -->|Loyalty Points, Purchase History| Customer
    
    System -->|Customer Contact Requests| WhatsApp
    System -->|Data Storage/Retrieval, Authentication| Firebase
    System -->|Report Generation Requests| PDFService
    
    WhatsApp -->|Message Delivery Status| System
    Firebase -->|Real-time Data Updates, Auth Status| System
    PDFService -->|Generated Reports| System
```

### 2. Level 1 DFD - System Decomposition

```mermaid
graph TD
    subgraph "External Entities"
        User[System Users]
        Firebase[Firebase Backend]
        External[External Services]
    end
    
    subgraph "Abqar Store Sales System"
        subgraph "Core Processes"
            P1[1.0 Manage Sales Transactions]
            P2[2.0 Manage Customer Data]
            P3[3.0 Manage Service Catalog]
            P4[4.0 Generate Reports & Analytics]
            P5[5.0 Handle Authentication & Security]
        end
        
        subgraph "Data Stores"
            D1[(D1: Sales Data)]
            D2[(D2: Customer Data)]
            D3[(D3: Service Data)]
            D4[(D4: System Logs)]
            D5[(D5: User Sessions)]
        end
    end
    
    User -->|Transaction Details| P1
    User -->|Customer Information| P2
    User -->|Service Details| P3
    User -->|Report Requests| P4
    User -->|Login Credentials| P5
    
    P1 -->|Sales Records| D1
    P1 -->|Customer Updates| D2
    P1 -->|Service Usage| D3
    P1 -->|Transaction Logs| D4
    
    P2 -->|Customer Records| D2
    P2 -->|Activity Logs| D4
    
    P3 -->|Service Records| D3
    P3 -->|Change Logs| D4
    
    P4 -->|Query Results| User
    P4 <-->|Sales Data| D1
    P4 <-->|Customer Data| D2
    P4 <-->|Service Data| D3
    
    P5 -->|Session Data| D5
    P5 -->|Auth Logs| D4
    P5 -->|Auth Status| User
    
    D1 <-->|Data Sync| Firebase
    D2 <-->|Data Sync| Firebase
    D3 <-->|Data Sync| Firebase
    D4 <-->|Log Storage| Firebase
    D5 <-->|Session Management| Firebase
    
    P4 -->|Report Requests| External
    External -->|Generated Reports| P4
```

## Use Case Diagrams

### 1. System Overview Use Case Diagram

```mermaid
graph TB
    subgraph "Abqar Store Sales Management System"
        subgraph "Sales Management"
            UC1[Record New Sale]
            UC2[Edit Sale Record]
            UC3[Delete Sale Record]
            UC4[View Sales History]
            UC5[Filter Sales Data]
        end
        
        subgraph "Customer Management"
            UC6[Add New Customer]
            UC7[View Customer Details]
            UC8[Update Customer Information]
            UC9[Manage Customer Tags]
            UC10[Track Customer Loyalty Points]
        end
        
        subgraph "Financial Management"
            UC11[Track Unpaid Orders]
            UC12[Mark Orders as Paid]
            UC13[Generate Financial Reports]
            UC14[View Profit Analytics]
            UC15[Set Daily Goals]
        end
        
        subgraph "Service Management"
            UC16[Add New Service]
            UC17[Edit Service Details]
            UC18[Delete Service]
            UC19[Manage Service Categories]
            UC20[View Service Catalog]
        end
        
        subgraph "Reporting & Analytics"
            UC21[Generate PDF Reports]
            UC22[Export Customer Data]
            UC23[View Dashboard Analytics]
            UC24[Track Performance Metrics]
        end
    end
    
    StoreOwner[Store Owner]
    SalesStaff[Sales Staff]
    Manager[Store Manager]
    
    StoreOwner --> UC1
    StoreOwner --> UC2
    StoreOwner --> UC3
    StoreOwner --> UC4
    StoreOwner --> UC5
    StoreOwner --> UC6
    StoreOwner --> UC7
    StoreOwner --> UC8
    StoreOwner --> UC9
    StoreOwner --> UC10
    StoreOwner --> UC11
    StoreOwner --> UC12
    StoreOwner --> UC13
    StoreOwner --> UC14
    StoreOwner --> UC15
    StoreOwner --> UC16
    StoreOwner --> UC17
    StoreOwner --> UC18
    StoreOwner --> UC19
    StoreOwner --> UC20
    StoreOwner --> UC21
    StoreOwner --> UC22
    StoreOwner --> UC23
    StoreOwner --> UC24
    
    SalesStaff --> UC1
    SalesStaff --> UC2
    SalesStaff --> UC4
    SalesStaff --> UC5
    SalesStaff --> UC6
    SalesStaff --> UC7
    SalesStaff --> UC8
    SalesStaff --> UC10
    SalesStaff --> UC12
    SalesStaff --> UC20
    
    Manager --> UC4
    Manager --> UC5
    Manager --> UC13
    Manager --> UC14
    Manager --> UC21
    Manager --> UC22
    Manager --> UC23
    Manager --> UC24
```

### 2. Actor-Focused Use Case Diagram

```mermaid
graph LR
    subgraph "Actors"
        StoreOwner[Store Owner]
        SalesStaff[Sales Staff]
        Manager[Store Manager]
    end
    
    subgraph "Core Use Cases"
        ManageSales[Manage Sales Transactions]
        ManageCustomers[Manage Customer Data]
        ManageServices[Manage Service Catalog]
        GenerateReports[Generate Reports]
        ViewAnalytics[View Analytics]
    end
    
    StoreOwner --> ManageSales
    StoreOwner --> ManageCustomers
    StoreOwner --> ManageServices
    StoreOwner --> GenerateReports
    StoreOwner --> ViewAnalytics
    
    SalesStaff --> ManageSales
    SalesStaff --> ManageCustomers
    
    Manager --> GenerateReports
    Manager --> ViewAnalytics
```

## Sequence Diagrams

### 1. Sales Transaction Processing

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant ValidationService
    participant BusinessLogic
    participant FirebaseService
    participant Firestore
    participant NotificationService
    
    User->>UI: Enter sale details
    UI->>ValidationService: Validate input data
    
    alt Validation Success
        ValidationService-->>UI: Validation passed
        UI->>BusinessLogic: Process sale transaction
        BusinessLogic->>BusinessLogic: Calculate profit
        BusinessLogic->>FirebaseService: Save sale record
        FirebaseService->>Firestore: Write sale document
        Firestore-->>FirebaseService: Confirm write
        
        par Update Customer Data
            BusinessLogic->>FirebaseService: Update customer loyalty points
            FirebaseService->>Firestore: Update customer document
            Firestore-->>FirebaseService: Confirm update
        and Log Transaction
            BusinessLogic->>FirebaseService: Create audit log
            FirebaseService->>Firestore: Write audit document
            Firestore-->>FirebaseService: Confirm log
        end
        
        FirebaseService-->>BusinessLogic: Transaction complete
        BusinessLogic-->>UI: Success response
        UI->>NotificationService: Show success message
        NotificationService-->>User: Display confirmation
        
    else Validation Failed
        ValidationService-->>UI: Validation errors
        UI-->>User: Display error messages
    end
```

### 2. Customer Data Management

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant CustomerService
    participant FirebaseService
    participant Firestore
    participant RealtimeListener
    
    User->>UI: Request customer details
    UI->>CustomerService: Get customer data
    CustomerService->>FirebaseService: Query customer by ID
    FirebaseService->>Firestore: Execute query
    Firestore-->>FirebaseService: Return customer data
    FirebaseService-->>CustomerService: Customer record
    
    CustomerService->>CustomerService: Calculate aggregated data
    Note over CustomerService: Total orders, spending, tier
    
    CustomerService-->>UI: Complete customer profile
    UI-->>User: Display customer details
    
    Note over RealtimeListener: Real-time updates
    Firestore->>RealtimeListener: Data change notification
    RealtimeListener->>UI: Update customer display
    UI-->>User: Refresh customer information
```

### 3. Report Generation Process

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant ReportService
    participant DataAggregator
    participant FirebaseService
    participant Firestore
    participant PDFGenerator
    
    User->>UI: Request report generation
    UI->>ReportService: Generate report with parameters
    ReportService->>DataAggregator: Aggregate data for report
    
    par Fetch Sales Data
        DataAggregator->>FirebaseService: Query sales data
        FirebaseService->>Firestore: Execute sales query
        Firestore-->>FirebaseService: Return sales records
        FirebaseService-->>DataAggregator: Sales data
    and Fetch Customer Data
        DataAggregator->>FirebaseService: Query customer data
        FirebaseService->>Firestore: Execute customer query
        Firestore-->>FirebaseService: Return customer records
        FirebaseService-->>DataAggregator: Customer data
    end
    
    DataAggregator->>DataAggregator: Process and analyze data
    DataAggregator-->>ReportService: Aggregated report data
    
    ReportService->>PDFGenerator: Generate PDF report
    PDFGenerator->>PDFGenerator: Create formatted document
    PDFGenerator-->>ReportService: PDF document
    
    ReportService-->>UI: Report ready for download
    UI-->>User: Provide download link
```

## Activity Diagrams

### 1. Sales Entry Workflow

```mermaid
graph TD
    Start([User starts sales entry])
    SelectService[Select service from catalog]
    EnterCustomer[Enter customer information]
    CheckCustomer{Customer exists?}
    CreateCustomer[Create new customer record]
    UpdateCustomer[Load existing customer data]
    EnterPayment[Enter payment details]
    ValidateData{Data valid?}
    ShowErrors[Display validation errors]
    CalculateProfit[Calculate profit automatically]
    CheckLoyalty{Customer has loyalty points?}
    OfferRedemption[Offer points redemption]
    ProcessRedemption{User redeems points?}
    ApplyDiscount[Apply loyalty discount]
    SaveTransaction[Save transaction to database]
    UpdateLoyalty[Update customer loyalty points]
    ShowConfirmation[Show success confirmation]
    PrintReceipt{Print receipt?}
    GenerateReceipt[Generate and print receipt]
    End([Transaction complete])
    
    Start --> SelectService
    SelectService --> EnterCustomer
    EnterCustomer --> CheckCustomer
    CheckCustomer -->|No| CreateCustomer
    CheckCustomer -->|Yes| UpdateCustomer
    CreateCustomer --> EnterPayment
    UpdateCustomer --> EnterPayment
    EnterPayment --> ValidateData
    ValidateData -->|Invalid| ShowErrors
    ShowErrors --> EnterPayment
    ValidateData -->|Valid| CalculateProfit
    CalculateProfit --> CheckLoyalty
    CheckLoyalty -->|No| SaveTransaction
    CheckLoyalty -->|Yes| OfferRedemption
    OfferRedemption --> ProcessRedemption
    ProcessRedemption -->|Yes| ApplyDiscount
    ProcessRedemption -->|No| SaveTransaction
    ApplyDiscount --> SaveTransaction
    SaveTransaction --> UpdateLoyalty
    UpdateLoyalty --> ShowConfirmation
    ShowConfirmation --> PrintReceipt
    PrintReceipt -->|Yes| GenerateReceipt
    PrintReceipt -->|No| End
    GenerateReceipt --> End
```

### 2. Customer Management Workflow

```mermaid
graph TD
    Start([User accesses customer management])
    ViewList[Display customer list]
    SearchFilter{Apply search/filter?}
    ApplyFilter[Apply search criteria]
    SelectAction{Select action}
    ViewDetails[View customer details]
    EditCustomer[Edit customer information]
    AddCustomer[Add new customer]
    DeleteCustomer[Delete customer]
    
    ViewDetailsFlow[Load purchase history]
    ShowLoyalty[Display loyalty points]
    ManageTags[Manage customer tags]
    AddNotes[Add customer notes]
    
    ValidateChanges{Validate changes?}
    ShowValidationErrors[Show validation errors]
    SaveChanges[Save changes to database]
    UpdateAggregates[Update calculated fields]
    ShowSuccess[Show success message]
    RefreshList[Refresh customer list]
    End([Return to customer list])
    
    Start --> ViewList
    ViewList --> SearchFilter
    SearchFilter -->|Yes| ApplyFilter
    SearchFilter -->|No| SelectAction
    ApplyFilter --> SelectAction
    
    SelectAction -->|View| ViewDetails
    SelectAction -->|Edit| EditCustomer
    SelectAction -->|Add| AddCustomer
    SelectAction -->|Delete| DeleteCustomer
    
    ViewDetails --> ViewDetailsFlow
    ViewDetailsFlow --> ShowLoyalty
    ShowLoyalty --> ManageTags
    ManageTags --> AddNotes
    AddNotes --> End
    
    EditCustomer --> ValidateChanges
    AddCustomer --> ValidateChanges
    ValidateChanges -->|Invalid| ShowValidationErrors
    ShowValidationErrors --> EditCustomer
    ValidateChanges -->|Valid| SaveChanges
    SaveChanges --> UpdateAggregates
    UpdateAggregates --> ShowSuccess
    ShowSuccess --> RefreshList
    RefreshList --> End
    
    DeleteCustomer --> SaveChanges
```

## State Diagrams

### 1. Sales Transaction State Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft: User starts entry
    
    Draft --> Validating: Submit form
    Validating --> Draft: Validation failed
    Validating --> Processing: Validation passed
    
    Processing --> Calculating: Calculate profit
    Calculating --> LoyaltyCheck: Check customer loyalty
    
    LoyaltyCheck --> Saving: No loyalty points
    LoyaltyCheck --> RedemptionOffered: Has loyalty points
    
    RedemptionOffered --> Saving: Points not redeemed
    RedemptionOffered --> ApplyingDiscount: Points redeemed
    ApplyingDiscount --> Saving: Discount applied
    
    Saving --> Completed: Save successful
    Saving --> Error: Save failed
    
    Error --> Draft: Retry transaction
    Error --> Cancelled: Cancel transaction
    
    Completed --> [*]: Transaction finalized
    Cancelled --> [*]: Transaction cancelled
    
    note right of Processing
        Business logic processing
        includes profit calculation
        and customer updates
    end note
    
    note right of RedemptionOffered
        User can choose to redeem
        loyalty points for discount
    end note
```

### 2. Customer Lifecycle State Diagram

```mermaid
stateDiagram-v2
    [*] --> New: Customer created
    
    New --> Active: First purchase
    Active --> Returning: Subsequent purchases
    Returning --> Active: Recent purchase
    
    Active --> Inactive: No purchase > 90 days
    Returning --> Inactive: No purchase > 90 days
    Inactive --> Active: New purchase
    
    Active --> VIP: High spending threshold
    Returning --> VIP: High spending threshold
    VIP --> Active: Spending below threshold
    
    New --> Deleted: Admin deletion
    Active --> Deleted: Admin deletion
    Returning --> Deleted: Admin deletion
    Inactive --> Deleted: Admin deletion
    VIP --> Deleted: Admin deletion
    
    Deleted --> [*]: Permanent removal
    
    note right of VIP
        VIP status based on
        total spending and
        purchase frequency
    end note
    
    note right of Inactive
        Customers become inactive
        after 90 days without
        purchases
    end note
```

## Class Diagrams

### 1. High-Level System Class Diagram

```mermaid
classDiagram
    class Application {
        +salesData: Array
        +customersData: Object
        +servicesData: Array
        +currentLanguage: String
        +dailyGoal: Number
        +initializeApp()
        +loadDataAndSetupRealtimeListener()
        +updateAllViews()
    }
    
    class FirebaseService {
        +db: Firestore
        +auth: Auth
        +salesCollection: Collection
        +customersCollection: Collection
        +servicesCollection: Collection
        +addDoc(collection, data)
        +updateDoc(docRef, data)
        +deleteDoc(docRef)
        +onSnapshot(ref, callback)
        +getDoc(docRef)
        +setDoc(docRef, data)
    }
    
    class UIService {
        +currentLanguage: String
        +translations: Object
        +initializeCharts()
        +updateCharts(salesData)
        +renderSalesLog(data, callbacks)
        +renderCustomerDatabase(data, callbacks)
        +showNotification(message, type)
        +setLanguage(lang)
        +formatCurrency(value)
        +formatDate(dateString)
    }
    
    class SalesManager {
        +handleSaveSale(event)
        +editSale(saleId)
        +deleteSale(saleId)
        +markAsPaid(saleId)
        +updateSalesTable()
        +filterSalesByService(serviceName)
        +filterSalesByMonth(monthKey)
    }
    
    class CustomerManager {
        +updateCustomerAggregates()
        +showCustomerDetails(whatsappNumber)
        +addCustomerTag(whatsapp, tag)
        +removeCustomerTag(whatsapp, tag)
        +addCustomerNote(whatsapp, text)
        +handleAddNewCustomer()
        +handleDeleteCustomer(customerId)
    }
    
    class ServiceManager {
        +handleSaveService(event)
        +editService(serviceId)
        +deleteService(serviceId)
        +displayServiceInCatalog(serviceId)
        +handleCatalogSearch(event)
    }
    
    class ReportManager {
        +generatePLReport()
        +exportSalesPDF()
        +exportCustomersPDF()
        +simulateGoal()
        +filterInactiveCustomers()
    }
    
    Application --> FirebaseService
    Application --> UIService
    Application --> SalesManager
    Application --> CustomerManager
    Application --> ServiceManager
    Application --> ReportManager
    
    SalesManager --> FirebaseService
    SalesManager --> UIService
    
    CustomerManager --> FirebaseService
    CustomerManager --> UIService
    
    ServiceManager --> FirebaseService
    ServiceManager --> UIService
    
    ReportManager --> FirebaseService
    ReportManager --> UIService
```

### 2. Data Model Class Diagram

```mermaid
classDiagram
    class Sale {
        +String id
        +String date
        +String serviceType
        +Number price
        +Number serviceCost
        +Number profit
        +String clientName
        +String whatsappNumber
        +String paymentStatus
        +String notes
        +Timestamp createdAt
        +Timestamp updatedAt
        +calculateProfit()
        +validate()
    }
    
    class Customer {
        +String whatsappNumber
        +String name
        +Array tags
        +Array notes
        +Number loyaltyPoints
        +String tier
        +Timestamp createdAt
        +Timestamp updatedAt
        +Number totalOrders
        +Number totalSpent
        +String lastPurchase
        +Array purchaseHistory
        +calculateTier()
        +addLoyaltyPoints(points)
        +redeemPoints(points)
    }
    
    class Service {
        +String id
        +String name
        +String category
        +Number price
        +Number cost
        +String description
        +Boolean active
        +Timestamp createdAt
        +Timestamp updatedAt
        +calculateProfitMargin()
        +activate()
        +deactivate()
    }
    
    class AuditLog {
        +String id
        +String action
        +String userId
        +String entityType
        +String entityId
        +Object oldData
        +Object newData
        +Timestamp timestamp
        +String ipAddress
        +String userAgent
        +log(action, data)
    }
    
    Sale --> Customer : belongs_to
    Sale --> Service : uses
    Customer --> AuditLog : tracked_by
    Sale --> AuditLog : tracked_by
    Service --> AuditLog : tracked_by
```

## Component Diagrams

### 1. System Architecture Components

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        PWA[Progressive Web App]
        LocalStorage[Local Storage]
        ServiceWorker[Service Worker]
    end
    
    subgraph "Presentation Layer"
        UI[User Interface]
        Components[UI Components]
        Charts[Chart.js Visualizations]
        PDF[PDF Generation]
    end
    
    subgraph "Application Layer"
        AppLogic[Application Logic]
        StateManagement[State Management]
        EventHandlers[Event Handlers]
        DataValidation[Data Validation]
    end
    
    subgraph "Service Layer"
        FirebaseService[Firebase Service Layer]
        AuthService[Authentication Service]
        DataService[Data Access Service]
        RealtimeService[Real-time Sync Service]
    end
    
    subgraph "Firebase Backend"
        Firestore[(Firestore Database)]
        Auth[Firebase Auth]
        Hosting[Firebase Hosting]
        Functions[Cloud Functions]
    end
    
    Browser --> PWA
    PWA --> UI
    UI --> Components
    UI --> Charts
    UI --> PDF
    
    Components --> AppLogic
    Charts --> AppLogic
    PDF --> AppLogic
    
    AppLogic --> StateManagement
    AppLogic --> EventHandlers
    AppLogic --> DataValidation
    
    StateManagement --> FirebaseService
    EventHandlers --> FirebaseService
    DataValidation --> FirebaseService
    
    FirebaseService --> AuthService
    FirebaseService --> DataService
    FirebaseService --> RealtimeService
    
    AuthService --> Auth
    DataService --> Firestore
    RealtimeService --> Firestore
    
    PWA --> LocalStorage
    PWA --> ServiceWorker
    
    Hosting --> PWA
```

### 2. UI Component Architecture

```mermaid
graph TD
    App[Main Application]
    
    App --> Dashboard[Dashboard Component]
    App --> SalesEntry[Sales Entry Component]
    App --> CustomerMgmt[Customer Management Component]
    App --> DebtMgmt[Debt Management Component]
    App --> Reports[Reports Component]
    App --> Services[Service Management Component]
    
    Dashboard --> KPICards[KPI Cards]
    Dashboard --> Charts[Chart Components]
    Dashboard --> ActivityFeed[Activity Feed]
    
    SalesEntry --> SalesForm[Sales Form]
    SalesEntry --> SalesTable[Sales Table]
    SalesEntry --> Pagination[Pagination Component]
    
    CustomerMgmt --> CustomerTable[Customer Table]
    CustomerMgmt --> CustomerDetails[Customer Details Modal]
    CustomerMgmt --> LoyaltyPoints[Loyalty Points Component]
    
    Reports --> PDFGenerator[PDF Generator]
    Reports --> DataExporter[Data Exporter]
    Reports --> FilterPanel[Filter Panel]
```

## Deployment Diagrams

### 1. Production Deployment Architecture

```mermaid
graph TB
    subgraph "User Devices"
        Mobile[Mobile Browsers]
        Desktop[Desktop Browsers]
        Tablet[Tablet Browsers]
    end
    
    subgraph "CDN Layer"
        CloudFlare[CloudFlare CDN]
        EdgeCache[Edge Cache Servers]
    end
    
    subgraph "Firebase Infrastructure"
        Hosting[Firebase Hosting]
        Firestore[Firestore Database]
        Auth[Firebase Authentication]
        Functions[Cloud Functions]
        Storage[Cloud Storage]
    end
    
    subgraph "External Services"
        WhatsApp[WhatsApp Business API]
        PDFService[PDF Generation Service]
        Analytics[Google Analytics]
    end
    
    Mobile --> CloudFlare
    Desktop --> CloudFlare
    Tablet --> CloudFlare
    
    CloudFlare --> EdgeCache
    EdgeCache --> Hosting
    
    Hosting --> Firestore
    Hosting --> Auth
    Hosting --> Functions
    Hosting --> Storage
    
    Functions --> WhatsApp
    Functions --> PDFService
    Hosting --> Analytics
```

### 2. Development Environment Setup

```mermaid
graph LR
    Developer[Developer Machine]
    
    subgraph "Local Development"
        ViteServer[Vite Dev Server]
        FirebaseEmulator[Firebase Emulator Suite]
        LocalDB[Local Firestore]
        LocalAuth[Local Auth Emulator]
    end
    
    subgraph "Testing Environment"
        TestDB[Test Firestore]
        TestAuth[Test Authentication]
        CIServer[CI/CD Pipeline]
    end
    
    subgraph "Production Environment"
        ProdDB[Production Firestore]
        ProdAuth[Production Auth]
        ProdHosting[Production Hosting]
    end
    
    Developer --> ViteServer
    ViteServer --> FirebaseEmulator
    FirebaseEmulator --> LocalDB
    FirebaseEmulator --> LocalAuth
    
    CIServer --> TestDB
    CIServer --> TestAuth
    
    CIServer --> ProdDB
    CIServer --> ProdAuth
    CIServer --> ProdHosting
```

## Network and Integration Diagrams

### 1. System Integration Overview

```mermaid
graph TD
    subgraph "Abqar System"
        WebApp[Web Application]
        Database[Firebase Database]
        Auth[Authentication Service]
    end
    
    subgraph "External Integrations"
        WhatsApp[WhatsApp Business API]
        PDF[PDF Generation Service]
        Charts[Chart.js Library]
        Analytics[Google Analytics]
    end
    
    subgraph "User Interfaces"
        WebBrowser[Web Browser]
        MobileApp[Mobile Browser]
    end
    
    WebBrowser --> WebApp
    MobileApp --> WebApp
    
    WebApp --> Database
    WebApp --> Auth
    WebApp --> WhatsApp
    WebApp --> PDF
    WebApp --> Charts
    WebApp --> Analytics
```

### 2. Data Synchronization Flow

```mermaid
graph LR
    subgraph "Client A"
        ClientA_UI[User Interface]
        ClientA_State[Local State]
        ClientA_Listener[Firestore Listener]
    end
    
    subgraph "Client B"
        ClientB_UI[User Interface]
        ClientB_State[Local State]
        ClientB_Listener[Firestore Listener]
    end
    
    subgraph "Firebase Backend"
        Firestore[(Firestore Database)]
        RealtimeEngine[Real-time Engine]
    end
    
    ClientA_UI -->|User Action| ClientA_State
    ClientA_State -->|Data Change| Firestore
    Firestore -->|Change Notification| RealtimeEngine
    RealtimeEngine -->|Push Update| ClientA_Listener
    RealtimeEngine -->|Push Update| ClientB_Listener
    ClientA_Listener -->|Update State| ClientA_State
    ClientB_Listener -->|Update State| ClientB_State
    ClientA_State -->|Render Update| ClientA_UI
    ClientB_State -->|Render Update| ClientB_UI
```

## Summary

This comprehensive visual diagrams and assets documentation provides all the required Mermaid diagrams for the Abqar Store Sales Management System. The diagrams cover:

- **Entity Relationship Diagrams**: Database structure and relationships
- **Data Flow Diagrams**: System data movement and processing
- **Use Case Diagrams**: User interactions and system functionality
- **Sequence Diagrams**: Component interactions over time
- **Activity Diagrams**: User workflow processes
- **State Diagrams**: Object lifecycle and state transitions
- **Class Diagrams**: System structure and relationships
- **Component Diagrams**: System architecture and component organization
- **Deployment Diagrams**: Infrastructure and deployment architecture

All diagrams are properly integrated and referenced throughout the documentation, ensuring consistency and maintainability. The visual assets support the comprehensive understanding of the system's design, architecture, and functionality as required by the academic documentation standards.