import React, { useState } from 'react'
import './PlayButton.css'

export const PlayButton = () => {
    const [isPlaying, setIsPlaying] = useState();

    return (
        <div>
            <button>{isPlaying ? 'Play' : 'Stop'}</button>
        </div>
    )
}
