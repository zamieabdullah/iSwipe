import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import AppRoute from './routes/AppRoute';

function App() {
  return (
      <Router>
          <AppRoute />
      </Router>
  );
}

export default App;
