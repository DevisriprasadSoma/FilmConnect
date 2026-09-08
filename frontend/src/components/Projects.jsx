import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    fetchProjects({ title, genre }).then(setProjects);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProjects();
  };

  return (
    <div className="container">
      <h1>Projects</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input placeholder="Search by title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Search by genre..." value={genre} onChange={(e) => setGenre(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div className="card-grid">
        {projects.map((p) => (
          <Link to={`/projects/${p.id}`} key={p.id} style={{ textDecoration: "none" }}>
            <div className="card">
              <h3>{p.title}</h3>
              <p><span className="badge">{p.genre}</span></p>
              <p>{p.description.substring(0, 100)}...</p>
              <p style={{ marginTop: "0.5rem" }}>
                {p.required_roles.split(",").map((r) => (
                  <span key={r} className="badge badge-blue">{r.trim()}</span>
                ))}
              </p>
            </div>
          </Link>
        ))}
        {projects.length === 0 && <p>No projects found.</p>}
      </div>
    </div>
  );
}
