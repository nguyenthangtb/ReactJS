import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';

import axios from 'axios';
import { Link } from 'react-router-dom';


class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            detail: '',
            errorMessage: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //xử lý submit form
    handleOnSubmit(e) {
        e.preventDefault();

        try {

            const objectData = {
                name: this.state.name,
                detail: this.state.detail
            }

            axios.post('http://localhost:8000/api/products', objectData)
                .then((response) => {

                    if (response.status === 200) {
                        ToastsStore.success('Add new success!');
                    }

                }).catch(function (error) {
                    if (error.response) {
                      // The request was made and the server responded with a status code
                      // that falls out of the range of 2xx
                      ToastsStore.error(error.response.data.message);
                    } else if (error.request) {
                      // The request was made but no response was received
                      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                      // http.ClientRequest in node.js
                      console.log(error.request);
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log('Error', error.message);
                    }
                  });

        } catch (error) {
            ToastsStore.error('Add new fail!');
        }
    }

    render() {
        const { name, detail } = this.state;
        return (
            <Container style={{ marginTop: '30px' }}>
                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={this.handleInputChange}
                            value={name} type="Text" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Detail</Form.Label>
                        <Form.Control name="detail" type="text" value={detail}
                            onChange={this.handleInputChange} placeholder="Desc" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add New
                    </Button>
                    {' '}
                    <Button as={Link} to='/product' variant="secondary" type="button">
                        Cancel
                    </Button>
                </Form>
            </Container>
        );
    }
};

export default Add;