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

class Screenings extends React.Component {
    state = {
        screenings: [],
        error: null
    };

    componentDidMount() {
        axios.get('/screening/all').then(
            response => {
                console.log(response);
                this.setState({screenings: response.data});
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
                        <th>Movie id</th>
                        <th>Start date</th>
                        <th>Hall id</th>
                    </tr>
                    {
                        this.state.screenings.map(screening => (
                            <tr>
                                <td>{screening.movieId}</td>
                                <td>{screening.startDate}</td>
                                <td>{screening.hallId}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Screenings;
