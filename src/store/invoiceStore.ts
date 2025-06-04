import { create } from 'zustand';
import { 
  AwbInvoice, 
  InvoiceDetails, 
  AwbDetails, 
  CustomerRouteDetails, 
  AirlineCargoDetails, 
  AirlineChargesDetails, 
  AgentChargesDetails
} from '../types';
import { recalculateInvoice } from '../utils/calculations';
import { mockCarrierCharges, mockAgentCharges } from '../data/mockData';

interface InvoiceState {
  invoice: Partial<AwbInvoice>;
  updateInvoiceDetails: (field: keyof InvoiceDetails, value: any) => void;
  updateAwbDetails: (field: keyof AwbDetails, value: any) => void;
  updateCustomerRouteDetails: (field: keyof CustomerRouteDetails, value: any) => void;
  updateAirlineCargoDetails: (field: keyof AirlineCargoDetails, value: any) => void;
  updateAirlineChargesDetails: (field: keyof AirlineChargesDetails, value: any) => void;
  updateAgentChargesDetails: (field: keyof AgentChargesDetails, value: any) => void;
  recalculateAllTotals: () => void;
  resetInvoice: () => void;
  // In a real app, we would add methods for saving to backend
  saveInvoice: () => Promise<boolean>;
}

// Initial state
const initialInvoice: Partial<AwbInvoice> = {
  invoiceDetails: {
    isCredit: false,
    invoiceNo: 'INV-AUTO-GEN',
    invoiceDate: new Date().toISOString().split('T')[0],
  },
  awbDetails: {
    awbNumber: '',
    dateOfIssue: new Date().toISOString().split('T')[0],
    placeOfIssue: '',
    issuingCarrierAgent: '',
  },
  customerRouteDetails: {
    shipperName: '',
    shipperAddress: '',
    consigneeName: '',
    consigneeAddress: '',
    originAirportId: '',
    destinationAirportId: '',
  },
  airlineCargoDetails: {
    airlineId: '',
    carrier: '',
    flightNumber: '',
    pieces: 0,
    weight: 0,
    chargeableWeight: 0,
    rateClass: '',
    rateCharge: 0,
    total: 0,
    isDangerousGoods: false,
    natureOfGoods: '',
  },
  airlineChargesDetails: {
    total: 0,
    commission: 0,
    netToAirline: 0,
    inputVat: 0,
    otherChargesDueCarrier: [],
  },
  agentChargesDetails: {
    otherChargesDueAgent: [],
  },
  calculatedTotals: {
    weightCharge: 0,
    totalInvoiceAmount: 0,
    outputVat: 0,
    sellingPrice: 0,
  },
};

// Create the store
export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoice: initialInvoice,

  updateInvoiceDetails: (field, value) => {
    set((state) => ({
      invoice: {
        ...state.invoice,
        invoiceDetails: {
          ...state.invoice.invoiceDetails,
          [field]: value,
        },
      },
    }));
  },

  updateAwbDetails: (field, value) => {
    set((state) => ({
      invoice: {
        ...state.invoice,
        awbDetails: {
          ...state.invoice.awbDetails,
          [field]: value,
        },
      },
    }));
  },

  updateCustomerRouteDetails: (field, value) => {
    set((state) => ({
      invoice: {
        ...state.invoice,
        customerRouteDetails: {
          ...state.invoice.customerRouteDetails,
          [field]: value,
        },
      },
    }));
  },

  updateAirlineCargoDetails: (field, value) => {
    set((state) => {
      const updatedInvoice = {
        ...state.invoice,
        airlineCargoDetails: {
          ...state.invoice.airlineCargoDetails,
          [field]: value,
        },
      };
      
      // Recalculate the invoice whenever a field that affects calculations changes
      return {
        invoice: recalculateInvoice(updatedInvoice),
      };
    });
  },

  updateAirlineChargesDetails: (field, value) => {
    set((state) => {
      const updatedInvoice = {
        ...state.invoice,
        airlineChargesDetails: {
          ...state.invoice.airlineChargesDetails,
          [field]: value,
        },
      };
      
      return {
        invoice: recalculateInvoice(updatedInvoice),
      };
    });
  },

  updateAgentChargesDetails: (field, value) => {
    set((state) => {
      const updatedInvoice = {
        ...state.invoice,
        agentChargesDetails: {
          ...state.invoice.agentChargesDetails,
          [field]: value,
        },
      };
      
      return {
        invoice: recalculateInvoice(updatedInvoice),
      };
    });
  },

  recalculateAllTotals: () => {
    set((state) => ({
      invoice: recalculateInvoice(state.invoice),
    }));
  },

  resetInvoice: () => {
    set({ invoice: initialInvoice });
  },

  saveInvoice: async () => {
    // In a real app, this would send data to a backend API
    console.log('Saving invoice:', get().invoice);
    
    // Simulate successful save
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  },
}));