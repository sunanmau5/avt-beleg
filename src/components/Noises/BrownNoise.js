import React, { useState, useEffect } from 'react';
import { NoiseVolume } from "./NoiseVolume";
import { PrimaryButton } from '../Button/Button'

export const BrownNoise = ({ audioCtx, isPlaying }) => {
    let isOn = false;

    let BrownNoiseSource;
    let gain;

    const createNoise = () => {
        let out = audioCtx.destination;
        gain = audioCtx.createGain();
        const buffer = audioCtx.createBuffer(
            1,
            audioCtx.sampleRate * 1,
            audioCtx.sampleRate
        );
        let channelData = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < buffer.length; i++) {
            let white = Math.random() * 2 - 1;
            channelData[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = channelData[i];
            // channelData[i] *= 20;   // (roughly) compensate gain
        }

        BrownNoiseSource = audioCtx.createBufferSource();
        BrownNoiseSource.buffer = buffer;
        BrownNoiseSource.loop = true;
        gain.gain.setValueAtTime(1.2, 0);
        BrownNoiseSource.connect(gain);
        gain.connect(out);
    }

    const handleClick = () => {
        console.log(isOn)
        if (isOn) {
            isOn = false;
            BrownNoiseSource.stop()
        } else {
            isOn = true;
            createNoise();
            BrownNoiseSource.start()
        }
    }

    const changeGain = (e) => {
        let { value } = e.target;
        gain.gain.value = value;
    }


    return (
        <div>
            <PrimaryButton bgColor='#92400E' onClick={handleClick}>Brown Noise</PrimaryButton>
            <NoiseVolume changeGain={changeGain} isOn={isOn} max="5" />
        </div>
    )

}