import { Component } from 'react';
import Home from './Home';
import Home1 from './Home1';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends Component {
  render(){
    return (
      <div>
        <Switch>
          <Route path='/home'>
            <Home/>
          </Route>
          <Redirect to="/home"/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect()(Main));