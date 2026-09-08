import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, fetchProjects } from "../api";

export default function Home() {
  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    fetchUsers().then((d) => setUserCount(d.length));
    fetchProjects().then((d) => setProjectCount(d.length));
  }, []);

  return (
    <div className="hero">
      <h1>🎬 FilmConnect</h1>
      <p>
        Connect with filmmakers, find collaborators, and bring your creative
        projects to life.
      </p>
      <div className="hero-actions">
        <Link to="/add-user" className="btn">
          Join as Filmmaker
        </Link>
        <Link to="/add-project" className="btn btn-secondary">
          Post a Project
        </Link>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="num">{userCount}</div>
          <div className="label">Filmmakers</div>
        </div>
        <div className="stat">
          <div className="num">{projectCount}</div>
          <div className="label">Projects</div>
        </div>
      </div>
    </div>
  );
}
