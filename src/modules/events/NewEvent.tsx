import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { validateForm } from "../../utils/scheme/EventValidationsForm copy";
import { createEvent } from "../../services/EventService";
import AddParticipantsModal from "./components/AddParticipantsModal/AddParticipantsModal";

export function NewEvent() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    isPrivate: false,
    description: "",
    eventTypeId: 0,
  });

  const [showAddParticipantsModal, setShowAddParticipantsModal] =
    useState(false);
  const [eventId, setEventId] = useState<number | null>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // ---------------------------------------------------------------- POST EVENT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(eventData);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await createEvent(eventData);
      if (response.success) {
        const createdEventId = response.data;
        setEventId(createdEventId);
        Swal.fire({
          icon: "success",
          title: "¡Evento creado!",
          text: response.message,
          confirmButtonText: "Aceptar",
          position: "top-end",
          timer: 3000,
        }).then(() => {
          Swal.fire({
            title: "¿Desea agregar participantes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              setShowAddParticipantsModal(true);
            } else {
              navigate("/");
            }
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Opps, Algo salio mal",
        text: "Hubo un error al crear el evento. Por favor, intente nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Eventos</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a>
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo evento
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card">
          <div className="card-body p-4">
            <h5 className="card-title">Agregar nuevo evento</h5>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-body mt-4">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="border border-3 p-4 rounded">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Nombre del evento
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          id="name"
                          value={eventData.name}
                          onChange={handleChange}
                          placeholder="Ingrese el nombre"
                        />
                        {errors.name && (
                          <small className="text-danger">{errors.name}</small>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                          Lugar
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.location ? "is-invalid" : ""
                          }`}
                          id="location"
                          value={eventData.location}
                          onChange={handleChange}
                          placeholder="Lugar del evento"
                        />
                        {errors.location && (
                          <small className="text-danger">
                            {errors.location}
                          </small>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Descripción
                        </label>
                        <textarea
                          className={`form-control ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          id="description"
                          value={eventData.description}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Ingrese alguna descripcion"
                        />
                        {errors.description && (
                          <small className="text-danger">
                            {errors.description}
                          </small>
                        )}
                      </div>{" "}
                      <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                          Fecha del evento
                        </label>
                        <input
                          type="date"
                          className={`form-control ${
                            errors.date ? "is-invalid" : ""
                          }`}
                          id="date"
                          value={eventData.date}
                          onChange={handleChange}
                        />
                        {errors.date && (
                          <small className="text-danger">{errors.date}</small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="border border-3 p-4 rounded">
                      <div className="row">
                        <div className="col-lg-6 mb-3">
                          <label htmlFor="startTime" className="form-label">
                            Hora de inicio
                          </label>
                          <input
                            type="time"
                            className={`form-control ${
                              errors.startTime ? "is-invalid" : ""
                            }`}
                            id="startTime"
                            value={eventData.startTime}
                            onChange={handleChange}
                          />
                          {errors.startTime && (
                            <small className="text-danger">
                              {errors.startTime}
                            </small>
                          )}
                        </div>
                        <div className="col-lg-6 mb-3 text-end">
                          <label htmlFor="endTime" className="form-label">
                            Hora de fin
                          </label>
                          <input
                            type="time"
                            className={`form-control ${
                              errors.endTime ? "is-invalid" : ""
                            }`}
                            id="endTime"
                            value={eventData.endTime}
                            onChange={handleChange}
                          />
                          {errors.endTime && (
                            <small className="text-danger">
                              {errors.endTime}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="eventTypeId" className="form-label">
                          Estado
                        </label>
                        <select
                          className={`form-select ${
                            errors.isPrivate ? "is-invalid" : ""
                          }`}
                          id="isPrivate"
                          value={eventData.isPrivate ? "1" : "0"}
                          onChange={(e) => {
                            setEventData({
                              ...eventData,
                              isPrivate: e.target.value === "1",
                            });
                          }}
                        >
                          <option value="0">Público</option>
                          <option value="1">Privado</option>
                        </select>
                        {errors.isPrivate && (
                          <small className="text-danger">
                            {errors.isPrivate}
                          </small>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="eventTypeId" className="form-label">
                          Tipo de evento
                        </label>
                        <select
                          className={`form-select ${
                            errors.eventTypeId ? "is-invalid" : ""
                          }`}
                          id="eventTypeId"
                          value={eventData.eventTypeId}
                          onChange={handleChange}
                        >
                          <option value="0">Tegnologico</option>
                          <option value="1">Conferencia</option>
                          <option value="2">Tesis</option>
                        </select>
                        {errors.eventTypeId && (
                          <small className="text-danger">
                            {errors.eventTypeId}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 text-end">
                <button type="submit" className="btn btn-primary">
                  Crear Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AddParticipantsModal
        show={showAddParticipantsModal}
        onClose={() => setShowAddParticipantsModal(false)}
        eventId={Number(eventId)}
      />
    </div>
  );
}
