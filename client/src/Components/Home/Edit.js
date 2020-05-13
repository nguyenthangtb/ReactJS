import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import Axios from 'axios';

class Edit extends Component {


    constructor(props){
        super(props);

        this.state = {
            user: null,
            id: '',
            name: '',
            email: '',
            password: '',
            desc: '',
            ids_device: '',
            ids_organization: ''
        }
        
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
    }

    componentDidMount(){
        this.getUser();
    }

    getUser(){
        Axios.get('http://localhost:8000/api/users/144')
        .then((res) => {
            if(res.status === 200){
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    desc: res.data.desc,
                    ids_device: res.data.ids_device,
                    ids_organization: res.data.ids_organization
                })
            }
        })
        .catch((err) => {
            console.log(err.response);
        })
    }


    handleInputOnChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit(e){
        e.preventDefault();
        
        console.log('submit');
    }


    render() {

        //const { name, email, password, desc, ids_device, ids_organization } = this.state;

        return (
            <Container style={{marginTop: '30px'}}>

                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />

                <Form onSubmit={this.handleOnSubmit}>
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