import React from 'react'
import './noiseVolume.css'

export const NoiseVolume = ({ changeGain, step = 0.01, max, gain }) => {

    return (
        <div className='noise-volume'>
            <input onChange={changeGain} step={step} max={max} type="range" id="noise-vol" value={gain}/>
        </div>
    )
}
