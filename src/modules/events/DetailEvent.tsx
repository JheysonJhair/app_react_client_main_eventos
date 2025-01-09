import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { User } from "../../types/Usuario";
import CustomClock from "../../components/ui/CustomClock";
import { FaUserCircle } from "react-icons/fa";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
export function DetailEvent() {
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const handleOpenAttendanceModal = () => setShowAttendanceModal(true);
  const handleCloseAttendanceModal = () => setShowAttendanceModal(false);

  const handleOpenViewModal = () => setShowViewModal(true);
  const handleCloseViewModal = () => setShowViewModal(false);

  const [dni, setDni] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDniChange = (e: any) => {
    setDni(e.target.value);
  };

  const handleCapture = () => {
    setLoading(true);
    setTimeout(() => {
      setUserData({
        FirstName: "Juan Perez",
        LastName: "Gomez",
        UserType: true,
      });
      setLoading(false);
      setTimeout(() => setUserData(null), 2000);
    }, 2000);
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Evento</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a>
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Detalles del evento
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card border-primary border-bottom border-3 border-0">
          <div className="row g-0">
            <div className="col-md-4 border-end">
              <img
                src="https://asesoriaentesis.edu.pe/wp-content/uploads/2023/11/1500x844-tesis-terminar-maestria.jpg"
                className="img-fluid"
                alt="..."
              />
              <div className="row mb-3 row-cols-auto g-2 justify-content-center mt-3">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <p className="m-0">
                      <strong>Fecha:</strong> 2025-02-20
                    </p>
                    <small className="text-muted">10:00 AM</small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="card-text mb-0">
                      <strong>Ubicación:</strong> Auditorio Principal
                    </p>
                    <small className="text-muted d-flex align-items-center mb-0">
                      <span>
                        <FaLock style={{ marginRight: "5px" }} />
                      </span>
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
                    <p>
                      Una conferencia sobre las últimas tendencias en tecnología
                      y desarrollo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">Conferencia de Tecnología</h2>
                <div className="d-flex gap-3 py-3">
                  <div className="cursor-pointer">
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                    <i className="bx bxs-star text-warning"></i>
                  </div>
                  <div>12 Participantes</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <h5>Docentes</h5>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        maxHeight: "250px",
                        overflowY: "auto",
                      }}
                    >
                      {Array.from({ length: 6 }).map((_, index) => (
                        <li
                          key={`docente-${index}`}
                          style={{
                            borderBottom: "1px solid #ddd",
                            padding: "5px 0",
                          }}
                        >
                          Docente {index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h5>Estudiantes</h5>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        maxHeight: "250px",
                        overflowY: "auto",
                      }}
                    >
                      {Array.from({ length: 7 }).map((_, index) => (
                        <li
                          key={`estudiante-${index}`}
                          style={{
                            borderBottom: "1px solid #ddd",
                            padding: "5px 0",
                          }}
                        >
                          Estudiante {index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <hr />
                <div className="d-flex gap-3 mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleOpenAttendanceModal}
                  >
                    Tomar Asistencia
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleOpenViewModal}
                  >
                    <span className="text">Ver Asistentes</span>{" "}
                    <i className="bx bxs-user-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showAttendanceModal}
        onHide={handleCloseAttendanceModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tomar Asistencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#EAF1F7",
                marginRight: "10px",
                marginLeft: "30px",
              }}
            >
              <CustomClock />
            </div>
            <div
              style={{
                width: "60%",
                paddingRight: "50px",
                paddingLeft: "50px",
              }}
            >
              <Form>
                <Form.Group controlId="formDni">
                  <Form.Label>Digite Identificación</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese DNI"
                    value={dni}
                    onChange={handleDniChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  style={{ marginTop: "10px", width: "100%" }}
                  onClick={handleCapture}
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Capturar"}
                </Button>
              </Form>

              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  background: "#f9f9f9",
                  height: "200px",
                }}
              >
                {userData && (
                  <div className="text-center">
                    <FaUserCircle
                      style={{
                        fontSize: "60px",
                        color: "#58BD9F",
                        borderRadius: "50%",
                        marginBottom: "15px",
                      }}
                    />
                    <p className="m-0">
                      {userData.FirstName} {userData.LastName}
                    </p>
                    <p className="m-0 mb-1">
                      <strong>Rol:</strong>{" "}
                      {userData.UserType ? "Docente" : "Estudiante"}
                    </p>

                    <div
                      style={{
                        backgroundColor: "#58BD9F",
                        color: "white",
                        padding: "8px",
                        borderRadius: "5px",
                        marginLeft: "30px",
                        marginRight: "30px",
                      }}
                    >
                      <strong>Asistencia</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAttendanceModal}>
            Cerrar
          </Button>
          <Button variant="primary">Confirmar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Lista de Asistentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <ul className="list-group">
              <li className="list-group-item d-flex align-items-center">
                <FaChalkboardTeacher
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    color: "#007BFF",
                  }}
                />
                <span>Kevin Arnold Arias Figueroa</span>
                <span className="ms-auto text-muted">10:05 AM</span>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaUserGraduate
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    color: "#155A9A",
                  }}
                />
                <span>Jheyson Jhair Arone Angeles</span>
                <span className="ms-auto text-muted">10:07 AM</span>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaUserGraduate
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    color: "#348ADB",
                  }}
                />
                <span>Ed Nativido Soto Humanahorcco</span>
                <span className="ms-auto text-muted">10:12 AM</span>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailEvent;
