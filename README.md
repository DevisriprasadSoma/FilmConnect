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

## Deploy to the Web (Free)

### 1. Deploy Backend (Render)
1. Sign up at [render.com](https://render.com) (free).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository `FilmConnect`.
4. Configure the settings:
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free
5. Click **Create Web Service**. Once deployed, copy your backend URL (e.g., `https://filmconnect-api.onrender.com`).

### 2. Deploy Frontend (Vercel)
1. Sign up at [vercel.com](https://vercel.com) (free).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository `FilmConnect`.
4. Configure the settings:
   - **Root Directory:** click Edit and select `frontend`
   - **Framework Preset:** `Vite`
   - **Environment Variables:**
     - Key: `VITE_API_URL`
     - Value: `https://filmconnect-api.onrender.com` (your Render backend URL without trailing slash)
5. Click **Deploy**. Your app is now live and accessible to anyone worldwide!
