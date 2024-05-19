import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <>
    <section className="hero">
      <div className="hero__background"></div>
      <div className="hero__content">
        <h1 className="hero__title">Ha.BIT</h1>
        <h2 className="hero__description">
          "Level Up Your Life, One Habit at a Time"
        </h2>
        <div className="hero__buttons">
          <Link to="/" className="hero__btn">
            Begin Your Adventure
          </Link>
        </div>
      </div>
    </section>

    <article className="features">
        <h1 className="features__title">Features</h1>
        <div className="features__cards">
            <div className="features__cards-item">
                <h2 className="features__cards-title">Train Your Mind</h2>
                <p className="features__cards-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi eos facilis, atque, id excepturi non fugit dolore similique facere accusamus quisquam cum harum nam error doloribus aspernatur rem veritatis?</p>
            </div>
            <div className="features__cards-item">
                <h2 className="features__cards-title">Earn Rewards</h2>
                <p className="features__cards-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi eos facilis, atque, id excepturi non fugit dolore similique facere accusamus quisquam cum harum nam error doloribus aspernatur rem veritatis?</p>
            </div>
            <div className="features__cards-item">
                <h2 className="features__cards-title">Fun & Focused</h2>
                <p className="features__cards-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi eos facilis, atque, id excepturi non fugit dolore similique facere accusamus quisquam cum harum nam error doloribus aspernatur rem veritatis?</p>
            </div>
        </div>
    </article>
    </>
  );
}
