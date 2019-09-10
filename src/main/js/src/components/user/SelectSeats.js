import React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router-dom";
import SeatPicker from 'react-seat-picker'
import regeneratorRuntime from "regenerator-runtime";

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

class SelectSeats extends React.Component {
    state = {
        newSeats: [],   //clean array of booleans to only hold new seats
        seatsSelected: 0,
        loading: false,
        error: null
    };

    componentDidMount() {
        console.log("welcome to seats selection");
        for(let i = 0; i < this.props.location.state.seatsStatus.length; i++) {
            this.state.newSeats.push(false);
        }
    }

    next = () => {
        const {history} = this.props;
        if(this.props.location.state.ticketsAmount == this.state.seatsSelected){
            console.log("DEBUG 4.5");
            console.log(this.props.location.state);

            history.push(
            {
                pathname: '/screenings/bookingDetails',
                state: {
                    screeningId: this.props.location.state.screeningId,
                    normalAmount: this.props.location.state.normalAmount,
                    reducedAmount: this.props.location.state.reducedAmount,
                    kidsAmount: this.props.location.state.kidsAmount,
                    ticketsAmount: this.props.location.state.ticketsAmount,
                    rowLength: this.props.location.state.rowLength,
                    newSeats: this.state.newSeats
                }
            })
        } else {
            console.log("not all seats are selected");
        }
    };

    addSeatCallback=(row, number, id, cb)=>{
        this.state.seatsSelected++;
        this.state.newSeats[id] = true;
        this.setState({
          loading:true
        },async()=>{
          await new Promise(resolve => setTimeout(resolve, 100));
          console.log(`Added seat ${number}, row ${row}, id ${id}`)
          cb(row,number)
          this.setState({ loading: false })
        })
    };

    removeSeatCallback=(row, number, id, cb)=>{
        this.state.seatsSelected--;
        this.state.newSeats[id] = false;
        this.setState({
          loading:true
        },async()=>{
          await new Promise(resolve => setTimeout(resolve, 100));
          console.log(`REmoved seat ${number}, row ${row}, id ${id}`)
          cb(row,number)
          this.setState({ loading: false })
        })
    };

    render(){
//        this.state.seatMatrix = [];
        let seatMatrix = [];
        let tempRow = [];
        for (let i = 0; i < this.props.location.state.rowNumber; i++) {
            tempRow = [];
            for (let j = 0; j < this.props.location.state.rowLength; j++) {
                let tempId = (i)*this.props.location.state.rowLength + j;
                let seat = {id: tempId, number: j+1, isReserved: this.props.location.state.seatsStatus[tempId], isSelected: this.state.newSeats[tempId] };
                tempRow.push(seat);
            }
            seatMatrix.push(tempRow);
        }
        const {loading}=this.state.loading;

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
                </div>
                <CssBaseline/>
                <div style={styles.paper}>
                    <Typography component="h1" variant="h5">
                        Select {this.props.location.state.ticketsAmount} seats
                    </Typography>
                    <SeatPicker
                      addSeatCallback={this.addSeatCallback}
                      removeSeatCallback={this.removeSeatCallback}
                      rows={seatMatrix}
                      maxReservableSeats={this.props.location.state.ticketsAmount}
                      alpha
                      visible
                      selectedByDefault
                      loading={loading}
                     />
                     <br/><br/><br/>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.next}
                    >
                        Next
                    </Button>
                </div>
            </Container>
        );
    }
}

export default SelectSeats;