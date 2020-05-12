import React, { Component } from 'react';

import { Container, Table, Form, Button, DropdownButton, Dropdown, ButtonGroup, Modal, Badge } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye, faEdit, faRecycle } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import axios from 'axios';

import Pagination from 'react-js-pagination';
import queryString from 'query-string';
// import View from './View';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activePage: 1,
            metaData: null,
            current_page: 1,
            per_page: 10,
            total: 1,
            filters: {
                page: 1,
                like: '',
                // lt: 'asc',
                // gt: 'desc',
            },
            show: false,
            modalProd: null
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {

            const paramterQuery = queryString.stringify(this.state.filters);
            const requestUrl = `http://localhost:8000/api/products?${paramterQuery}`;

            const response = await fetch(requestUrl);
            const responseJson = await response.json();

            this.setState({
                products: responseJson.data,
                current_page: responseJson.meta.current_page,
                per_page: responseJson.meta.per_page,
                total: responseJson.meta.total,
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


    handleOnFilters(e) {

        const value = e.target.value;

        this.setState({
            filters: {
                like: value
            }
        })
        this.fetchData(this.state.filters.like)

    }

    handlePageChange(newPageNumber) {
        this.setState({
            filters: {
                page: newPageNumber,
            }
        })
        this.fetchData(this.state.filters.page);
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleShow() {
        this.setState({
            show: true
        })
    }

    // onClickProduct(id) {
    //     this.setState({
    //         show: true
    //     })
    // }

    render() {
        //const { data } = this.state.products;
        return (
            <>
                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />

                <Container style={{ marginTop: '30px' }}>

                    <Form.Group>
                        <Form.Control name="_q" onChange={this.handleOnFilters.bind(this)} type="text" placeholder="Search Name" />
                    </Form.Group>


                    <div style={{ marginBottom: '1rem', float: 'right' }}>
                        <Badge variant="light">({this.state.total} item)</Badge>

                        <Button as={Link} to='/add' variant="primary">
                            Add New
                        </Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th style={{ width: '100px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.detail}</td>
                                    <td>
                                        <DropdownButton as={ButtonGroup} title="Action" id="bg-vertical-dropdown-1">
                                            <Dropdown.Item onClick={this.handleShow} eventKey={item.id}>View</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={"/edit/" + item.id} eventKey="2">Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.handleDelete(item.id)} eventKey="3">Delete</Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>


                    <Pagination
                        activePage={this.state.current_page}
                        itemsCountPerPage={this.state.per_page}
                        totalItemsCount={this.state.total}
                        pageRangeDisplayed={10}
                        //onChange={(pagenumber) => this.fetchData(pagenumber)}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />


                </Container>

                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Test</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Modal body</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }
};

export default Products;