import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage';
import Movies from './Movies';
import Theaters from './Theaters';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex'
    },
    link: {
        flex: 1,
        margin: 10
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    },
    title: {
        flexGrow: 1
    },
    grid: {
        padding: 10
    }
};

class HomeRouter extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                    <div style={styles.container}>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/theaters" component={Theaters}/>
                        <Route path="/movies" component={Movies}/>
                    </div>
            </div>
        );
    }
}

export default HomeRouter;

