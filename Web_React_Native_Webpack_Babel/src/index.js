import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/web/containers/Root'
import configureStore from './app/store/configureStore';
import { HashRouter } from 'react-router-dom'



const reduxStore = configureStore();

const App = () => (

    <Root store={reduxStore} />

)
ReactDOM.render(<HashRouter>
    <App />
</HashRouter>, document.getElementById('root'));