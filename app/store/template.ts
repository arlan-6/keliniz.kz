import { TextConfig } from "./store";

export const ElTextTemplate: TextConfig = {
    zIndex: 0,                   // Default z-index order
    text: 'testtt',                    // Default text content
    direction: 'inherit',        // Default text direction
    fontFamily: 'Arial',         // Default font family
    fontSize: 12,                // Default font size in pixels
    fontStyle: 'normal',         // Default font style and weight
    fontVariant: 'normal',       // Default font variant
    textDecoration: '',          // Default text decoration
    align: 'left',               // Default horizontal alignment
    verticalAlign: 'top',        // Default vertical alignment
    padding: 0,                  // Default padding around the text
    lineHeight: 1,               // Default line height multiplier
    wrap: 'word',                // Default text wrap mode
    ellipsis: false,             // Default ellipsis setting
    fill: '#000000',             // Default fill color for text
    stroke: '#000000',           // Default stroke color for text outline
    strokeWidth: 0,              // Default stroke width for text outline
    x: 0,                        // Default X-coordinate position
    y: 0,                        // Default Y-coordinate position
    width: 100,                  // Default width of the element
    height: 50,                  // Default height of the element
    visible: true,               // Default visibility flag
    listening: true,             // Default event listening flag
    id: '',                      // Default unique identifier
    name: 'Text',                    // Default non-unique name for reference
    opacity: 1,                  // Default opacity level
    scale: { x: 1, y: 1 },       // Default scale object with x and y components
    scaleX: 1,                   // Default scale factor in X-direction
    scaleY: 1,                   // Default scale factor in Y-direction
    rotation: 0,                 // Default rotation angle in degrees
    offset: { x: 0, y: 0 },      // Default offset for center and rotation points
    offsetX: 0,                  // Default X-offset for rotation center
    offsetY: 0,                  // Default Y-offset for rotation center
    draggable: true,             // Default enable dragging
    dragDistance: 0,             // Default minimum drag distance to initiate dragging
    dragBoundFunc: (pos) => pos, // Default custom function to restrict drag bounds
    shadowColor: '',             // Default shadow color
    shadowBlur: 0,               // Default shadow blur level
    shadowOffset: { x: 0, y: 0 },// Default shadow offset with x and y components
    shadowOffsetX: 0,            // Default shadow X-offset
    shadowOffsetY: 0,            // Default shadow Y-offset
    shadowOpacity: 0,            // Default shadow opacity
    shadowEnabled: false         // Default enable shadow
};
