export interface Customer {
  id: string;
  name: string;
  address?: string;
  contactNumber?: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  exchangeRate: number;
}

export interface Salesman {
  id: string;
  name: string;
  code: string;
}

export interface Airport {
  id: string;
  code: string;
  name: string;
  country: string;
}

export interface Airline {
  id: string;
  name: string;
  code: string;
}

export type ChargeType = 'airline' | 'supplier' | 'income';

export interface ChargeDefinition {
  id: string;
  code: string;
  description: string;
  type: ChargeType;
  ledgerId?: string;
  defaultAmount: number;
  isAutoCalculated: boolean;
  formula?: string;
  remark: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OtherCharge {
  id: string;
  code: string;
  description: string;
  amount: number;
  remark: string;
  type: 'carrier' | 'agent';
  chargeDefinitionId: string;
}

export interface InvoiceDetails {
  isCredit: boolean;
  invoiceNo: string;
  invoiceDate: string;
  customerId?: string;
  branchId?: string;
  currencyId?: string;
  rateOfExchange?: number;
  againstDocNo?: string;
  narration?: string;
  salesmanId?: string;
  internalRemarks?: string;
}

export interface AwbDetails {
  awbNumber: string;
  dateOfIssue: string;
  placeOfIssue: string;
  issuingCarrierAgent: string;
  iataCode?: string;
}

export interface CustomerRouteDetails {
  shipperName: string;
  shipperAddress: string;
  shipperContactNumber?: string;
  consigneeName: string;
  consigneeAddress: string;
  consigneeReference?: string;
  originAirportId: string;
  destinationAirportId: string;
  viaAirportId?: string;
  toViaRoute?: string;
}

export interface AirlineCargoDetails {
  airlineId: string;
  carrier: string;
  flightNumber: string;
  pieces: number;
  weight: number;
  chargeableWeight: number;
  rateClass: string;
  rateCharge: number;
  total: number;
  hsCode?: string;
  dimensions?: string;
  sciCode?: string;
  isDangerousGoods: boolean;
  natureOfGoods: string;
}

export interface AirlineChargesDetails {
  total: number;
  commission: number;
  netToAirline: number;
  inputVat?: number;
  otherChargesDueCarrier: OtherCharge[];
}

export interface AgentChargesDetails {
  otherChargesDueAgent: OtherCharge[];
}

export interface AwbInvoice {
  invoiceDetails: InvoiceDetails;
  awbDetails: AwbDetails;
  customerRouteDetails: CustomerRouteDetails;
  airlineCargoDetails: AirlineCargoDetails;
  airlineChargesDetails: AirlineChargesDetails;
  agentChargesDetails: AgentChargesDetails;
  calculatedTotals: {
    weightCharge: number;
    totalInvoiceAmount: number;
    sellingPrice: number;
    outputVat: number;
  };
}