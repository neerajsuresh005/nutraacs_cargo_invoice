import { Airport, Airline, Branch, Currency, Customer, Salesman, OtherCharge } from '../types';

// Add Ledger interface and mock data
export interface Ledger {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'income' | 'expense';
  isActive: boolean;
}

export const mockLedgers: Ledger[] = [
  { id: '1', code: 'SALES-REV', name: 'Sales Revenue', type: 'income', isActive: true },
  { id: '2', code: 'SERV-INC', name: 'Service Income', type: 'income', isActive: true },
  { id: '3', code: 'MISC-INC', name: 'Miscellaneous Income', type: 'income', isActive: true },
  { id: '4', code: 'SUPP-PAY', name: 'Supplier Payable', type: 'liability', isActive: true },
  { id: '5', code: 'AGENT-PAY', name: 'Agent Payable', type: 'liability', isActive: true },
  { id: '6', code: 'CUST-CLEAR', name: 'Customs Clearance Expense', type: 'expense', isActive: true },
  { id: '7', code: 'HAND-EXP', name: 'Handling Expense', type: 'expense', isActive: true },
  { id: '8', code: 'ADMIN-EXP', name: 'Administrative Expense', type: 'expense', isActive: true }
];

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Global Logistics Ltd', address: '123 Business Park, Dubai, UAE', contactNumber: '+971 4 123 4567' },
  { id: '2', name: 'FastShip International', address: '456 Shipping Lane, Doha, Qatar', contactNumber: '+974 4 987 6543' },
  { id: '3', name: 'Cargo Express LLC', address: '789 Transport Avenue, Riyadh, KSA', contactNumber: '+966 11 654 3210' }
];

export const mockBranches: Branch[] = [
  { id: '1', name: 'Dubai Main', code: 'DXB01' },
  { id: '2', name: 'Doha Office', code: 'DOH01' },
  { id: '3', name: 'Riyadh Branch', code: 'RUH01' }
];

export const mockCurrencies: Currency[] = [
  { id: '1', code: 'USD', name: 'US Dollar', exchangeRate: 1.00 },
  { id: '2', code: 'EUR', name: 'Euro', exchangeRate: 0.92 },
  { id: '3', code: 'AED', name: 'UAE Dirham', exchangeRate: 3.67 },
  { id: '4', code: 'QAR', name: 'Qatari Riyal', exchangeRate: 3.64 }
];

export const mockSalesmen: Salesman[] = [
  { id: '1', name: 'Ahmed Hassan', code: 'AH001' },
  { id: '2', name: 'Sara Khan', code: 'SK002' },
  { id: '3', name: 'Mohammed Ali', code: 'MA003' }
];

export const mockAirports: Airport[] = [
  { id: '1', code: 'DXB', name: 'Dubai International Airport', country: 'UAE' },
  { id: '2', code: 'DOH', name: 'Hamad International Airport', country: 'Qatar' },
  { id: '3', code: 'RUH', name: 'King Khalid International Airport', country: 'Saudi Arabia' },
  { id: '4', code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', country: 'Spain' },
  { id: '5', code: 'SAL', name: 'El Salvador International Airport', country: 'El Salvador' },
  { id: '6', code: 'LHR', name: 'London Heathrow Airport', country: 'United Kingdom' },
  { id: '7', code: 'JFK', name: 'John F. Kennedy International Airport', country: 'USA' }
];

export const mockAirlines: Airline[] = [
  { id: '1', name: 'Qatar Airways', code: 'QR' },
  { id: '2', name: 'Emirates', code: 'EK' },
  { id: '3', name: 'American Airlines Inc.', code: 'AA' },
  { id: '4', name: 'British Airways', code: 'BA' },
  { id: '5', name: 'Lufthansa', code: 'LH' }
];

export const mockCarrierCharges: OtherCharge[] = [
  { code: 'AWC', description: 'Airline War Risk', amount: 110, remark: 'Airlines', type: 'carrier' },
  { code: 'FUE', description: 'Fuel Surcharge', amount: 250, remark: 'Airlines', type: 'carrier' },
  { code: 'INS', description: 'Insurance Fee', amount: 75, remark: 'Airlines', type: 'carrier' },
  { code: 'HAZ', description: 'Hazardous Material', amount: 180, remark: 'Airlines', type: 'carrier' }
];

export const mockAgentCharges: OtherCharge[] = [
  { code: 'FEA', description: 'Handling Fee', amount: 187.5, remark: 'G.H.', type: 'agent' },
  { code: 'SCA', description: 'Security Charge', amount: 56.25, remark: 'G.H.', type: 'agent' },
  { code: 'SSA', description: 'Screening Charge', amount: 126.5, remark: 'G.H.', type: 'agent' },
  { code: 'KBA', description: 'Booking Charge', amount: 20.24, remark: 'G.H.', type: 'agent' },
  { code: 'MAA', description: 'Misc. Airport Authority', amount: 20, remark: 'G.H.', type: 'agent' },
  { code: 'CCC', description: 'Customs Clearance', amount: 113.85, remark: 'AI', type: 'agent' },
  { code: 'MBA', description: 'Admin/Baggage', amount: 700.89, remark: 'ABA', type: 'agent' },
  { code: 'CCA', description: 'Customs & Clearance', amount: 1140, remark: 'Customs', type: 'agent' }
];
