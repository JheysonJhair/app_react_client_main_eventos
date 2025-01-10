import { useState } from "react";
import { Button } from "react-bootstrap";
import AttendanceModal from "../events/components/AttendanceModal/AttendanceModal";

export default function TeachersAssistance() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Button variant="primary" onClick={handleOpenModal}>
          Tomar Asistencia
        </Button>

        <AttendanceModal
          show={showModal}
          onHide={handleCloseModal}
          eventId="123"
        />
      </div>
    </div>
  );
}
