import './App.css'
import React from "react";


const App: React.FC = () => {
  return (
    <div>
    <h1>Welcome to the Main Page</h1>
    <nav>
      <ul>
        <li>
          <a href="/uncontrolled-form">Uncontrolled Form</a>
        </li>
        <li>
          <a href="/controlled-form">Controlled Form</a>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default App;
