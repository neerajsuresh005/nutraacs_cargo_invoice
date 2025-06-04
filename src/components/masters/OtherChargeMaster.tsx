import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FormField, FormLabel, FormInput, FormSelect } from '../ui/FormField';
import { Button } from '../ui/Button';
import { OtherCharge } from '../../types';
import { mockLedgers } from '../../data/mockData';
import { useChargesStore } from '../../store/chargesStore';

interface OtherChargeMasterProps {
  onClose: () => void;
}

const OtherChargeMaster: React.FC<OtherChargeMasterProps> = ({ onClose }) => {
  const { charges } = useChargesStore();
  const [selectedCharge, setSelectedCharge] = React.useState<string>('');
  const [selectedLedger, setSelectedLedger] = React.useState<string>('');

  // Get charge definition for a specific charge
  const getChargeDefinition = (chargeId: string) => {
    return charges.find(c => c.id === chargeId);
  };

  // Get filtered ledgers based on charge type
  const getFilteredLedgers = (chargeId: string) => {
    const chargeDef = getChargeDefinition(chargeId);
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

  // Filter charges that need ledger mapping (supplier or income types)
  const mappableCharges = charges.filter(
    charge => (charge.type === 'supplier' || charge.type === 'income') && charge.isActive
  );

  // Handle charge selection
  const handleChargeChange = (chargeId: string) => {
    setSelectedCharge(chargeId);
    const charge = getChargeDefinition(chargeId);
    setSelectedLedger(charge?.ledgerId || '');
  };

  // Get the current charge's ledger name
  const getCurrentLedgerName = () => {
    if (!selectedLedger) return 'Not mapped';
    const ledger = mockLedgers.find(l => l.id === selectedLedger);
    return ledger ? `${ledger.name} (${ledger.code})` : 'Unknown';
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Map Ledger Accounts for Other Charges</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-sm text-blue-700">
            Use this interface to map ledger accounts to supplier and income type charges. 
            These mappings will be used for accounting entries when the charges are included in invoices.
          </p>
        </div>

        <FormField>
          <FormLabel>Select Charge</FormLabel>
          <FormSelect
            value={selectedCharge}
            onChange={(e) => handleChargeChange(e.target.value)}
          >
            <option value="">-- Select a charge to map --</option>
            {mappableCharges.map(charge => (
              <option key={charge.id} value={charge.id}>
                {charge.code} - {charge.description} ({charge.type})
              </option>
            ))}
          </FormSelect>
        </FormField>

        {selectedCharge && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField>
                <FormLabel>Charge Type</FormLabel>
                <FormInput
                  value={getChargeDefinition(selectedCharge)?.type || ''}
                  readOnly
                  className="bg-neutral-50"
                />
              </FormField>
              
              <FormField>
                <FormLabel>Current Ledger</FormLabel>
                <FormInput
                  value={getCurrentLedgerName()}
                  readOnly
                  className="bg-neutral-50"
                />
              </FormField>
            </div>

            <FormField>
              <FormLabel required>Map to Ledger</FormLabel>
              <FormSelect
                value={selectedLedger}
                onChange={(e) => setSelectedLedger(e.target.value)}
              >
                <option value="">-- Select ledger account --</option>
                {getFilteredLedgers(selectedCharge).map(ledger => (
                  <option key={ledger.id} value={ledger.id}>
                    {ledger.name} ({ledger.code}) - {ledger.type}
                  </option>
                ))}
              </FormSelect>
              <small className="text-neutral-500">
                Select the appropriate ledger account based on the charge type
              </small>
            </FormField>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="primary"
                onClick={() => {
                  // Update the charge with the selected ledger
                  if (selectedCharge && selectedLedger) {
                    const chargeStore = useChargesStore.getState();
                    chargeStore.updateCharge(selectedCharge, { ledgerId: selectedLedger });
                    // Reset selection
                    setSelectedCharge('');
                    setSelectedLedger('');
                  }
                }}
                disabled={!selectedLedger}
              >
                Save Mapping
              </Button>
            </div>
          </>
        )}

        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-medium mb-4">Current Ledger Mappings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Mapped Ledger</th>
                </tr>
              </thead>
              <tbody>
                {mappableCharges.map(charge => {
                  const ledger = mockLedgers.find(l => l.id === charge.ledgerId);
                  return (
                    <tr key={charge.id} className="border-b">
                      <td className="px-4 py-2">{charge.code}</td>
                      <td className="px-4 py-2">{charge.description}</td>
                      <td className="px-4 py-2">{charge.type}</td>
                      <td className="px-4 py-2">
                        {ledger ? (
                          <span className="text-success-600">{ledger.name} ({ledger.code})</span>
                        ) : (
                          <span className="text-error-500 italic">Not mapped</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {mappableCharges.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-center text-neutral-500 italic">
                      No mappable charges found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherChargeMaster;
