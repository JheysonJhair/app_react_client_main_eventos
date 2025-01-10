import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

import { AddParticipantsModalProps } from "./AddParticipantsModal.types";
import { Participant } from "../../../../types/Participant";
import { addParticipantToEvent } from "../../../../services/EventService";
import { FaUserCircle } from "react-icons/fa";

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = ({
  show,
  onClose,
  eventId,
}) => {
  const [dni, setDni] = useState("");
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //---------------------------------------------------------------- POST PARTICIPANT
  const handleAddParticipant = async () => {
    if (!participant) return;
    setLoading(true);
    try {
      const result = await addParticipantToEvent(participant);

      if (!result.success) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          confirmButtonText: "Aceptar",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: result.message,
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      onClose();
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar agregar al participante.",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Participantes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="searchDni">
            <Form.Label>Ingresar DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="00000000"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Form.Label style={{ marginTop: "10px" }}>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el Nombre"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Form.Label style={{ marginTop: "10px" }}>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese apellidos"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Form.Label style={{ marginTop: "10px" }}>
              Correo Electrónico <span color="#ffffff">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="mail"
              placeholder="example@example.pe"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Button
              variant="primary"
              style={{ marginTop: "20px", width: "100%" }}
              onClick={handleAddParticipant}
              disabled={loading || !dni}
            >
              {loading ? "Agregando..." : "Agregar"}
            </Button>
            {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
          </Form.Group>

          {participant && (
            <>
              <div className="text-center">
                <FaUserCircle
                  style={{
                    fontSize: "90px",
                    color: "#00407d",
                    borderRadius: "50%",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                />
                <p className="m-0">
                  {participant.firstName} {participant.lastName}
                </p>
                <p className="m-0 mb-1">
                  <strong>
                    {participant.role === 0 ? "Docente" : "Estudiante"}
                  </strong>
                </p>
              </div>

              <div className="px-5">
                <Button
                  variant="primary"
                  style={{ marginTop: "10px", width: "100%" }}
                  onClick={handleAddParticipant}
                >
                  Agregar Participante
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddParticipantsModal;
