import React from "react";

function Feature({ iconName, alt, title, text }) {
  return (
    <div className="feature">
      <div className="feature_icon">
        <img src={iconName} alt={alt} />
      </div>
      <h1 className="feature_title">{title}</h1>
      <p className="feature_text">{text}</p>
    </div>
  );
}

export default Feature;
