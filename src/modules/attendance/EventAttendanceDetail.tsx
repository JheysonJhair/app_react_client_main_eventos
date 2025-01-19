import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportAttedanceEventById } from "../../services/EventServiceDetail";
import { Loading } from "../../components/ui/Loading";
import {
  EventAttedance,
  TeacherAttendance,
  StudentAttendance,
  GuestAttendance,
} from "../../types/EventsAttendance";

export function EventAttendanceDetail() {
  const { id } = useParams<{ id: string }>();
  const [eventDetails, setEventDetails] = useState<EventAttedance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingGuests, setLoadingGuests] = useState(true);

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

  useEffect(() => {
    if (eventDetails) {
      setLoadingTeachers(false);
      setLoadingStudents(false);
      setLoadingGuests(false);
    }
  }, [eventDetails]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="alert alert-danger w-50">{error}</div>
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
        <h2>Evento: {eventDetails?.event.name}</h2>
        <h2>
          Hora: {eventDetails?.event.startTime} - {eventDetails?.event.endTime}{" "}
        </h2>

        {/* Docentes */}
        <div className="mb-4">
          <h6 className="mb-3 text-uppercase">Docentes</h6>
          <hr />
          {loadingTeachers ? (
            <Loading />
          ) : eventDetails?.listTeacherAttendance &&
            eventDetails.listTeacherAttendance.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Dni</th>
                  <th>Nombres y apellidos</th>

                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {eventDetails.listTeacherAttendance.map(
                  (teacher: TeacherAttendance) => (
                    <tr key={teacher.idTeacher}>
                      <td>
                        {teacher.firstName} {teacher.lastName}
                      </td>
                      <td>{teacher.mail}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>No hay registro de asistencia para los docentes.</p>
          )}
        </div>

        {/* Estudiantes */}
        <div className="mb-4">
          <h6 className="mb-3 text-uppercase">Estudiantes</h6>
          <hr />
          {loadingStudents ? (
            <Loading />
          ) : eventDetails?.listStudentAttendance &&
            eventDetails.listStudentAttendance.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {eventDetails.listStudentAttendance.map(
                  (student: StudentAttendance) => (
                    <tr key={student.idStudent}>
                      <td>
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{student.mail}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>No hay registro de asistencia para los estudiantes.</p>
          )}
        </div>

        <div className="mb-4">
          <h6 className="mb-3 text-uppercase">Invitados</h6>
          <hr />
          {loadingGuests ? (
            <Loading />
          ) : eventDetails?.listGuestAttendancee &&
            eventDetails.listGuestAttendancee.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {eventDetails.listGuestAttendancee.map(
                  (guest: GuestAttendance) => (
                    <tr key={guest.idGuest}>
                      <td>
                        {guest.firstName} {guest.lastName}
                      </td>
                      <td>{guest.mail}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>No hay registro de asistencia para los invitados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
