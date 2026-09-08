import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUser } from "../api";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        if (data.detail) {
          setError(data.detail);
        } else {
          setUser(data);
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="container message message-error">{error}</div>;
  if (!user) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="detail-header">
        <h1>{user.name}</h1>
        <div className="detail-meta">
          <span className="badge">{user.role}</span>
        </div>
      </div>

      <div className="detail-section">
        <h2>Skills</h2>
        <div>
          {user.skills ? user.skills.split(",").map((s) => (
            <span key={s} className="badge badge-blue">{s.trim()}</span>
          )) : null}
        </div>
      </div>

      <div className="detail-section">
        <h2>Bio</h2>
        <p>{user.bio || "No bio provided."}</p>
      </div>

      <div className="detail-section">
        <Link to="/users" className="btn btn-secondary">← Back to Filmmakers</Link>
      </div>
    </div>
  );
}
