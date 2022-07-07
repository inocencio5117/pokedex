import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { PokedexContainer } from './components/PokedexContainer';

import './styles/global.scss';
import './App.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <PokedexContainer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
