import React, { memo, useCallback } from "react";
import { useDrop } from "react-dnd";
import ReactHowler from "react-howler";
import { SoundItem } from "../SoundItem/SoundItem";
import "./cell.css";

export const Cell = memo(
  ({
    accept,
    icon,
    type,
    file,
    volume,
    complexity,
    onDrop,
    moveItem,
    isPlaying,
  }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const playSound = useCallback(
      () => (
        <ReactHowler
          src={file[complexity - 1]}
          playing={isPlaying}
          loop={true}
          volume={volume}
        />
      ),
      [file, volume, complexity, isPlaying]
    );

    const isActive = isOver && canDrop;
    let backgroundColor = "#1F2937";
    if (isActive) {
      backgroundColor = "#059669";
    } else if (canDrop) {
      backgroundColor = "#4B5563";
    }

    return (
      <div className="cell" ref={drop} style={{ backgroundColor }}>
        {file && (
          <SoundItem
            icon={icon}
            type={type}
            file={file}
            onMoveItem={moveItem}
          />
        )}
        {file && playSound()}
      </div>
    );
  }
);
