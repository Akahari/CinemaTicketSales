import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from './AppBar';

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

class HomePage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <AppBar title="Strona glowna sieci kin" linkTo={"/"}/>
                <Grid container spacing={3} style={styles.grid}>
                    <Grid item xs={12}>
                        <Paper style={styles.paper}>
                            <p>Kina</p>
                            <Link to={"/theaters"} style={styles.link}>Wybierz</Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={styles.paper}>
                            <p>Filmy</p>
                            <Link to={"/movies"} style={styles.link}>Wybierz</Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={styles.paper}>
                            <p>Seanse</p>
                            <Link to={"/screenings"} style={styles.link}>Wybierz</Link>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default HomePage;

