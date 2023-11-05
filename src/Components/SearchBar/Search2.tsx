import React from 'react';
import { Outlet } from 'react-router-dom';

interface ChildComponentProps {
  onValueSet: (newValue: string) => void;

  pageReset: () => void;
  onLimitSet: (resultsPP: number) => void;
  limit: number;
}

const Search: React.FC<ChildComponentProps> = ({
  onValueSet,
  pageReset,
  onLimitSet,
  limit,
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
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    pageReset();
    onLimitSet(parseInt(event.target.value, 10));
  };

  return (
    <>
      <input
        type="text"
        value={tempvalue}
        onChange={(e) => handleChange(e.target.value)}
      />

      <button onClick={handleSubmit}>Search</button>

      <div>
        <label>Select Items Per Page:</label>
        <select value={limit} onChange={handlePageChange}>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
        </select>
      </div>
      <Outlet />
    </>
  );
};

export default Search;
