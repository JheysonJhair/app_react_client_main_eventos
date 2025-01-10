import { FaLock, FaUnlock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/Events";
import { useEffect, useState } from "react";
import { getAllEvents } from "../services/EventService";
import { Loading } from "../components/ui/Loading";

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
    0: "https://asesoriaentesis.edu.pe/wp-content/uploads/2023/11/1500x844-tesis-terminar-maestria.jpg",
    1: "https://alianzaestudiantil.org/wp-content/uploads/2022/03/conferencias-para-profesionales.jpg",  
    2: "https://www.revistaeyn.com/binrepository/1200x806/0c0/0d0/none/26086/UCYG/deportestodos_6294117_20231218170022.jpg",
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h6 className="mb-0 text-uppercase">Listado de eventos</h6>
        <hr />

        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            {events.map((event) => (
              <div
                key={event.idEvent}
                className="col-md-3 mb-4"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => handleCardClick(event.idEvent)}
                style={{ cursor: "pointer" }}
              >
                <div className="card border-primary border-bottom border-3 border-0">
                  <img
                    src={eventImages[event.eventTypeId]}
                    className="card-img-top"
                    alt={event.name}
                    style={{ height: "180px", objectFit: "cover" }}
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
                        <strong>Fecha:</strong> {event.date}
                      </p>
                      <small className="text-muted">{event.startTime}</small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <p className="card-text mb-0">
                        <strong>Ubicación:</strong> {event.location}
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
                        maxHeight: "100px",
                        overflowY: "auto",
                        marginTop: "10px",
                      }}
                    >
                      <p>{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
