import React from 'react';
import * as axios from 'axios';

const styles = {
    container: {
        height: '100%'
    }
};

class Halls extends React.Component {
    state = {
        halls: [],
        error: null
    };

    componentDidMount() {
        axios.get('/hall/all').then(
            response => {
                console.log(response);
                this.setState({halls: response.data});
            },
            error => {
                console.log(error);
                this.setState({error: 'Wystąpił błąd'});
            });
    }

    render() {
        if (this.state.error) {
            return (
                <div style={styles.container}>
                    {this.state.error}
                </div>
            )
        }
        return (
            <div style={styles.container}>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Rows</th>
                        <th>Row length</th>
                        <th>Screening Ids</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.halls.map(hall => (
                            <tr>
                                <td>{hall.id}</td>
                                <td>{hall.name}</td>
                                <td>{hall.rows}</td>
                                <td>{hall.rowLength}</td>
                                <td>{hall.screening}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Halls;
