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

class Theaters extends React.Component {
    state = {
        theaters: [],
        error: null
    };

    componentDidMount() {
        axios.get('/theater/all').then(
            response => {
                console.log(response);
                this.setState({theaters: response.data});
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
        return (
            <React.Fragment>
                <AppBar title="Nasze kina" linkTo={"/"}/>
                <Grid container spacing={3} style={styles.grid}>
                    {
                        this.state.theaters.map(theater => (
                            <Grid item xs={12}>
                                <Paper style={styles.paper}>
                                    <Typography component="h1" variant="h3"><Link to={`/theaters/${theater.id}`} style={styles.link}>{theater.name}</Link></Typography>
                                    <p>{theater.city}</p>
                                    <p>{theater.address}</p>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

export default Theaters;