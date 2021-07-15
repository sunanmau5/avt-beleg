import React, { memo } from 'react'
import { useDrag } from 'react-dnd'

const style = {
  border: '1px solid #4B5563',
  borderRadius: '8px',
  backgroundColor: '#4B5563',
  color: 'white',
  padding: '0.5rem 1rem',
  margin: '1rem 0.5rem',
  cursor: 'move',
}

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
    <div ref={drag} style={{ ...style, opacity }}>
      {itemIndex && <span style={{ marginRight: '0.5rem' }}>{itemIndex}.</span>}
      {name}
    </div>
  )
})
