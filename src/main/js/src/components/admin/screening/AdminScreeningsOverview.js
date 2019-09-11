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

class AdminScreeningsEdit extends React.Component {
    state = {
        screenings: [],
        error: null
    };
    edit = (screeningId) => {
        const {history} = this.props;
        console.log("You pushed edit button :)");
        history.push(`/admin/screenings/edit/${screeningId}`);
    };
    remove = (screeningId) => {
        const {history} = this.props;
        console.log("You pushed remove button :)");
        axios.post(`/screening/remove/${screeningId}`).then(
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
        axios.get('/screening/all').then(
            response => {
                console.log(response);
                this.setState({screenings: response.data});
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
                        <th>Id filmu</th>
                        <th>Data seansu</th>
                        <th>Id sali</th>
                        <th>Edytuj</th>
                        <th>Usun</th>
                    </tr>
                    {
                        this.state.screenings.map(screening => (
                            <tr>
                                <td>{screening.movieId}</td>
                                <td>{new Date(screening.startDate).toGMTString()}</td>
                                <td>{screening.hallId}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.edit(screening.id)}
                                    >
                                        Edytuj
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.remove(screening.id)}
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

export default AdminScreeningsEdit;
