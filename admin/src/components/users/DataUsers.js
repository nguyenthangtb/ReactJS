import React, {Component} from 'react';
import Actionbtn from '../common/Actionbtn';

class DataUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: []
        }
    }


    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json()).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    users: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }


    render() {
        const {error, isLoaded, users} = this.state;

        if (error) {
            return (
                <div>Lỗi</div>
            )
        } else if (!isLoaded) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        } else {
            return (

                <tbody>
                {users.map((item) =>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.phone}</td>
                        <td>{item.address.street + ", " + item.address.city}</td>
                        <td>{item.company.name}</td>
                        <td className="text-center">
                            <Actionbtn id={item.id} name={item.name}/>
                        </td>
                    </tr>
                )}
                </tbody>
            )
        }

    }
}

export default DataUsers;