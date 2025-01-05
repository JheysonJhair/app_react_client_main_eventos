import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/AuthContext";

function AppLayout() {
  const { user } = useAuth();

  // ---------------------------------------------------------------- SCRIPTS
  useEffect(() => {
    const scriptPaths = [
      "../assets/js/bootstrap.bundle.min.js",
      "../assets/js/jquery.min.js",
      "../assets/plugins/simplebar/js/simplebar.min.js",
      "../assets/plugins/metismenu/js/metisMenu.min.js",
      "../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js",
      "../assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js",
      "../assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js",
      "../assets/js/app.js",
    ];

    const loadScript = (path: any) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      for (const scriptPath of scriptPaths) {
        try {
          await loadScript(scriptPath);
        } catch (error) {
          console.error(`Failed to load script: ${scriptPath}`, error);
        }
      }
      console.log("All scripts loaded successfully.");
    };

    loadScripts();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="sidebar-wrapper" data-simplebar="true">
          <div className="sidebar-header">
            <div>
              <img
                src="../../assets/images/logo_small.png"
                className="logo-icon"
                alt="logo icon"
              />
            </div>
            <div>
              <h4 className="logo-text" style={{ fontWeight: "bold" }}>
                UNAMBA
              </h4>
            </div>
            <div className="toggle-icon ms-auto">
              <i className="bx bx-arrow-back red-text" />
            </div>
          </div>
          <ul className="metismenu" id="menu">
            <li className="">
              <NavLink to="/">
                <div className="parent-icon">
                  <i className="bx bx-home-alt" />
                </div>
                <div className="menu-title">PANEL PRINCIPAL</div>
              </NavLink>
            </li>

            <li className="menu-label">GESTIÓN DE EVENTOS</li>
            <li>
              <a className="has-arrow" href="#">
                <div className="parent-icon">
                  <i className="bx bx-basket" />
                </div>
                <div className="menu-title">Eventos</div>
              </a>

              <ul>
                <li>
                  <NavLink to="/area/products/">
                    <i className="bx bx-radio-circle" />
                    Eventos
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/area/new-product/">
                    <i className="bx bx-radio-circle" />
                    Crear Evento
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a className="has-arrow" href="#">
                <div className="parent-icon">
                  <i className="bx bx-user-circle" />
                </div>
                <div className="menu-title">Docentes</div>
              </a>

              <ul>
                <li>
                  <NavLink to="/area/clients/">
                    <i className="bx bx-radio-circle" />
                    Asistencias
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/area/new-client/">
                    <i className="bx bx-radio-circle" />
                    Tomar Asistencia
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="menu-label">Informes &amp; Gráficos</li>
            <li>
              <NavLink to="/area/reports-table/">
                <div className="parent-icon">
                  <i className="bx bx-table" />
                </div>
                <div className="menu-title">Inventario</div>
              </NavLink>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/jheysonjhairpro/"
                target="_blank"
              >
                <div className="parent-icon">
                  <i className="bx bx-support" />
                </div>
                <div className="menu-title">Ayuda</div>
              </a>
            </li>
          </ul>
        </div>
        <header>
          <div className="topbar d-flex align-items-center">
            <nav className="navbar navbar-expand gap-3">
              <div className="mobile-toggle-menu">
                <i className="bx bx-menu" />
              </div>

              <div className="top-menu ms-auto">
                <ul className="navbar-nav align-items-center gap-1"></ul>
              </div>
              <div className="user-box dropdown px-3">
                <a
                  className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../../assets/images/avatars/avatar-1.png"
                    className="user-img"
                    alt="user avatar"
                  />
                  <div className="user-info">
                    <p className="user-name mb-0">{user?.UserName}</p>
                    <p className="designattion mb-0">
                      {user?.RoleId === 1 ? "ADMINISTRADOR" : "USUARIO"}
                    </p>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="/"
                    >
                      <i className="bx bx-log-out-circle" />
                      <span>Cerrar sesión</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <Outlet />
        <div className="overlay toggle-icon" />
        <a href="#" className="back-to-top">
          <i className="bx bxs-up-arrow-alt" />
        </a>
        <footer className="page-footer">
          <p className="mb-0">
            Copyright © UNAMBA 2024. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}

export default AppLayout;
