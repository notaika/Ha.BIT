import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import coinIcon from '../../assets/logos/coin.webp';
import "./ShopModal.scss"


export default function ShopModal({ open, setOpen, currentSprite, handleConfirmPurchase }) {
    
    const handleCancel = () => {
        setOpen(false);
        console.log(currentSprite.id)
    }


  return (
    <Modal
      open={open}
      onClose={handleCancel}
    >
      <div className="confirm">
        <h1 className="confirm__title">
          Confirm Purchase
        </h1>
        <p className="confirm__description">
          Would you like to purchase the "{currentSprite.name}" for {currentSprite.cost} <img src={coinIcon} alt="A coin" className="confirm__coins" /> coins? 
        </p>
        <button className="confirm__confirm" onClick={() => handleConfirmPurchase(currentSprite)}>Confirm Purchase </button>
        <button className="confirm__cancel" onClick={handleCancel}>Cancel Purchase </button>
      </div>
    </Modal>
  );
}
