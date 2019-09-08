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

class Halls extends React.Component {
    state = {
        halls: [],
        hallScreeningIds: [],
        error: null
    };

    componentDidMount() {
        axios.get('/hall/all').then(
            response => {
                console.log(response);
                this.setState({halls: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
    }

    render() {
        if (this.state.error) {
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
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Rows</th>
                        <th>Row length</th>
                        <th>Screening Ids</th>
                        <th>Theater Id</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.halls.map(hall => (
                            <tr>
                                <td>{hall.id}</td>
                                <td>{hall.name}</td>
                                <td>{hall.rowsNumber}</td>
                                <td>{hall.rowLength}</td>
                                <td><Link to="/movies" style={styles.link}>{hall.screeningId.join(", ")}</Link></td>
                                <td>{hall.theaterId}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Halls;
