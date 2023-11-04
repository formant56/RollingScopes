import React from 'react';
import { Outlet } from 'react-router-dom';

interface ChildComponentProps {
  onValueSet: (newValue: string) => void;
  pageIncDec: (operation: 'increase' | 'decrease') => void;
  pageReset: () => void;
}

const Search: React.FC<ChildComponentProps> = ({
  onValueSet,
  pageIncDec,
  pageReset,
}) => {
  const [tempvalue, setTempValue] = React.useState<string>(
    localStorage.getItem('searchResult') || ''
  );

  const handleChange = (newValue: string) => {
    setTempValue(newValue);
  };

  const handleSubmit = () => {
    pageReset();
    onValueSet(tempvalue.toLowerCase().trimEnd());
    localStorage.setItem('searchResult', tempvalue.toLowerCase().trimEnd());
  };

  return (
    <>
      <input
        type="text"
        value={tempvalue}
        onChange={(e) => handleChange(e.target.value)}
      />

      <button onClick={handleSubmit}>Search</button>
      <button onClick={() => pageIncDec('increase')}>Next Page</button>
      <button onClick={() => pageIncDec('decrease')}>Previous Page</button>
      <Outlet />
    </>
  );
};

export default Search;
