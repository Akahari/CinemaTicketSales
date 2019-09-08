import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';
import * as axios from 'axios';

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

class AdminTheatersEdit extends React.Component {
    state = {
        theaterId: 0,
        name: '',
        city: '',
        address: '',
        error: null
    };

    componentDidMount() {
        const {theaterId} = this.props.match.params;
        axios.get(`/theater/find/${theaterId}`).then(
            response => {
                console.log(response);
                this.setState({theaterId: response.data.id});
                this.setState({name: response.data.name});
                this.setState({city: response.data.city});
                this.setState({address: response.data.address});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
        console.log(this.state);
    }

    edit = (theaterId) => {
        const {history} = this.props;
        console.log(this.state);
        // send a POST request
        axios.post(`/theater/update/${theaterId}`, {
            name: this.state.name,
            city: this.state.city,
            address: this.state.address
        })
        .then((response) =>{
            console.log(response);
            const {history} = this.props;
            history.push('/admin/theaters/overview');
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        const {theaterId} = this.props.match.params;
        if(this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        return (
            <Container component="main" maxWidth="xs">
                <div style={styles.container}>
                    <Link to={"/admin/theaters/overview"} style={styles.link}>Exit</Link>
                </div>
                <CssBaseline/>
                <div style={styles.paper}>
                    <Typography component="h1" variant="h5">
                        Add new theater
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            //defaultValue={this.state.name}
                            name="name"
                            autoFocus
                            onChange={(event) => this.setState({name: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="city"
                            //defaultValue={this.state.city}
                            name="city"
                            autoFocus
                            onChange={(event) => this.setState({city: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="address"
                            //defaultValue={this.state.address}
                            name="address"
                            autoFocus
                            onChange={(event) => this.setState({address: event.target.value})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.edit(this.state.theaterId)}
                        >
                            Edit
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default AdminTheatersEdit;
