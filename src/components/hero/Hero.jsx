import React from "react";

function Hero({ img, alt, titles, text }) {
  return (
    <div className="hero">
      <img src={img} alt={alt} />
      <div className="hero_content-wrapper">
        <div className="hero_content">
          {titles &&
            titles.map(
              (title, index) => (
                <p key={index} className="hero_subtitle">
                  {title}
                </p>
              )
            )}
          <p className="hero_text">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
