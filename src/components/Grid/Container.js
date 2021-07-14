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

  const handleDrop = useCallback(
    (index, item) => {
      const { name, type, file } = item
      const complexity = index % 4
      const volume = Math.abs(Math.floor(index / 4) - 4)
      setCells(
        update(cells, {
          [index]: {
            lastDroppedItem: {
              $set: name,
            },
            audioSrc: {
              $set: file[complexity], // Complexity index range from 0-3
            },
            volume: {
              $set: volume,
            },
            type: {
              $set: type,
            },
          },
        }),
      )
      console.log(`${name} dropped on volume ${volume} and complexity ${complexity + 1}`)
    },
    [cells],
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
        {cells.map(({ accepts, lastDroppedItem, audioSrc, volume, type }, index) => (
          <Cell
            key={index}
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            audioSrc={audioSrc}
            volume={volume}
            type={type}
            onDrop={(item) => handleDrop(index, item)}
          />
        ))}
      </div>

      <div style={soundItemStyle}>
        {boxes.map(({ name, type, file }, index) => (
          <SoundItem
            name={name}
            type={type}
            file={file}
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
