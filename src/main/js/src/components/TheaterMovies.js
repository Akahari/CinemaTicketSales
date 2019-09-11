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
    }
};

class TheaterMovies extends React.Component {
    state = {
        theater: null,
        halls: [],
        movies: [],
        error: null
    };

    componentDidMount() {
    };

    render() {
        const {theaterId} = this.props.match.params;

        if(this.state.halls == [] && this.state.theater == null && movies == []){
            console.log("axios get hall/all, theater/find/${theaterId}");
        }

        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        if(true) {
            return (
                <div style={styles.container}>
                    <React.Fragment>
                        <AppBar title='Filmy w kine:' linkTo={"/"}/>
                        <Grid container spacing={3} style={styles.grid}>
                            <Grid item xs={12}>
                                <Paper style={styles.paper}>
                                    Filmy w kinie: {theaterId}
                                </Paper>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </div>
            );
        }
        return (
            <div style={styles.container}>
                Loading
            </div>
        )
    }
}

export default TheaterMovies;
