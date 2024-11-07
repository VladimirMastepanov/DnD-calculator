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
}

export const modeAtom = atom(MODES.CONSTRUCTOR); 
export const displayValueAtom = atom('0');
export const droppedComponentsList = atom([]);
