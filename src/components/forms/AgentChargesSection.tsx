import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FormInput, FormSelect } from '../ui/FormField';
import { Button } from '../ui/Button';
import { AgentChargesDetails, OtherCharge } from '../../types';
import { useChargesStore } from '../../store/chargesStore';
import { sumOtherCharges } from '../../utils/calculations';
import { Trash2 } from 'lucide-react';
import { mockLedgers } from '../../data/mockData';

interface AgentChargesSectionProps {
  agentChargesDetails: Partial<AgentChargesDetails>;
  onUpdate: (field: keyof AgentChargesDetails, value: any) => void;
}

const AgentChargesSection: React.FC<AgentChargesSectionProps> = ({ 
  agentChargesDetails, 
  onUpdate
}) => {
  const { charges } = useChargesStore();
  const availableAgentCharges = charges.filter(
    charge => (charge.type === 'supplier' || charge.type === 'income') && charge.isActive
  );

  const handleAddCharge = () => {
    const currentCharges = agentChargesDetails.otherChargesDueAgent || [];
    const unusedCharges = availableAgentCharges.filter(
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
        type: 'agent',
        // Add ledgerId from charge definition if available
        ledgerId: chargeDef.ledgerId
      };
      onUpdate('otherChargesDueAgent', [...currentCharges, newCharge]);
    }
  };

  const handleUpdateCharge = (index: number, field: keyof OtherCharge, value: any) => {
    const updatedCharges = [...(agentChargesDetails.otherChargesDueAgent || [])];
    updatedCharges[index] = { ...updatedCharges[index], [field]: value };
    onUpdate('otherChargesDueAgent', updatedCharges);
  };

  const handleRemoveCharge = (index: number) => {
    const updatedCharges = [...(agentChargesDetails.otherChargesDueAgent || [])];
    updatedCharges.splice(index, 1);
    onUpdate('otherChargesDueAgent', updatedCharges);
  };

  const otherChargesTotal = agentChargesDetails.otherChargesDueAgent 
    ? sumOtherCharges(agentChargesDetails.otherChargesDueAgent) 
    : 0;

  // Get charge definition for a specific charge
  const getChargeDefinition = (chargeDefinitionId: string) => {
    return charges.find(c => c.id === chargeDefinitionId);
  };

  // Get filtered ledgers based on charge type
  const getFilteredLedgers = (chargeDefinitionId: string) => {
    const chargeDef = getChargeDefinition(chargeDefinitionId);
    if (!chargeDef) return [];
    
    if (chargeDef.type === 'income') {
      return mockLedgers.filter(ledger => ledger.type === 'income');
    } else if (chargeDef.type === 'supplier') {
      return mockLedgers.filter(ledger => 
        ledger.type === 'liability' || ledger.type === 'expense'
      );
    }
    return [];
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle>Other Charges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-3 text-neutral-700 border-b pb-1">Other Charges Due Agent</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Remark</th>
                  <th className="px-4 py-2 text-left">Ledger</th>
                  <th className="px-4 py-2 text-left w-16">Action</th>
                </tr>
              </thead>
              <tbody>
                {(agentChargesDetails.otherChargesDueAgent || []).map((charge, index) => {
                  const chargeDef = getChargeDefinition(charge.chargeDefinitionId);
                  const needsLedgerMapping = chargeDef && (chargeDef.type === 'supplier' || chargeDef.type === 'income');
                  const filteredLedgers = getFilteredLedgers(charge.chargeDefinitionId);
                  
                  return (
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
                        {needsLedgerMapping ? (
                          <FormSelect
                            value={charge.ledgerId || ''}
                            onChange={(e) => handleUpdateCharge(index, 'ledgerId', e.target.value)}
                            required
                          >
                            <option value="">Select Ledger</option>
                            {filteredLedgers.map(ledger => (
                              <option key={ledger.id} value={ledger.id}>
                                {ledger.name}
                              </option>
                            ))}
                          </FormSelect>
                        ) : (
                          <span className="text-neutral-500 italic">N/A</span>
                        )}
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
                  );
                })}
                {(agentChargesDetails.otherChargesDueAgent || []).length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-center text-neutral-500 italic">
                      No charges added yet
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-50">
                  <td colSpan={2} className="px-4 py-2 font-medium text-right">Total Other Charges Due Agent</td>
                  <td className="px-4 py-2 font-medium">{otherChargesTotal.toFixed(2)}</td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleAddCharge}
              disabled={!availableAgentCharges.length}
            >
              Add Agent Charge
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentChargesSection;
