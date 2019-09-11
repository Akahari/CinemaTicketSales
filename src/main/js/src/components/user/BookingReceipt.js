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

class BookingReceipt extends React.Component {
    state = {
        bookingId: 0,
        firstRender: true,
        movie: null,
        screening: null,
        theater: null,
        hall: null,
        error: null
    };

    componentDidMount() {
        console.log("welcome to booking receipt");
        axios.get(`/screening/find/${this.props.location.state.screeningId}`)
        .then((response) =>{
            console.log(response);
            this.setState({ screening: response.data});
        }, (error) => {
            console.log(error);
        });
        this.setState({ firstRender: false});
    };

    render(){
        if(this.state.firstRender){
            axios.post('/booking/add', {
                firstName: this.props.location.state.firstName,
                lastName: this.props.location.state.lastName,
                screeningId: this.props.location.state.screeningId,
                seats: this.props.location.state.newSeats
            })
            .then((response) =>{
                console.log(response);
                this.setState({ bookingId: response.data});
            }, (error) => {
                console.log(error);
            });
        }

        if(this.state.screening != null && this.state.movie == null && this.state.theater == null && this.state.hall == null){
            axios.get(`/movie/find/${this.state.screening.movieId}`)
            .then((response) =>{
                console.log(response);
                this.setState({ movie: response.data});
            }, (error) => {
                console.log(error);
            });

            axios.get(`/theater/find/${this.state.screening.theaterId}`)
            .then((response) =>{
                console.log(response);
                this.setState({ theater: response.data});
            }, (error) => {
                console.log(error);
            });

            axios.get(`/hall/find/${this.state.screening.hallId}`)
            .then((response) =>{
                console.log(response);
                this.setState({ hall: response.data});
            }, (error) => {
                console.log(error);
            });
        }

        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        if(this.state.screening != null && this.state.movie != null && this.state.theater != null && this.state.hall != null){
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div style={styles.paper}>
                        <Typography component="h1" variant="h3">Potwierdzenie rezerwacji</Typography>
                        <Typography component="h1" variant="h4">Imie</Typography>
                        <Typography component="h1" variant="h5">{this.props.location.state.firstName}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">Nazwisko</Typography>
                        <Typography component="h1" variant="h5">{this.props.location.state.lastName}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">Tytul filmu</Typography>
                        <Typography component="h1" variant="h5">{this.state.movie.title}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">Kino</Typography>
                        <Typography component="h1" variant="h5">{this.state.theater.name} / {this.state.theater.city} / {this.state.theater.address}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">Sala</Typography>
                        <Typography component="h1" variant="h5">{this.state.hall.name}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">Bilety dla doroslych</Typography>
                        <Typography component="h1" variant="h5">{this.props.location.state.normalAmount}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">Bilety ulgowe</Typography>
                        <Typography component="h1" variant="h5">{this.props.location.state.reducedAmount}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">Bilety dla dzieci</Typography>
                        <Typography component="h1" variant="h5">{this.props.location.state.kidsAmount}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h4">ID rezerwacji</Typography>
                        <Typography component="h1" variant="h5">{this.state.bookingId}</Typography>
                        <br/><br/>
                        <Typography component="h1" variant="h5"><Link to={"/"} style={styles.link}>Exit to main page</Link></Typography>
                    </div>
                </Container>
            );
        }
        return (
            <div style={styles.container}>
                Loading
            </div>
        )
    }
}

export default BookingReceipt;