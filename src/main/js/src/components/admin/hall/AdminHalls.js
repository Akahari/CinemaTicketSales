import React from 'react';
import {Route} from 'react-router-dom';
import AppBar from '../../AppBar';
import AdminHallsAdd from './AdminHallsAdd';
import AdminHallsOverview from './AdminHallsOverview';
import AdminHallsEdit from './AdminHallsEdit';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    }
};

class AdminHalls extends React.Component {

    render() {
        return (
            <React.Fragment>
                <AppBar title="Zarządzanie salami" linkTo={"/admin"}/>
                <div style={styles.container}>
                    <Route exact path="/admin/halls/add" component={AdminHallsAdd}/>
                    <Route exact path="/admin/halls/overview" component={AdminHallsOverview}/>
                    <Route path="/admin/halls/edit/:hallId" component={AdminHallsEdit}/>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminHalls;
