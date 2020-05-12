import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {


    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: this.props.match.params.id,
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


    //
    componentDidUpdate(prevState) {
        const { name } = this.state;
        console.log('name + update ', name);
        // if(prevState.name === name){

        // }
    }


    async getDataProduct() {

        try {
            const requestUrl = 'http://localhost:8000/api/products/' + this.state.id;
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

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnSubmit(event) {
        event.preventDefault()

        const objectData = {
            id: this.state.id,
            name: this.state.name,
            detail: this.state.detail
        }

        try {
            axios.put('http://localhost:8000/api/products/' + objectData.id, { objectData })
            .then((result) => {
                if(result.status === 200){
                    ToastsStore.success('Updated success!');
                }
            }).catch((error) => {
                ToastsStore.error(error.response.data.message);
            });;
        } catch (error) {
            ToastsStore.error('Updated fail!');
        }
    }

    render() {
        return (
            <>
                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />
                <Container style={{ marginTop: '30px' }}>
                    <Form onSubmit={this.handleOnSubmit}>
                        <Form.Control name="id" onChange={this.handleInputChange} value={this.state.id} type="hidden" />
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
                        { ' ' }
                        <Button as={Link} to='/product' variant="secondary" type="button">
                            Cancel
                        </Button>
                    </Form>
                </Container>
            </>
        );
    }
};

export default Edit;