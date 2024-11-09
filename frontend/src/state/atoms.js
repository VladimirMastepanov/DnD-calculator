import { atom } from 'jotai';

export const MODES = {
  CONSTRUCTOR: 'constructor',
  RUNTIME: 'runtime',
};

export const COMPONENTS_TYPE = {
  DISPLAY: 'Display',
  OPERATIONS: 'Operations',
  NUMBERS: 'Numbers',
  EQUAL: 'Equal',
};

export const PANEL_PADDING = 20;
export const COMPONENT_GAP = 15;

export const modeAtom = atom(MODES.CONSTRUCTOR); 
export const displayValueAtom = atom('0');
export const droppedComponentsList = atom([]);
