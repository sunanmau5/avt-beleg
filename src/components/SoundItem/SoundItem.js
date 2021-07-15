import React, { memo } from 'react'
import { useDrag } from 'react-dnd'
import './soundItem.css'

export const SoundItem = memo(({ itemIndex, name, type, file, onMoveItem }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, type, file },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
          onMoveItem(itemIndex, item)
        }
      }
    }),
    [name, type],
  )

  return (
    <div className='sound-item' ref={drag} style={{ opacity }}>
      {itemIndex && <span style={{ marginRight: '0.5rem' }}>{itemIndex}.</span>}
      {name}
    </div>
  )
})
