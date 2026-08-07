import { useEffect, useState } from "react";
import api from "../api/axios";

function Configurations() {
const [configurations, setConfigurations] = useState([]);
const [components, setComponents] = useState([]);

const [name, setName] = useState("");
const [selectedComponents, setSelectedComponents] = useState([]);

const [search, setSearch] = useState("");

const [editId, setEditId] = useState(null);

useEffect(() => {
  loadConfigurations();
  loadComponents();
}, []);

const loadConfigurations = async () => {
  try {

    const res = await api.get("/configurations", {
      params: {
        search,
      },
    });

    setConfigurations(res.data.data);

  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  loadConfigurations();
}, [search]);

const loadComponents = async () => {
  try {

    const res = await api.get("/components");

    setComponents(res.data.data);

  } catch (err) {

    console.log(err);

  }
};

const handleCheckbox = (id) => {

  if (selectedComponents.includes(id)) {

    setSelectedComponents(
      selectedComponents.filter(
        (item) => item !== id
      )
    );

  } else {

    setSelectedComponents([
      ...selectedComponents,
      id,
    ]);

  }

};

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editId) {

      await api.put(`/configurations/${editId}`, {
        name,
        components: selectedComponents,
      });

      alert("Configuration Updated Successfully");

    } else {

      await api.post("/configurations", {
        name,
        components: selectedComponents,
      });

      alert("Configuration Created Successfully");

    }

    setName("");

    setSelectedComponents([]);

    setEditId(null);

    loadConfigurations();

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Unable to save configuration"
    );

  }

};

const editConfiguration = (config) => {

  setEditId(config._id);

  setName(config.name);

  setSelectedComponents(
    config.components.map((c) => c._id)
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

};

const deleteConfiguration = async (id) => {

  if (
    !window.confirm(
      "Delete this configuration?"
    )
  )
    return;

  try {

    await api.delete(
      `/configurations/${id}`
    );

    loadConfigurations();

    alert(
      "Configuration Deleted Successfully"
    );

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Delete Failed"
    );

  }

};

  return (
  <div>

    <h2 className="mb-4">Configurations</h2>

    <div className="card shadow mb-4">

      <div className="card-body">

        <div className="row mb-3">

          <div className="col-md-12">

            <input
              type="text"
              className="form-control"
              placeholder="Search Configuration..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Configuration Name
            </label>

            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Select Components
            </label>

            <div className="row">

              {components.map((component) => (

                <div
                  className="col-md-4 mb-2"
                  key={component._id}
                >

                  <div className="card">

                    <div className="card-body py-2">

                      <div className="form-check">

                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedComponents.includes(
                            component._id
                          )}
                          onChange={() =>
                            handleCheckbox(
                              component._id
                            )
                          }
                        />

                        <label className="form-check-label">

                          <strong>
                            {component.name}
                          </strong>

                          <br />

                          <small>
                            {component.category?.name}
                          </small>

                          <br />

                          <span className="text-success">

                            ₹ {component.price}

                          </span>

                        </label>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          <button className="btn btn-primary">

            {editId
              ? "Update Configuration"
              : "Save Configuration"}

          </button>

        </form>

      </div>

    </div>

    <div className="card shadow">

      <div className="card-body">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>

              <th>Name</th>

              <th>Components</th>

              <th width="180">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {configurations.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="text-center"
                >

                  No Configurations Found

                </td>

              </tr>

            ) : (

              configurations.map((config) => (

                <tr key={config._id}>

                  <td>

                    <strong>

                      {config.name}

                    </strong>

                  </td>

                  <td>

                    {config.components.map(
                      (component) => (

                        <span
                          key={component._id}
                          className="badge bg-primary me-2 mb-2"
                        >

                          {component.name}

                        </span>

                      )
                    )}

                  </td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        editConfiguration(config)
                      }
                    >

                      Edit

                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteConfiguration(
                          config._id
                        )
                      }
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}

export default Configurations;