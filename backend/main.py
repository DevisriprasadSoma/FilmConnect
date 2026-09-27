from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from database import engine, Base, get_db
from models import User, Project
from recommendation import recommend_collaborators

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FilmConnect API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "FilmConnect API",
        "docs": "/docs"
    }


# --- Pydantic Schemas ---

class UserCreate(BaseModel):
    name: str
    email: str
    role: str
    skills: str
    bio: Optional[str] = ""


class ProjectCreate(BaseModel):
    title: str
    description: str
    genre: str
    required_roles: str


# --- User Endpoints ---

@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check duplicate email
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/users")
def get_users(role: Optional[str] = None, skill: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(User)
    if role:
        query = query.filter(User.role.ilike(f"%{role}%"))
    if skill:
        query = query.filter(User.skills.ilike(f"%{skill}%"))
    return query.all()


@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# --- Project Endpoints ---

@app.post("/projects")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@app.get("/projects")
def get_projects(title: Optional[str] = None, genre: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Project)
    if title:
        query = query.filter(Project.title.ilike(f"%{title}%"))
    if genre:
        query = query.filter(Project.genre.ilike(f"%{genre}%"))
    return query.all()


@app.get("/projects/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.get("/projects/{project_id}/recommendations")
def get_recommendations(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    users = db.query(User).all()
    results = recommend_collaborators(project, users)
    return [
        {
            "id": r["user"].id,
            "name": r["user"].name,
            "role": r["user"].role,
            "skills": r["user"].skills,
            "match_score": r["match_score"],
        }
        for r in results
    ]


# --- Seed Data ---

@app.on_event("startup")
def seed_data():
    db = next(get_db())
    if db.query(User).count() == 0:
        sample_users = [
            User(name="John Smith", email="john@example.com", role="Editor",
                 skills="Premiere Pro, DaVinci Resolve, After Effects", bio="Experienced film editor with 5 years in post-production."),
            User(name="Sarah Chen", email="sarah@example.com", role="Cinematographer",
                 skills="Camera Operation, Lighting, Color Grading", bio="Award-winning cinematographer specializing in indie films."),
            User(name="Mike Johnson", email="mike@example.com", role="Director",
                 skills="Directing, Screenwriting, Storyboarding", bio="Independent film director focused on drama and documentary."),
            User(name="Emily Davis", email="emily@example.com", role="Actor",
                 skills="Method Acting, Voice Acting, Improv", bio="Theater-trained actor with film and TV experience."),
            User(name="Alex Rivera", email="alex@example.com", role="Writer",
                 skills="Screenwriting, Dialogue, Story Structure", bio="Screenwriter with credits in short films and web series."),
            User(name="Lisa Park", email="lisa@example.com", role="Producer",
                 skills="Budgeting, Scheduling, Distribution", bio="Independent producer with experience in low-budget features."),
            User(name="David Kim", email="david@example.com", role="Editor",
                 skills="Final Cut Pro, Sound Design, Motion Graphics", bio="Editor and sound designer for commercial and narrative projects."),
            User(name="Rachel Green", email="rachel@example.com", role="Cinematographer",
                 skills="Drone Photography, Steadicam, ARRI Alexa", bio="Cinematographer with expertise in aerial and action sequences."),
        ]
        db.add_all(sample_users)
        db.commit()

    if db.query(Project).count() == 0:
        sample_projects = [
            Project(title="Short Film Project", description="A compelling drama about a musician struggling with identity in a big city.",
                    genre="Drama", required_roles="Editor, Actor, Cinematographer"),
            Project(title="Documentary: City Life", description="A documentary exploring urban culture and street art in major cities.",
                    genre="Documentary", required_roles="Director, Cinematographer, Editor"),
            Project(title="Web Series Pilot", description="Comedy web series about aspiring filmmakers trying to make it in Hollywood.",
                    genre="Comedy", required_roles="Writer, Actor, Producer"),
        ]
        db.add_all(sample_projects)
        db.commit()
    db.close()
