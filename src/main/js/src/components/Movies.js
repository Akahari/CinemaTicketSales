import React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from './AppBar';
import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        height: '100%'
    },
    link: {
        flex: 1,
        margin: 10
    }
};

class Movies extends React.Component {
    state = {
        movies: [],
        error: null
    };

    componentDidMount() {
        console.log("Movies page");
        axios.get('/movie/all').then(
            response => {
                console.log(response);
                this.setState({movies: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
    }

    render() {
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        console.log(this.state);
        return (
            <React.Fragment>
                <AppBar title="Nasze filmy" linkTo={"/"}/>
                <Grid container spacing={3} style={styles.grid}>
                    {
                        this.state.movies.map(movie => (
                            <Grid item xs={12}>
                                <Paper style={styles.paper}>
                                    <Typography component="h1" variant="h3"><Link to={`/movies/${movie.id}`} style={styles.link}>{movie.title}</Link></Typography>
                                    <br/><br/>
                                    <p>ID: {movie.id}</p>
                                    <p>Opis: {movie.description}</p>
                                    <p>Czas trwania [min]: {movie.duration}</p>
                                    <p>Obsada: {movie.cast.join(", ")}</p>
                                    <p>Rezyseria: {movie.directors.join(", ")}</p>
                                    <p>Tagi: {movie.tags.join(", ")}</p>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

export default Movies;