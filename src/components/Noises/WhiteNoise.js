import React from 'react'

export const WhiteNoise = ({ audioCtx }) => {
    let isPlaying = false;

    let WhiteNoiseSource;

    const createNoise = () => {
        let out = audioCtx.destination;
        let gain = audioCtx.createGain();
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
        gain.gain.setValueAtTime(0.05, 0);
        WhiteNoiseSource.connect(gain);
        gain.connect(out);
    }

    const play = () => {
        if (!isPlaying) {
            isPlaying = true;
            createNoise();
            WhiteNoiseSource.start();
        }
    }

    const stop = () => {
        isPlaying = false;
        WhiteNoiseSource.stop();
    }

    return (
        <div>
            <button onClick={play}>White Noise Play</button>
            <button onClick={stop}>White Noise Stop</button>
        </div>
    )

}