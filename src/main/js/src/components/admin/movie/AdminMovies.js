import React from 'react';
import {Route} from 'react-router-dom';
import AppBar from '../../AppBar';
import AdminMoviesAdd from './AdminMoviesAdd';
import AdminMoviesOverview from './AdminMoviesOverview';
import AdminMoviesEdit from './AdminMoviesEdit';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    }
};

class AdminMovies extends React.Component {

    render() {
        return (
            <React.Fragment>
                <AppBar title="Zarządzanie filmami" linkTo={"/admin"}/>
                <div style={styles.container}>
                    <Route exact path="/admin/movies/add" component={AdminMoviesAdd}/>
                    <Route exact path="/admin/movies/overview" component={AdminMoviesOverview}/>
                    <Route path="/admin/movies/edit/:movieId" component={AdminMoviesEdit}/>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminMovies;
