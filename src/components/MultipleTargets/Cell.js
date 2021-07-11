import React, { memo } from 'react'
import { useDrop } from 'react-dnd'

const style = {
  height: '8rem',
  width: '8rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  border: '1px solid rgba(0, 0, 0, 0.5)',
}

export const Cell = memo(({
  accept,
  lastDroppedItem,
  audioFile,
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} role="Cell" style={{ ...style, backgroundColor }}>
      {lastDroppedItem && (
        <>
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
          <p>Audio src: {audioFile}</p>
        </>
      )}
    </div>
  )
})
