import React from 'react'
import { PrimaryButton } from '../Button/Button'
import { NoiseVolume } from "../Volume/NoiseVolume";

export const PinkNoise = React.memo(({ audioCtx }) => {
    let isOn = false;

    let PinkNoiseSource;
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
        let b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        for (let i = 0; i < buffer.length; i++) {
            let white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            channelData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            // channelData[i] *= 0.7; // (roughly) compensate for gain
            b6 = white * 0.115926;
        }

        PinkNoiseSource = audioCtx.createBufferSource();
        PinkNoiseSource.buffer = buffer;
        PinkNoiseSource.loop = true;
        gain.gain.setValueAtTime(0.02, 0);
        PinkNoiseSource.connect(gain);
        gain.connect(out);
    }

    const handleClick = () => {
        if (isOn) {
            isOn = false;
            PinkNoiseSource.stop()
        } else {
            isOn = true;
            createNoise();
            PinkNoiseSource.start()
        }
    }

    const changeGain = (e) => {
        if (isOn) {
            let { value } = e.target;
            gain.gain.value = value;
        }
    }

    return (
        <div>
            {console.log("pink noise rendered")}
            <PrimaryButton bgColor='#F472B6' onClick={handleClick}>Pink Noise</PrimaryButton>
            <NoiseVolume changeGain={changeGain} max="0.1" />
        </div>
    )

})
