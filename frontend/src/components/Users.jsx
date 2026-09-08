import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../api";

const ROLES = ["", "Director", "Actor", "Editor", "Cinematographer", "Writer", "Producer"];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = (r, s) => {
    fetchUsers({ role: r || role, skill: s || skill }).then(setUsers);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers();
  };

  return (
    <div className="container">
      <h1>Filmmakers</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <select value={role} onChange={(e) => { setRole(e.target.value); }}>
          <option value="">All Roles</option>
          {ROLES.filter(Boolean).map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <input placeholder="Search by skill..." value={skill} onChange={(e) => setSkill(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div className="card-grid">
        {users.map((u) => (
          <Link to={`/users/${u.id}`} key={u.id} style={{ textDecoration: "none" }}>
            <div className="card">
              <h3>{u.name}</h3>
              <p><span className="badge">{u.role}</span></p>
              <p>{u.skills.split(",").map((s) => <span key={s} className="badge badge-blue">{s.trim()}</span>)}</p>
              <p style={{ marginTop: "0.5rem" }}>{u.bio}</p>
            </div>
          </Link>
        ))}
        {users.length === 0 && <p>No filmmakers found.</p>}
      </div>
    </div>
  );
}
