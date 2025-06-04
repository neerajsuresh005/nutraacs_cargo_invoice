import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FormField, FormLabel, FormInput } from '../ui/FormField';
import { AwbDetails } from '../../types';

interface AwbDetailsSectionProps {
  awbDetails: Partial<AwbDetails>;
  onUpdate: (field: keyof AwbDetails, value: any) => void;
}

const AwbDetailsSection: React.FC<AwbDetailsSectionProps> = ({ awbDetails, onUpdate }) => {
  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle>AWB Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField>
            <FormLabel required>AWB Number</FormLabel>
            <FormInput 
              value={awbDetails.awbNumber || ''} 
              onChange={(e) => onUpdate('awbNumber', e.target.value)}
              placeholder="Enter AWB number"
            />
          </FormField>

          <FormField>
            <FormLabel required>Date of Issue</FormLabel>
            <FormInput 
              type="date" 
              value={awbDetails.dateOfIssue || ''} 
              onChange={(e) => onUpdate('dateOfIssue', e.target.value)}
            />
          </FormField>

          <FormField>
            <FormLabel required>Place of Issue</FormLabel>
            <FormInput 
              value={awbDetails.placeOfIssue || ''} 
              onChange={(e) => onUpdate('placeOfIssue', e.target.value)}
              placeholder="City or Airport name"
            />
          </FormField>

          <FormField>
            <FormLabel required>Issuing Carrier Agent</FormLabel>
            <FormInput 
              value={awbDetails.issuingCarrierAgent || ''} 
              onChange={(e) => onUpdate('issuingCarrierAgent', e.target.value)}
              placeholder="Issuing carrier or agent name"
            />
          </FormField>

          <FormField>
            <FormLabel>IATA Code</FormLabel>
            <FormInput 
              value={awbDetails.iataCode || ''} 
              onChange={(e) => onUpdate('iataCode', e.target.value)}
              placeholder="IATA code (optional)"
            />
          </FormField>
        </div>
      </CardContent>
    </Card>
  );
};

export default AwbDetailsSection;