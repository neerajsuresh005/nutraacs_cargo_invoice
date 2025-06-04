import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FormField, FormLabel, FormInput, FormSelect, FormTextarea, FormToggle } from '../ui/FormField';
import { InvoiceDetails } from '../../types';
import { mockCustomers, mockBranches, mockCurrencies, mockSalesmen } from '../../data/mockData';

interface InvoiceDetailsSectionProps {
  invoiceDetails: Partial<InvoiceDetails>;
  onUpdate: (field: keyof InvoiceDetails, value: any) => void;
}

const InvoiceDetailsSection: React.FC<InvoiceDetailsSectionProps> = ({ invoiceDetails, onUpdate }) => {
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate('isCredit', e.target.checked);
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField>
            <div className="flex items-center justify-between">
              <FormLabel>Invoice Type</FormLabel>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${!invoiceDetails.isCredit ? 'font-medium text-primary-700' : 'text-neutral-500'}`}>Cash</span>
                <FormToggle 
                  checked={invoiceDetails.isCredit} 
                  onChange={handleToggleChange}
                />
                <span className={`text-sm ${invoiceDetails.isCredit ? 'font-medium text-primary-700' : 'text-neutral-500'}`}>Credit</span>
              </div>
            </div>
          </FormField>

          <FormField>
            <FormLabel>Invoice No</FormLabel>
            <FormInput 
              value={invoiceDetails.invoiceNo || 'INV-AUTO-GEN'} 
              disabled 
              readOnly
            />
          </FormField>

          <FormField>
            <FormLabel required>Invoice Date</FormLabel>
            <FormInput 
              type="date" 
              value={invoiceDetails.invoiceDate || new Date().toISOString().split('T')[0]} 
              onChange={(e) => onUpdate('invoiceDate', e.target.value)}
            />
          </FormField>

          {invoiceDetails.isCredit && (
            <FormField>
              <FormLabel required>Customer</FormLabel>
              <FormSelect 
                value={invoiceDetails.customerId || ''} 
                onChange={(e) => onUpdate('customerId', e.target.value)}
              >
                <option value="">Select Customer</option>
                {mockCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </FormSelect>
            </FormField>
          )}

          <FormField>
            <FormLabel>Branch</FormLabel>
            <FormSelect 
              value={invoiceDetails.branchId || ''} 
              onChange={(e) => onUpdate('branchId', e.target.value)}
            >
              <option value="">Select Branch</option>
              {mockBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name} ({branch.code})
                </option>
              ))}
            </FormSelect>
          </FormField>

          <FormField>
            <FormLabel>Currency</FormLabel>
            <FormSelect 
              value={invoiceDetails.currencyId || ''} 
              onChange={(e) => {
                const currencyId = e.target.value;
                onUpdate('currencyId', currencyId);
                
                // Set the exchange rate based on the selected currency
                const currency = mockCurrencies.find(c => c.id === currencyId);
                if (currency) {
                  onUpdate('rateOfExchange', currency.exchangeRate);
                }
              }}
            >
              <option value="">Select Currency</option>
              {mockCurrencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </FormSelect>
          </FormField>

          <FormField>
            <FormLabel>Rate of Exchange</FormLabel>
            <FormInput 
              type="number"
              step="0.0001"
              value={invoiceDetails.rateOfExchange || ''} 
              onChange={(e) => onUpdate('rateOfExchange', parseFloat(e.target.value))}
              disabled={!invoiceDetails.currencyId}
            />
          </FormField>

          <FormField>
            <FormLabel>Against Doc. No.</FormLabel>
            <FormInput 
              value={invoiceDetails.againstDocNo || ''} 
              onChange={(e) => onUpdate('againstDocNo', e.target.value)}
              placeholder="Reference document number"
            />
          </FormField>

          <FormField className="col-span-1 md:col-span-2">
            <FormLabel>Narration</FormLabel>
            <FormTextarea 
              value={invoiceDetails.narration || ''} 
              onChange={(e) => onUpdate('narration', e.target.value)}
              placeholder="Add invoice narration"
              rows={2}
            />
          </FormField>

          <FormField>
            <FormLabel>Salesman</FormLabel>
            <FormSelect 
              value={invoiceDetails.salesmanId || ''} 
              onChange={(e) => onUpdate('salesmanId', e.target.value)}
            >
              <option value="">Select Salesman</option>
              {mockSalesmen.map((salesman) => (
                <option key={salesman.id} value={salesman.id}>
                  {salesman.name} ({salesman.code})
                </option>
              ))}
            </FormSelect>
          </FormField>

          <FormField className="col-span-1 md:col-span-2">
            <FormLabel>Internal Remarks</FormLabel>
            <FormTextarea 
              value={invoiceDetails.internalRemarks || ''} 
              onChange={(e) => onUpdate('internalRemarks', e.target.value)}
              placeholder="Add internal remarks (not visible on invoice)"
              rows={2}
            />
          </FormField>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetailsSection;