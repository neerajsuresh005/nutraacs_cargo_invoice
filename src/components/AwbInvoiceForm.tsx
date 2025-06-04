import React, { useEffect, useState } from 'react';
import { useInvoiceStore } from '../store/invoiceStore';
import InvoiceDetailsSection from './forms/InvoiceDetailsSection';
import AwbDetailsSection from './forms/AwbDetailsSection';
import CustomerRouteSection from './forms/CustomerRouteSection';
import AirlineCargoSection from './forms/AirlineCargoSection';
import AirlineChargesSection from './forms/AirlineChargesSection';
import AgentChargesSection from './forms/AgentChargesSection';
import InvoiceSummary from './forms/InvoiceSummary';
import { Button } from './ui/Button';
import { ArrowUpCircle } from 'lucide-react';

const AwbInvoiceForm: React.FC = () => {
  const { 
    invoice,
    updateInvoiceDetails,
    updateAwbDetails,
    updateCustomerRouteDetails,
    updateAirlineCargoDetails,
    updateAirlineChargesDetails,
    updateAgentChargesDetails,
    recalculateAllTotals,
    resetInvoice,
    saveInvoice
  } = useInvoiceStore();

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Recalculate totals when component mounts
  useEffect(() => {
    recalculateAllTotals();
  }, [recalculateAllTotals]);

  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await saveInvoice();
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved data will be lost.')) {
      resetInvoice();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <InvoiceDetailsSection 
        invoiceDetails={invoice.invoiceDetails || {}} 
        onUpdate={updateInvoiceDetails} 
      />
      
      <AwbDetailsSection 
        awbDetails={invoice.awbDetails || {}} 
        onUpdate={updateAwbDetails} 
      />
      
      <CustomerRouteSection 
        customerRouteDetails={invoice.customerRouteDetails || {}} 
        onUpdate={updateCustomerRouteDetails} 
      />
      
      <AirlineCargoSection 
        airlineCargoDetails={invoice.airlineCargoDetails || {}} 
        onUpdate={updateAirlineCargoDetails} 
      />
      
      <AirlineChargesSection 
        airlineChargesDetails={invoice.airlineChargesDetails || {}} 
        onUpdate={updateAirlineChargesDetails} 
        weightCharge={invoice.calculatedTotals?.weightCharge || 0}
      />
      
      <AgentChargesSection 
        agentChargesDetails={invoice.agentChargesDetails || {}} 
        onUpdate={updateAgentChargesDetails} 
      />
      
      <InvoiceSummary 
        invoice={invoice} 
        onSave={handleSave} 
        onPrint={handlePrint} 
        onCancel={handleCancel}
      />

      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-success-600 text-white px-4 py-2 rounded-md shadow-md animate-fade-in">
          Invoice saved successfully!
        </div>
      )}

      {showBackToTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full"
          size="icon"
          onClick={scrollToTop}
          title="Back to top"
        >
          <ArrowUpCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default AwbInvoiceForm;