import React from 'react';
import { NoiseVolume } from "./NoiseVolume";
import { PrimaryButton } from '../Button/Button'

export const WhiteNoise = React.memo(({ audioCtx }) => {
    let isOn = false;

    let WhiteNoiseSource;
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
        for (let i = 0; i < buffer.length; i++) {
            channelData[i] = Math.random() * 2 - 1;
        }

        WhiteNoiseSource = audioCtx.createBufferSource();
        WhiteNoiseSource.buffer = buffer;
        WhiteNoiseSource.loop = true;
        gain.gain.setValueAtTime(0.05, 0);
        WhiteNoiseSource.connect(gain);
        gain.connect(out);
    }

    const handleClick = () => {
        if (isOn) {
            isOn = false;
            console.log("Deleted White Noise")
            WhiteNoiseSource.stop()
        } else {
            isOn = true;
            console.log("Created White Noise")
            createNoise();
            WhiteNoiseSource.start()
        }
        console.log("isOn", isOn)
    }

    const changeGain = (e) => {
        if (isOn) {
            let { value } = e.target;
            gain.gain.value = value;
        }
    }


    return (
        <div>
            {console.log("white noise rendered")}
            <PrimaryButton bgColor='#949494' onClick={handleClick}>White Noise</PrimaryButton>
            <NoiseVolume changeGain={changeGain} max="0.2" />
        </div>
    )

})