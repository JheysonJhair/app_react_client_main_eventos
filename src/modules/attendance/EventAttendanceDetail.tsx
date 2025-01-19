import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportAttedanceEventById } from "../../services/EventServiceDetail";
import { Loading } from "../../components/ui/Loading";
import {
  EventAttedance,
} from "../../types/EventsAttendance";
import AttendanceSection from "./components/AttendanceSection/AttendanceSection";

export function EventAttendanceDetail() {
  const { id } = useParams<{ id: string }>();
  const [eventDetails, setEventDetails] = useState<EventAttedance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (id) {
          const response = await getReportAttedanceEventById(id);
          setEventDetails(response);
        }
      } catch (err: any) {
        console.error("Error fetching event details:", err.message);
        setError(
          "Hubo un error al cargar los detalles del evento. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    } else {
      setError("No se ha proporcionado un ID de evento válido.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Eventos</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="#">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Sus asistencias
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Eventos</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Sus asistencias
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-3">{eventDetails?.event.name}</h2>
          <h5 className="text-muted text-center">
            {eventDetails?.event.startTime} - {eventDetails?.event.endTime}
          </h5>
        </div>
        <div className="mt-4">
          <AttendanceSection
            title="Docentes"
            attendanceList={eventDetails?.listTeacherAttendance || []}
            headers={["Dni", "Nombre", "Email", "Género", "Hora Entrada", "Hora Salida", "Estado"]}
          />
          <AttendanceSection
            title="Estudiantes"
            attendanceList={eventDetails?.listStudentAttendance || []}
            headers={["Dni", "Nombre", "Email", "Teléfono", "Hora Entrada", "Hora Salida", "Estado"]}
          />
          <AttendanceSection
            title="Invitados"
            attendanceList={eventDetails?.listGuestAttendancee || []}
            headers={["Dni", "Nombre", "Email","Genero" ,"Hora Entrada", "Hora Salida", "Estado"]}
          />
        </div>
      </div>
    </div>
  );
}
