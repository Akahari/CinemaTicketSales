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

class AdminMoviesEdit extends React.Component {
    state = {
        movieId: 0,
        title: '',
        description: '',
        duration: 0,
        tags: [],
        cast: [],
        directors: [],
        error: null
    };

    componentDidMount() {
        const {movieId} = this.props.match.params;
        axios.get(`/movie/find/${movieId}`).then(
            response => {
                console.log(response);
                this.setState({movieId: response.data.id});
                this.setState({title: response.data.title});
                this.setState({description: response.data.description});
                this.setState({duration: response.data.duration});
                this.setState({tags: response.data.tags});
                this.setState({cast: response.data.cast});
                this.setState({directors: response.data.directors});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
        console.log(this.state);
    }

    edit = (movieId) => {
        const {history} = this.props;
        console.log(this.state);
        // send a POST request
        axios.post(`/movie/update/${movieId}`, {
            title: this.state.title,
            description: this.state.description,
            duration: this.state.duration,
            tags: this.state.tags,
            cast: this.state.cast,
            directors: this.state.directors
        })
        .then((response) =>{
            console.log(response);
            const {history} = this.props;
            history.push('/admin/movies/overview');
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
                        Edytuj film
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Tytul"
                            name="title"
                            autoFocus
                            onChange={(event) => this.setState({title: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Opis"
                            name="description"
                            onChange={(event) => this.setState({description: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="duration"
                            label="Czas trwania"
                            name="duration"
                            onChange={(event) => this.setState({duration: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="tags"
                            label="Tagi"
                            name="tags"
                            onChange={(event) => this.setState({tags: event.target.value.split(";")})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="cast"
                            label="Obsada"
                            name="cast"
                            onChange={(event) => this.setState({cast: event.target.value.split(";")})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="directors"
                            label="Rezyseria"
                            name="directors"
                            onChange={(event) => this.setState({directors: event.target.value.split(";")})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.edit(this.state.movieId)}
                        >
                            Dodaj
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default AdminMoviesEdit;
