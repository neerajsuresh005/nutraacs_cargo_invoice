import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FormInput, FormSelect } from '../ui/FormField';
import { Button } from '../ui/Button';
import { AirlineChargesDetails, OtherCharge } from '../../types';
import { useChargesStore } from '../../store/chargesStore';
import { sumOtherCharges } from '../../utils/calculations';
import { Trash2 } from 'lucide-react';
import { mockLedgers } from '../../data/mockData';

interface AirlineChargesSectionProps {
  airlineChargesDetails: Partial<AirlineChargesDetails>;
  onUpdate: (field: keyof AirlineChargesDetails, value: any) => void;
}

const AirlineChargesSection: React.FC<AirlineChargesSectionProps> = ({ 
  airlineChargesDetails, 
  onUpdate
}) => {
  const { charges } = useChargesStore();
  const availableCarrierCharges = charges.filter(
    charge => charge.type === 'airline' && charge.isActive
  );

  const handleAddCharge = () => {
    const currentCharges = airlineChargesDetails.otherChargesDueCarrier || [];
    const unusedCharges = availableCarrierCharges.filter(
      charge => !currentCharges.some(c => c.chargeDefinitionId === charge.id)
    );
    
    if (unusedCharges.length > 0) {
      const chargeDef = unusedCharges[0];
      const newCharge: OtherCharge = {
        id: crypto.randomUUID(),
        chargeDefinitionId: chargeDef.id,
        code: chargeDef.code,
        description: chargeDef.description,
        amount: chargeDef.defaultAmount,
        remark: chargeDef.remark,
        type: 'carrier',
        // Add ledgerId from charge definition if available
        ledgerId: chargeDef.ledgerId
      };
      onUpdate('otherChargesDueCarrier', [...currentCharges, newCharge]);
    }
  };

  const handleUpdateCharge = (index: number, field: keyof OtherCharge, value: any) => {
    const updatedCharges = [...(airlineChargesDetails.otherChargesDueCarrier || [])];
    updatedCharges[index] = { ...updatedCharges[index], [field]: value };
    onUpdate('otherChargesDueCarrier', updatedCharges);
  };

  const handleRemoveCharge = (index: number) => {
    const updatedCharges = [...(airlineChargesDetails.otherChargesDueCarrier || [])];
    updatedCharges.splice(index, 1);
    onUpdate('otherChargesDueCarrier', updatedCharges);
  };

  const otherChargesTotal = airlineChargesDetails.otherChargesDueCarrier 
    ? sumOtherCharges(airlineChargesDetails.otherChargesDueCarrier) 
    : 0;

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle>Charges from Airline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Total</label>
            <FormInput 
              type="number"
              value={airlineChargesDetails.total || 0}
              onChange={(e) => onUpdate('total', parseFloat(e.target.value) || 0)}
              readOnly
              className="bg-neutral-50"
            />
            <small className="text-neutral-500">Chargeable Weight × Rate</small>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Commission</label>
            <FormInput 
              type="number"
              min="0"
              step="0.01"
              value={airlineChargesDetails.commission || 0}
              onChange={(e) => onUpdate('commission', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Net to Airline</label>
            <FormInput 
              type="number"
              value={(airlineChargesDetails.total || 0) - (airlineChargesDetails.commission || 0)}
              readOnly
              className="bg-neutral-50"
            />
            <small className="text-neutral-500">Total - Commission</small>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Input VAT</label>
            <FormInput 
              type="number"
              min="0"
              step="0.01"
              value={airlineChargesDetails.inputVat || 0}
              onChange={(e) => onUpdate('inputVat', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-3 text-neutral-700 border-b pb-1">Other Charges Due Carrier</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Remark</th>
                  <th className="px-4 py-2 text-left w-16">Action</th>
                </tr>
              </thead>
              <tbody>
                {(airlineChargesDetails.otherChargesDueCarrier || []).map((charge, index) => (
                  <tr key={charge.id} className="border-b">
                    <td className="px-4 py-2">
                      <FormInput 
                        value={charge.code} 
                        onChange={(e) => handleUpdateCharge(index, 'code', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <FormInput 
                        value={charge.description} 
                        onChange={(e) => handleUpdateCharge(index, 'description', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <FormInput 
                        type="number"
                        min="0"
                        step="0.01"
                        value={charge.amount} 
                        onChange={(e) => handleUpdateCharge(index, 'amount', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <FormInput 
                        value={charge.remark} 
                        onChange={(e) => handleUpdateCharge(index, 'remark', e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveCharge(index)}
                      >
                        <Trash2 className="h-4 w-4 text-error-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {(airlineChargesDetails.otherChargesDueCarrier || []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-3 text-center text-neutral-500 italic">
                      No charges added yet
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-50">
                  <td colSpan={2} className="px-4 py-2 font-medium text-right">Total Other Charges Due Carrier</td>
                  <td className="px-4 py-2 font-medium">{otherChargesTotal.toFixed(2)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleAddCharge}
              disabled={!availableCarrierCharges.length}
            >
              Add Carrier Charge
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirlineChargesSection;
