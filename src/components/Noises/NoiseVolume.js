import React from 'react';

export const NoiseVolume = ({ changeGain, step = 0.01, max, isOn, gain }) => {

    return (
        <div>
            <input onChange={changeGain} step={step} max={max} type="range" id="noise-vol" /* disabled={!isOn} */ value={gain}/>
        </div>
    )
}
