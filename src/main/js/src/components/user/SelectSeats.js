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
        let tempRow = [];
        for (let j = 1; j <= this.props.location.state.rowLength; j++) {
            let seat = {id:j, number: j};
            tempRow.push(seat);
        }
        this.state.rows = tempRow;
        console.log(tempRow);
        console.log(this.state.rows);
    }

    render(){
        const rows = [
          [{ id:1, number: 1}, { id:2, number: 2}, { id:3, number: '3'}, { id:4, number: '4'}, { id:5, number: 5}, { id:6, number: 6}],
          [{ id:7, number: 1}, { id:8, number: 2}, { id:9, number: '3'}, { id:10, number: '4'}, { id:11, number: 5}, { id:12, number: 6}],
          [{ id:13, number: 1}, { id:14, number: 2}, { id:15, number: 3}, { id:16, number: '4'}, { id:17, number: 5}, { id:18, number: 6}],
          [{ id:19, number: 1}, { id:20, number: 2},  { id:21, number: 3}, { id:22, number: '4'}, { id:23, number: 5}, { id:24, number: 6}],
          [{ id:25, number: 1}, { id:26, number: 2}, { id:27, number: '3'}, { id:28, number: '4'}, { id:29, number: 5}, { id:30, number: 6}]
        ];
        const {loading}=this.state;

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
                      rows={this.state.rows}
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