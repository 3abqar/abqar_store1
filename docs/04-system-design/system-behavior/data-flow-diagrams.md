# Data Flow and System Behavior Diagrams

## Context-Level Data Flow Diagram (Level 0)

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

## Level 1 Data Flow Diagram - System Decomposition

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

## Level 2 Data Flow Diagram - Sales Transaction Management

```mermaid
graph TD
    subgraph "External"
        User[User]
        CustomerDB[(Customer Database)]
        ServiceDB[(Service Database)]
        SalesDB[(Sales Database)]
        AuditDB[(Audit Log Database)]
    end
    
    subgraph "Sales Transaction Management (Process 1.0)"
        P11[1.1 Validate Transaction Data]
        P12[1.2 Calculate Profit & Pricing]
        P13[1.3 Update Customer Loyalty Points]
        P14[1.4 Record Transaction]
        P15[1.5 Generate Transaction Receipt]
    end
    
    User -->|Raw Transaction Data| P11
    P11 -->|Validation Errors| User
    P11 -->|Valid Transaction Data| P12
    
    P12 <-->|Service Pricing| ServiceDB
    P12 -->|Calculated Transaction| P13
    
    P13 <-->|Customer Loyalty Data| CustomerDB
    P13 -->|Updated Transaction| P14
    
    P14 -->|Transaction Record| SalesDB
    P14 -->|Audit Entry| AuditDB
    P14 -->|Transaction Confirmation| P15
    
    P15 -->|Receipt/Confirmation| User
    
    P11 -->|Validation Log| AuditDB
    P12 -->|Calculation Log| AuditDB
    P13 -->|Loyalty Update Log| AuditDB
```

## Sequence Diagrams for Key System Interactions

### 1. Sales Transaction Processing Sequence

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

### 2. Customer Data Management Sequence

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

### 3. Report Generation Sequence

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

## Activity Diagrams for User Workflows

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

## State Diagrams for Object Transitions

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

### 3. Service Catalog State Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft: Service creation started
    
    Draft --> Active: Service published
    Active --> Inactive: Service deactivated
    Inactive --> Active: Service reactivated
    
    Active --> Updating: Price/details change
    Updating --> Active: Update completed
    Updating --> Error: Update failed
    Error --> Active: Retry successful
    Error --> Inactive: Deactivate on error
    
    Active --> Archived: Service discontinued
    Inactive --> Archived: Service discontinued
    Archived --> [*]: Permanent archival
    
    note right of Active
        Service available for
        sales transactions
    end note
    
    note right of Archived
        Service no longer available
        but historical data preserved
    end note
```

## Data Flow Patterns

### 1. Real-time Data Synchronization Pattern

```mermaid
graph TD
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

### 2. Offline Data Handling Pattern

```mermaid
graph TD
    UserAction[User Action]
    NetworkCheck{Network Available?}
    OnlineProcess[Process Online]
    OfflineQueue[Add to Offline Queue]
    LocalStorage[(Local Storage)]
    NetworkRestore[Network Restored]
    SyncQueue[Sync Offline Changes]
    ConflictResolution{Conflicts Detected?}
    ResolveConflicts[Resolve Conflicts]
    UpdateFirestore[Update Firestore]
    NotifyUser[Notify User]
    
    UserAction --> NetworkCheck
    NetworkCheck -->|Yes| OnlineProcess
    NetworkCheck -->|No| OfflineQueue
    OfflineQueue --> LocalStorage
    NetworkRestore --> SyncQueue
    SyncQueue --> ConflictResolution
    ConflictResolution -->|No| UpdateFirestore
    ConflictResolution -->|Yes| ResolveConflicts
    ResolveConflicts --> UpdateFirestore
    UpdateFirestore --> NotifyUser
    OnlineProcess --> NotifyUser
```

### 3. Data Validation and Error Handling Pattern

```mermaid
graph TD
    InputData[Input Data]
    ClientValidation[Client-side Validation]
    ClientValid{Valid?}
    ShowClientErrors[Show Validation Errors]
    SendToServer[Send to Firebase]
    ServerValidation[Server-side Validation]
    ServerValid{Valid?}
    SecurityRules[Firebase Security Rules]
    RulesValid{Rules Pass?}
    SaveData[Save to Database]
    ShowServerErrors[Show Server Errors]
    ShowRuleErrors[Show Permission Errors]
    Success[Operation Success]
    
    InputData --> ClientValidation
    ClientValidation --> ClientValid
    ClientValid -->|No| ShowClientErrors
    ClientValid -->|Yes| SendToServer
    SendToServer --> ServerValidation
    ServerValidation --> ServerValid
    ServerValid -->|No| ShowServerErrors
    ServerValid -->|Yes| SecurityRules
    SecurityRules --> RulesValid
    RulesValid -->|No| ShowRuleErrors
    RulesValid -->|Yes| SaveData
    SaveData --> Success
    
    ShowClientErrors --> InputData
    ShowServerErrors --> InputData
    ShowRuleErrors --> InputData
```

## System Integration Data Flows

### 1. WhatsApp Integration Flow

```mermaid
graph LR
    subgraph "Abqar System"
        CustomerMgmt[Customer Management]
        Marketing[Marketing Module]
        ContactList[Contact List]
    end
    
    subgraph "WhatsApp Service"
        WhatsAppAPI[WhatsApp Business API]
        MessageQueue[Message Queue]
        DeliveryStatus[Delivery Status]
    end
    
    CustomerMgmt -->|Customer Numbers| ContactList
    Marketing -->|Marketing Message| ContactList
    ContactList -->|Formatted Message| WhatsAppAPI
    WhatsAppAPI -->|Queue Message| MessageQueue
    MessageQueue -->|Send Message| DeliveryStatus
    DeliveryStatus -->|Status Update| Marketing
    Marketing -->|Update Campaign Status| CustomerMgmt
```

### 2. PDF Report Generation Flow

```mermaid
graph TD
    ReportRequest[Report Request]
    DataQuery[Query Database]
    DataProcessing[Process & Aggregate Data]
    TemplateSelection[Select Report Template]
    PDFGeneration[Generate PDF Document]
    FileStorage[Store Generated File]
    DownloadLink[Provide Download Link]
    UserDownload[User Downloads Report]
    
    ReportRequest --> DataQuery
    DataQuery --> DataProcessing
    DataProcessing --> TemplateSelection
    TemplateSelection --> PDFGeneration
    PDFGeneration --> FileStorage
    FileStorage --> DownloadLink
    DownloadLink --> UserDownload
    
    subgraph "Data Sources"
        SalesData[(Sales Data)]
        CustomerData[(Customer Data)]
        ServiceData[(Service Data)]
    end
    
    DataQuery --> SalesData
    DataQuery --> CustomerData
    DataQuery --> ServiceData
```

This comprehensive data flow and system behavior documentation provides detailed insights into how data moves through the Abqar Store Sales Management System, how different components interact, and how the system responds to various user actions and state changes. These diagrams serve as essential references for understanding system architecture, debugging issues, and planning future enhancements.