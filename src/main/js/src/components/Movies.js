import React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router-dom';

const styles = {
    container: {
        height: '100%'
    },
    link: {
        flex: 1,
        margin: 10
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
                <Link to={"/"} style={styles.link}>Exit</Link>
                <table>
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Cast</th>
                        <th>Directors</th>
                        <th>Tags</th>
                        <th>Link</th>
                    </tr>
                    {
                        this.state.movies.map(movie => (
                            <tr>
                                <td>{movie.title}</td>
                                <td>{movie.duration}</td>
                                <td>{movie.description}</td>
                                <td>{movie.cast.join(", ")}</td>
                                <td>{movie.directors.join(", ")}</td>
                                <td>{movie.tags.join(", ")}</td>
                                <td><Link to={`/movies/${movie.id}`}>Open</Link></td>
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
