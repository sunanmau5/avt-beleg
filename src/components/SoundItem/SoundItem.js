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

  const soundItemStyle = style ? (
    {
      ...style,
      opacity: isDragging ? 0.4 : 1
    }) : ({
      opacity: isDragging ? 0.4 : 1
    })

  return (
    <div className='sound-item' ref={drag} style={soundItemStyle}>
      <img src={icon} alt="icon" width="40" height="40" />
    </div>
  )
})
