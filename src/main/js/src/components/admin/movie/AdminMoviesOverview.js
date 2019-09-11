import React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router-dom";

const styles = {
    container: {
        height: '100%'
    },
    link: {
        flex: 1,
        margin: 10
    }
};

class AdminMoviesEdit extends React.Component {
    state = {
        movies: [],
        error: null
    };
    edit = (movieId) => {
        const {history} = this.props;
        console.log("You pushed edit button :)");
        history.push(`/admin/movies/edit/${movieId}`);
    };
    remove = (movieId) => {
        const {history} = this.props;
        console.log("You pushed remove button :)");
        axios.post(`/movie/remove/${movieId}`).then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            }
        );
    history.push('/admin');
    };

    componentDidMount() {
        axios.get('/movie/all').then(
            response => {
                console.log(response);
                this.setState({movies: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
            console.log(this.state);
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
            <div style={styles.container}>
                <table>
                    <tbody>
                    <tr>
                        <th>Tytul</th>
                        <th>Czas trwania</th>
                        <th>Opis</th>
                        <th>Obsada</th>
                        <th>Rezyseria</th>
                        <th>Tagi</th>
                        <th>Edytuj</th>
                        <th>Usun</th>
                    </tr>
                    {
                        this.state.movies.map(movie => (
                            <tr>
                                <td>{movie.title}</td>
                                <td>{movie.duration}</td>
                                <td>{movie.description}</td>
                                <td>{movie.cast}</td>
                                <td>{movie.directors}</td>
                                <td>{movie.tags}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.edit(movie.id)}
                                    >
                                        Edytuj
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.remove(movie.id)}
                                    >
                                        Usun
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AdminMoviesEdit;
