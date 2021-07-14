import React, { memo, useCallback, useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ReactHowler from 'react-howler'
import { ItemTypes } from './ItemTypes'
import { SoundItem } from './SoundItem'

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
  type,
  onDrop,
}) => {
  const [audio, setAudio] = useState()

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const playSound = useCallback(() => {
    console.log(`playSound`, audio, 'with volume', volume);
    return <ReactHowler src={audio} playing={true} loop={true} volume={volume} />
  }, [audio, volume])

  const isActive = isOver && canDrop
  let backgroundColor = '#1F2937'
  if (isActive) {
    backgroundColor = '#059669'
  } else if (canDrop) {
    backgroundColor = '#4B5563'
  }

  const getAudioSource = useCallback((type) => {
    switch (type) {
      case ItemTypes.FIRE:
        console.log("GetAudio:", ItemTypes.FIRE)
        console.log(`audioSrc.fire`, audioSrc.fire)
        setAudio(audioSrc.fire)
        break;
      case ItemTypes.BEACH:
        console.log("GetAudio:", ItemTypes.BEACH)
        console.log(`audioSrc.beach`, audioSrc.beach)
        setAudio(audioSrc.beach)
        break;
      case ItemTypes.BIRDS:
        console.log("GetAudio:", ItemTypes.BIRDS)
        console.log(`audioSrc.birds`, audioSrc.birds)
        setAudio(audioSrc.birds)
        break;
      case ItemTypes.WIND:
        console.log("GetAudio: ", ItemTypes.WIND)
        console.log(`audioSrc.wind`, audioSrc.wind)
        setAudio(audioSrc.wind)
        break;
      case ItemTypes.RAIN:
        console.log("GetAudio: ", ItemTypes.RAIN)
        console.log(`audioSrc.rain`, audioSrc.rain)
        setAudio(audioSrc.rain)
        break;
      default:
        console.log("Default: Kein Audio gefunden.")
        break;
    }
  }, [])

  useEffect(() => {
    getAudioSource(type)
  }, [type])

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {audio && (
        <>
          <SoundItem
            name={lastDroppedItem}
            type={type}
            // file={audioSrc}
          />
        </>
      )}
      {audio && playSound()}
    </div>
  )
})
