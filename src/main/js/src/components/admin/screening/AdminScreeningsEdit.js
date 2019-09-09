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

class AdminScreeningsEdit extends React.Component {
    state = {
        screeningId: 0,
        startDate: '',
        startDateString: '',
        theaterId: 0,
        hallId: 0,
        movieId: 0,
        error: null
    };

    componentDidMount() {
        const {screeningId} = this.props.match.params;
        axios.get(`/screening/find/${screeningId}`).then(
            response => {
                console.log(response);
                this.setState({screeningId: response.data.id});
                this.setState({theaterId: response.data.theaterId});
                this.setState({startDate: response.data.startDate});
                this.setState({hallId: response.data.hallId});
                this.setState({movieId: response.data.movieId});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
        console.log(this.state);
    }

    edit = (screeningId) => {
        const {history} = this.props;
        console.log(this.state);
        // send a POST request
        axios.post(`/screening/update/${screeningId}`, {
            startDateString: this.state.startDateString,
            theaterId: this.state.theaterId,
            movieId: this.state.movieId,
            hallId: this.state.hallId
        })
        .then((response) =>{
            console.log(response);
            const {history} = this.props;
            history.push('/admin/screenings/overview');
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
                        Add new screening
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="startDateString"
                            label="startDateString"
                            //defaultValue={Date(this.state.startDateString).toString()}
                            name="startDateString"
                            autoFocus
                            onChange={(event) => this.setState({startDateString: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="theaterId"
                            label="Theater Id "
                            //defaultValue={this.state.theaterId}
                            name="theaterId"
                            onChange={(event) => this.setState({theaterId: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="hallId"
                            label="hallId"
                            //defaultValue={this.state.hallId}
                            name="hallId"
                            onChange={(event) => this.setState({hallId: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="movieId"
                            label="movieId"
                            //defaultValue={this.state.movieId}
                            name="movieId"
                            onChange={(event) => this.setState({movieId: parseInt(event.target.value, 10)})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.edit(this.state.screeningId)}
                        >
                            Add
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default AdminScreeningsEdit;