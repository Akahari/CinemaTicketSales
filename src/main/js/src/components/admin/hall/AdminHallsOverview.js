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

class AdminHallsEdit extends React.Component {
    state = {
        halls: [],
        error: null
    };
    edit = (hallId) => {
        const {history} = this.props;
        console.log("You pushed edit button :)");
        history.push(`/admin/halls/edit/${hallId}`);
    };
    remove = (hallId) => {
        const {history} = this.props;
        console.log("You pushed remove button :)");
        axios.post(`/hall/remove/${hallId}`).then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            }
        );
        history.push('/admin/halls');
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
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Rows</th>
                        <th>Row length</th>
                        <th>Screening Ids</th>
                        <th>Theater Id</th>
                        <th>Edit</th>
                        <th>Remove</th>
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
                                <td>{hall.screeningId.join(", ")}</td>
                                <td>{hall.theaterId}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.edit(hall.id)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.remove(hall.id)}
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

export default AdminHallsEdit;
