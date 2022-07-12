import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { PokedexContainer } from './components/PokedexContainer';
import { Modal } from './components/Modal';

import './styles/global.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <PokedexContainer />
        <Modal key="pokemon-info-modal" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
