import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { crearTeacher } from "../../services/Teacher";
import { User } from "../../types/Usuario";

import {
  validateRequiredField,
} from "../../utils/validations";

export function NewTeacher() {
  const navigate = useNavigate();
  


  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Cliente</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo cliente
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card p-4">
          <div className="row">
            <div className="col-sm-6">
              <div className="row mb-3">
                <label htmlFor="input01" className="col-sm-5 col-form-label">
                  Nombres
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
 className="form-control"
                      id="input01"
                      placeholder="Nombre"
                      name="FirstName"
                     
                    />
                   
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input02" className="col-sm-5 col-form-label">
                  Apellidos
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
          className="form-control"
                      id="input02"
                      placeholder="Apellidos"
                      name="LastName"
                     
                    />
            
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="input03" className="col-sm-5 col-form-label">
                  Direccion <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-map" />
                    </span>
                    <input
                      type="text"
         className="form-control"
                      id="input03"
                      placeholder="Dirección"
                      name="Address"
    
                    />
                  
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input04" className="col-sm-5 col-form-label">
                  Estado civil <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-heart" />
                    </span>
                    <select
                    
                      name="MaritalStatus"
                className="form-select"
                      id="input04"
                    >
                      <option>Seleccionar estado civil</option>
                      <option value="Soltero">Soltero</option>
                      <option value="Casado">Casado</option>
                      <option value="Viudo">Viudo</option>
                    </select>
                   
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input05" className="col-sm-5 col-form-label">
                  Género
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user-circle" />
                    </span>
                    <select
             
                      name="Gender"
                     className="form-select"
                      id="input05"
                    >
                      <option>Seleccionar genero</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </select>
                   
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input06" className="col-sm-5 col-form-label">
                  Tipo de documento{" "}
                  <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-globe" />
                    </span>
                    <select
                    
                      name="DocumentType"
                      className="form-select"
                      id="input06"
                    >
                      <option>Seleccionar tipo</option>
                      <option value="dni">DNI</option>
                      <option value="carnet">Carnet</option>
                    </select>
                   
                  </div>
                </div>
              </div>
              <div
               
                id="dniField"
              >
                <label htmlFor="input07" className="col-sm-5 col-form-label">
                  DNI <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-id-card" />
                    </span>
                    <input
                      type="text"
                      className="form-select"
                      id="input07"
                      placeholder="Dni"
                      name="Document"
                    
                    />
               
                  </div>
                </div>
              </div>
 

            </div>
            <div className="col-sm-6">
              <div className="d-flex flex-column align-items-center text-center mb-5">
                <img
                  src="../../assets/images/avatars/avatar-1.png"
                  alt="Admin"
                  className=" p-1 bg-danger"
                  width={180}
                />
              </div>
              <div className="row mb-3">
                <label htmlFor="input09" className="col-sm-5 col-form-label">
                  Correo Electrónico{" "}
                  <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-envelope" />
                    </span>
                    <input
                      type="text"
            className="form-select"
                      id="input09"
                      placeholder="Email"
                      name="Mail"
                    
                    />
              
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input10" className="col-sm-5 col-form-label">
                  Telefono<span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-phone" />
                    </span>
                    <input
                      type="text"
                  className="form-select"
                      id="input10"
                      placeholder="Número de teléfono"
                      name="PhoneNumber"
                     
                    />
              
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input11" className="col-sm-5 col-form-label">
                  Whatssap <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-phone" />
                    </span>
                    <input
                      type="text"
                   className="form-select"
                      id="input11"
                      placeholder="Número de whatssap"
                      name="Whatsapp"
                    
                    />
             
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input12" className="col-sm-5 col-form-label">
                  Nota <span style={{ color: "#999" }}>(Opcional)</span>
                </label>

                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user" />
                    </span>
                    <textarea
        className="form-select"
                      id="input12"
                      placeholder="Ingrese alguna nota..."
                      name="Note"
                    
                    ></textarea>
           
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col"></div>
                <div className="col-auto ml-auto">
                  <button
                    className="btn btn-danger btn-block"
                   
                  >
                    <i className="bx bx-user-circle" /> Registrar cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
