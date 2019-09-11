import React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from './AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    container: {
        height: '100%'
    }
};

class TheaterMovies extends React.Component {
    state = {
        theater: null,
        halls: null,
        screenings: [],
        movies: null,
        movieIds: [],
        renderIsReady: false,
        allHallsChecked: false,
        error: null
    };
    test = () => {
        const {history} = this.props;
        console.log("This is an emergency broadcast");
        console.log(this.state);
        console.log("Thank you for your attention");
    };


    componentDidMount() {
        const {theaterId} = this.props.match.params;
        let tempScreenings = [];
        let tempScreening = null;
        let tempMovieIds = [];
        let tempHallCounter = 0;
        console.log("welcome to theater movies");
        axios.get("/movie/all").then(
            response => {
                console.log(response);
                this.setState({movies: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
        });
        axios.get(`/hall/find/theaterId/${theaterId}`).then(
            response => {
                console.log(response);
                console.log("1st then/ resolve");
                console.log(this.state);
                this.setState({halls: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
        }).then(
            resolve => {
                console.log("2nd then/ resolve");
                console.log(this.state);
                tempHallCounter = this.state.halls.length;
                var promises = this.state.halls.map(hall => {
                    console.log("mapping over hall");
                    axios.get(`/screening/find/hall/${hall.id}`).then(
                        response => {
                            tempHallCounter--;
                            console.log("3rd then/ response");
                            if(response.data.length > 0){
                                for(let i = 0; i < response.data.length; i++) {
                                    tempScreening = response.data[i];
                                    if(!tempMovieIds.includes(tempScreening.movieId)) {
                                        tempMovieIds.push(tempScreening.movieId);
                                    }
                                    if(!tempMovieIds.includes(tempScreening.movieId)){
                                        tempMovieIds.push(tempScreening.movieId);
                                    }
                                    tempScreenings.push(tempScreening);
                                }
                               console.log(response);
                            }
                        },
                        error => {
                           console.log(error);
                           this.setState({error: 'Wystąpił błąd'});
                    }).then(
                        response => {
                            if(tempHallCounter == 0){
                                console.log("mapped over all halls");
                                this.setState({screenings: tempScreenings});
                                this.setState({movieIds: tempMovieIds});
                                console.log(this.state);
                                this.setState({renderIsReady: true});
                            }
                        },
                        error => {
                            console.log("error");
                    });
                });
            },
            reject => {
                console.log("2nd then/ reject");
        });
    };


    render() {
        console.log("render");
        console.log(this.state);

        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        if(this.state.renderIsReady) {
            console.log("this state render is Ready is true");
            console.log(this.state);
            console.log(this.state.screenings);
            return (
                <div style={styles.container}>
                    <React.Fragment>
                        <AppBar title='Seanse w kine:' linkTo={"/theaters"}/>
                        <Grid container spacing={3} style={styles.grid}>
                            {
                                this.state.screenings.map(screening => (
                                    <Grid item xs={12}>
                                        <Paper style={styles.paper}>
                                            <Typography component="h1" variant="h3">{screening.id}</Typography>
                                            <p>Czas trwania: {screening.duration}</p>
                                            <p>placeholder</p>
                                        </Paper>
                                    </Grid>
                                ))
                            }
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
