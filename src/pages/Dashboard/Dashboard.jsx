import React from 'react';
import './Dashboard.scss'

export default function Dashboard() {
  return (
    <main className="dashboard">
      <article className="dashboard__center">
        <div className="dashboard__row">
          <div className="dashboard__row-top--left"></div>
          <div className="dashboard__row-top--right">
            <div className="dashboard__row-player">
              <div className="dashboard__row-player--left">
                <p className="dashboard__row-player-name">Welcome, Traveler</p>
                <p className="dashboard__row-player-status">CURRENTLY: Deployed</p>
                <p className="dashboard__row-player-location">LOCATION: On an expedition</p>
                <p className="dashboard__row-player-reputation">REPUTATION: 128 hours</p>
              </div>
              <div className="dashboard__row-player--right">
                <p className="dashboard__row-player-level">Select an expedition:</p>
                <div className="dashboard__row-player-select"> MAP THROUGH LEVELS HERE FROM API</div>
              </div>
            </div>
            <div className="dashboard__row-timer"></div>
          </div>
        </div>
        <div className="dashboard__row"></div>
        <div className="dashboard__row"></div>
        <div className="dashboard__row"></div>
      </article>
    </main>
  )
}
