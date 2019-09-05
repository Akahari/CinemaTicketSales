import React from 'react';
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
    form: {
        width: '100%',
        marginTop: 10,
    }
};

class LoginPage extends React.Component {
    state = {
        login: '',
        password: ''
    };
    login = () => {
        const {history} = this.props;
        if(this.state.login === 'admin') {
            history.push('/admin');
        } else {
            history.push('/');
        }
    };
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div style={styles.paper}>
                    <Typography component="h1" variant="h5">
                        Logowanie
                    </Typography>
                    <form style={styles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adres Email"
                            name="email"
                            autoFocus
                            onChange={(event) => this.setState({login: event.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            onChange={(event) => this.setState({password: event.target.value})}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.login}
                        >
                            Zaloguj się
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }

}

export default withRouter(LoginPage);
