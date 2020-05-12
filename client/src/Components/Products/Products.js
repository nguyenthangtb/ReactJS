import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faRecycle } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
import axios from 'axios';

import Pagination from 'react-js-pagination';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activePage: 1,
            metaData: null,
            current_page: 1,
            per_page: 10,
            total: 1

        }
    }


    onClickProduct(id) {
        console.log(id);
    }


    async componentDidMount() {
        await this.fetchData();
    }

    async fetchData(pagenumber = 1) {
        try {
            const requestUrl = `http://localhost:8000/api/products?page=${pagenumber}`;
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


    render() {
        //const {} = this.state.metaData;
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
                    <Pagination
                        activePage={this.state.current_page}
                        itemsCountPerPage={this.state.per_page}
                        totalItemsCount={this.state.total}
                        pageRangeDisplayed={10}
                        onChange={(pagenumber) => this.fetchData(pagenumber)}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"

                    />
                </Container>
            </>
        );
    }
};

export default Products;