import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { Cell } from './Cell'
import { initialData } from './InitialData'
import { ItemTypes } from './ItemTypes'
import { ResetButton } from './ResetButton'
import { SoundItem } from './SoundItem'

export const Container = memo(() => {

  const [cells, setCells] = useState(initialData)

  const [boxes] = useState([
    { name: 'Birds', type: ItemTypes.BIRDS, file: ['sound/birds/birds_A.ogg', 'sound/birds/birds_B.ogg', 'sound/birds/birds_C.ogg', 'sound/birds/birds_D.ogg'] },
    { name: 'Beach', type: ItemTypes.BEACH, file: ['sound/beach/beach_A.ogg', 'sound/beach/beach_B.ogg', 'sound/beach/beach_C.ogg', 'sound/beach/beach_D.ogg'] },
    { name: 'Fire', type: ItemTypes.FIRE, file: ['sound/fire/fire_A.ogg', 'sound/fire/fire_B.ogg', 'sound/fire/fire_C.ogg', 'sound/fire/fire_D.ogg'] },
    { name: 'Rain', type: ItemTypes.RAIN, file: ['sound/rain/rain_A.ogg', 'sound/rain/rain_B.ogg', 'sound/rain/rain_C.ogg', 'sound/rain/rain_D.ogg'] },
    { name: 'Wind', type: ItemTypes.WIND, file: ['sound/wind/wind_A.ogg', 'sound/wind/wind_B.ogg', 'sound/wind/wind_C.ogg', 'sound/wind/wind_D.ogg'] },
  ])

  const [droppedBoxNames, setDroppedBoxNames] = useState([])

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { name, file } = item
      const complexity = index % 4 + 1  // Complexity range from 1-4
      const volume = Math.abs(Math.floor(index / 4) - 4)
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setCells(
        update(cells, {
          [index]: {
            lastDroppedItem: {
              $set: name,
            },
            audioSrc: {
              $set: file[complexity - 1], // Complexity index range from 0-3
            },
            volume: {
              $set: volume,
            }
          },
        }),
      )
      console.log(`${name} dropped on volume ${volume} and complexity ${complexity}`)
    },
    [droppedBoxNames, cells],
  )

  const soundItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    clear: 'both',
  }

  return (
    <div style={{ maxWidth: '40.5rem' }}>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {cells.map(({ accepts, lastDroppedItem, audioSrc, volume }, index) => (
          <Cell
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            audioSrc={audioSrc}
            volume={volume}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={soundItemStyle}>
        {boxes.map(({ name, type, file }, index) => (
          <SoundItem
            name={name}
            type={type}
            file={file}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ResetButton initialCells={initialData} setCells={setCells} />
      </div>
    </div>
  )
})
