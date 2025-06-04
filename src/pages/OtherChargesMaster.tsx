import React, { useState } from 'react';
import ChargesList from '../components/masters/ChargesList';
import ChargeForm from '../components/masters/ChargeForm';
import { ChargeDefinition } from '../types';
import { useChargesStore } from '../store/chargesStore';

const OtherChargesMaster: React.FC = () => {
  const { charges, addCharge, updateCharge, deleteCharge } = useChargesStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState<ChargeDefinition | undefined>();

  const handleAdd = () => {
    setSelectedCharge(undefined);
    setShowForm(true);
  };

  const handleEdit = (charge: ChargeDefinition) => {
    setSelectedCharge(charge);
    setShowForm(true);
  };

  const handleSave = (chargeData: Partial<ChargeDefinition>) => {
    if (selectedCharge) {
      updateCharge(selectedCharge.id, chargeData);
    } else {
      addCharge(chargeData);
    }
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this charge?')) {
      deleteCharge(id);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-900">Other Charges Master</h1>
        <p className="text-neutral-600 mt-1">Configure and manage other charges for AWB invoices</p>
      </div>

      {showForm ? (
        <ChargeForm
          charge={selectedCharge}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <ChargesList
          charges={charges}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default OtherChargesMaster;