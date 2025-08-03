# Expense Tracker Lite

A modern, responsive expense tracking application built with React, TypeScript, and Tailwind CSS. Track your expenses, manage categories, and view spending analytics with a clean, intuitive interface.

## Overview

This application helps users track personal expenses with features like:
- Add and categorize expenses
- Custom category creation with icons and colors
- Multi-currency support with real-time conversion
- Receipt upload and storage
- Responsive design for mobile and desktop
- Local data persistence

**Note**: This is a demo application with dummy authentication. You can access the dashboard with any email and password combination.

## Architecture & Structure

```
src/
├── components/
│   ├── dashboardPage/
│   │   ├── AddCategoryPopup/
│   │   │   ├── AddCategoryPopup.tsx
│   │   │   ├── PopupHeader.tsx
│   │   │   ├── IconSelector.tsx
│   │   │   └── ColorSelector.tsx
│   │   └── AddExpensePopup/
│   │       ├── AddExpensePopup.tsx
│   │       ├── MobileHeader.tsx
│   │       ├── ExpenseForm.tsx
│   │       └── CategoryGrid.tsx
│   ├── loginPage/
│   └── shared/
├── data/
│   ├── expenses.ts
│   └── expenseTypes.ts
├── types/
│   ├── addCategoryPopupTypes.ts
│   ├── addExpensePopupTypes.ts
│   └── buttonTypes.ts
├── schemas/
│   ├── addCategoryPopupSchema.ts
│   └── addExpensePopupSchema.ts
├── utils/
│   ├── categoryUtils.ts
│   └── fileUtils.ts
├── constants/
│   ├── categoryOptions.ts
│   └── currencyOptions.ts
└── testing/
    ├── expenseValidation.test.ts
    ├── currencyCalculation.test.ts
    ├── pagination.test.ts
    └── ExpenseItem.test.tsx
```

### Key Design Decisions

- **Component Modularity**: Large components broken into smaller, focused pieces
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Form Validation**: Yup schemas for client-side validation
- **State Management**: React hooks for local state, localStorage for persistence
- **Animation**: GSAP for smooth UI transitions

## API Integration

### Currency Conversion API
- **Service**: exchangerate-api.com
- **Implementation**: `convertToUSD()` function in `src/data/expenses.ts`
- **Features**:
  - Real-time currency conversion to USD
  - Fallback handling for API failures
  - Caching to reduce API calls
  - Error handling with default values

```typescript
// Example usage
const expense = await addExpense({
  amount: 100,
  currency: "EUR",
  category: "food",
  date: "2024-01-15"
});
// Automatically converts EUR to USD for storage
```

### Local Storage API
- **Purpose**: Persistent data storage
- **Implementation**: Browser localStorage with JSON serialization
- **Data Types**: Expenses, categories, user preferences
- **Error Handling**: Try-catch blocks with fallback defaults

## Pagination Strategy

### Local Pagination
The application uses client-side pagination for better performance and offline capability:

- **Implementation**: `filterExpensesByPeriod()` in utils
- **Periods**: Today, This Week, This Month, All Time
- **Benefits**:
  - Instant filtering without API calls
  - Works offline
  - Smooth user experience
  - No server load

### Trade-offs
- **Pros**: Fast, offline-capable, no server costs
- **Cons**: Limited to client data, no cross-device sync
- **Future**: Could implement server-side pagination for large datasets

## UI Screenshots

### Desktop Dashboard
![Desktop Dashboard](screenshots/desktop-dashboard.png)
*Clean, card-based layout with expense summary and quick actions*

### Mobile Add Expense
![Mobile Add Expense](screenshots/mobile-add-expense.png)
*Full-screen form with smooth slide animations*

### Category Management
![Category Management](screenshots/category-management.png)
*Visual category grid with custom icons and colors*

## Trade-offs & Assumptions

### Technical Trade-offs
1. **Local Storage vs Database**
   - Chose localStorage for simplicity and offline capability
   - Trade-off: No cross-device sync or backup

2. **Client-side vs Server-side Pagination**
   - Implemented client-side for performance
   - Trade-off: Limited to local data

3. **Animation Complexity**
   - Used GSAP for smooth animations
   - Trade-off: Increased bundle size

### Design Assumptions
1. **User Behavior**: Users primarily track personal expenses
2. **Data Volume**: Moderate expense count (< 1000 items)
3. **Device Usage**: Mobile-first with desktop support
4. **Network**: Intermittent connectivity expected

### Performance Considerations
- Lazy loading for large expense lists
- Debounced search inputs
- Optimized re-renders with React.memo
- Efficient localStorage operations

## How to Run the Project

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd expense-tracker-lite

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
```

### Environment Setup
1. **API Key**: Get free API key from [exchangerate-api.com](https://exchangerate-api.com)
2. **Environment Variables**: Create `.env.local`:
   ```
   VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

### Demo Access
- **Login**: Use any email and password combination
- **Authentication**: No real authentication - demo only
- **Data**: All data is stored locally in your browser
- **Features**: Core expense tracking works, other features are UI demos

### Development Workflow
1. Start the dev server: `npm run dev`
2. Open browser to `http://localhost:5173`
3. Test on mobile: Use network URL from terminal
4. Run tests: `npm test`

## Known Bugs & Unimplemented Features

### Demo Features
1. **Dummy Authentication**
   - Login accepts any email/password combination
   - No actual authentication or user management
   - Forgot password and signup pages are for UI demonstration only

2. **Demo Navigation**
   - Profile page and footer icons are placeholder UI
   - No actual functionality - just for user experience demonstration
   - All data is stored locally in browser

### Known Issues
1. **Currency API Rate Limits**
   - Free tier has 1000 requests/month
   - Solution: Implement better caching

2. **Large File Uploads**
   - Receipt images can be slow to process
   - Solution: Add file size limits and compression

3. **Mobile Safari**
   - Occasional animation glitches
   - Workaround: Reduced animation complexity

### Unimplemented Features
1. **Real Authentication**
   - User registration and login system
   - Password reset functionality
   - Priority: High (currently demo only)

2. **Data Export**
   - CSV/PDF export functionality
   - Priority: Medium

3. **Budget Tracking**
   - Monthly budget limits and alerts
   - Priority: High

4. **Multi-user Support**
   - User accounts and authentication
   - Priority: Low

5. **Cloud Sync**
   - Cross-device data synchronization
   - Priority: Medium

6. **Advanced Analytics**
   - Spending trends and insights
   - Priority: Medium

7. **Profile Management**
   - User profile settings and preferences
   - Priority: Low (currently demo only)

### Future Enhancements
- Dark mode support
- Offline-first architecture
- Push notifications for budget alerts
- Integration with banking APIs
- Advanced reporting and charts

## Testing

The project includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- expenseValidation.test.ts

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage
- **Expense Validation**: Form validation logic
- **Currency Calculation**: USD conversion accuracy
- **Pagination Logic**: Date filtering functionality
- **Utility Functions**: Helper method testing

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and add tests
4. Run test suite: `npm test`
5. Submit pull request

## License

MIT License - see LICENSE file for details

---

**Demo Application Notice**: This is a demonstration application with dummy authentication and placeholder features. The core expense tracking functionality works, but login, profile, and other UI elements are for demonstration purposes only. For production use, implement proper authentication, data backup, and server-side validation.
