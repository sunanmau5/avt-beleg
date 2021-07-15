import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { beachCampfire, heavyRain, initialData } from '../../presets/Presets'
import { ItemTypes } from '../../types/ItemTypes'
import { PrimaryButton } from '../Button/Button'
import { Cell } from '../Cell/Cell'
import { SoundItem } from '../SoundItem/SoundItem'
import './grid.css'

export const Grid = memo(() => {

  const [presets, setPresets] = useState([beachCampfire, heavyRain])
  const [cells, setCells] = useState(initialData)
  const [isPlaying, setPlaying] = useState(false)

  const [boxes] = useState([
    { icon: '/svg/beach.svg', type: ItemTypes.BEACH, file: ['sound/beach/beach_A.ogg', 'sound/beach/beach_B.ogg', 'sound/beach/beach_C.ogg', 'sound/beach/beach_D.ogg'] },
    { icon: '/svg/bird.svg', type: ItemTypes.BIRDS, file: ['sound/birds/birds_A.ogg', 'sound/birds/birds_B.ogg', 'sound/birds/birds_C.ogg', 'sound/birds/birds_D.ogg'] },
    { icon: '/svg/fire.svg', type: ItemTypes.FIRE, file: ['sound/fire/fire_A.ogg', 'sound/fire/fire_B.ogg', 'sound/fire/fire_C.ogg', 'sound/fire/fire_D.ogg'] },
    { icon: '/svg/rain.svg', type: ItemTypes.RAIN, file: ['sound/rain/rain_A.ogg', 'sound/rain/rain_B.ogg', 'sound/rain/rain_C.ogg', 'sound/rain/rain_D.ogg'] },
    { icon: '/svg/wind.svg', type: ItemTypes.WIND, file: ['sound/wind/wind_A.ogg', 'sound/wind/wind_B.ogg', 'sound/wind/wind_C.ogg', 'sound/wind/wind_D.ogg'] },
  ])

  const handleDrop = useCallback(
    (index, item) => {
      const { icon, type, file } = item
      const complexity = index % 4 + 1
      const volume = Math.abs(Math.floor(index / 4) - 4)
      setCells(
        update(cells, {
          [index]: {
            icon: { $set: icon },
            type: { $set: type },
            file: { $set: file },
            volume: { $set: volume },
            complexity: { $set: complexity },
          },
        })
      )
      console.log(`${type} dropped on volume ${volume} and complexity ${complexity}`)
    },
    [cells],
  )

  const removeItem = (index) => {
    setCells(
      update(cells, {
        [index]: {
          icon: { $set: null },
          type: { $set: null },
          file: { $set: null },
          volume: { $set: 0 },
          complexity: { $set: 0 },
        },
      })
    )
  }

  return (
    <div className='container'>
      <div className='grid-wrapper'>
        <div className='grid'>
          <span className='label-wrapper'>
            <span className='label top'>Loud</span>
            <span className='label bottom'>Soft</span>
            <span className='label left'>Simple</span>
            <span className='label right'>Complex</span>
          </span>
          {cells.map(({ accepts, icon, type, file, volume, complexity }, index) => (
            <Cell
              key={index}
              cellIndex={index}
              accept={accepts}
              icon={icon}
              type={type}
              file={file}
              volume={volume}
              complexity={complexity}
              onDrop={(item) => handleDrop(index, item)}
              isPlaying={isPlaying}
              onDoubleClick={() => removeItem(index)}
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
      <div className="preset-table">
        {presets.map((preset, index) => (
          <PrimaryButton key={index} bgColor='#2563EB' onClick={() => setCells(preset)}>Preset {index + 1}</PrimaryButton>
        ))}
      </div>
    </div>
  )
})
