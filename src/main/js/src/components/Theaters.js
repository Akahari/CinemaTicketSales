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

class Theaters extends React.Component {
    state = {
        theaters: [],
        error: null
    };

    componentDidMount() {
        axios.get('/theater/all').then(
            response => {
                console.log(response);
                this.setState({theaters: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
            console.log('Hello World :)');
            console.log(this.state);
            console.log('Hello World2 :)');
    }

    render() {
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        console.log(this.state);
        console.log('Hello World3 :)');
        return (
            <div style={styles.container}>
                <Link to={"/"} style={styles.link}>Exit</Link>
                <table>
                    <tbody>
                    <tr>
                        <th align="center">Theater id</th>
                        <th align="center">Name</th>
                        <th align="center">City</th>
                        <th align="center">Address</th>
                        <th align="center">Hall ids</th>
                    </tr>
                    {
                        this.state.theaters.map(theater => (
                            <tr>
                                <td align="center">{theater.id}</td>
                                <td align="center">{theater.name}</td>
                                <td align="center">{theater.city}</td>
                                <td align="center">{theater.address}</td>
                                <td align="center">{theater.hallIds.join(", ")}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Theaters;