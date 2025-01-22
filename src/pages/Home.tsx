import { FaLock, FaUnlock, FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/Events";
import { useEffect, useState } from "react";
import { getAllEvents } from "../services/EventService";
import { Loading } from "../components/ui/Loading";
import { formatDate } from "../utils/common";

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

  const handleCardClick = (id: number) => {
    navigate(`/detail-event/${id}`);
  };

  const eventImages: { [key: number]: string } = {
    0: "https://cdn.goconqr.com/uploads/media/image/29660408/desktop_50fb8cca-040d-4a46-8a44-83b47ae93438.jpeg",
    1: "https://alianzaestudiantil.org/wp-content/uploads/2022/03/conferencias-para-profesionales.jpg",
    2: "https://tesisymasters.com.co/wp-content/uploads/2022/08/imagenes-de-blog-13.jpg",
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h6 className="mb-0 text-uppercase">Listado de eventos</h6>
        <hr />

        {loading ? (
          <Loading />
        ) : events && events.length > 0 ? (
          <div className="row">
            {events.reverse().map((event) => (
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
    </div>
  );
}
