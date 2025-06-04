import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { FormField, FormLabel, FormInput, FormSelect, FormToggle } from '../ui/FormField';
import { Button } from '../ui/Button';
import { ChargeDefinition, ChargeType } from '../../types';
import { mockLedgers } from '../../data/mockData';

interface ChargeFormProps {
  charge?: Partial<ChargeDefinition>;
  onSave: (charge: Partial<ChargeDefinition>) => void;
  onCancel: () => void;
}

const ChargeForm: React.FC<ChargeFormProps> = ({
  charge,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState<Partial<ChargeDefinition>>(
    charge || {
      code: '',
      description: '',
      type: 'supplier' as ChargeType,
      defaultAmount: 0,
      isAutoCalculated: false,
      formula: '',
      remark: '',
      isActive: true,
      ledgerId: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Filter ledgers based on charge type
  const getFilteredLedgers = () => {
    if (formData.type === 'income') {
      return mockLedgers.filter(ledger => ledger.type === 'income');
    } else if (formData.type === 'supplier') {
      return mockLedgers.filter(ledger => 
        ledger.type === 'liability' || ledger.type === 'expense'
      );
    }
    return [];
  };

  // Check if ledger mapping is required based on type
  const isLedgerMappingRequired = formData.type === 'supplier' || formData.type === 'income';

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{charge ? 'Edit Charge' : 'Add New Charge'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField>
              <FormLabel required>Code</FormLabel>
              <FormInput
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., FEA"
                maxLength={10}
                required
              />
            </FormField>

            <FormField>
              <FormLabel required>Type</FormLabel>
              <FormSelect
                value={formData.type}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  type: e.target.value as ChargeType,
                  // Clear ledgerId if type changes to airline
                  ledgerId: e.target.value === 'airline' ? '' : formData.ledgerId
                })}
                required
              >
                <option value="supplier">Supplier</option>
                <option value="airline">Airline</option>
                <option value="income">Income</option>
              </FormSelect>
            </FormField>
          </div>

          <FormField>
            <FormLabel required>Description</FormLabel>
            <FormInput
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter charge description"
              required
            />
          </FormField>

          {/* Ledger Mapping Field - Only show for supplier and income types */}
          {isLedgerMappingRequired && (
            <FormField>
              <FormLabel required>Ledger Mapping</FormLabel>
              <FormSelect
                value={formData.ledgerId || ''}
                onChange={(e) => setFormData({ ...formData, ledgerId: e.target.value })}
                required
              >
                <option value="">Select Ledger</option>
                {getFilteredLedgers().map(ledger => (
                  <option key={ledger.id} value={ledger.id}>
                    {ledger.name} ({ledger.code})
                  </option>
                ))}
              </FormSelect>
              <small className="text-neutral-500">
                {formData.type === 'supplier' 
                  ? 'Select the liability or expense ledger for this supplier charge' 
                  : 'Select the income ledger for this revenue charge'}
              </small>
            </FormField>
          )}

          <FormField>
            <FormLabel required>Default Amount</FormLabel>
            <FormInput
              type="number"
              min="0"
              step="0.01"
              value={formData.defaultAmount}
              onChange={(e) => setFormData({ ...formData, defaultAmount: parseFloat(e.target.value) })}
              required
            />
          </FormField>

          <FormField>
            <FormLabel>Remark</FormLabel>
            <FormInput
              value={formData.remark}
              onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
              placeholder="Additional remarks"
            />
          </FormField>

          <FormField>
            <div className="flex items-center space-x-2">
              <FormToggle
                checked={formData.isAutoCalculated}
                onChange={(e) => setFormData({ ...formData, isAutoCalculated: e.target.checked })}
                label="Auto Calculate"
              />
            </div>
          </FormField>

          {formData.isAutoCalculated && (
            <FormField>
              <FormLabel required>Formula</FormLabel>
              <FormInput
                value={formData.formula}
                onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                placeholder="e.g., ChargeableWeight * 0.05"
                required={formData.isAutoCalculated}
              />
            </FormField>
          )}
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button variant="secondary" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">
            {charge ? 'Update' : 'Save'} Charge
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ChargeForm;
