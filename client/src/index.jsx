import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import {MainView} from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

//Bringing in the scss file for this page
import './styles.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      //Functionality for react-redux
      <Provider store={store}>
        {/* Uses MainView, which will be primary source of application */}
        <MainView/>
      </Provider>
    )
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);