import { create } from 'zustand';
import { ChargeDefinition } from '../types';

interface ChargesState {
  charges: ChargeDefinition[];
  addCharge: (charge: Partial<ChargeDefinition>) => void;
  updateCharge: (id: string, charge: Partial<ChargeDefinition>) => void;
  deleteCharge: (id: string) => void;
}

export const useChargesStore = create<ChargesState>((set) => ({
  charges: [],
  
  addCharge: (chargeData) => {
    const newCharge: ChargeDefinition = {
      id: crypto.randomUUID(),
      code: chargeData.code || '',
      description: chargeData.description || '',
      type: chargeData.type || 'supplier',
      defaultAmount: chargeData.defaultAmount || 0,
      isAutoCalculated: chargeData.isAutoCalculated || false,
      formula: chargeData.formula,
      remark: chargeData.remark || '',
      isActive: true,
      // Include ledgerId if provided
      ledgerId: chargeData.ledgerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      charges: [...state.charges, newCharge],
    }));
  },

  updateCharge: (id, chargeData) => {
    set((state) => ({
      charges: state.charges.map((charge) =>
        charge.id === id
          ? {
              ...charge,
              ...chargeData,
              updatedAt: new Date().toISOString(),
            }
          : charge
      ),
    }));
  },

  deleteCharge: (id) => {
    set((state) => ({
      charges: state.charges.filter((charge) => charge.id !== id),
    }));
  },
}));
