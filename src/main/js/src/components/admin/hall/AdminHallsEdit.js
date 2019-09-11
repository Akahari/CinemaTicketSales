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

class AdminHallsEdit extends React.Component {
    state = {
        hallId: 0,
        theaterId: 0,
        name: '',
        rowsNumber: 0,
        rowLength: 0,
        error: null
    };

    componentDidMount() {
        const {hallId} = this.props.match.params;
        axios.get(`/hall/find/${hallId}`).then(
            response => {
                console.log(response);
                this.setState({hallId: response.data.id});
                this.setState({theaterId: response.data.theaterId});
                this.setState({name: response.data.name});
                this.setState({rowsNumber: response.data.rowsNumber});
                this.setState({rowLength: response.data.rowLength});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
        console.log(this.state);
    }

    edit = (hallId) => {
        const {history} = this.props;
        console.log(this.state);
        // send a POST request
        axios.post(`/hall/update/${hallId}`, {
            theaterId: this.state.theaterId,
            name: this.state.name,
            rowsNumber: this.state.rowsNumber,
            rowLength: this.state.rowLength
        })
        .then((response) =>{
            console.log(response);
            const {history} = this.props;
            history.push('/admin/halls/overview');
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        const {hallId} = this.props.match.params;
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
                        Edytuj sale
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="theaterId"
                            label="Id kina"
                            name="theaterId"
                            autoFocus
                            onChange={(event) => this.setState({theaterId: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nazwa sali"
                            name="name"
                            onChange={(event) => this.setState({name: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="rows"
                            label="Rzedy"
                            name="rows"
                            onChange={(event) => this.setState({rowsNumber: parseInt(event.target.value, 10)})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="rowLength"
                            label="Dlugosc rzedu"
                            name="rowLength"
                            onChange={(event) => this.setState({rowLength: parseInt(event.target.value, 10)})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => this.edit(this.state.hallId)}
                        >
                            Edytuj
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default AdminHallsEdit;
