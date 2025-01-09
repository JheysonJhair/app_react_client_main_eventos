import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { User } from "../../types/Usuario";
import {
  actualizarTeacher,
  eliminarTeacher,
  obtenerTeacher,
} from "../../services/Teacher";

export function Student() {
  const [teacher, setTeacher] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);

  const indexOfLastCliente = currentPage * teacherPerPage;
  const indexOfFirstCliente = indexOfLastCliente - teacherPerPage;
  const currentTeacher = teacher.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );

  const totalPages = Math.ceil(teacher.length /teacherPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredTeacher = currentTeacher.filter((teacher) =>
    Object.values(teacher).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  //---------------------------------------------------------------- GET CLIENT
  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerTeacher();
      setTeacher(data);
    };

    fetchData();
  }, []);

  //---------------------------------------------------------------- DELETE CLIENT
  const handleDeleteTeacher = async (id: number) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        const response = await eliminarTeacher(id);
        if (!response.success) {
          throw new Error(response.msg);
        }

        const updatedTeacher = teacher.filter(
          (teacher) => teacher.UserId !== id
        );
        setTeacher(updatedTeacher);
        await Swal.fire("¡Eliminado!", response.msg, "success");
      }
    } catch (error) {
      Swal.fire("Error", "Oppss, algo salio mal!", "error");
    }
  };

  //---------------------------------------------------------------- EDIT CLIENT
  const handleEditTeacher = (teacher: User) => {
    setSelectedTeacher(teacher);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTeacher(null);
  };

  const saveChanges = async () => {
    if (selectedTeacher && selectedTeacher.UserId !== undefined) {
      const { FirstName, LastName } = selectedTeacher;
      if (!FirstName?.trim() || !LastName?.trim() ) {
        Swal.fire(
          "Error",
          "El campo nombre, apellidos, sexo  son obligatorio.",
          "error"
        );
        return;
      }
      try {
        const response = await actualizarTeacher(
          selectedTeacher.UserId,
          selectedTeacher
        );
        if (!response.success) {
          throw new Error(response.msg);
        }
        setTeacher(
          teacher.map((user) =>
            user.UserId === selectedTeacher.UserId ? selectedTeacher : user
          )
        );
        Swal.fire("Actualizado", response.msg, "success");
      } catch (error) {
        Swal.fire("Error", "Oppss, algo salio mal!", "error");
      }
    }
    setModalIsOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Docentes</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Lista de docentes
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          className="table-responsive"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeacher.map((teacher, index) => (
                <tr key={index}>
                  <td>{teacher.FirstName}</td>
                  <td>{teacher.LastName}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginRight: "6px" }}
                      title="Editar"
                      onClick={() => handleEditTeacher(teacher)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTeacher(teacher.UserId || 0)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 && "active"}`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </div>

      {/* Modal para editar cliente */}
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeacher && (
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Nombre(s) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={selectedTeacher.FirstName}
                      onChange={(e) =>
                        setSelectedTeacher({
                          ...selectedTeacher,
                          FirstName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>



                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Apellido(s) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={selectedTeacher.LastName}
                      onChange={(e) =>
                        setSelectedTeacher({
                          ...selectedTeacher,
                          LastName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                </div>
              </div>
            </form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
