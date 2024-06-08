import { Link } from 'react-router-dom';
import searchIcon from '../../assets/images/magnifying-glass.png';
import './SupportPage.scss';

export default function SupportPage() {
  return (
    <main className="support">
        <section className="support__hero">
            <h1 className="support__hero-title">Welcome to Support</h1>
            <form className="support__hero-form">
                <input type="text" className="support__hero-form-search" placeholder='How can we help?'/>
                <button className="support__hero-form-button"><img src={searchIcon} alt="" className="support__hero-form-img" /></button>
            </form>
        </section>
        <section className="support__container">
            <div className="support__faq">
                <h2 className="support__faq-title">Frequently Asked Questions</h2>
                <div className="support__faq-container">
                    <ul className="support__faq-list">
                    <li className="support__faq-item">
                            <h3 className="support__faq-item-title">Help, 'Track Habit' is not working!</h3>
                            <p className="support__faq-item-answer">Unfortunately this app is only for development. Please refer to the README.md file in the <Link className='pixela-link' to='https://github.com/notaika/Ha.BIT'>Ha.BIT github repo</Link> for instructions on how to run this feature.</p>
                        </li>
                        <li className="support__faq-item">
                            <h3 className="support__faq-item-title">Help. When I try to mark my habit as completed, it doesn't show up on my heatmap!</h3>
                            <p className="support__faq-item-answer">Unfortunately this app is only for development. There is a 25% chance of failure when calling from the pixel.a API unless you become a patreon supporter for pixel.a. To ensure that your calls go through, please consider supporting them and subscribing!</p>
                        </li>
                        <li className="support__faq-item">
                            <h3 className="support__faq-item-title">How do I earn coins?</h3>
                            <p className="support__faq-item-answer">You can earn coins by completing "expedition levels". These levels are pomodoro-inspired timers where you are meant to focus during the specified amount of time, depending on the level selected. You can also earn 1 coin per completion of your daily habits. </p>
                        </li>
                        <li className="support__faq-item">
                            <h3 className="support__faq-item-title">How do I unlock more characters?</h3>
                            <p className="support__faq-item-answer">Unlocking more characters in Ha.BIT is tied to your progress and achievements. As you complete tasks, earn coins, and reach new levels, you'll be able to unlock a variety of characters. As of right now, there are no benefits of unlocking characters in terms of better progress and earnings. Characters as of this moment are purely for cosmetic purposes.</p>
                        </li>
                        <li className="support__faq-item">
                            <h3 className="support__faq-item-title">How do I track my progress?</h3>
                            <p className="support__faq-item-answer">Tracking your progress in Ha.BIT is easy and intuitive. You can view detailed insights and visualizations of your productivity by clicking the 'Track Habit' button within your Daily Quests. This visualization is provided by pixel.a - a heatmap visualization service. For more information, <Link className='pixela-link' to='https://pixe.la/'>click here</Link>. </p>
                        </li>
                        <li className="support__faq-item">
                            <h3 className="support__faq-item-title">What time does the habit tracker reset?</h3>
                            <p className="support__faq-item-answer">The habit tracker currently runs on UTC, thus it resets at 1:00 AM UTC. </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </main>
  )
}
