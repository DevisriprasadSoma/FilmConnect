import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProject, fetchRecommendations } from "../api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [recs, setRecs] = useState([]);
  const [showRecs, setShowRecs] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProject(id).then(setProject);
  }, [id]);

  const handleFindCollaborators = async () => {
    setLoading(true);
    const data = await fetchRecommendations(id);
    setRecs(data);
    setShowRecs(true);
    setLoading(false);
  };

  if (!project) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="detail-header">
        <h1>{project.title}</h1>
        <div className="detail-meta">
          <span className="badge">{project.genre}</span>
        </div>
      </div>

      <div className="detail-section">
        <h2>Description</h2>
        <p>{project.description}</p>
      </div>

      <div className="detail-section">
        <h2>Required Roles</h2>
        <div>
          {project.required_roles.split(",").map((r) => (
            <span key={r} className="badge badge-blue">{r.trim()}</span>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <button onClick={handleFindCollaborators} disabled={loading}>
          {loading ? "Finding..." : "🔍 Find Collaborators"}
        </button>
      </div>

      {showRecs && (
        <div className="detail-section">
          <h2>Recommended Collaborators</h2>
          {recs.length === 0 && <p>No matching collaborators found.</p>}
          {recs.map((r) => (
            <Link to={`/users/${r.id}`} key={r.id} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="rec-card">
                <div className="info">
                  <h3>{r.name}</h3>
                  <p><span className="badge">{r.role}</span></p>
                  <p>
                    {r.skills.split(",").map((s) => (
                      <span key={s} className="badge badge-blue">{s.trim()}</span>
                    ))}
                  </p>
                </div>
                <div className="match-score">{r.match_score}%</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
