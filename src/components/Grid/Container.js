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
    { name: 'Birds', type: ItemTypes.BIRDS },
    { name: 'Beach', type: ItemTypes.BEACH },
    { name: 'Fire', type: ItemTypes.FIRE },
    { name: 'Rain', type: ItemTypes.RAIN },
    { name: 'Wind', type: ItemTypes.WIND },
  ])

  const [droppedBoxNames, setDroppedBoxNames] = useState([])

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { name, type } = item
      const complexity = index % 4 + 1  // Complexity range from 1-4
      const volume = Math.abs(Math.floor(index / 4) - 4)
      console.log("type in ContainerDrop ",type)
      console.log("index", index)

      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setCells(
        update(cells, {
          [index]: {
            lastDroppedItem: {
              $set: name,
            },
            type: {
              $set: type,
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
        {cells.map(({ accepts, lastDroppedItem, audioSrc, type, volume }, index) => (
          <Cell
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            audioSrc={audioSrc}
            volume={volume}
            onDrop={(item) => handleDrop(index, item)}
            type={type}
            key={index}
          />
        ))}
      </div>

      <div style={soundItemStyle}>
        {boxes.map(({ name, type }, index) => (
          <SoundItem
            name={name}
            type={type}
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
