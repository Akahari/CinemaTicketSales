import React from 'react';
import ReactDOM from 'react-dom';
import * as axios from 'axios';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import HomeRouter from './src/components/HomeRouter';
import HomePage from './src/components/HomePage';
import HomePageRaw from './src/components/HomePageRaw';

import Screenings from './src/components/Screenings';
import Halls from './src/components/Halls';
import Theaters from './src/components/Theaters';
import TheatersRaw from './src/components/TheatersRaw';
import Movies from './src/components/Movies';
import MoviesRaw from './src/components/MoviesRaw';
import MovieDetails from './src/components/MovieDetails';

import DeclareTickets from './src/components/user/DeclareTickets';
import SelectSeats from './src/components/user/SelectSeats';
import BookingDetails from './src/components/user/BookingDetails';
import BookingReceipt from './src/components/user/BookingReceipt';

import LoginPage from './src/components/LoginPage';
import AdminRouter from './src/components/admin/AdminRouter';
import AdminHomePage from './src/components/admin/AdminHomePage';


import AdminHalls from './src/components/admin/hall/AdminHalls';
import AdminHallsAdd from './src/components/admin/hall/AdminHallsAdd';
import AdminHallsOverview from './src/components/admin/hall/AdminHallsOverview';
import AdminHallsEdit from './src/components/admin/hall/AdminHallsEdit';

import AdminMovies from './src/components/admin/movie/AdminMovies';
import AdminMoviesAdd from './src/components/admin/movie/AdminMoviesAdd';
import AdminMoviesOverview from './src/components/admin/movie/AdminMoviesOverview';
import AdminMoviesEdit from './src/components/admin/movie/AdminMoviesEdit';

import AdminScreenings from './src/components/admin/screening/AdminScreenings';
import AdminScreeningsAdd from './src/components/admin/screening/AdminScreeningsAdd';
import AdminScreeningsOverview from './src/components/admin/screening/AdminScreeningsOverview';
import AdminScreeningsEdit from './src/components/admin/screening/AdminScreeningsEdit';

import AdminTheaters from './src/components/admin/theater/AdminTheaters';
import AdminTheatersAdd from './src/components/admin/theater/AdminTheatersAdd';
import AdminTheatersOverview from './src/components/admin/theater/AdminTheatersOverview';
import AdminTheatersEdit from './src/components/admin/theater/AdminTheatersEdit';


const styles = {
    container: {
        height: '100%',
        backgroundColor: 'white'
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
                        <Route exact path="/" component={HomeRouter}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route path="/admin" component={AdminRouter}/>

                        <Route exact path="/screenings/declareTickets" component={DeclareTickets}/>
                        <Route exact path="/screenings/selectSeats" component={SelectSeats}/>
                        <Route exact path="/screenings/bookingDetails" component={BookingDetails}/>
                        <Route exact path="/screenings/bookingReceipt" component={BookingReceipt}/>

                        <Route exact path="/moviesNew" component={Movies}/>
                        <Route exact path="/movies" component={MoviesRaw}/>
                        <Route path="/movies/:movieId" component={MovieDetails}/>
                        <Route exact path="/halls" component={Halls}/>
                        <Route exact path="/screenings" component={Screenings}/>
                        <Route exact path="/theaters" component={Theaters}/>
                        <Route exact path="/theatersRaw" component={TheatersRaw}/>

                        <Route component={() => <Redirect to="/"/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('react'));
