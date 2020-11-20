import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

import PlantProfile from './components/PlantProfile'
import EditPlant from './components/EditPlant'
import AddPlant from './components/AddPlant'
import UserPage from './components/UserPage'
import Fernstagram from './components/Fernstagram'
import PlantSitters from './components/PlantSitters'
import PlantSearch from './components/PlantSearch'
import UserMap from './components/UserMap'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/Header'
import Settings from './components/Settings'
import Home from './components/Home'


const App = () => {
  return <BrowserRouter>
    <Header />
    <Switch>
      {/* User Interface */}
      <Route exact path="/profile-plant/:plantId/" component={PlantProfile} />
      <Route exact path="/edit-plant/:plantId/" component={EditPlant} />
      <Route exact path="/add-plant/:plantId/" component={AddPlant} />
      <Route exact path="/user-page/:userId/" component={UserPage} />
      {/* Message Boards */}
      <Route exact path="/fernstagram/" component={Fernstagram} />
      <Route exact path="/plant-sitters/" component={PlantSitters} />
      {/* Search Components */}
      <Route exact path="/plant-search/" component={PlantSearch} />
      <Route exact path="/user-map/" component={UserMap} />
      {/* Login and Signup */}
      <Route exact path="/user/register" component={Register} />
      <Route exact path="/user/login/" component={Login} />
      {/* Landing Page */}
      <Route exact path ="/user-page/:userId/settings/" component={Settings} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
}

export default App