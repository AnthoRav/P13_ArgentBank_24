// @ts-nocheck
import React from "react";
import Hero from "../../components/hero/Hero";
import Feature from "../../components/feature/Feature";
import hero from "../../assets/img/bank-tree.webp";

import iconChat from "../../assets/img/icon-chat.png";
import iconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";

function Home() {
  const heroImg = {
    name: "bank-tree",
    alt: "jeune pouce qui prend racine dans des pieces de monnaie",
  };

  const heroContent = {
    titles: ["No fees.", "No minimum deposit.", "High interest rates."],
    text: "Open a savings account with Argent Bank today !",
  };

  return (
    <main className="home-page">
      <Hero
        img={hero}
        alt={heroImg.alt}
        titles={heroContent.titles}
        text={heroContent.text}
      />
      <div className="features">
        <Feature
          iconName={iconChat}
          alt="icon de chat"
          title="You are our #1 priority"
          text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <Feature
          iconName={iconMoney}
          alt="icon de money"
          title="More savings means higher rates"
          text="The more you save with us, the higher your interest rate will be !"
        />
        <Feature
          iconName={iconSecurity}
          alt="icon de securité"
          title="Security you can trust"
          text="We use top of the line encryption to make sure your data and money is always safe."
        />
      </div>
    </main>
  );
}

export default Home;
