import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { ChargeDefinition } from '../../types';

interface ChargesListProps {
  charges: ChargeDefinition[];
  onEdit: (charge: ChargeDefinition) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ChargesList: React.FC<ChargesListProps> = ({
  charges,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Other Charges Configuration</CardTitle>
        <Button onClick={onAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Charge
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-100">
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Default Amount</th>
                <th className="px-4 py-2 text-left">Auto Calculated</th>
                <th className="px-4 py-2 text-left">Formula</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {charges.map((charge) => (
                <tr key={charge.id} className="border-b">
                  <td className="px-4 py-2">{charge.code}</td>
                  <td className="px-4 py-2">{charge.description}</td>
                  <td className="px-4 py-2 capitalize">{charge.type}</td>
                  <td className="px-4 py-2">{charge.defaultAmount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {charge.isAutoCalculated ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-2">
                    {charge.formula || '-'}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(charge)}
                      >
                        <Pencil className="h-4 w-4 text-primary-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(charge.id)}
                      >
                        <Trash2 className="h-4 w-4 text-error-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {charges.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-3 text-center text-neutral-500 italic">
                    No charges configured yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChargesList;