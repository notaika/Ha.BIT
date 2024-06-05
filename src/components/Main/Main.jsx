import React from 'react'
import Header from '../Header/Header'
import './Main.scss'

export default function Main({ token }) {
  return (
    <div>
      <Header token={token}/>
    </div>
  )
}
