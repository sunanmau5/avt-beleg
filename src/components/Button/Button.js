import React from 'react'
import './button.css'

export const PrimaryButton = ({ onClick, color, bgColor }) => {

  const style = {
    color: color ? color : 'white',
    backgroundColor: bgColor ? bgColor : '#DC2626',
  }

  return <div className='button' style={style} onClick={onClick}>Reset</div>
}
