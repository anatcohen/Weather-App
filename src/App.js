import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Home from './Home Page/Home';
import Favourites from './Favourites Page/Favourites';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import store from './store/store';
import { Route } from 'react-router-dom';

function App(props) {
  return (
    <div className="body">
      <NavBar />
      <div className="content-container">
        <Route exact path="/anat-cohen-29-11-2019/" render={(routeProps) => <Home {...routeProps} {...props} />} />
        <Route exact path="/Favourites" render={(routeProps) => <Favourites {...routeProps} {...props} />} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentCity: state.currentCity,
    favourites: state.favourites,
    autocomplete: state.autocomplete
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addErrorMessage: message => { dispatch(actions.addErrorMessage(message)) },
    onAddFavClick: () => { dispatch(actions.addFavourite(store.getState().currentCity)) },
    onRemoveAllClick: () => { dispatch(actions.removeAllFavourite()) },
    onRemoveClick: id => { dispatch(actions.removeFavourite(id)) },
    fetchForecast: (locationKey, city, country, isMetric) => { dispatch(actions.fetchForecast(locationKey, city, country, isMetric)) },
    fecthAutoComplete: list => { dispatch(actions.fecthAutoComplete(list)) },
    fetchGeoLocation: (lat, lon) => { dispatch(actions.fetchGeoLocation(lat, lon)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);