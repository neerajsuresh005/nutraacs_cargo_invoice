# Ledger Mapping Implementation Plan

Based on the analysis of the provided code, I'll implement the following enhancements:

1. Update the ChargeForm component to include ledger mapping fields when charge type is 'supplier' or 'income'
2. Add mock ledger data to support the UI implementation
3. Update the AgentChargesSection to display and allow mapping of ledgers for charges in the invoice module
4. Ensure proper data flow between the charge master and invoice module

## Implementation Details

### 1. ChargeForm Updates
- Add conditional rendering of ledger selection field when type is 'supplier' or 'income'
- Ensure ledgerId is saved with the charge definition

### 2. Mock Ledger Data
- Create mock ledger data structure with appropriate fields
- Add to mockData.ts for testing purposes

### 3. AgentChargesSection Updates
- Add ledger mapping column for supplier and income type charges
- Allow selection/change of ledger mapping in the invoice module
- Display auto-mapped indication for charges with pre-defined ledgers

### 4. Data Flow
- Ensure ledger mapping is preserved when charges are added to invoices
- Allow override of default ledger mapping in the invoice context
