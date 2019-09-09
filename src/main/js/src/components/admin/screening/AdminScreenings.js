import React from 'react';
import {Route} from 'react-router-dom';
import AppBar from '../../AppBar';
import AdminScreeningsAdd from './AdminScreeningsAdd';
import AdminScreeningsOverview from './AdminScreeningsOverview';
import AdminScreeningsEdit from './AdminScreeningsEdit';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: 10
    }
};

class AdminScreenings extends React.Component {

    render() {
        return (
            <React.Fragment>
                <AppBar title="Zarządzanie seansami" linkTo={"/admin"}/>
                <div style={styles.container}>
                    <Route exact path="/admin/screenings/add" component={AdminScreeningsAdd}/>
                    <Route exact path="/admin/screenings/overview" component={AdminScreeningsOverview}/>
                    <Route path="/admin/screenings/edit/:screeningId" component={AdminScreeningsEdit}/>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminScreenings;
