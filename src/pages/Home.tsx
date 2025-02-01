import { FaLock, FaUnlock, FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/Events";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useMemo, useState } from "react";
import {
  DeleteEvent,
  getAllEvents,
  updateEvent,
} from "../services/EventService";
import { Loading } from "../components/ui/Loading";
import { formatDate } from "../utils/common";
import Swal from "sweetalert2";
export function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  //---------------------------------------------------------------- GET ALL EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllEvents();
        setEvents(eventList);
      } catch (err: any) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  //---------------------------------------------------------------- DELETE EVENT
  const handleDeleteEvent = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await DeleteEvent(Number(id));

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "¡Evento eliminado!",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            confirmButtonText: "Aceptar",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ups, algo salió mal",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const handleEditClick = (event: Event) => {
    setEventToEdit(event);
    setShowModal(true);
  };

  //---------------------------------------------------------------- UPDATE EVENT
  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const response = await updateEvent(updatedEvent);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: response.message,
          text: response.message,
          confirmButtonText: "Aceptar",
        });
        setShowModal(false);
        const eventList = await getAllEvents();
        setEvents(eventList);
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
        title: "Error",
        text: "Opps, Algo salio mal",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/detail-event/${id}`);
  };

  const eventImages: { [key: number]: string } = {
    0: "https://cdn.goconqr.com/uploads/media/image/29660408/desktop_50fb8cca-040d-4a46-8a44-83b47ae93438.jpeg",
    1: "https://alianzaestudiantil.org/wp-content/uploads/2022/03/conferencias-para-profesionales.jpg",
    2: "https://tesisymasters.com.co/wp-content/uploads/2022/08/imagenes-de-blog-13.jpg",
    3: "https://www.google.com/url?sa=j&url=https%3A%2F%2Fwww.axiateam.com%2Fwp-content%2Fuploads%2F2022%2F02%2FT%25C3%25A9cnicas-eficaces-para-la-gestion-de-reuniones2.jpg&uct=1715373134&usg=CK5nxLL9BxvCpwzpAvQRYw2zkHs.&opi=76390225&source=meet",
  };
  const reversedEvents = useMemo(() => [...events].reverse(), [events]);
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h6 className="mb-0 text-uppercase">Listado de eventos</h6>
        <hr />

        {loading ? (
          <Loading />
        ) : events && events.length > 0 ? (
          <div className="row">
            {reversedEvents.map((event: any) => (
              <div
                key={event.idEvent}
                className={`col-md-3 mb-4 ${
                  !event.isOpen ? "disabled-card" : ""
                }`}
                onMouseEnter={(e) => {
                  if (event.isOpen)
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  if (event.isOpen)
                    e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => event.isOpen && handleCardClick(event.idEvent)}
                style={{ cursor: event.isOpen ? "pointer" : "not-allowed" }}
              >
                <div className="card border-primary border-bottom border-3 border-0">
                  {!event.isOpen && (
                    <div className="lock-overlay">
                      <FaUserLock className="lock-icon" />
                    </div>
                  )}
                  <img
                    src={eventImages[event.eventTypeId]}
                    className="card-img-top"
                    alt={event.name}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title text-center mb-3"
                      style={{
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "10px",
                        maxHeight: "100px",
                        overflowY: "auto",
                        marginBottom: "10px",
                      }}
                    >
                      {event.name}
                    </h5>
                    <div className="d-flex justify-content-between">
                      <p className="m-0">
                        <strong>Fecha:</strong> {formatDate(event.date)}
                      </p>
                      <small className="text-muted">{event.startTime}</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <p className="card-text mb-0">
                        <strong>Ubicación:</strong>{" "}
                        {event.location.length > 16
                          ? `${event.location.substring(0, 16)}...`
                          : event.location}
                      </p>
                      <small className="text-muted d-flex align-items-center mb-0">
                        {event.isPrivate ? (
                          <span>
                            <FaLock style={{ marginRight: "5px" }} />
                          </span>
                        ) : (
                          <span>
                            <FaUnlock style={{ marginRight: "5px" }} />
                          </span>
                        )}
                      </small>
                    </div>
                    <div
                      className="card-text text-justify"
                      style={{
                        borderTop: "1px solid #ddd",
                        paddingTop: "10px",
                        height: "100px",
                        overflowY: "auto",
                        marginTop: "10px",
                      }}
                    >
                      <p>
                        {event.description.length > 63
                          ? `${event.description.substring(0, 63)}...`
                          : event.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(event);
                        }}
                        className="border-0 bg-white"
                      >
                        <i
                          className="bx bx-edit text-success"
                          style={{ fontSize: "20px", zIndex: 15 }}
                        ></i>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event.idEvent);
                        }}
                        className="border-0 bg-white "
                      >
                        <i
                          className="bx bx-trash "
                          style={{ color: "red", fontSize: "20px", zIndex: 15 }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <p>No hay eventos disponibles.</p>
          </div>
        )}
      </div>

      {showModal && eventToEdit && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="eventName">Nombre del Evento</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventName"
                  defaultValue={eventToEdit.name}
                  onChange={(e) =>
                    setEventToEdit({ ...eventToEdit, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDescription">Descripción</label>
                <textarea
                  className="form-control"
                  id="eventDescription"
                  defaultValue={eventToEdit.description}
                  onChange={(e) =>
                    setEventToEdit({
                      ...eventToEdit,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventLocation">Ubicación</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventLocation"
                  defaultValue={eventToEdit.location}
                  onChange={(e) =>
                    setEventToEdit({
                      ...eventToEdit,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Fecha del Evento</label>
                <input
                  type="date"
                  className="form-control"
                  id="eventDate"
                  defaultValue={
                    eventToEdit.date ? eventToEdit.date.split("T")[0] : ""
                  }
                  onChange={(e) =>
                    setEventToEdit({
                      ...eventToEdit,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventStartTime">Hora de Inicio</label>
                <input
                  type="time"
                  className="form-control"
                  id="eventStartTime"
                  defaultValue={eventToEdit.startTime}
                  onChange={(e) =>
                    setEventToEdit({
                      ...eventToEdit,
                      startTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventStartTime">Hora de Fin</label>
                <input
                  type="time"
                  className="form-control"
                  id="eventStartTime"
                  defaultValue={eventToEdit.endTime}
                  onChange={(e) =>
                    setEventToEdit({
                      ...eventToEdit,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventType">Estado</label>
                <select
                  className="form-control"
                  id="eventType"
                  defaultValue={eventToEdit.eventTypeId}
                  onChange={(e) =>
                    setEventToEdit({
                      ...eventToEdit,
                      eventTypeId: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={0}>Público</option>
                  <option value={1}>Privado</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="eventType">Tipo de Evento</label>
                <select
                  className="form-control"
                  id="eventType"
                  defaultValue={eventToEdit.eventTypeId}
                  onChange={(e) =>
                    setEventToEdit({
                      ...eventToEdit,
                      eventTypeId: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={0}>Tegnologico</option>
                  <option value={1}>Conferencia</option>
                  <option value={2}>Tesis</option>
                  <option value={3}>Reuniones</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={() => handleUpdateEvent(eventToEdit)}
            >
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
