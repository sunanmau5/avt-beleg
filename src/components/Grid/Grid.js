import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { initialData } from '../../Presets'
import { ItemTypes } from '../../types/ItemTypes'
import { PrimaryButton } from '../Button/Button'
import { Cell } from '../Cell/Cell'
import { SoundItem } from '../SoundItem/SoundItem'
import './grid.css'

export const Grid = memo(() => {

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
            lastDroppedItem: { $set: name },
            type: { $set: type },
            file: { $set: file },
            volume: { $set: volume },
            complexity: { $set: complexity },
          },
        })
      )
      console.log(`${name} dropped on volume ${volume} and complexity ${complexity + 1}`)
    },
    [cells],
  )

  const removeItem = (itemIndex, item) => {
    setCells(
      update(cells, {
        [itemIndex]: {
          lastDroppedItem: { $set: null },
          type: { $set: null },
          file: { $set: null },
          volume: { $set: 0 },
          complexity: { $set: 0 },
        },
      }),
    )
    console.log(`${item.name} with index ${itemIndex} was removed`)
  }

  return (
    <div className='container'>
      <div className='grid'>
        {cells.map(({ accepts, lastDroppedItem, type, file, volume, complexity }, index) => (
          <Cell
            key={index}
            itemIndex={index}
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            type={type}
            file={file}
            volume={volume}
            complexity={complexity}
            onDrop={(item) => handleDrop(index, item)}
            moveItem={removeItem}
          />
        ))}
      </div>

      <div className='sound-items'>
        {boxes.map(({ name, type, file }, index) => (
          <SoundItem
            key={index}
            name={name}
            type={type}
            file={file}
            onMoveItem={() => { }}
          />
        ))}
      </div>

      <div className='buttons'>
        <PrimaryButton onClick={() => setCells(initialData)} />
      </div>
    </div>
  )
})
