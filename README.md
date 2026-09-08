# FilmConnect

A professional networking platform for filmmakers with AI-powered collaborator recommendations.

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** React, Vite, JavaScript
- **AI:** scikit-learn (TF-IDF + cosine similarity)

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Features

- **User Profiles** — Register as Director, Actor, Editor, Cinematographer, Writer, or Producer
- **Film Projects** — Post projects with descriptions, genres, and required roles
- **Search** — Find filmmakers by role/skill and projects by title/genre
- **AI Recommendations** — Click "Find Collaborators" on any project to get the top 3 matching filmmakers ranked by match score

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users | Create a user |
| GET | /users | List users (filter by role, skill) |
| GET | /users/{id} | Get user by ID |
| POST | /projects | Create a project |
| GET | /projects | List projects (filter by title, genre) |
| GET | /projects/{id} | Get project by ID |
| GET | /projects/{id}/recommendations | Get AI collaborator recommendations |
