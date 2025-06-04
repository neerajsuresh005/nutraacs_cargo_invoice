import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { AwbInvoice } from '../../types';
import { Save, Printer, XCircle } from 'lucide-react';

interface InvoiceSummaryProps {
  invoice: Partial<AwbInvoice>;
  onSave: () => void;
  onPrint: () => void;
  onCancel: () => void;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ 
  invoice, 
  onSave, 
  onPrint, 
  onCancel 
}) => {
  const { calculatedTotals } = invoice;

  if (!calculatedTotals) {
    return null;
  }

  return (
    <Card className="mb-6 animate-fade-in border-primary-100 bg-primary-50">
      <CardHeader>
        <CardTitle>Invoice Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Weight Charge:</span>
            <span>{calculatedTotals.weightCharge?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Total Invoice Amount:</span>
            <span>{calculatedTotals.totalInvoiceAmount?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Output VAT (5%):</span>
            <span>{calculatedTotals.outputVat?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Selling Price:</span>
            <span className="text-lg font-bold text-primary-700">{calculatedTotals.sellingPrice?.toFixed(2) || '0.00'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onCancel}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <div className="space-x-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={onSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Invoice
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onPrint}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Invoice
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InvoiceSummary;