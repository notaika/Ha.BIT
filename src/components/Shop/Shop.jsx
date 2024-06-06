import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopModal from '../ShopModal/ShopModal';
import coinIcon from '../../assets/logos/coin.webp';
import "./Shop.scss";

export default function Shop({ avatar, setAvatar, user, setUser, token }) {
  const [open, setOpen] = useState(false);
  const [currentSprite, setCurrentSprite] = useState({});
  const [sprites, setSprites] = useState([]);

  const fetchUserSprites = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/api/sprites/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setSprites(response.data);
    } catch (error) {
      console.error(`ERROR: Could not fetch user sprites`, error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserSprites();
    }
  }, [token]);

  const handleBuy = (sprite) => {
    setCurrentSprite(sprite);

    if (!sprite.isOwned && user.coins >= sprite.cost) {
      setOpen(true);
    } else if (sprite.isOwned) {
      setAvatar(sprite);
    }
  };

  const handleConfirmPurchase = async (currentSprite) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/sprites/purchase`, {
        sprite_id: currentSprite.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const { newBalance } = response.data;

      setUser((currUser) => ({
        ...currUser, coins: newBalance
      }));
      setAvatar(currentSprite);
      setSprites((prevSprites) =>
        prevSprites.map((sprite) =>
          sprite.id === currentSprite.id ? { ...sprite, isOwned: true } : sprite
        ));
      setOpen(false);
    } catch (error) {
      console.error(`ERROR: Could not purchase sprite`, error);
    }
  };

  return (
    <article className="shop">
      <ShopModal open={open} setOpen={setOpen} currentSprite={currentSprite} handleConfirmPurchase={handleConfirmPurchase} />
      <div className="shop__top">
        <h1 className="shop__title">Recruit Travellers</h1>
        <p className="shop__wallet">Wallet: {user.coins} <img src={coinIcon} alt="A coin" className="confirm__coins" /></p>
      </div>
      <div className="shop__container">
        {sprites.map(sprite => (
          <div key={sprite.id} className="shop__sprites" onClick={() => handleBuy(sprite)}>
            <div className="shop__buy" style={{ backgroundImage: `url(${sprite.shop})` }}></div>
            <div className={`shop__description ${sprite.cost > user.coins && !sprite.isOwned ? 'shop__description-deny' : ''}`}>{sprite.isOwned ? 'Owned' : sprite.cost} <img src={coinIcon} alt="A coin" className="confirm__coins" style={{ display: sprite.isOwned ? 'none' : 'inline' }} /></div>
          </div>
        ))}
      </div>
    </article>
  );
}
