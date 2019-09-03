import React from 'react';
import ReactDOM from 'react-dom';
import * as axios from 'axios';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Screenings from './src/components/Screenings';
import Halls from './src/components/Halls';
import HomePage from './src/components/HomePage';
import Movies from './src/components/Movies';

const styles = {
    grid: {
        minHeight: 700,
        minWidth: 1100,
        height: '100%'
    },
    container: {
        height: '100%'
    }
};

class App extends React.Component {

    componentDidMount() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.baseURL = 'http://localhost:8080/api';
    }

    render() {
        return (
            <div style={styles.container}>
                <Router>
                    <div style={styles.container}>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/movies" component={Movies}/>
                        <Route path="/halls" component={Halls}/>
                        <Route path="/screenings" component={Screenings}/>
                        <Route component={() => <Redirect to="/"/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('react'));
