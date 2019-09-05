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

class AdminScreenings extends React.Component {
    state = {
        startDate: '',
        theaterId: 0,
        hallId: 0,
        movieId: 0,
        error: null
    };
    send = () => {
        const {history} = this.props;
        console.log(this.state);
        history.push('/admin');
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
                        Add new screening
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="startDate"
                            label="Screening start date"
                            name="startDate"
                            autoFocus
                            onChange={(event) => this.setState({startDate: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="theaterId"
                            label="Screening theater Id"
                            name="theaterId"
                            autoFocus
                            onChange={(event) => this.setState({theaterId: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="hallId"
                            label="Screening hall Id"
                            name="hallId"
                            autoFocus
                            onChange={(event) => this.setState({hallId: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="movieId"
                            label="Screening movie Id"
                            name="movieId"
                            autoFocus
                            onChange={(event) => this.setState({movieId: event.target.value})}
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

export default AdminScreenings;
