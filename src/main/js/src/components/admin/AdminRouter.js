import React from 'react';
import {Route} from 'react-router-dom';
import AdminHomePage from './AdminHomePage';
import AdminTheaters from './theater/AdminTheaters';
import AdminMovies from './movie/AdminMovies';
import AdminHalls from './hall/AdminHalls';
import AdminScreenings from './screening/AdminScreenings';

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

class AdminRouter extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.container}>
                    <Route exact path="/admin" component={AdminHomePage}/>
                    <Route path="/admin/theaters" component={AdminTheaters}/>
                    <Route path="/admin/movies" component={AdminMovies}/>
                    <Route path="/admin/halls" component={AdminHalls}/>
                    <Route path="/admin/screenings" component={AdminScreenings}/>
                </div>
            </div>
        );
    }
}

export default AdminRouter;

