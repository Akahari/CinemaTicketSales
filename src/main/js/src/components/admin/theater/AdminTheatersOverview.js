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

class AdminTheatersEdit extends React.Component {
    state = {
        theaters: [],
        error: null
    };
    edit = (theaterId) => {
        const {history} = this.props;
        console.log("You pushed edit button :)");
        history.push(`/admin/theaters/edit/${theaterId}`);
    };
    remove = (theaterId) => {
        const {history} = this.props;
        console.log("You pushed remove button :)");
        axios.post(`/theater/remove/${theaterId}`).then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            }
        );
        history.push('/admin/theaters');
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
                <Link to={"/admin/theaters"} style={styles.link}>Exit</Link>
                <table>
                    <tbody>
                    <tr>
                        <th>Theater id</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Hall ids</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    {
                        this.state.theaters.map(theater => (
                            <tr>
                                <td>{theater.id}</td>
                                <td>{theater.name}</td>
                                <td>{theater.city}</td>
                                <td>{theater.address}</td>
                                <td>{theater.hallIds.join(", ")}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.edit(theater.id)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.remove(theater.id)}
                                    >
                                        Remove
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

export default AdminTheatersEdit;