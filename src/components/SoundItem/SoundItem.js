import React, { memo } from 'react'
import { useDrag } from 'react-dnd'
import './soundItem.css'

export const SoundItem = memo(({ icon, type, file, style }) => {

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { icon, type, file },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
    }),
    [icon, type],
  )

  return (
    <div className='sound-item' ref={drag} style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
      <img src={icon} alt="icon" width="40" height="40" />
    </div>
  )
})
