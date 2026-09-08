import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api";

const ROLES = ["Director", "Actor", "Editor", "Cinematographer", "Writer", "Producer"];

export default function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", role: ROLES[0], skills: "", bio: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(form);
      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Join as Filmmaker</h1>
      {error && <div className="message message-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Skills (comma-separated)</label>
          <input required placeholder="e.g. Premiere Pro, DaVinci Resolve" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}
