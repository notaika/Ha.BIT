import React from 'react';
import { useState, useEffect } from 'react';
import deployedBg from '../../assets/images/forest-bg.png';
import idleBg from '../../assets/images/tavern-bg.jpeg';
import axios from 'axios';
import './GameWindow.scss'

export default function GameWindow({ isCounting, selectedLevel }) {
    const [sprites, setSprites] = useState([]);
    const [avatar, setAvatar] = useState([]);
    const [monster, setMonster] = useState([]);

    const getSprites = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/sprites`);
            const spriteData = response.data;
            setAvatar(spriteData.player_sprites[2]);
            setMonster(spriteData.monster_sprites[2]);
        } catch (error) {
            console.log(`ERROR: Could not fetch sprite`, error);
        }
    }

    useEffect(() => {getSprites();}, [])
  return (
    <div className="game" style={{ backgroundImage: selectedLevel ? `url(${deployedBg})` : `url(${idleBg})`}}>
        <div className="game__sprites">
            <div className={`game__sprites-player ${isCounting ? 'game__sprites-player-attack' : ''}`} style={{ backgroundImage: `url(${avatar?.spritesheet})` }}>

            </div>
            <div className={`game__sprites-monster ${isCounting ? 'game__sprites-monster-attack' : ''}`} style={{ backgroundImage: `url(${selectedLevel?.spritesheet})`, display: selectedLevel !== null ? 'block' : 'none' }}></div>
        </div>
    </div>
  )
}
