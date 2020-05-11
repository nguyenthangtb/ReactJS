import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

class Edit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            detail: '',
            product: null
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        this.getDataProduct();
    }


    componentDidUpdate(prevState){
        const {name} = this.state;
        console.log( 'name + update ', name);
        // if(prevState.name === name){

        // }
    }


    async getDataProduct() {
        try {
            const requestUrl = 'http://localhost:8000/api/products/1';
            const response = await fetch(requestUrl);
            const responseJson = await response.json();
            const product = responseJson.data;
            this.setState({
                id: product.id,
                name: product.name,
                detail: product.detail
            })
        } catch (error) {
            console.log('error', error.message);
        }
    }

    handleInputChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleOnSubmit(event) {
        event.preventDefault()
        const {id, name, detail } = this.state;
        axios.put('http://localhost:8000/api/products/1', { id, name, detail })
          .then((result) => {
            console.log(result);
            
          });

    }

    render() {
        return (
            <Container style={{ marginTop: '30px' }}>
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Control name="id" onChange={this.handleInputChange}  value={this.state.id} type="Text"/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={this.handleInputChange} value={this.state.name} type="Text" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Detail</Form.Label>
                        <Form.Control type="text" onChange={this.handleInputChange} name="detail" value={this.state.detail} placeholder="Desc" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Container>
        );
    }
};

export default Edit;