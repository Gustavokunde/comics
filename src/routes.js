import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ComicsList from './pages/ComicsList';

export default function Routes() {
    return (
      <Switch>
        <Route path="/" component={ComicsList} />
      </Switch>
    );
  }