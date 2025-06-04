import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FormField, FormLabel, FormInput, FormTextarea, FormSelect } from '../ui/FormField';
import { CustomerRouteDetails } from '../../types';
import { mockAirports } from '../../data/mockData';

interface CustomerRouteSectionProps {
  customerRouteDetails: Partial<CustomerRouteDetails>;
  onUpdate: (field: keyof CustomerRouteDetails, value: any) => void;
}

const CustomerRouteSection: React.FC<CustomerRouteSectionProps> = ({ customerRouteDetails, onUpdate }) => {
  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle>Customer & Route</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-neutral-700 border-b pb-1">Shipper Information</h4>
            <FormField>
              <FormLabel required>Shipper Name</FormLabel>
              <FormInput 
                value={customerRouteDetails.shipperName || ''} 
                onChange={(e) => onUpdate('shipperName', e.target.value)}
                placeholder="Enter shipper name"
              />
            </FormField>

            <FormField>
              <FormLabel required>Shipper Address</FormLabel>
              <FormTextarea 
                value={customerRouteDetails.shipperAddress || ''} 
                onChange={(e) => onUpdate('shipperAddress', e.target.value)}
                placeholder="Enter complete shipper address"
                rows={3}
              />
            </FormField>

            <FormField>
              <FormLabel>Shipper Contact Number</FormLabel>
              <FormInput 
                value={customerRouteDetails.shipperContactNumber || ''} 
                onChange={(e) => onUpdate('shipperContactNumber', e.target.value)}
                placeholder="Enter contact number"
              />
            </FormField>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-neutral-700 border-b pb-1">Consignee Information</h4>
            <FormField>
              <FormLabel required>Consignee Name</FormLabel>
              <FormInput 
                value={customerRouteDetails.consigneeName || ''} 
                onChange={(e) => onUpdate('consigneeName', e.target.value)}
                placeholder="Enter consignee name"
              />
            </FormField>

            <FormField>
              <FormLabel required>Consignee Address</FormLabel>
              <FormTextarea 
                value={customerRouteDetails.consigneeAddress || ''} 
                onChange={(e) => onUpdate('consigneeAddress', e.target.value)}
                placeholder="Enter complete consignee address"
                rows={3}
              />
            </FormField>

            <FormField>
              <FormLabel>Consignee Reference</FormLabel>
              <FormInput 
                value={customerRouteDetails.consigneeReference || ''} 
                onChange={(e) => onUpdate('consigneeReference', e.target.value)}
                placeholder="Reference ID (optional)"
              />
            </FormField>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-semibold mb-3 text-neutral-700 border-b pb-1">Route Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField>
                <FormLabel required>Origin Airport</FormLabel>
                <FormSelect 
                  value={customerRouteDetails.originAirportId || ''} 
                  onChange={(e) => onUpdate('originAirportId', e.target.value)}
                >
                  <option value="">Select Origin</option>
                  {mockAirports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.code} - {airport.name}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField>
                <FormLabel required>Destination Airport</FormLabel>
                <FormSelect 
                  value={customerRouteDetails.destinationAirportId || ''} 
                  onChange={(e) => onUpdate('destinationAirportId', e.target.value)}
                >
                  <option value="">Select Destination</option>
                  {mockAirports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.code} - {airport.name}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField>
                <FormLabel>Via</FormLabel>
                <FormSelect 
                  value={customerRouteDetails.viaAirportId || ''} 
                  onChange={(e) => onUpdate('viaAirportId', e.target.value)}
                >
                  <option value="">Select Via (Optional)</option>
                  {mockAirports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.code} - {airport.name}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField>
                <FormLabel>To (via)</FormLabel>
                <FormInput 
                  value={customerRouteDetails.toViaRoute || ''} 
                  onChange={(e) => onUpdate('toViaRoute', e.target.value)}
                  placeholder="e.g. IB → AA → SAL"
                />
              </FormField>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerRouteSection;