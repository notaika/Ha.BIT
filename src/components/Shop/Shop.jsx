import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import ShopModal from '../ShopModal/ShopModal';
import coinIcon from '../../assets/logos/coin.webp';
import "./Shop.scss"
import { useParams } from 'react-router-dom';

export default function Shop({ avatar, setAvatar, playerSprites, user, setUser, setPlayerSprites }) {
    const [open, setOpen] = useState(false);
    const [currentSprite, setCurrentSprite] = useState({});
    const { id } = useParams();

    const patchCost = async (minusCoins) => {
        const response = await axios.patch(`${import.meta.env.VITE_LOCALHOST}/api/users/${user.id}/coins/subtract`, {
            id: 1,
            minusCoins: minusCoins
        })

        setUser((currUser) => ({
            ...currUser, coins: response.data.coins
          }));

    }

    const handleBuy = (sprite) => {
        setCurrentSprite(sprite);

        if (sprite.cost !== 0 && user.coins >= sprite.cost) {
            setOpen(true);
        } else if (sprite.cost === 0) {
            setAvatar(sprite);
        }
        
    }

    const patchSprite = async (currentSpriteId) => {
        const response = await axios.patch(`${import.meta.env.VITE_LOCALHOST}/api/sprites`, {
            id: currentSpriteId
        })
        console.log(response.data.cost)
        
    }

    const handleConfirmPurchase = async (currentSprite) => {
        if (currentSprite.cost !== 0 && user.coins >= currentSprite.cost) {
            await patchSprite(currentSprite.id)
            await patchCost(Number(currentSprite.cost))
            setAvatar(currentSprite);
            setPlayerSprites((prevSprites) =>
                prevSprites.map((sprite) =>
                    sprite.id === currentSprite.id ? { ...sprite, cost: 0 } : sprite
                ))
            setOpen(false);
        }
    }

  return (
    <article className="shop">
        <ShopModal open={open} setOpen={setOpen} currentSprite={currentSprite} setAvatar={setAvatar} handleConfirmPurchase={handleConfirmPurchase}/>
        <div className="shop__top">
            <h1 className="shop__title">Recruit Travellers </h1>
            <p className="shop__wallet">Wallet: {user.coins} <img src={coinIcon} alt="A coin" className="confirm__coins"/></p>
        </div>
        <div className="shop__container">
            {playerSprites.map(sprite => (
                <div key={sprite.id} className="shop__sprites" onClick={() => handleBuy(sprite)}>
                    <div className="shop__buy" style={{ backgroundImage: `url(${sprite.shop})` }}></div>
                    <div className={`shop__description ${sprite.cost > user.coins ? 'shop__description-deny' : ''}`}>{sprite.cost === 0 ? 'Owned': sprite.cost} <img src={coinIcon} alt="A coin" className="confirm__coins" style={{ display: sprite.cost === 0 ? 'none' : 'inline' }} /></div>
                </div>
            ))}
        </div>
    </article>
  )
}
