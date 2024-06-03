import React from 'react';
import Modal from '@mui/material/Modal';
import starIcon from '../../assets/images/star.png';
import coinGIF from '../../assets/logos/coin.webp';
import expGIF from '../../assets/images/exp.gif'
import './FinishModal.scss';

export default function FinishModal({ open, handleClose, selectedLevel }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className="finish">
        <h1 className="finish__title">
          Expedition Complete!
        </h1>
        <p className="finish__description">
          You earned {selectedLevel?.coins ?? 0} <img src={coinGIF} alt="A spinning coin" className="finish__coins" /> coins and {(selectedLevel?.time / 60)?.toFixed(2) ?? 0} hours of reputation <img src={expGIF} alt="An experience bottle gif" className="finish__rep" />
        </p>
        <button className="finish__claim" onClick={handleClose} >Claim Rewards! <img src={starIcon} alt="A star icon for claim rewards" className="finish__claim-icon" /></button>
      </div>
    </Modal>
  );
}
