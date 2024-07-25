// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import axios from 'axios';

const App: React.FC = () => {
  const [results, setResults] = useState<Array<{ id: number; title: string; description: string }>>([]);

  const handleSearch = (query: string) => {
    // Simulating search results. Replace with actual search logic.
    const mockResults = [
      { id: 1, title: 'Result 1', description: 'Description for result 1' },
      { id: 2, title: 'Result 2', description: 'Description for result 2' },
      { id: 3, title: 'Result 3', description: 'Description for result 3' },
    ].filter(result => result.title.toLowerCase().includes(query.toLowerCase()));

    setResults(mockResults);
  };

  const getMovies = () : any[] => {

    axios.get('http://www.omdbapi.com/?i=tt0944947&Season=1&apikey=2f8f87a1')
    .then((res) => console.log(res.data))
    .catch((error) => console.error(error))

    return [];
  }

  if (typeof window !== 'undefined') { // Check if we're running in the browser.
    getMovies();
  }
  return (
    <div>
      <h1>Search App</h1>
      <SearchForm onSearch={handleSearch} />
      <ResultList results={results} />
    </div>
  );
};

export default App;
