import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <h2>Oops! Requested page not found.</h2>
      <Link to="/" className="back-home">
        back to homepage
      </Link>
    </main>
  );
}

export default NotFoundPage;
