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
    edit = () => {
        const {history} = this.props;
        console.log("You pushed edit button :)");
    };
    remove = () => {
        const {history} = this.props;
        console.log("You pushed remove button :)");
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
                <Link to={"/admin/movies"} style={styles.link}>Exit</Link>
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
                                <td>{hall.rows}</td>
                                <td>{hall.rowLength}</td>
                                <td><Link to="/movies" style={styles.link}>{hall.screeningId.join(", ")}</Link></td>
                                <td>{hall.theaterId}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.edit}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.remove}
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