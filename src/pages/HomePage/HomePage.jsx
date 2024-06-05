import React from "react";
import { Link } from "react-router-dom";
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
          <Link to={ token ? '/dashboard' : '/login'} className="hero__btn">
            Begin Your Adventure
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
                <h2 className="features__cards-title">Track Your Progress</h2>
                <p className="features__cards-description">Engage in brain-training exercises and activities designed to boost your cognitive skills. From memory games to problem-solving challenges, Ha.BIT helps you keep your mind sharp and focused.</p>
            </div>
            <div className="features__cards-item">
                <h2 className="features__cards-title">Earn Rewards</h2>
                <p className="features__cards-description">Stay motivated by earning rewards for your achievements. Complete tasks and level up your character, unlocking new features and in-game items as you progress.</p>
            </div>
            <div className="features__cards-item">
                <h2 className="features__cards-title">Insightful Analytics</h2>
                <p className="features__cards-description">Gain valuable insights into your habits and productivity patterns. Use detailed reports and statistics to identify areas for improvement and celebrate your successes.</p>
            </div>
        </div>
    </section>
    </main>
  );
}
