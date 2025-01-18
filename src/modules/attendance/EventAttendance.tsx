import { useEffect, useState } from "react";
import {
  fetchIncomeMembershipByDateRange,
  fetchIncomeProductByDateRange,
  fetchPaymentByDateRange,
  fetchProductByDateRange,
} from "../../services/Reports";

import CardEvent from "./components/CardEvent";

interface Payment {
  UserName: string;
  Plan: string;
  Name: string;
  Celular: string | null;
  Code: string;
  Total: number;
  Due: number;
  StartDate: string;
  EndDate: string;
  PaymentType: string;
}


export function EventAttendance() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [, setPaymentData] = useState<Payment[]>([]);

  // ---------------------------------------------------------------- POST PRODUCTS & INGRESOS => MEMBERSHIP PRODUCT OF RANGE
  const handleFetchData = async () => {
    try {
      const data = await fetchIncomeMembershipByDateRange(
        fechaInicio,
        fechaFin
      );
      if (data.success) {
      }

      const data2 = await fetchIncomeProductByDateRange(fechaInicio, fechaFin);
      if (data2.success) {
      }

      const paymentDataResponse = await fetchPaymentByDateRange(
        fechaInicio,
        fechaFin
      );
      if (paymentDataResponse.success) {
        setPaymentData(paymentDataResponse.data);
      }

      const productDataResponse = await fetchProductByDateRange(
        fechaInicio,
        fechaFin
      );
      console.log(productDataResponse);
      if (productDataResponse.success) {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ---------------------------------------------------------------- POST PRODUCTS & INGRESOS => MEMBERSHIP PRODUCT
  const handleTodayReport = async () => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const data = await fetchIncomeMembershipByDateRange(today, today);
      if (data.success) {
      }

      const data2 = await fetchIncomeProductByDateRange(today, today);
      if (data2.success) {
      }

      const paymentDataResponse = await fetchPaymentByDateRange(today, today);
      if (paymentDataResponse.success) {
        setPaymentData(paymentDataResponse.data);
      }

      const productDataResponse = await fetchProductByDateRange(today, today);
      if (productDataResponse.success) {
      }

      setFechaInicio(today);
      setFechaFin(today);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleTodayReport();
  }, []);

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
                  Todas las asistencias
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleFetchData}>
              Obtener Datos
            </button>
          </div>
        </div>

        <div>
        <CardEvent
        date="12/12/24"
        title="EventoIOT"
        location="Aula 103"
        professor="Prof. Sergio Castelli"
      />
        </div>
      </div>
    </div>
  );
}
