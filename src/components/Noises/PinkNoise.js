import React from 'react'

export const PinkNoise = ({ audioCtx }) => {
    let isPlaying = false;

    let PinkNoiseSource;

    const createNoise = () => {
        let out = audioCtx.destination;
        let gain = audioCtx.createGain();
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
        gain.gain.setValueAtTime(0.02, 0);
        PinkNoiseSource.connect(gain);
        gain.connect(out);
    }

    const play = () => {
        if (!isPlaying) {
            isPlaying = true;
            createNoise();
            PinkNoiseSource.start();
        }
    }

    const stop = () => {
        isPlaying = false;
        PinkNoiseSource.stop();
    }

    return (
        <div>
            <button onClick={play}>Pink Noise Play</button>
            <button onClick={stop}>Pink Noise Stop</button>
        </div>
    )

}