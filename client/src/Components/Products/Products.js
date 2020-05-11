import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faRecycle } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import axios from 'axios';


class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
        }
    }


    onClickProduct(id) {
        console.log(id);
    }


    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const requestUrl = 'http://localhost:8000/api/products';
            const response = await fetch(requestUrl);
            const responseJson = await response.json();
            this.setState({
                products: responseJson.data
            })
        } catch (error) {
            console.log('Error', error.message);
        }
    }


    handleDelete(id) {
        try {
            axios.delete('http://localhost:8000/api/products/' + id)
                .then((result) => {
                    if (result.status === 200) {
                        this.fetchData();
                        ToastsStore.success('Deleted success!');
                    } else {
                        ToastsStore.error('Deleted fail!');
                    }
                });
        } catch (error) {
            console.log('error', error.message);
        }

    }

    render() {
        return (
            <>
                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />
                <Container style={{ marginTop: '30px' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.detail}</td>
                                    <td>
                                        <i onClick={() => this.onClickProduct(item.id)}><FontAwesomeIcon icon={faEye} /></i>
                                        <Link to={"/edit/" + item.id}><FontAwesomeIcon icon={faEdit} /></Link>
                                        <i onClick={() => this.handleDelete(item.id)}><FontAwesomeIcon icon={faRecycle} /></i>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Container>
            </>
        );
    }
};

export default Products;