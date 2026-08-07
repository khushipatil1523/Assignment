import { useEffect, useState } from "react";
import api from "../api/axios";

function Categories() {

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("/categories", form);

      setForm({
        name: "",
        description: "",
      });

      getCategories();

    } catch (err) {
      alert(err.response?.data?.message || "Unable to create category");
    }
  };

  const deleteCategory = async (id) => {

    if (!window.confirm("Delete this category?")) return;

    try {

      await api.delete(`/categories/${id}`);

      getCategories();

    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container">

      <h2 className="mb-4">Categories</h2>

      <form
        className="row g-3 mb-4"
        onSubmit={handleSubmit}
      >

        <div className="col-md-4">

          <input
            className="form-control"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />

        </div>

        <div className="col-md-5">

          <input
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            required
          />

        </div>

        <div className="col-md-3">

          <button className="btn btn-primary w-100">
            Add Category
          </button>

        </div>

      </form>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>
            <th>Name</th>
            <th>Description</th>
            <th width="120">Action</th>
          </tr>

        </thead>

        <tbody>

          {categories.length === 0 ? (

            <tr>

              <td colSpan="3" className="text-center">
                No Categories Found
              </td>

            </tr>

          ) : (

            categories.map((category) => (

              <tr key={category._id}>

                <td>{category.name}</td>

                <td>{category.description}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCategory(category._id)}
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

export default Categories;