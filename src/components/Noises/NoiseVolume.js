import React from 'react';

export const NoiseVolume = ({ changeGain, step = 0.01, max, isOn }) => {
    return (
        <div>
            <input onChange={changeGain} step={step} max={max} type="range" id="noise-vol" disabled={!isOn}/>
        </div>
    )
}
