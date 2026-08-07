import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const [count, setCount] = useState({
    categories: 0,
    components: 0,
    configurations: 0,
    quotations: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categories = await api.get("/categories");
      const components = await api.get("/components");
      const configurations = await api.get("/configurations");
      const quotations = await api.get("/quotations");

      setCount({
        categories: categories.data.data.length,
        components: components.data.data.length,
        configurations: configurations.data.data.length,
        quotations: quotations.data.data.length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted mb-0">
            Laptop Configuration & Pricing Management System
          </p>
        </div>

        <span className="badge bg-primary fs-6 p-2">
          Admin Panel
        </span>
      </div>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-grid fs-1 text-primary"></i>
              <h1 className="mt-2">{count.categories}</h1>
              <h5>Categories</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-cpu fs-1 text-success"></i>
              <h1 className="mt-2">{count.components}</h1>
              <h5>Components</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-laptop fs-1 text-warning"></i>
              <h1 className="mt-2">{count.configurations}</h1>
              <h5>Configurations</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-receipt fs-1 text-danger"></i>
              <h1 className="mt-2">{count.quotations}</h1>
              <h5>Quotations</h5>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-sm border-0 mt-5">

        <div className="card-body">

          <h4 className="mb-4">Quick Actions</h4>

          <div className="d-flex flex-wrap gap-3">

            <Link
              to="/categories"
              className="btn btn-outline-primary"
            >
              Manage Categories
            </Link>

            <Link
              to="/components"
              className="btn btn-outline-success"
            >
              Manage Components
            </Link>

            <Link
              to="/configurations"
              className="btn btn-outline-warning"
            >
              Configurations
            </Link>

            <Link
              to="/pricing"
              className="btn btn-outline-info"
            >
              Calculate Pricing
            </Link>

            <Link
              to="/quotations"
              className="btn btn-outline-danger"
            >
              Generate Quotation
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;