'use client'
import React, { FC } from 'react';
import { Stage, Layer } from 'react-konva';
import { ElText } from '../elements/ElText';
import { ElTextTemplate } from '@/app/store/template';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '@/app/store/store';

interface MainCanvasProps {
  className?: string;
}

// MainCanvas Component
export const MainCanvas: FC<MainCanvasProps> = ({ className }) => {
  const elements = useStore((state) => state.elements);
  const activeElementId = useStore((state) => state.activeElementId);
  const addElement = useStore((state) => state.addElement);
  const setActiveElement = useStore((state) => state.setActiveElement);
  const updateElement = useStore((state) => state.updateElement);

  const handleAddElement = () => {
    addElement({ ...ElTextTemplate, id: uuidv4() });
  };

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setActiveElement(null);
    }
  };

  return (
    <div className={`w-screen ${className} fixed`}>
      <div className="flex w-full justify-center border-2">
        <button onClick={handleAddElement}>add</button>
        <div className="w-[360px] bg-yellow-500">
          <Stage
            width={360}
            height={800}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              {elements.map((element, i) => (
                <ElText
                  key={element.id}
                  text={element.text}
                  x={element.x}
                  y={element.y}
                  isSelected={element.id === activeElementId}
                  onSelect={() => setActiveElement(element.id)}
                  onChange={(newAttrs) => {
                    updateElement(element.id, newAttrs);
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};