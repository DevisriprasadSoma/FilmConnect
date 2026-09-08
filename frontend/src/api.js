const API = "http://localhost:8000";

export async function fetchUsers(params = {}) {
  const url = new URL(`${API}/users`);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
  });
  const res = await fetch(url);
  return res.json();
}

export async function fetchUser(id) {
  const res = await fetch(`${API}/users/${id}`);
  return res.json();
}

export async function createUser(data) {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create user");
  }
  return res.json();
}

export async function fetchProjects(params = {}) {
  const url = new URL(`${API}/projects`);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
  });
  const res = await fetch(url);
  return res.json();
}

export async function fetchProject(id) {
  const res = await fetch(`${API}/projects/${id}`);
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create project");
  }
  return res.json();
}

export async function fetchRecommendations(projectId) {
  const res = await fetch(`${API}/projects/${projectId}/recommendations`);
  return res.json();
}
