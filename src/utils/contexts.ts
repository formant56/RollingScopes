import React from 'react';
import { Gif } from './types';

function initContextPlug(value: number): void {
  console.log(value);
}
export const LimitContext = React.createContext(initContextPlug);

export const DataContext = React.createContext<Gif[]>([]);
