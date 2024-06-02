import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GameWindow.scss'

export default function GameWindow() {
    const [sprites, setSprites] = useState([]);
    const [avatar, setAvatar] = useState([]);
    const [monster, setMonster] = useState([]);

    // const getSprites = async () => {
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/sprites`);
    //         console.log(response.data);
    //         setSprites(response.data);
    //         setAvatar(response.data[0]);
    //         setMonster(monster = response.data[1]);
    //     } catch (error) {
    //         console.log(`ERROR: Could not fetch sprite`, error);
    //     }
    // }

    // console.log(monster)
    // useEffect(() => {getSprites();}, [])
  return (
    <div className="game">
        <div className="game__sprites">
            {/* <img src={avatar.idle} alt="User's default avatar" className="game__sprites-user"/>
            <img src={monster.idle} alt="User's default avatar" className="game__sprites-monster"/> */}
        </div>
    </div>
  )
}
