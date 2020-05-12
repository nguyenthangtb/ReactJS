import React, { Component } from 'react';
import {Form} from 'react-bootstrap';


class search extends Component {

    constructor(props){
        super(props);

        console.log(props.onSearchTemp);

    }

    render() {
        return (
            <div>
                <Form.Group>
                    <Form.Control type="text" placeholder="Search name" />
                </Form.Group>
            </div>
        );
    }
};

export default search;