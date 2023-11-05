import React from 'react';
import { Character } from '../../resources/characterInterface';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="card">
      <div className="card__description">
        <p>{character.name}</p>
        <hr></hr>
      </div>
    </div>
  );
};

export default CharacterCard;
