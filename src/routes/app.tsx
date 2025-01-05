import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute ";
import { HomePage } from "../pages/Home";
import { Clients } from "../modules/clientes/Clients";
import { NewClient } from "../modules/clientes/NewClient";
import { Products } from "../modules/products/Products";
import { NewProduct } from "../modules/products/NewProduct";
import { DetailProduct } from "../modules/products/DetailProduct";
import { Reports } from "../modules/reports/Reports";
import { ReportsTable } from "../modules/reports/ReportsTable";


const appRouter = [
  {
    path: "/",
    element: (
     // <ProtectedRoute>
        <AppLayout />
      //</ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/area/products/",
        element: <Products />,
      },
      {
        path: "/area/new-product/",
        element: <NewProduct />,
      },
      {
        path: "/area/detail-product/:productId",
        element: <DetailProduct />,
      },
      {
        path: "/area/clients/",
        element: <Clients />,
      },
      {
        path: "/area/new-client/",
        element: <NewClient />,
      },
      {
        path: "/area/reports/",
        element: <Reports />,
      },
      {
        path: "/area/reports-table/",
        element: <ReportsTable />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
