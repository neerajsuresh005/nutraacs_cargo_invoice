import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FormField, FormLabel, FormInput, FormSelect, FormTextarea, FormToggle } from '../ui/FormField';
import { AirlineCargoDetails } from '../../types';
import { mockAirlines } from '../../data/mockData';

interface AirlineCargoSectionProps {
  airlineCargoDetails: Partial<AirlineCargoDetails>;
  onUpdate: (field: keyof AirlineCargoDetails, value: any) => void;
}

const AirlineCargoSection: React.FC<AirlineCargoSectionProps> = ({ airlineCargoDetails, onUpdate }) => {
  // Calculate total when chargeable weight or rate changes
  useEffect(() => {
    const { chargeableWeight, rateCharge } = airlineCargoDetails;
    if (chargeableWeight && rateCharge) {
      const total = parseFloat((chargeableWeight * rateCharge).toFixed(2));
      onUpdate('total', total);
    }
  }, [airlineCargoDetails.chargeableWeight, airlineCargoDetails.rateCharge, onUpdate]);

  // Update carrier code when airline changes
  const handleAirlineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const airlineId = e.target.value;
    onUpdate('airlineId', airlineId);
    
    // Set the carrier code based on the selected airline
    const airline = mockAirlines.find(a => a.id === airlineId);
    if (airline) {
      onUpdate('carrier', airline.code);
    }
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle>Airline & Cargo Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField>
            <FormLabel required>Airline Name</FormLabel>
            <FormSelect 
              value={airlineCargoDetails.airlineId || ''} 
              onChange={handleAirlineChange}
            >
              <option value="">Select Airline</option>
              {mockAirlines.map((airline) => (
                <option key={airline.id} value={airline.id}>
                  {airline.name}
                </option>
              ))}
            </FormSelect>
          </FormField>

          <FormField>
            <FormLabel>Carrier</FormLabel>
            <FormInput 
              value={airlineCargoDetails.carrier || ''} 
              onChange={(e) => onUpdate('carrier', e.target.value)}
              placeholder="3-letter code"
              maxLength={3}
              disabled={!!airlineCargoDetails.airlineId}
            />
          </FormField>

          <FormField>
            <FormLabel required>Flight Number</FormLabel>
            <FormInput 
              value={airlineCargoDetails.flightNumber || ''} 
              onChange={(e) => onUpdate('flightNumber', e.target.value)}
              placeholder="e.g. 093MAR"
            />
          </FormField>

          <FormField>
            <FormLabel required>No. of Pieces</FormLabel>
            <FormInput 
              type="number"
              min="1"
              value={airlineCargoDetails.pieces || ''} 
              onChange={(e) => onUpdate('pieces', parseInt(e.target.value, 10))}
            />
          </FormField>

          <FormField>
            <FormLabel required>Weight (kg)</FormLabel>
            <FormInput 
              type="number"
              min="0.01"
              step="0.01"
              value={airlineCargoDetails.weight || ''} 
              onChange={(e) => onUpdate('weight', parseFloat(e.target.value))}
            />
          </FormField>

          <FormField>
            <FormLabel required>Chargeable Weight</FormLabel>
            <FormInput 
              type="number"
              min="0.01"
              step="0.01"
              value={airlineCargoDetails.chargeableWeight || ''} 
              onChange={(e) => onUpdate('chargeableWeight', parseFloat(e.target.value))}
            />
          </FormField>

          <FormField>
            <FormLabel>Rate Class</FormLabel>
            <FormInput 
              value={airlineCargoDetails.rateClass || ''} 
              onChange={(e) => onUpdate('rateClass', e.target.value)}
              placeholder="e.g. M"
              maxLength={3}
            />
          </FormField>

          <FormField>
            <FormLabel required>Rate / Charge</FormLabel>
            <FormInput 
              type="number"
              min="0.01"
              step="0.01"
              value={airlineCargoDetails.rateCharge || ''} 
              onChange={(e) => onUpdate('rateCharge', parseFloat(e.target.value))}
            />
          </FormField>

          <FormField>
            <FormLabel>Total</FormLabel>
            <FormInput 
              type="number"
              value={airlineCargoDetails.total || ''} 
              disabled
              className="bg-neutral-50"
            />
          </FormField>

          <FormField>
            <FormLabel>HS Code</FormLabel>
            <FormInput 
              value={airlineCargoDetails.hsCode || ''} 
              onChange={(e) => onUpdate('hsCode', e.target.value)}
              placeholder="Harmonized System code"
            />
          </FormField>

          <FormField>
            <FormLabel>Dimensions</FormLabel>
            <FormInput 
              value={airlineCargoDetails.dimensions || ''} 
              onChange={(e) => onUpdate('dimensions', e.target.value)}
              placeholder="e.g. 100x62x57"
            />
          </FormField>

          <FormField>
            <FormLabel>SCI Code</FormLabel>
            <FormInput 
              value={airlineCargoDetails.sciCode || ''} 
              onChange={(e) => onUpdate('sciCode', e.target.value)}
              placeholder="SCI code (if applicable)"
            />
          </FormField>

          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <FormField className="flex items-center space-x-3">
              <FormToggle 
                checked={airlineCargoDetails.isDangerousGoods || false} 
                onChange={(e) => onUpdate('isDangerousGoods', e.target.checked)}
                label="Dangerous Goods"
              />
            </FormField>
          </div>

          <FormField className="col-span-1 md:col-span-2 lg:col-span-4">
            <FormLabel required>Nature of Goods</FormLabel>
            <FormTextarea 
              value={airlineCargoDetails.natureOfGoods || ''} 
              onChange={(e) => onUpdate('natureOfGoods', e.target.value)}
              placeholder="Describe the nature of goods"
              rows={2}
            />
          </FormField>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirlineCargoSection;