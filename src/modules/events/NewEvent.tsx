
import { useNavigate } from "react-router-dom";


export function NewEvent() {
  const navigate = useNavigate();

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
            <div className="form-body mt-4">
              <div className="row">
                <div className="col-lg-6">
                  <div className="border border-3 p-4 rounded">
                    <div className="mb-3">
                      <label htmlFor="inputProductTitle" className="form-label">
                        Nombre del evento
                      </label>
                      <input
                        type="text"
      className="form-control"
                        id="inputProductTitle"
                        placeholder="Ingrese el nombre"
  
                        required
                      />

                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputProductTitle" className="form-label">
                        Lugar
                      </label>
                      <input
                        type="text"
                             className="form-control"
                        id="inputProductTitle"
                        placeholder="Lugar del evento"
                       
                        required
                      />
               
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="inputProductDescription"
                        className="form-label"
                      >
                        Descripción
                      </label>
                      <textarea
                             className="form-control"
                        id="inputProductDescription"
                        rows={3}
                        placeholder="Ingrese alguna descripcion"
                       
                        
                        required
                      />
      
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="border border-3 p-4 rounded">
                    <div className="mb-3">
                      <label htmlFor="inputProductTitle" className="form-label">
                        Fecha del evento
                      </label>
                      <input
                        type="date"
                             className="form-control"
                        id="inputProductTitle"
                        placeholder="Ingrese el nombre"
              
                        required
                      />
          
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputProductTitle" className="form-label">
                        Hora
                      </label>
                      <input
                        type="time"
         className="form-control"
                        id="inputProductTitle"
                        placeholder="Lugar del evento"
                        
                        required
                      />
       
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="inputProductDescription"
                        className="form-label"
                      >
                        Tipo de evento
                      </label>
                      <select className="form-select" id="inputProductType">
                        <option value="0">Público</option>
                        <option value="1">Privado</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
