// import React from 'react';
// import Home from './components/Home';
// import Game from './components/Game';
// import Leaderboard from './components/Leaderboard';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/game" element={<Game />} />
//                 <Route path="/leaderboard" element={<Leaderboard />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
import React, { useEffect } from 'react';
import './App.css';
import Game from './components/Game';
function App() {
  useEffect(() => {
    console.log('App is running!');
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
