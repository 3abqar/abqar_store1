# Automated Testing Documentation

## Overview

This document provides comprehensive documentation for the automated testing setup in the Abqar Store Sales Management System. The system uses Vitest as the primary testing framework with jsdom for browser environment simulation.

## Testing Framework Setup

### Vitest Configuration

The project uses Vitest for unit and integration testing with the following configuration:

```json
{
  "scripts": {
    "test": "vitest --environment jsdom",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui"
  }
}
```

### Environment Configuration

- **Framework**: Vitest 3.2.4
- **Environment**: jsdom 26.1.0 (browser simulation)
- **Test Files**: `*.test.js` pattern
- **Coverage**: Built-in Vitest coverage reporting
- **Mocking**: Built-in vi.mock() functionality

### Dependencies

```json
{
  "devDependencies": {
    "vitest": "^3.2.4",
    "jsdom": "^26.1.0"
  }
}
```

## Current Test Implementation

### Existing Test File: `src/utils/ui.test.js`

The current test suite covers utility functions with the following test cases:

```javascript
// ui.test.js - Current Implementation
import { describe, test, expect, beforeEach } from "vitest";
import { formatCurrency, setTranslations, setCurrentLanguage } from "./ui.js";

describe("formatCurrency function", () => {
  beforeEach(() => {
    const mockTranslations = {
      ar: { currency: "ج.م" },
      en: { currency: "EGP" },
    };
    setTranslations(mockTranslations);
  });

  test("should format a positive number correctly in Arabic", () => {
    setCurrentLanguage("ar");
    expect(formatCurrency(150)).toBe("150.00 ج.م");
  });

  test("should format a number with decimals correctly in English", () => {
    setCurrentLanguage("en");
    expect(formatCurrency(75.5)).toBe("75.50 EGP");
  });

  test("should format zero correctly", () => {
    setCurrentLanguage("en");
    expect(formatCurrency(0)).toBe("0.00 EGP");
  });

  test("should handle undefined or null values", () => {
    setCurrentLanguage("en");
    expect(formatCurrency(undefined)).toBe("0.00 EGP");
    expect(formatCurrency(null)).toBe("0.00 EGP");
  });
});
```

### Test Coverage Analysis

**Current Coverage**:
- ✅ Currency formatting utility
- ✅ Language switching functionality
- ✅ Translation system
- ❌ Firebase operations (not tested)
- ❌ Business logic calculations
- ❌ UI component interactions
- ❌ Authentication flows

## Recommended Test Expansion

### 1. Business Logic Tests

```javascript
// tests/business-logic.test.js
describe("Sales Calculations", () => {
  test("should calculate profit correctly", () => {
    const sale = { price: 150, serviceCost: 50 };
    expect(calculateProfit(sale)).toBe(100);
  });

  test("should calculate loyalty points with tier multiplier", () => {
    const customer = { tier: "Silver" };
    const saleAmount = 100;
    expect(calculateLoyaltyPoints(saleAmount, customer)).toBe(115);
  });
});
```

### 2. Firebase Integration Tests

```javascript
// tests/firebase.test.js
import { vi } from 'vitest';

describe("Firebase Operations", () => {
  beforeEach(() => {
    // Mock Firebase functions
    vi.mock('../src/backend/firebase.js');
  });

  test("should save sale to Firebase", async () => {
    const saleData = { price: 100, clientName: "Test" };
    const result = await saveSale(saleData);
    expect(result).toBeDefined();
  });
});
```

### 3. UI Component Tests

```javascript
// tests/ui-components.test.js
describe("UI Components", () => {
  test("should render sales table correctly", () => {
    const salesData = [{ id: 1, price: 100, clientName: "Test" }];
    renderSalesLog(salesData);
    expect(document.querySelector('#salesTableBody')).toBeTruthy();
  });
});
```

## Test Execution Commands

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- ui.test.js

# Run tests with coverage
npm run test:coverage
```

### Advanced Test Options

```bash
# Run tests with UI interface
npm run test:ui

# Run tests matching pattern
npm test -- --grep "formatCurrency"

# Run tests with verbose output
npm test -- --reporter=verbose

# Run tests and generate HTML report
npm test -- --reporter=html
```

## Test Data Management

### Mock Data Setup

```javascript
// tests/fixtures/mockData.js
export const mockSalesData = [
  {
    id: "test-1",
    date: "2024-01-15",
    serviceType: "Test Service",
    price: 150,
    serviceCost: 50,
    clientName: "Test Customer",
    whatsappNumber: "201234567890",
    paymentStatus: "paid",
    profit: 100
  }
];

export const mockCustomersData = {
  "201234567890": {
    name: "Test Customer",
    whatsappNumber: "201234567890",
    loyaltyPoints: 500,
    tier: "Bronze",
    tags: ["test"],
    notes: []
  }
};
```

### Test Database Setup

```javascript
// tests/setup/testDb.js
import { initializeTestApp } from '@firebase/rules-unit-testing';

