import React from 'react';
import {Link} from 'react-router-dom';
import * as axios from 'axios';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    },
    link: {
        flex: 1,
        margin: 10
    }
};

class AdminHomePage extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                <p>Welcome to admin view</p>
                <Link to={"/admin/theaters"} style={styles.link}>Theaters</Link>
                <Link to={"/admin/movies"} style={styles.link}>Movies</Link>
                <Link to={"/admin/halls"} style={styles.link}>Halls</Link>
                <Link to={"/admin/screenings"} style={styles.link}>Screenings</Link>
                <Link to={"/"} style={styles.link}>Exit</Link>
            </div>
        );
    }
}

export default AdminHomePage;

