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
                <AppBar title="Strona glowna kina" linkTo={"/"}/>
                <Grid container spacing={3} style={styles.grid}>
                    <Grid item xs={6}>
                        <Paper style={styles.paper}>
                            <p>Theaters</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={styles.paper}>
                            <p>Movies</p>

                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default HomePage;

