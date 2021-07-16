import React from 'react'

export const BrownNoise = ({ audioCtx }) => {
    let isPlaying = false;

    let BrownNoiseSource;

    const createNoise = () => {
        let out = audioCtx.destination;
        let gain = audioCtx.createGain();
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
        gain.gain.setValueAtTime(1.2, 0);
        BrownNoiseSource.connect(gain);
        gain.connect(out);
    }

    const play = () => {
        if (!isPlaying) {
            isPlaying = true;
            createNoise();
            BrownNoiseSource.start();
        }
    }

    const stop = () => {
        isPlaying = false;
        BrownNoiseSource.stop();
    }

    return (
        <div>
            <button onClick={play}>Brown Noise Play</button>
            <button onClick={stop}>Brown Noise Stop</button>
        </div>
    )

}