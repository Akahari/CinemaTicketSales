import React from 'react';
import {Route} from 'react-router-dom';
import AppBar from '../../AppBar';
import AdminTheatersAdd from './AdminTheatersAdd';
import AdminTheatersOverview from './AdminTheatersOverview';
import AdminTheatersEdit from './AdminTheatersEdit';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    }
};

class AdminTheaters extends React.Component {

    render() {
        return (
            <React.Fragment>
                <AppBar title="Zarządzanie kinami" linkTo={"/admin"}/>
                <div style={styles.container}>
                    <Route exact path="/admin/theaters/add" component={AdminTheatersAdd}/>
                    <Route exact path="/admin/theaters/overview" component={AdminTheatersOverview}/>
                    <Route path="/admin/theaters/edit/:theaterId" component={AdminTheatersEdit}/>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminTheaters;
