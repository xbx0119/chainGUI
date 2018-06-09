import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Wrapper from './components/wrapper';

// views
import accountInfo from './views/accountInfo';
import blockList from './views/blockList';
import createRecord from './views/createRecord';
import dappList from './views/dappList';
import home from './views/home';
import peerList from './views/peerList';
import votePeer from './views/votePeer';
import error from './views/error';


// import logo from './logo.jpg';
import './styles/App.css';

class App extends Component {

    render() {
        return (
            <Router>
                <Wrapper>
                    <Switch>
                        <Route exact path="/" component={home} />
                        <Redirect from='/home' to='/' />
                        <Route path="/blockList" component={blockList} />
                        <Route path="/createRecord" component={createRecord} />
                        <Route path="/peerList" component={peerList} />
                        <Route path="/votePeer" component={votePeer} />
                        <Route path="/dappList" component={dappList} />
                        <Route path="/accountInfo" component={accountInfo} />
                        <Route component={error} />
                    </Switch>
                </Wrapper>
            </Router>
        );
    }
}

export default App;
