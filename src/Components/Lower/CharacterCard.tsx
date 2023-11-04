import React from 'react';
import { Character } from '../../resources/characterInterface';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} className="card__image" />
      <div className="card__description">
        <p>Name: {character.name}</p>
        <p className="card__status">Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
