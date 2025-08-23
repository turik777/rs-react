import { useState } from 'react';
import Modal from '../Modal/Modal';

function MainPage() {
  const [isControlledFormOpen, setControlledFormOpen] = useState(false);
  const [isUncontrolledFormOpen, setUncontrolledFormOpen] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Forms App</h1>
      </div>

      <div className="flex justify-center gap-8">
        <button className="button" onClick={() => setControlledFormOpen(true)}>
          Open Controlled Form
        </button>
        <button
          className="button"
          onClick={() => setUncontrolledFormOpen(true)}
        >
          Open Uncontrolled Form
        </button>
      </div>

      <Modal
        title="Controlled Form"
        isOpen={isControlledFormOpen}
        onClose={() => setControlledFormOpen(false)}
      ></Modal>

      <Modal
        title="Uncontrolled Form"
        isOpen={isUncontrolledFormOpen}
        onClose={() => setUncontrolledFormOpen(false)}
      ></Modal>
    </div>
  );
}

export default MainPage;
