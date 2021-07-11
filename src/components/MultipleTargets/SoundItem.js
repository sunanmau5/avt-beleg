import React, { memo } from 'react'
import { useDrag } from 'react-dnd'

const style = {
  border: '1px solid gray',
  borderRadius: '8px',
  backgroundColor: '#222',
  color: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

export const SoundItem = memo(({ name, type, file, isDropped, complexityIndex, volumeIndex }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type],
  )

  return (
    <div ref={drag} role="SoundItem" style={{ ...style, opacity }}>
      {name}
    </div>
  )
})
