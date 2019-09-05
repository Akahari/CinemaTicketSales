import React from 'react';
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
                        <th>Theater id</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Hall ids</th>
                    </tr>
                    {
                        this.state.theaters.map(theater => (
                            <tr>
                                <td>{theater.id}</td>
                                <td>{theater.name}</td>
                                <td>{theater.city}</td>
                                <td>{theater.address}</td>
                                <td>{theater.hallIds}</td>
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