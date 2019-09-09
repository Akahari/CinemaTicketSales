import React from 'react';
import {Link} from 'react-router-dom';
import MaterialUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex'
    },
    link: {
        flex: 1,
        margin: 10
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    },
    title: {
        flexGrow: 1
    },
    grid: {
        padding: 10
    }
};

class AppBar extends React.Component {

    render() {
        return (
            <MaterialUIAppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Link to={this.props.linkTo} style={styles.link}>
                            <ArrowBackIcon/>
                        </Link>
                    </IconButton>
                    <Typography variant="h6" style={styles.title}>
                        {this.props.title}
                    </Typography>
                </Toolbar>
            </MaterialUIAppBar>
        );
    }
}

export default AppBar;

