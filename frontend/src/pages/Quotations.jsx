import { useEffect, useState } from "react";
import api from "../api/axios";

function Quotations() {
  const [configurations, setConfigurations] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [configurationId, setConfigurationId] = useState("");

  useEffect(() => {
    loadConfigurations();
    loadQuotations();
  }, []);

  const loadConfigurations = async () => {
    try {
      const res = await api.get("/configurations");
      setConfigurations(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load configurations");
    }
  };

  const loadQuotations = async () => {
    try {
      const res = await api.get("/quotations");
      setQuotations(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load quotations");
    }
  };

  const generateQuotation = async (e) => {
    e.preventDefault();

    if (!customerName || !configurationId) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/quotations", {
        customerName,
        configurationId,
      });

      alert("Quotation Generated Successfully");

      setCustomerName("");
      setConfigurationId("");

      loadQuotations();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to generate quotation"
      );
    }
  };

  const viewQuotation = async (id) => {
    try {
      const res = await api.get(`/quotations/${id}`);
      setSelectedQuotation(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>Quotation Management</h2>

          <p className="text-muted mb-0">
            Generate and manage customer quotations
          </p>

        </div>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <form onSubmit={generateQuotation}>

            <div className="row">

              <div className="col-md-4">

                <label className="form-label">
                  Customer Name
                </label>

                <input
                  className="form-control"
                  placeholder="Enter Customer Name"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  required
                />

              </div>

              <div className="col-md-5">

                <label className="form-label">
                  Configuration
                </label>

                <select
                  className="form-select"
                  value={configurationId}
                  onChange={(e) =>
                    setConfigurationId(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Configuration
                  </option>

                  {configurations.map((config) => (

                    <option
                      key={config._id}
                      value={config._id}
                    >
                      {config.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="col-md-3 d-flex align-items-end">

                <button className="btn btn-success w-100">

                  Generate Quotation

                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-hover table-bordered">

            <thead className="table-primary">

              <tr>

                <th>Customer</th>

                <th>Configuration</th>

                <th>Total Price</th>

                <th>Date</th>

                <th width="130">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {quotations.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Quotations Found
                  </td>

                </tr>

              ) : (

                quotations.map((quotation) => (

                  <tr key={quotation._id}>

                    <td>

                      <strong>
                        {quotation.customerName}
                      </strong>

                    </td>

                    <td>

                      {quotation.configuration?.name}

                    </td>

                    <td>

                      ₹{" "}
                      {quotation.totalPrice.toLocaleString()}

                    </td>

                    <td>

                      {new Date(
                        quotation.createdAt
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          viewQuotation(
                            quotation._id
                          )
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {selectedQuotation && (

        <div className="card shadow mt-4">

          <div className="card-header bg-success text-white">

            <h5 className="mb-0">

              Quotation Details

            </h5>

          </div>

          <div className="card-body">

            <p>

              <strong>Customer :</strong>{" "}

              {selectedQuotation.customerName}

            </p>

            <p>

              <strong>Configuration :</strong>{" "}

              {selectedQuotation.configuration?.name}

            </p>

            <table className="table table-bordered">

              <thead className="table-light">

                <tr>

                  <th>Component</th>

                  <th>Price</th>

                </tr>

              </thead>

              <tbody>

                {selectedQuotation.components.map(
                  (component, index) => (

                    <tr key={index}>

                      <td>

                        {component.componentName}

                      </td>

                      <td>

                        ₹{" "}
                        {component.price.toLocaleString()}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            <div className="card bg-success text-white">

              <div className="card-body text-center">

                <h6>Total Price</h6>

                <h2>

                  ₹{" "}
                  {selectedQuotation.totalPrice.toLocaleString()}

                </h2>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Quotations;