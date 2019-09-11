import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '../AppBar';

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

class AdminHomePage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <AppBar title="Zarządzanie kinami" linkTo={"/"}/>
                <Grid container spacing={3} style={styles.grid}>
                    <Grid item xs={6}>
                        <Paper style={styles.paper}>
                            <p>Theaters</p>
                            <Link to={"/admin/theaters/add"} style={styles.link}>Add</Link>
                            <Link to={"/admin/theaters/overview"} style={styles.link}>Edit/Remove</Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={styles.paper}>
                            <p>Movies</p>
                            <Link to={"/admin/movies/add"} style={styles.link}>Add</Link>
                            <Link to={"/admin/movies/overview"} style={styles.link}>Edit/Remove</Link>

                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={styles.paper}>
                            <p>Halls</p>
                            <Link to={"/admin/halls/add"} style={styles.link}>Add</Link>
                            <Link to={"/admin/halls/overview"} style={styles.link}>Edit/Remove</Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={styles.paper}>
                            <p>Screenings</p>
                            <Link to={"/admin/screenings/add"} style={styles.link}>Add</Link>
                            <Link to={"/admin/screenings/overview"} style={styles.link}>Edit/Remove</Link>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default AdminHomePage;

