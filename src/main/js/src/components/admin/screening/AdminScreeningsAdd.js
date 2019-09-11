import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';
import * as axios from 'axios';

const styles = {
    paper: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        height: '100%'
    },
    form: {
        width: '100%',
        marginTop: 10,
    }
};

class AdminScreeningsAdd extends React.Component {
    state = {
        startDateString: '',
        theaterId: 0,
        hallId: 0,
        movieId: 0,
        error: null
    };
    send = () => {
        const {history} = this.props;
        console.log(this.state);
        // send a POST request
        axios.post('/screening/add', {
            startDateString: this.state.startDateString,
            hallId: (this.state.hallId),
            movieId: (this.state.movieId)
        })
        .then((response) =>{
            console.log(response);
            const {history} = this.props;
            history.push('/admin/');
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        const {movieId} = this.props.match.params;
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={styles.paper}>
                    <Typography component="h1" variant="h5">
                        Dodaj nowy seans
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="startDateString"
                            label="Data seansu (rrrr-MM-dd GG:mm)"
                            name="startDateString"
                            autoFocus
                            onChange={(event) => this.setState({startDateString: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="hallId"
                            label="Id sali"
                            name="hallId"
                            onChange={(event) => this.setState({hallId: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="movieId"
                            label="Id filmu"
                            name="movieId"
                            onChange={(event) => this.setState({movieId: parseInt(event.target.value, 10)})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.send}
                        >
                            Dodaj
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default AdminScreeningsAdd;
