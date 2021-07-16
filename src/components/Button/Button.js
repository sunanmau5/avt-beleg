import React from 'react'
import './button.css'

export const PrimaryButton = ({ color, bgColor, onClick, children }) => {

  const style = {
    color: color ? color : 'white',
    backgroundColor: bgColor ? bgColor : '#DC2626',
    transition: 'background-color 0.2s ease-out',
  }

  return <div className='button' style={style} onClick={onClick}>{children}</div>
}
