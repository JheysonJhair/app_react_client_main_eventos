import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { formatTime } from "../../../../utils/common";
import { AttendeesModalProps } from "./AttendeesModalt.ypes";

const AttendeesModal: React.FC<AttendeesModalProps> = ({
  show,
  onClose,
  attendees,
}) => {
  const filteredAttendees = attendees.filter((attendee) => attendee.isPresent);
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lista de Asistentes Presentes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ul className="list-group">
            {filteredAttendees.map((attendee) => (
              <li
                key={attendee.idAttendance}
                className="list-group-item d-flex align-items-center"
              >
                {attendee.studentId === 0 ? (
                  <FaChalkboardTeacher
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#007BFF",
                    }}
                  />
                ) : (
                  <FaUserGraduate
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      color: "#155A9A",
                    }}
                  />
                )}
                <span>
                  {attendee.participant.firstName} {attendee.participant.lastName}
                </span>
                <span className="ms-auto text-muted">
                  {formatTime(attendee?.date!)}
                </span>
              </li>
            ))}
          </ul>
          {filteredAttendees.length === 0 && (
            <p className="text-center text-muted">
              No hay asistentes presentes en este momento.
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendeesModal;
