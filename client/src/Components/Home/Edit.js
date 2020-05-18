import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Axios from 'axios';

class Edit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: null,
            id: this.props.match.params.id,
            name: '',
            email: '',
            password: '',
            desc: '',
            ids_device: '',
            ids_organization: ''
        }

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }
    
    async getUser() {

        const requestUrl = `http://localhost:8000/api/users/${this.state.id}`;
        const res = await fetch(requestUrl);
        const resJson = await res.json();

        this.setState({
            id: resJson.data.id,
            name: resJson.data.name,
            password: resJson.data.password,
            email: resJson.data.email,
            desc: resJson.data.desc,
            ids_device: resJson.data.ids_device,
            ids_organization: resJson.data.ids_organization
        })
    }


    handleInputOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();

        //const { name, email, password, ids_device, ids_organization } = this.state;

        const user = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            desc: this.state.desc,
            password: this.state.password,
            ids_device: this.state.ids_device,
            ids_organization: this.state.ids_organization
        }

        Axios.put('http://localhost:8000/api/users/' + user.id, user)
            .then((res) => {
                if (res.status === 200) {
                    ToastsStore.success('Update success !');
                }

            }).catch((err) => {
                ToastsStore.error(err.response.data.message);
            })
    }


    render() {


        return (
            <Container style={{ marginTop: '30px' }}>

                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />

                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Control onChange={this.handleInputOnChange} value={this.state.id} name="id" type="hidden" />
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
                </Form>
            </Container>
        );
    }
};

export default Edit;