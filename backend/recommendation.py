from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def recommend_collaborators(project, users, top_n=3):
    """
    Score each user against a project using:
    1. Role match (does the user's role match a required role?)
    2. TF-IDF cosine similarity between project description and user skills+bio
    Returns sorted list of (user, score) tuples.
    """
    required_roles = [r.strip().lower() for r in project.required_roles.split(",")]
    results = []

    # Build corpus for TF-IDF: project text vs each user text
    project_text = f"{project.description} {project.required_roles}"
    user_texts = []
    valid_users = []

    for user in users:
        user_text = f"{user.role} {user.skills} {user.bio}"
        user_texts.append(user_text)
        valid_users.append(user)

    if not valid_users:
        return []

    # TF-IDF similarity
    corpus = [project_text] + user_texts
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)
    similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

    for i, user in enumerate(valid_users):
        # Role match score (0 or 0.5)
        role_score = 0.5 if user.role.strip().lower() in required_roles else 0.0

        # TF-IDF similarity score (0 to 0.5)
        tfidf_score = similarities[i] * 0.5

        total_score = role_score + tfidf_score
        # Cap at 1.0 and convert to percentage
        match_pct = round(min(total_score, 1.0) * 100)

        results.append({"user": user, "match_score": match_pct})

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:top_n]
