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

class Screenings extends React.Component {
    state = {
        screenings: [],
        error: null
    };
    buy = (screeningId, rowNumber , rowLength) => {
        const {history} = this.props;
        history.push(
        {
            pathname: '/screenings/declareTickets',
            state: {
              screeningId: screeningId,
              rowLength: rowLength,
              rowNumber: rowNumber
            }
      })
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
                        <th>Theater id</th>
                        <th>Hall id</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Duration</th>
                        <th>Free seats left</th>
                        <th>Buy tickets</th>
                    </tr>
                    {
                        this.state.screenings.map(screening => (
                            <tr>
                                <td>{screening.movieId}</td>
                                <td>{screening.theaterId}</td>
                                <td>{screening.hallId}</td>
                                <td>{new Date(screening.startDate).toGMTString()}</td>
                                <td>{new Date(screening.endDate).toGMTString()}</td>
                                <td>{screening.duration}</td>
                                <td>{screening.rows * screening.rowLength - screening.seatsStatus.filter(Boolean).length}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.buy(screening.id, screening.rows , screening.rowLength)}
                                    >
                                        Buy
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

export default Screenings;
