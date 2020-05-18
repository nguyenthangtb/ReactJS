import React, { Component } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { ToastsContainerPosition, ToastsContainer, ToastsStore } from 'react-toasts';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            desc: '',
            ids_device: '',
            ids_organization: '',
            file: null,
            error: null,
        }
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputOnChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {

        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            desc: this.state.desc,
            ids_device: this.state.ids_device,
            ids_organization: this.state.ids_organization
        }

        Axios.post('http://localhost:8000/api/users', user)
            .then((res) => {
                console.log(res);
                ToastsStore.success('Add new success !');
            })
            .catch((err) => {
                console.log(err.response.data);

                this.setState({
                    error: err.response.data
                })

                //console.log(errorItems);

                ToastsStore.error('Add new fail !');
            })
    }

    handleFile(e){
        let _file = e.target.files[0];
        console.log(_file);
        this.setState({ file: _file });

        console.log(this.state.file);
    }
    render() {
        return (
            <Container style={{ marginTop: '30px' }}>

                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={8}>

                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={this.handleInputOnChange} value={this.state.name} name="name" type="text" placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="text" onChange={this.handleInputOnChange} value={this.state.email} placeholder="Enter Email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" onChange={this.handleInputOnChange} value={this.state.password} type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group controlId="formBasicDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="desc" onChange={this.handleInputOnChange} value={this.state.desc} type="text" placeholder="Enter Description" />
                            </Form.Group>

                            <Form.Group controlId="formBasicDevice">
                                <Form.Label>Device(s)</Form.Label>
                                <Form.Control name="ids_device" onChange={this.handleInputOnChange} value={this.state.ids_device} type="text" placeholder="Enter Device" />
                            </Form.Group>

                            <Form.Group controlId="formBasicOrganization">
                                <Form.Label>Organization(s)</Form.Label>
                                <Form.Control name="ids_organization" onChange={this.handleInputOnChange} value={this.state.ids_organization} type="text" placeholder="Enter Organization" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            {' '}
                            <Button as={Link} to='/' variant="secondary" type="Button">
                                Cancel
                            </Button>
                        </Col>
                        <Col sm={4}>
                            <Form.Group controlId="formBasicFile">
                                <Form.Label>Ảnh</Form.Label>
                                <Form.File name="file" onChange={(e) => this.handleFile(e)} id="custom-file" label="File" custom />
                            </Form.Group>

                        </Col>
                    </Row>
                </Form>

            </Container>
        );
    }
};

export default Add;