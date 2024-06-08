import { useState } from 'react';
import Modal from '@mui/material/Modal';
import './TrackHabitModal.scss'

export default function TrackHabitModal({ openTracker, handleClose, graphUrl }) {
    

  return (
    <Modal
      open={openTracker}
      onClose={handleClose}
    >
      <div className="track">
      <iframe
          src={graphUrl}
          title="Pixela Graph"
          className="track__iframe"
        ></iframe>
        <button className="track__close" onClick={handleClose}>Close</button>
      </div>
    </Modal>
  )
}
