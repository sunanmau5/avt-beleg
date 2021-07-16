import React from 'react';

export const Noise = ({ audioCtx, type }) => {
    let NoiseSource;

    const createWhiteNoise = (buffer, channelData) => {
        for (let i = 0; i < buffer.length; i++) {
            channelData[i] = Math.random() * 2 - 1;
        }
        return channelData;
    }

    const createBrownNoise = (buffer, channelData) => {
        let lastOut = 0.0;
        for (let i = 0; i < buffer.length; i++) {
            let white = Math.random() * 2 - 1;
            channelData[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = channelData[i];
            channelData[i] *= 10;   // (roughly) compensate gain
        }
        return channelData;
    }

    const createPinkNoise = (buffer, channelData) => {
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
            channelData[i] *= 0.7; // (roughly) compensate for gain
            b6 = white * 0.115926;
        }
        return channelData;
    }

    const createNoise = (type) => {
        let out = audioCtx.destination;
        let gain = audioCtx.createGain();
        const buffer = audioCtx.createBuffer(
            1,
            audioCtx.sampleRate * 100,
            audioCtx.sampleRate
        );
        let channelData = buffer.getChannelData(0);

        switch (type) {
            case "white":
                channelData = createWhiteNoise(buffer, channelData);
                break;
            case "brown":
                channelData = createBrownNoise(buffer, channelData);
                break;
            case "pink":
                channelData = createPinkNoise(buffer, channelData);
                break;
            default:
                console.log("Kein richtigen Noisetype angegeben. (white, brown, pink)");
                break;
        }
        NoiseSource = audioCtx.createBufferSource();
        NoiseSource.buffer = buffer;
        gain.gain.setValueAtTime(0.05, 0);

        NoiseSource.connect(gain);
        gain.connect(out);
    }

    createNoise(type);

    const play = () => {
        NoiseSource.start();
    }

    const stop = () => {
        NoiseSource.stop();
    }

    return (
        <div className="Noise" id="Noise">
            {type === "white" && (
                <>
                    <button onClick={play}>White Noise Play</button>
                    <button onClick={stop}>White Noise Stop</button>
                </>
            )}
            {type === "brown" && (
                <>
                    <button onClick={play}>Brown Noise Play</button>
                    <button onClick={stop}>Brown Noise Stop</button>
                </>
            )}
            {type === "pink" && (
                <>
                    <button onClick={play}>Pink Noise Play</button>
                    <button onClick={stop}>Pink Noise Stop</button>
                </>
            )}
        </div>
    )
}