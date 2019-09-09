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
        seatsSelected: 0,
        screeningId: 0,
        rowNumber: 0,
        rowLength: 0,
        normalAmount: 0,
        reducedAmount: 0,
        kidsAmount: 0,
        ticketsAmount: 0,
        rows: [],
        error: null
    };
    next = () => {
        const {history} = this.props;
        console.log("'Pay' placeholder'");
        this.state.ticketsAmount = this.state.normalAmount + this.state.reducedAmount + this.state.kidsAmount;
        console.log(this.state);
    };
    createTable = () => {
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < this.props.location.state.rowNumber; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < this.props.location.state.rowLength; j++) {
            children.push(<td>{`Column ${j + 1}`}</td>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
    };
    addSeatCallback=(row, number, id, cb)=>{
        this.setState({
          loading:true
        },async()=>{
          await new Promise(resolve => setTimeout(resolve, 5000));
          console.log(`Added seat ${number}, row ${row}, id ${id}`)
          cb(row,number)
          this.setState({ loading: false })
        })
    }

    componentDidMount() {
        console.log("welcome to seats selection");
        console.log(this.props.location.state);
        this.state.screeningId = this.props.location.state.screeningId;
        this.state.rowNumber = this.props.location.state.rowNumber;
        this.state.rowLength = this.props.location.state.rowLength;
        this.state.normalAmount = this.props.location.state.normalAmount;
        this.state.reducedAmount = this.props.location.state.reducedAmount;
        this.state.kidsAmount = this.props.location.state.kidsAmount;
        this.state.ticketsAmount = this.props.location.state.ticketsAmount;
    }

    render(){

        let tempRowMatrix = [];
        let tempRow = [];
        for (let i = 0; i < this.props.location.state.rowNumber; i++) {
            tempRow = [];
            for (let j = 0; j < this.props.location.state.rowLength; j++) {
                let seat = {id:((i)*this.props.location.state.rowLength) + j, number: j+1};
                tempRow.push(seat);
                console.log(seat.id);
            }
            tempRowMatrix.push(tempRow);
        }
        const {loading}=this.state;
        console.log(tempRow);
        console.log(tempRowMatrix);

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
                        Select seats
                        Select {this.props.location.state.ticketsAmount} seats
                    </Typography>
                    <SeatPicker
                      addSeatCallback={this.addSeatCallback}
                      rows={tempRowMatrix}
                      maxReservableSeats={this.props.location.state.ticketsAmount}
                      alpha
                      visible
                      selectedByDefault
                      loading={loading}
                     />
                    //create theater hall layout grid to choose seat
                </div>
            </Container>
        );
    }
}

export default SelectSeats;