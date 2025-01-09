import { FaLock, FaUnlock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      name: "Conferencia de Tecnología",
      startDate: "2025-02-20",
      time: "10:00 AM",
      location: "Auditorio Principal",
      description:
        "Una conferencia sobre las últimas tendencias en tecnología y desarrollo.",
      image:
        "https://asesoriaentesis.edu.pe/wp-content/uploads/2023/11/1500x844-tesis-terminar-maestria.jpg",
      isPrivate: false,
    },
    {
      id: 2,
      name: "Feria de Empleo",
      startDate: "2025-03-10",
      time: "11:00 AM",
      location: "Centro de Convenciones",
      description:
        "Oportunidades laborales para jóvenes profesionales y estudiantes.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkjVx5p1lg4DAiBvYaFNMSpdee3wBDbcxN6VpytkBybKySu8i8GbKUyIhFw0srUPNpVU",
      isPrivate: true,
    },
    {
      id: 3,
      name: "Workshop de Marketing ",
      startDate: "2025-04-05",
      time: "02:00 PM",
      location: "Sala de Conferencias A",
      description:
        "Un taller práctico sobre estrategias de marketing digital y SEO.",
      image:
        "https://www.revistaeyn.com/binrepository/1200x806/0c0/0d0/none/26086/UCYG/deportestodos_6294117_20231218170022.jpg",
      isPrivate: false,
    },
    {
      id: 4,
      name: "Ciclo de Innovación",
      startDate: "2025-05-15",
      time: "09:00 AM",
      location: "Auditorio Norte",
      description: "Charlas inspiradoras sobre las últimas innovaciones..",
      image:
        "https://alianzaestudiantil.org/wp-content/uploads/2022/03/conferencias-para-profesionales.jpg",
      isPrivate: true,
    },
    {
      id: 5,
      name: "Networking ",
      startDate: "2025-06-01",
      time: "03:00 PM",
      location: "Lobby del Hotel",
      description: "Evento de networking para emprendedores y startups.",
      image:
        "https://eventoociomadrid.com/wp-content/uploads/2022/01/Team-Building-las-mejores-actividades.jpg",
      isPrivate: false,
    },
  ];

  const handleCardClick = (id: number) => {
    navigate(`/detail-event/${id}`);
  };
  

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h6 className="mb-0 text-uppercase">Listado de eventos</h6>
        <hr />
        <div className="row">
          {events.map((event) => (
            <div
              key={event.id}
              className="col-md-3 mb-4"
              onMouseEnter={(e) => {
       
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
            
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => handleCardClick(event.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card border-primary border-bottom border-3 border-0">
                <img
                  src={event.image}
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
                      <strong>Fecha:</strong> {event.startDate}
                    </p>
                    <small className="text-muted">{event.time}</small>
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
      </div>
    </div>
  );
}
