import { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import ControlledForm from '../ControlledForm/ControlledForm';
import SubmittedDataList from '../SubmittedData/SubmittedDataList/SubmittedDataList';
import { useFormStore } from '../../store/store';
import type { TFormData } from '../../validation/schema';

function MainPage() {
  const [isControlledFormOpen, setControlledFormOpen] = useState(false);
  const [isUncontrolledFormOpen, setUncontrolledFormOpen] = useState(false);
  const { submittedForms, addForm } = useFormStore();

  const handleControlledSubmit = (data: TFormData) => {
    addForm(data);
    setControlledFormOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Forms App</h1>
      </div>

      <div className="flex justify-center gap-8 mb-4">
        <Button onClick={() => setControlledFormOpen(true)}>
          Open Controlled Form
        </Button>
        <Button onClick={() => setUncontrolledFormOpen(true)}>
          Open Uncontrolled Form
        </Button>
      </div>

      <div className="flex justify-center">
        <SubmittedDataList title="Submitted Form Data" data={submittedForms} />
      </div>

      <Modal
        title="Controlled Form"
        isOpen={isControlledFormOpen}
        onClose={() => setControlledFormOpen(false)}
      >
        <ControlledForm onSubmit={handleControlledSubmit} />
      </Modal>

      <Modal
        title="Uncontrolled Form"
        isOpen={isUncontrolledFormOpen}
        onClose={() => setUncontrolledFormOpen(false)}
      ></Modal>
    </div>
  );
}

export default MainPage;
