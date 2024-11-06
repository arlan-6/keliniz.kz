'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Text, Transformer } from 'react-konva';

interface ElTextProps {
  className?: string;
  text: string;
  x: number;
  y: number;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (attrs: { x: number; y: number; width?: number; height?: number }) => void;
}

export const ElText: FC<ElTextProps> = ({ className, text, x, y, isSelected, onSelect, onChange }) => {
  const textRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      // Attach transformer manually
      if (trRef.current && textRef.current) {
        trRef.current.nodes([textRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <>
      <Text
        text={text}
        x={x}
        y={y}
        draggable
        ref={textRef}
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
        anchorCornerRadius={10}
        rotateAnchorCursor='grab'
        rotateLineVisible={false}
        rotateAnchorOffset={20}
        keepRatio
        rotationSnaps={[0,45, 90,135, 180,225, 270,315]}
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
