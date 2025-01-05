import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import {
  fetchClientCountsByDate,
  fetchPaymentCounts,
  getClientDue,
} from "../services/Reports";
import { calculateDaysBetweenDates, formatDate } from "../utils/common";

export function HomePage() {
  const [datosPayment, setDatosPayment] = useState<any>();
  const [clientDueData, setClientDueData] = useState<any[]>([]);
  const [clientCountsByMonth, setClientCountsByMonth] = useState<any[]>([]);

  //---------------------------------------------------------------- GET DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentCountResponse = await fetchPaymentCounts();

        setDatosPayment(paymentCountResponse);
        const clientDueResponse = await getClientDue();

        if (clientDueResponse.success) {
          setClientDueData(clientDueResponse.data);
        }

        const clientCountsResponse = await fetchClientCountsByDate();
        if (clientCountsResponse) {
          setClientCountsByMonth(clientCountsResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //---------------------------------------------------------------- GRAFIC
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Nobiembre",
    "Diciembre",
  ];

  const clientDataByMonth = meses.map((_, index) => {
    const dataForMonth = clientCountsByMonth.find(
      (item) => new Date(item.month).getMonth() === index
    );
    return dataForMonth ? parseInt(dataForMonth.count) : 0;
  });

  const dataMultiLinea = {
    series: [
      {
        name: "Clientes",
        data: clientDataByMonth,
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: meses,
      },
      legend: {
        position: "top",
      },
    } as ApexOptions,
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
          <div className="col">
            <div className="card radius-10 border-start border-0 border-4 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total de ventas</p>
                    <h4 className="my-1 text-info">
                      {datosPayment ? datosPayment.paymentCount : "0"}
                    </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto">
                    <i className="bx bxs-cart" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-4 border-danger">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Ingresos (Membresias)</p>
                    <h4 className="my-1 text-danger">
                      S/{datosPayment ? datosPayment.totalRevenue : "0"}
                    </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-burning text-white ms-auto">
                    <i className="bx bxs-wallet" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-4 border-success">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Productos totales</p>
                    <h4 className="my-1 text-success">
                      {datosPayment ? datosPayment.productCount : "0"}
                    </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                    <i className="bx bxs-bar-chart-alt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-4 border-warning">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total de clientes</p>
                    <h4 className="my-1 text-warning">
                      {datosPayment ? datosPayment.clientCount : "0"}
                    </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-orange text-white ms-auto">
                    <i className="bx bxs-group" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">Clientes</h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Chart
                  options={dataMultiLinea.options}
                  series={dataMultiLinea.series}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
