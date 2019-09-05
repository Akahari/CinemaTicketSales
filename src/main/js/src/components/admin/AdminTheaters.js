import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';

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

class AdminTheaters extends React.Component {
    state = {
        name: '',
        city: '',
        address: '',
        error: null
    };
    send = () => {
        const {history} = this.props;
        console.log(this.state);
        // send a POST request
        axios({
            method: 'post',
            url: '/theater/add',
            data: {
                "name": "Theater 8",
                "city": "City 8",
                "address": "Address 8"
            }
        });
    };

    render() {
        const {movieId} = this.props.match.params;
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
                    <Link to={"/admin"} style={styles.link}>Exit</Link>
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
                            label="Theater name"
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
                            label="Theater City"
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
                            label="Theater address"
                            name="address"
                            autoFocus
                            onChange={(event) => this.setState({address: event.target.value})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.send}
                        >
                            Add
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default AdminTheaters;
