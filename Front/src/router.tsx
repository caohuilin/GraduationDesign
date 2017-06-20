import * as React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './app/containers';
import Home from './app/containers/Home';
import Collection from './app/containers/Collection';
import User from './app/containers/User';
import Article from './app/containers//Article';
import Content from './app/containers/Content';
import Login from './app/containers/LoginRegister';
import Register from './app/containers/LoginRegister';
import configureStore from './app/store/configureStore';

const store: any = configureStore({});

const history = syncHistoryWithStore(hashHistory, store);

export default React.createClass({
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path='/' component={App}>
                        <IndexRoute component={Home} />
                        <Route path='home' component={Home} />
                        <Route path='home/:id' component={Home} />
                        <Route path='home/book/:id' component={Article} />
                        <Route path='home/book/:id/content/:id' component={Content} />
                        <Route path='collection' component={Collection} />
                        <Route path='user' component={User} />
                        <Route path='login' component={Login} />
                        <Route path='register' component={Register} />
                    </Route>
                </Router>
            </Provider>

        );
    }
});
