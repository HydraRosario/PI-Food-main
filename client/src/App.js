import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import CreateRecipe from './Components/CreateRecipe/CreateRecipe';
import DetailsRecipe from './Components/DetailsRecipe/DetailsRecipe';
import Home from './Components/Home/Home';
import axios from 'axios';
axios.defaults.baseURL = 'pi-food-main-production-9a2e.up.railway.app';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route exact path="/" component = {LandingPage}/>
        <Route exact path="/home" component = {Home}/>
        <Route exact path="/recipes" component = {CreateRecipe}/>
        <Route exact path="/recipes/:id" component = {DetailsRecipe}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