export function setupTestDatabase() {
  const testApp = initializeTestApp({
    projectId: 'test-project',
    auth: { uid: 'test-user' }
  });
  
  return testApp.firestore();
}
```

## Continuous Integration Setup

### GitHub Actions Configuration

```yaml
# .github/workflows/test.yml
name: Run Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Generate coverage report
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
```

## Test Reporting

### Coverage Reports

Vitest generates comprehensive coverage reports including:

- **Line Coverage**: Percentage of code lines executed
- **Function Coverage**: Percentage of functions called
- **Branch Coverage**: Percentage of branches taken
- **Statement Coverage**: Percentage of statements executed

### HTML Coverage Report

```bash
# Generate HTML coverage report
npm run test:coverage -- --reporter=html

# View report in browser
open coverage/index.html
```

### Coverage Thresholds

```javascript
// vitest.config.js
export default {
  test: {
    coverage: {
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
}
```

## Mocking Strategies

### Firebase Mocking

```javascript
// tests/mocks/firebase.js
export const mockFirebaseExports = {
  addDoc: vi.fn().mockResolvedValue({ id: 'mock-id' }),
  updateDoc: vi.fn().mockResolvedValue({}),
  deleteDoc: vi.fn().mockResolvedValue({}),
  getDoc: vi.fn().mockResolvedValue({
    exists: () => true,
    data: () => mockSalesData[0]
  })
};
```

### DOM Mocking

```javascript
// tests/mocks/dom.js
export function mockDOMElements() {
  document.body.innerHTML = `
    <div id="salesTableBody"></div>
    <form id="salesForm"></form>
    <div id="notification"></div>
  `;
}
```

### Chart.js Mocking

```javascript
// tests/mocks/chartjs.js
global.Chart = class MockChart {
  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.data = config.data;
  }
  
  update() {}
  destroy() {}
};
```

## Performance Testing

### Load Testing with Vitest

```javascript
// tests/performance.test.js
describe("Performance Tests", () => {
  test("should render large dataset within time limit", async () => {
    const startTime = performance.now();
    const largeDataset = generateMockSales(1000);
    
    renderSalesLog(largeDataset);
    
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(1000); // 1 second
  });
});
```

### Memory Leak Detection

```javascript
// tests/memory.test.js
describe("Memory Tests", () => {
  test("should not leak memory during chart updates", () => {
    const initialMemory = performance.memory?.usedJSHeapSize || 0;
    
    // Perform operations that might leak memory
    for (let i = 0; i < 100; i++) {
      updateCharts(mockSalesData);
    }
    
    // Force garbage collection if available
    if (global.gc) global.gc();
    
    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 10MB
  });
});
```

## Test Best Practices

### 1. Test Structure

```javascript
describe("Feature Name", () => {
  beforeEach(() => {
    // Setup code
  });

  afterEach(() => {
    // Cleanup code
  });

  test("should do something specific", () => {
    // Arrange
    const input = setupTestData();
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

### 2. Naming Conventions

- **Test Files**: `*.test.js` or `*.spec.js`
- **Test Descriptions**: Use "should" statements
- **Test Groups**: Group related tests with `describe`
- **Mock Files**: Place in `tests/mocks/` directory

### 3. Test Data Management

- Use factories for generating test data
- Keep test data minimal and focused
- Use constants for repeated test values
- Clean up test data after each test

### 4. Assertion Guidelines

```javascript
// Good: Specific assertions
expect(result.status).toBe('success');
expect(result.data).toHaveLength(3);
expect(result.errors).toBeUndefined();

// Avoid: Generic assertions
expect(result).toBeTruthy();
expect(result).toEqual(expect.anything());
```

## Debugging Tests

### Debug Configuration

```javascript
// vitest.config.js
export default {
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    // Enable debugging
    pool: 'forks',
    isolate: false
  }
}
```

### Debug Commands

```bash
# Run tests with debugger
npm test -- --inspect-brk

# Run single test with debugging
npm test -- --inspect-brk ui.test.js

# Run tests with console output
npm test -- --reporter=verbose
```

### Browser Debugging

```javascript
// Add to test file for browser debugging
test("debug test", () => {
  debugger; // Will pause execution
  const result = functionUnderTest();
  console.log(result); // Will show in test output
  expect(result).toBeDefined();
});
```

## Test Maintenance

### Regular Maintenance Tasks

1. **Update Test Dependencies**: Keep Vitest and related packages updated
2. **Review Test Coverage**: Ensure coverage meets project standards
3. **Refactor Tests**: Keep tests maintainable and readable
4. **Remove Obsolete Tests**: Clean up tests for removed features
5. **Update Mock Data**: Keep test data relevant and current

### Test Quality Metrics

- **Test Coverage**: Aim for 80%+ coverage on critical paths
- **Test Speed**: Keep test suite under 30 seconds
- **Test Reliability**: Minimize flaky tests
- **Test Maintainability**: Keep tests simple and focused

## Integration with Development Workflow

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm run test:coverage"
    }
  }
}
```

### IDE Integration

Most modern IDEs support Vitest integration:

- **VS Code**: Vitest extension for inline test results
- **WebStorm**: Built-in Vitest support
- **Vim/Neovim**: Vitest plugins available

### Test-Driven Development

1. **Write Test First**: Create failing test for new feature
2. **Implement Feature**: Write minimal code to pass test
3. **Refactor**: Improve code while keeping tests green
4. **Repeat**: Continue cycle for each feature

This automated testing documentation provides a comprehensive foundation for maintaining and expanding the test suite as the application grows.