import React, { memo, useCallback } from "react";
import { useDrop } from "react-dnd";
import ReactHowler from "react-howler";
import { SoundItem } from "../SoundItem/SoundItem";
import "./cell.css";

export const Cell = memo(
  ({
    accept,
    soundItems,
    onDrop,
    isPlaying,
    onDoubleClick,
  }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const playSound = useCallback((soundItems) => (
      soundItems.map((soundItem, index) => {
        const { file, volume, complexity } = soundItem
        return <ReactHowler
          key={index}
          src={file[complexity - 1]}
          playing={isPlaying}
          loop={true}
          volume={volume}
        />
      })
    ), [isPlaying])

    const isActive = isOver && canDrop;
    let backgroundColor = "#1F2937";
    if (isActive) {
      backgroundColor = "#059669";
    } else if (canDrop) {
      backgroundColor = "#4B5563";
    }

    return (
      <div className="cell" ref={drop} style={{ backgroundColor }} onDoubleClick={onDoubleClick}>
        {soundItems.length > 0 && soundItems.map(({ icon, type, file }, index) => {
          return <SoundItem
            key={index}
            icon={icon}
            type={type}
            file={file}
            style={{ width: '2.5rem', height: '2.5rem' }}
          />
        })}
        {soundItems.length > 0 && playSound(soundItems)}
      </div>
    );
  }
);
