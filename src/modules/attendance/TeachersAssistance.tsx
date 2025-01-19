import { useState } from "react";
import { Button } from "react-bootstrap";

export default function TeachersAssistance() {
  const [, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Button variant="primary" onClick={handleOpenModal}>
          Tomar Asistencia
        </Button>
      </div>
    </div>
  );
}
