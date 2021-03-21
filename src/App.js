import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/shared/Header';
import client from './libs/client';
import { StorageProvider } from './libs/storage';

import MyPokemonList from './pages/MyPokemonList';
import PokemonDetail from './pages/PokemonDetail';
import PokemonList from './pages/PokemonList';

function App() {
  return (
    <StorageProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <Route path="/my-pokemon" component={MyPokemonList} />
              <Route path="/:name" component={PokemonDetail} />
              <Route path="/" component={PokemonList} />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    </StorageProvider>
  );
}

export default App;
