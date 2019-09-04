import React from 'react';
import * as axios from 'axios';

const styles = {
    container: {
        height: '100%'
    }
};

class Movies extends React.Component {
    state = {
        movies: [],
        error: null
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
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.baseURL = 'http://localhost:8080/api';
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
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Cast</th>
                        <th>Directors</th>
                        <th>Tags</th>
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
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Movies;
