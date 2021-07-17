import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { beachCampfire, heavyRain, initialData } from '../../presets/Presets'
import { ItemTypes } from '../../types/ItemTypes'
import { PrimaryButton } from '../Button/Button'
import { Cell } from '../Cell/Cell'
import { SoundItem } from '../SoundItem/SoundItem'
import './grid.css'
import Noise from '../Noises/Noise'

let audioCtx = new AudioContext();

export const Grid = memo(() => {

  const [presets, setPresets] = useState([beachCampfire, heavyRain])
  const [cells, setCells] = useState(initialData)
  const [isPlaying, setPlaying] = useState(false)
  const [isDragging, setDragging] = useState(false)

  const [boxes] = useState([
    { icon: '/svg/beach.svg', type: ItemTypes.BEACH, file: ['sound/beach/beach_A.ogg', 'sound/beach/beach_B.ogg', 'sound/beach/beach_C.ogg', 'sound/beach/beach_D.ogg'] },
    { icon: '/svg/bird.svg', type: ItemTypes.BIRDS, file: ['sound/birds/birds_A.ogg', 'sound/birds/birds_B.ogg', 'sound/birds/birds_C.ogg', 'sound/birds/birds_D.ogg'] },
    { icon: '/svg/fire.svg', type: ItemTypes.FIRE, file: ['sound/fire/fire_A.ogg', 'sound/fire/fire_B.ogg', 'sound/fire/fire_C.ogg', 'sound/fire/fire_D.ogg'] },
    { icon: '/svg/rain.svg', type: ItemTypes.RAIN, file: ['sound/rain/rain_A.ogg', 'sound/rain/rain_B.ogg', 'sound/rain/rain_C.ogg', 'sound/rain/rain_D.ogg'] },
    { icon: '/svg/wind.svg', type: ItemTypes.WIND, file: ['sound/wind/wind_A.ogg', 'sound/wind/wind_B.ogg', 'sound/wind/wind_C.ogg', 'sound/wind/wind_D.ogg'] },
  ])

  /**
   * Callback Function to check whether a SoundItem can be dropped in the grid
   * There can only be 1 SoundItem type for each complexity column
   * 
   * @param {Number} itemIndex The cell index of where the item to be dropped
   * @param {ItemTypes} droppedType The SoundItem type of the dropped item
   * @returns false if there are already SoundItem with the same type on the dropped column
   *          true if otherwise
   */
  const checkDropValidity = useCallback((itemIndex, droppedType) => {
    if ([0, 4, 8, 12].some((complexityIndex1) => complexityIndex1 === itemIndex)) {
      if (cells[0].soundItems.length > 0 && cells[0].soundItems[0].type === droppedType) return false
      if (cells[4].soundItems.length > 0 && cells[4].soundItems[0].type === droppedType) return false
      if (cells[8].soundItems.length > 0 && cells[8].soundItems[0].type === droppedType) return false
      if (cells[12].soundItems.length > 0 && cells[12].soundItems[0].type === droppedType) return false
    }
    if ([1, 5, 9, 13].some((complexityIndex2) => complexityIndex2 === itemIndex)) {
      if (cells[1].soundItems.length > 0 && cells[1].soundItems[0].type === droppedType) return false
      if (cells[5].soundItems.length > 0 && cells[5].soundItems[0].type === droppedType) return false
      if (cells[9].soundItems.length > 0 && cells[9].soundItems[0].type === droppedType) return false
      if (cells[13].soundItems.length > 0 && cells[13].soundItems[0].type === droppedType) return false
    }
    if ([2, 6, 10, 14].some((complexityIndex3) => complexityIndex3 === itemIndex)) {
      if (cells[2].soundItems.length > 0 && cells[2].soundItems[0].type === droppedType) return false
      if (cells[6].soundItems.length > 0 && cells[6].soundItems[0].type === droppedType) return false
      if (cells[10].soundItems.length > 0 && cells[10].soundItems[0].type === droppedType) return false
      if (cells[14].soundItems.length > 0 && cells[14].soundItems[0].type === droppedType) return false
    }
    if ([3, 7, 11, 15].some((complexityIndex3) => complexityIndex3 === itemIndex)) {
      if (cells[3].soundItems.length > 0 && cells[3].soundItems[0].type === droppedType) return false
      if (cells[7].soundItems.length > 0 && cells[7].soundItems[0].type === droppedType) return false
      if (cells[11].soundItems.length > 0 && cells[11].soundItems[0].type === droppedType) return false
      if (cells[15].soundItems.length > 0 && cells[15].soundItems[0].type === droppedType) return false
    }
    return true
  }, [cells])

  /**
   * Callback Function to handle the drop event of a SoundItem
   * 
   * @param {Number} index The cell index of where the item to be dropped
   * @param {SoundItem} item SoundItem
   */
  const handleDrop = useCallback((index, item) => {
    const { icon, type, file } = item
    const complexity = index % 4 + 1
    const volume = Math.abs(Math.floor(index / 4) - 4)
    const soundItem = { icon, type, file, volume, complexity }
    const canDrop = checkDropValidity(index, type)

    if (cells[index].soundItems.length >= 2) {
      console.log(`${type} can't be dropped in cell ${index}`)
    } else if (!canDrop) {
      console.log(`${type} already exists in complexity ${complexity}`)
    } else {
      setCells(
        update(cells, {
          [index]: { soundItems: { $push: [soundItem] } },
        })
      )
      console.log(`${type} dropped on volume ${volume} and complexity ${complexity}`)
    }
  },
    [cells, checkDropValidity],
  )

  /**
   * Function to remove a SoundItem from the grid
   * 
   * @param {Number} index The SoundItem index to be removed
   */
  const removeItem = (index) => {
    setCells(
      update(cells, {
        [index]: { soundItems: { $set: [] } },
      })
    )
  }

  return (
    <div className='container'>
      <div className='noise-wrapper'>
        <Noise audioCtx={audioCtx} name='White Noise' type='white' color='#949494' max='0.2' valueAtTime={0.05} />
        <Noise audioCtx={audioCtx} name='Brown Noise' type='brown' color='#92400E' max='5' valueAtTime={1.2} />
        <Noise audioCtx={audioCtx} name='Pink Noise' type='pink' color='#F472B6' max='0.1' valueAtTime={0.02} />
      </div>
      <div className='grid-wrapper'>
        <div className='grid'>
          {isDragging && <span className='label-wrapper'>
            <span className='label top'>Loud</span>
            <span className='label bottom'>Soft</span>
            <span className='label left'>Simple</span>
            <span className='label right'>Complex</span>
          </span>
          }
          {cells.map(({ accepts, soundItems }, index) => (
            <Cell
              key={index}
              cellIndex={index}
              accept={accepts}
              soundItems={soundItems}
              onDrop={(item) => handleDrop(index, item)}
              isPlaying={isPlaying}
              onDoubleClick={() => removeItem(index)}
              setDragging={setDragging}
            />
          ))}
        </div>

        <div className='sound-items'>
          {boxes.map(({ icon, type, file }, index) => (
            <SoundItem
              key={index}
              icon={icon}
              type={type}
              file={file}
            />
          ))}
        </div>

        <div className='buttons'>
          <PrimaryButton bgColor={isPlaying ? undefined : '#059669'} onClick={() => setPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</PrimaryButton>
          <PrimaryButton onClick={() => setCells(initialData)}>Reset</PrimaryButton>
        </div>
      </div>

      <div className="preset-container">
        <PrimaryButton bgColor='#059669' onClick={() => setPresets([...presets, cells])}>Save Preset</PrimaryButton>
        <PrimaryButton onClick={() => setPresets([beachCampfire, heavyRain])}>Reset Presets</PrimaryButton>
      </div>
      <div className="preset-container">
        {presets.map((preset, index) => (
          <PrimaryButton key={index} bgColor='#2563EB' onClick={() => setCells(preset)}>Preset {index + 1}</PrimaryButton>
        ))}
      </div>
    </div>
  )
})
