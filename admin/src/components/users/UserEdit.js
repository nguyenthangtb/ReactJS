import React, {Component} from 'react';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: null,
            username: null,
            email: null,
            address_street: null,
            address_suite: null,
            address_city: null,
            address_zipcode: null,
            phone: null,
            website: null,
            companyname: null,
            companycatchPhrase: null,
            companybs: null
        }
    }

    d

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users/" + this.state.id)
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    this.setState({
                        name: result.name,
                        username: result.username
                    });
                }
            )
    }


    render() {
        return (
            <div>
                Page edit
            </div>
        );
    }
}

export default EditUser;