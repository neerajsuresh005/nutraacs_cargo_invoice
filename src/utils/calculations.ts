import { OtherCharge, AwbInvoice } from '../types';

export const calculateTotal = (chargeableWeight: number, rateCharge: number): number => {
  return Number((chargeableWeight * rateCharge).toFixed(2));
};

export const calculateNetToAirline = (total: number, commission: number): number => {
  return Number((total - commission).toFixed(2));
};

export const sumOtherCharges = (charges: OtherCharge[]): number => {
  return Number(charges.reduce((sum, charge) => sum + charge.amount, 0).toFixed(2));
};

export const calculateTotalInvoiceAmount = (
  weightCharge: number,
  otherChargesDueCarrier: OtherCharge[],
  otherChargesDueAgent: OtherCharge[]
): number => {
  const carrierChargesTotal = sumOtherCharges(otherChargesDueCarrier);
  const agentChargesTotal = sumOtherCharges(otherChargesDueAgent);
  
  return Number((weightCharge + carrierChargesTotal + agentChargesTotal).toFixed(2));
};

export const calculateSellingPrice = (totalInvoiceAmount: number, outputVat: number): number => {
  return Number((totalInvoiceAmount + outputVat).toFixed(2));
};

export const recalculateInvoice = (invoice: Partial<AwbInvoice>): Partial<AwbInvoice> => {
  if (!invoice.airlineCargoDetails || !invoice.airlineChargesDetails || !invoice.agentChargesDetails) {
    return invoice;
  }

  const { chargeableWeight, rateCharge } = invoice.airlineCargoDetails;
  const weightCharge = calculateTotal(chargeableWeight, rateCharge);
  
  // Update the total in airlineCargoDetails
  invoice.airlineCargoDetails.total = weightCharge;
  
  // Update the total in airlineChargesDetails
  invoice.airlineChargesDetails.total = weightCharge;
  
  // Calculate net to airline
  const { commission } = invoice.airlineChargesDetails;
  const netToAirline = calculateNetToAirline(weightCharge, commission);
  invoice.airlineChargesDetails.netToAirline = netToAirline;
  
  // Calculate total invoice amount
  const totalInvoiceAmount = calculateTotalInvoiceAmount(
    weightCharge,
    invoice.airlineChargesDetails.otherChargesDueCarrier,
    invoice.agentChargesDetails.otherChargesDueAgent
  );
  
  // Calculate output VAT (assuming 5% for this example)
  const outputVat = Number((totalInvoiceAmount * 0.05).toFixed(2));
  
  // Calculate selling price
  const sellingPrice = calculateSellingPrice(totalInvoiceAmount, outputVat);
  
  // Update calculated totals
  invoice.calculatedTotals = {
    weightCharge,
    totalInvoiceAmount,
    outputVat,
    sellingPrice
  };
  
  return invoice;
};