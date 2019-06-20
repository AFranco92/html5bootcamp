import React from 'react';
import { Route, Switch } from 'react-router-dom';
import store from '../store/index';
import {Provider} from 'react-redux';
import MainView from './mainView/mainView';
import ResultTableView from './resultTableView/resultTableView';

const getRoutes = function() {
    return (
        <div>
          <Provider store = {store}>
            <Route name="Main" component={MainView} />
            <Switch>
                <Route exact path="/moviestable" component={ResultTableView} />
            </Switch>
          </Provider>
        </div>
    )
};

export default getRoutes;
