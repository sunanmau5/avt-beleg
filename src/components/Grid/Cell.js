import React, { memo, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import ReactHowler from 'react-howler'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '8rem',
  width: '8rem',
  color: 'white',
  padding: '1rem',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  border: '1px solid rgba(0, 0, 0, 0.5)',
}

export const Cell = memo(({
  accept,
  lastDroppedItem,
  audioSrc,
  volume,
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

  const playSound = useCallback(() => <ReactHowler src={audioSrc} playing={true} loop={true} />, [audioSrc])

  const isActive = isOver && canDrop
  let backgroundColor = '#1F2937'
  if (isActive) {
    backgroundColor = '#059669'
  } else if (canDrop) {
    backgroundColor = '#4B5563'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {lastDroppedItem && (
        <span>Last dropped: {lastDroppedItem}</span>
      )}
      {audioSrc && (
        <>
          <span>Volume: {volume}</span>
          <span>Audio src: {audioSrc}</span>
        </>
      )}
      {audioSrc && playSound()}
    </div>
  )
})
