import { useEffect, useState } from "react";
import api from "../api/axios";

function Components() {
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    getComponents();
    getCategories();
  }, []);

  const getComponents = async () => {
    try {
      const res = await api.get("/components");
      setComponents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editId) {

        await api.put(`/components/${editId}`, form);

        alert("Component Updated Successfully");

      } else {

        await api.post("/components", form);

        alert("Component Added Successfully");

      }

      setForm({
        name: "",
        category: "",
        price: "",
        description: "",
      });

      setEditId(null);

      getComponents();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to save component"
      );

    }
  };

  const editComponent = (component) => {

    setEditId(component._id);

    setForm({
      name: component.name,
      category: component.category?._id || component.category,
      price: component.price,
      description: component.description,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const deleteComponent = async (id) => {

    if (!window.confirm("Delete this component?")) return;

    try {

      await api.delete(`/components/${id}`);

      getComponents();

      alert("Component Deleted Successfully");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  return (
    <div>

      <h2 className="mb-4">Components</h2>

      <div className="card mb-4">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-3 mb-3">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Component Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-3 mb-3">

                <select
                  className="form-select"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (

                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="col-md-2 mb-3">

                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button className="btn btn-success">

              {editId
                ? "Update Component"
                : "Add Component"}

            </button>

          </form>

        </div>

      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>

            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th width="180">Action</th>

          </tr>

        </thead>

        <tbody>

          {components.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center"
              >
                No Components Found
              </td>

            </tr>

          ) : (

            components.map((component) => (

              <tr key={component._id}>

                <td>{component.name}</td>

                <td>
                  {component.category?.name ||
                    component.category}
                </td>

                <td>
                  ₹ {component.price}
                </td>

                <td>
                  {component.description}
                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      editComponent(component)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteComponent(component._id)
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
  );
}

export default Components;