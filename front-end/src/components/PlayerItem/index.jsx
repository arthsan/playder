import React from 'react';
import './style.css';

function PlayerItem({ player }) {
  return (
    <li className="player-item">
      <header>
        <img src={player.avatar_url} alt={player.github_username} />
        <div className="user-info">
          <strong>{player.name}</strong>
          <span>{player.games.join(', ')}</span>
        </div>
      </header>
      <p>{player.bio}</p>
      <a href={`"https://github.com/${player.github_username}"`}>View profile</a>
    </li>
  )
};

export default PlayerItem;