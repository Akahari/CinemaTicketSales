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

class BookingDetails extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        seats: [] ,  //array of seats
        error: null
    };

    componentDidMount() {
        console.log("welcome to booking details");
        console.log("DEBUG 5");
        console.log(this.props.location.state);
        console.log(this.props.location.state.normalAmount);
        console.log(this.props.location.state.reducedAmount);
        console.log(this.props.location.state.kidsAmount);
        console.log("DEBUG 5.5");
        console.log(this.state);
        this.state.normalAmount = this.props.location.state.normalAmount;
        this.state.reducedAmount = this.props.location.state.reducedAmount;
        this.state.kidsAmount = this.props.location.state.kidsAmount;
        this.state.ticketsAmount = this.props.location.state.ticketsAmount;
    };

    send = () => {
        console.log("zarejestruj booking");
        // send a POST request
        axios.post('/booking/add', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            screeningId: this.props.location.state.screeningId,
            seats: this.state.seats
        })
        .then((response) =>{
            console.log(response);
        }, (error) => {
            console.log(error);
        });

        console.log("goodbyeBookingDetails");
        console.log(this.props.location.state);
        console.log(this.state);
        const {history} = this.props;
        history.push(
        {
            pathname: '/screenings/bookingReceipt',
            state: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                screeningId: this.props.location.state.screeningId, //only passed further
                normalAmount: this.state.normalAmount, //only passed further
                reducedAmount: this.state.reducedAmount, //only passed further
                kidsAmount: this.state.kidsAmount, //only passed further
                rowLength: this.props.location.state.rowLength,
                newSeats: this.state.newSeats
            }
        })
    };

    render(){
        let inputState = this.props.location.state;
        for(let i = 0; i < inputState.newSeats.length; i++) {
            if(inputState.newSeats[i]){
                inputState.newSeats[i] = false;
                let tempRow = Math.floor(i / this.props.location.state.rowLength);
                let tempSeat = i % this.props.location.state.rowLength;
                let newSeat = {
                    row: tempRow,
                    seat: tempSeat,
                    ticketType: null
                };

                if(this.props.location.state.normalAmount > 0){
                    this.props.location.state.normalAmount--;
                    newSeat.ticketType = 'normal';
                } else if(this.props.location.state.reducedAmount > 0){
                    this.props.location.state.reducedAmount--;
                    newSeat.ticketType = 'reduced';
                } else if(this.props.location.state.kidsAmount > 0){
                    this.props.location.state.kidsAmount--;
                    newSeat.ticketType = 'kids';
                }
                this.state.seats.push(newSeat);
            }
        }

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
                <div style={styles.paper}>
                    <Typography component="h1" variant="h5">
                        Podaj swoje dane
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="Imie"
                            name="firstName"
                            autoFocus
                            onChange={(event) => this.setState({firstName: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Nazwisko"
                            name="lastName"
                            onChange={(event) => this.setState({lastName: event.target.value})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.send}
                        >
                            Zaplac
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default BookingDetails;