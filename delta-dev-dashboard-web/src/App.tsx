import React from 'react';
import './App.css';
import Dashboard from './dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}

export default App;
