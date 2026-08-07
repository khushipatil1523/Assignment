import { useEffect, useState } from "react";
import api from "../api/axios";

function Pricing() {
  const [configurations, setConfigurations] = useState([]);
  const [configurationId, setConfigurationId] = useState("");
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    loadConfigurations();
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

  const calculatePrice = async () => {
    if (!configurationId) {
      alert("Please select a configuration");
      return;
    }

    try {
      const res = await api.get(`/pricing/${configurationId}`);
      setPricing(res.data);
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Unable to calculate price"
      );
    }
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>Pricing Calculator</h2>

          <p className="text-muted mb-0">
            Automatically calculate laptop configuration pricing
          </p>

        </div>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <div className="row align-items-end">

            <div className="col-md-8">

              <label className="form-label">
                Laptop Configuration
              </label>

              <select
                className="form-select"
                value={configurationId}
                onChange={(e) =>
                  setConfigurationId(e.target.value)
                }
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

            <div className="col-md-4">

              <button
                className="btn btn-primary w-100"
                onClick={calculatePrice}
              >
                Calculate Price
              </button>

            </div>

          </div>

        </div>

      </div>

      {pricing && (

        <div className="card shadow">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">

              {pricing.configuration}

            </h5>

          </div>

          <div className="card-body">

            <table className="table table-hover table-bordered">

              <thead className="table-primary">

                <tr>

                  <th width="60">#</th>

                  <th>Component</th>

                  <th>Category</th>

                  <th className="text-end">
                    Price
                  </th>

                </tr>

              </thead>

              <tbody>

                {pricing.breakdown.map((item, index) => (

                  <tr key={index}>

                    <td>{index + 1}</td>

                    <td>

                      <strong>
                        {item.componentName}
                      </strong>

                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td className="text-end">

                      ₹ {item.price.toLocaleString()}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="card bg-success text-white mt-4">

              <div className="card-body text-center">

                <h6 className="mb-2">

                  Total Laptop Price

                </h6>

                <h2 className="mb-0">

                  ₹ {pricing.totalPrice.toLocaleString()}

                </h2>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Pricing;