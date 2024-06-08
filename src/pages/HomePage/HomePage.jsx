import React from "react";
import { Link } from "react-router-dom";
import heatmap from "../../assets/images/heatmap.png";
import motivate from "../../assets/images/motivate.png";
import coin from "../../assets/logos/coin.webp";
import "./HomePage.scss";

export default function HomePage({ token }) {
  return (
    <main className="main">
    <section className="hero">
      <div className="hero__background"></div>
      <div className="hero__content">
        <h1 className="hero__title">Ha.BIT</h1>
        <h2 className="hero__description">
          "Level Up Your Life, One Habit at a Time"
        </h2>
        <div className="hero__buttons">
          <Link to={ token ? '/dashboard' : '/signup'} className="hero__btn">
          { token ? 'Begin Your Adventure' : 'Join the Roster'}
          </Link>
        </div>
      </div>
    </section>

    <section className="information">
        <h1 className="information__title">Welcome to Ha.BIT</h1>
        <div className="information__container">
        <img src="src/assets/images/monster.png" alt="Monster image" className="information__image" />
            <div className="information__description">
                <p className="information__text">Ha.BIT is a gamified productivity app designed to help you turn your daily tasks into exciting quests and adventures. Combining the fun elements of gaming with effective task management, Ha.BIT transforms your routine into a thrilling journey towards personal growth and productivity.</p>
                <p className="information__text--bottom">Ha.BIT is more than just a productivity tool; it's an engaging experience that makes achieving your goals fun and rewarding. Whether you're looking to build better habits, complete projects efficiently, or simply stay organized, Ha.BIT provides the tools and motivation you need to succeed.</p>
            </div>
        </div>
    </section>

    <section className="features">
        <h1 className="features__title">Features</h1>
        <div className="features__cards">
            <div className="features__cards-item">
                <img src={heatmap} alt="A heat map to track progress" className="features__cards-img" />
                <h2 className="features__cards-title">Track Progress</h2>
                <p className="features__cards-description">Easily monitor your productivity with detailed insights and visualizations that help you stay on top of your goals. Reflect on your achievements and identify areas for improvement to keep advancing.</p>
            </div>
            <div className="features__cards-item">
                <img src={coin} alt="A spinning coin" className="features__cards-img" />
                <h2 className="features__cards-title">Earn Rewards</h2>
                <p className="features__cards-description">Stay motivated by earning rewards for your achievements. Complete tasks and level up your character, unlocking new features and in-game items as you progress.</p>
            </div>
            <div className="features__cards-item">
                <img src={motivate} alt="A pixel human with a thumbs up" className="features__cards-img" />
                <h2 className="features__cards-title">Stay Motivated</h2>
                <p className="features__cards-description">Keep your motivation high with engaging features that make productivity fun and rewarding. Set personal goals, track your habits, and enjoy the journey as you reach new levels of success.</p>
            </div>
        </div>
    </section>
    </main>
  );
}
