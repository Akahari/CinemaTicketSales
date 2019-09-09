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
    paper: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        height: '100%'
    },
    form: {
        width: '100%',
        marginTop: 10,
    }
};

class DeclareTickets extends React.Component {
    state = {
        screeningId: 0,
        rowNumber: 0,
        rowLength: 0,
        normalAmount: 0,
        reducedAmount: 0,
        kidsAmount: 0,
        ticketsAmount: 0,
        error: null
    };
    next = () => {
        const {history} = this.props;
        this.state.ticketsAmount = this.state.normalAmount + this.state.reducedAmount + this.state.kidsAmount;
        if(this.state.ticketsAmount > 0){
            history.push(
            {
                pathname: '/screenings/selectSeats',
                state: {
                    screeningId: this.state.screeningId,
                    rowNumber: this.state.rowNumber,
                    rowLength: this.state.rowLength,
                    normalAmount: this.state.normalAmount,
                    reducedAmount: this.state.reducedAmount,
                    kidsAmount: this.state.kidsAmount,
                    ticketsAmount: this.state.ticketsAmount
                }
            })
        } else {
            console.log("no tickets selected");
        }
    };

    componentDidMount() {
            console.log("welcome to tickets declaration");
            this.state.screeningId = this.props.location.state.screeningId;
            this.state.rowLength = this.props.location.state.rowLength;
            this.state.rowNumber = this.props.location.state.rowNumber;
    }

    render(){
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={styles.container}>
                    <Link to={"/screenings"} style={styles.link}>Exit</Link>
                    Placeholder for ticket declaration
                </div>
                <CssBaseline/>
                <div style={styles.paper}>
                    <Typography component="h1" variant="h5">
                        Select tickets
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="normal"
                            label="Normal (full price)"
                            name="normal"
                            autoFocus
                            onChange={(event) => this.setState({normalAmount: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="reduced"
                            label="Reduced (75% price)"
                            name="reduced"
                            onChange={(event) => this.setState({reducedAmount: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="kids"
                            label="Kids (50% price)"
                            name="kids"
                            onChange={(event) => this.setState({kidsAmount: parseInt(event.target.value, 10)})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.next}
                        >
                            Next
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default DeclareTickets;