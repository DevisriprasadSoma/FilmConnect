import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../api";

const GENRES = ["Drama", "Comedy", "Documentary", "Horror", "Action", "Sci-Fi", "Thriller", "Animation"];
const ROLES = ["Director", "Actor", "Editor", "Cinematographer", "Writer", "Producer"];

export default function AddProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", genre: GENRES[0], required_roles: "" });
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [error, setError] = useState("");

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (selectedRoles.length === 0) {
      setError("Select at least one required role.");
      return;
    }
    try {
      await createProject({ ...form, required_roles: selectedRoles.join(", ") });
      navigate("/projects");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Post a Project</h1>
      {error && <div className="message message-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })}>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Required Roles</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {ROLES.map((r) => (
              <span
                key={r}
                className={`badge ${selectedRoles.includes(r) ? "" : "badge-blue"}`}
                style={{ cursor: "pointer", opacity: selectedRoles.includes(r) ? 1 : 0.5 }}
                onClick={() => toggleRole(r)}
              >
                {selectedRoles.includes(r) ? "✓ " : ""}{r}
              </span>
            ))}
          </div>
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
