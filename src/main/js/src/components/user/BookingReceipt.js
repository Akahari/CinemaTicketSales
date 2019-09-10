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
        error: null
    };

    componentDidMount() {
        console.log("welcome to booking receipt");
        console.log(this.props.location);
    };

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
                <div style={styles.paper}>
                    <Link to={"/"} style={styles.link}>Exit to main page</Link>
                    <Typography component="h1" variant="h5">Site is under construction</Typography>
                    <Typography component="h1" variant="h5">Potwierdzenie rezerwacji</Typography>
                    <Typography component="h2" variant="h5">Imie</Typography>
                    <Typography component="h3" variant="h5">{this.props.location.state.firstName}</Typography>
                    <Typography component="h2" variant="h5">Nazwisko</Typography>
                    <Typography component="h3" variant="h5">{this.props.location.state.lastName}</Typography>
                    <Typography component="h2" variant="h5">Tytul filmu</Typography>
                    <Typography component="h3" variant="h5">placeholder</Typography>
                    <Typography component="h2" variant="h5">Kino</Typography>
                    <Typography component="h3" variant="h5">placeholder</Typography>
                    <Typography component="h2" variant="h5">Sala</Typography>
                    <Typography component="h3" variant="h5">placeholder</Typography>
                    <Typography component="h2" variant="h5">Bilety dla doroslych</Typography>
                    <Typography component="h3" variant="h5">{this.props.location.state.normalAmount}</Typography>
                    <Typography component="h2" variant="h5">Bilety ulgowe</Typography>
                    <Typography component="h3" variant="h5">{this.props.location.state.reducedAmount}</Typography>
                    <Typography component="h2" variant="h5">Bilety dla dzieci</Typography>
                    <Typography component="h3" variant="h5">{this.props.location.state.kidsAmount}</Typography>
                </div>
            </Container>
        );
    }
}

export default BookingReceipt;