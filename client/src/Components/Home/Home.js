import React, { Component } from 'react';
import { Container, Table, DropdownButton, Dropdown, ButtonGroup, Form, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Axios from 'axios';
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from 'react-toasts';
class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            activePage: 1,
            current_page: 1,
            per_page: 10,
            total: 1,
        }

    }

    componentDidMount() {
        this.fetchUsers();

    }

    async fetchUsers(pagenumber = 1, limit = 10, like = '') {

        //const per_page = 10;
        const requestUrl = `http://localhost:8000/api/users?page=${pagenumber}&limit=${limit}&like=${like}`;
        console.log(requestUrl);
        const res = await fetch(requestUrl);
        const resJson = await res.json();

        this.setState({
            users: resJson.data,
            current_page: resJson.meta.current_page,
            per_page: resJson.meta.per_page,
            total: resJson.meta.total,
        });
    }

    handleDelete(id) {
        Axios.delete(`http://localhost:8000/api/users/${id}`)
            .then((res) => {
                if(res.status === 200){
                    ToastsStore.success('Deleted user success !');
                    this.fetchUsers(this.state.current_page);
                }
            }).catch((err) => {
                ToastsStore.error('Delete user fail !');
            })
    }

    renderUser() {
        return this.state.users.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.ids_device}</td>
                    <td style={{ width: '100px' }}>
                        <DropdownButton as={ButtonGroup} title="Action" id="bg-vertical-dropdown-1">
                            <Dropdown.Item onClick={this.handleShow} eventKey={item.id}>View</Dropdown.Item>
                            <Dropdown.Item as={Link} to={"/users/edit/" + item.id} eventKey="2">Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDelete(item.id)} eventKey="3">Delete</Dropdown.Item>
                        </DropdownButton>
                    </td>
                </tr>
            );
        })
    }

    handleSelectItem(newItem) {
        this.fetchUsers(1, parseInt(newItem.target.value))
    }

    handleOnFilters(e) {
        this.fetchUsers(1,this.state.per_page, e.target.value);
    }

    // handleSelectOrder(e){
    //     console.log(e.target.value);
    // }

    render() {
        return (
            <div>
                <Container style={{ marginTop: '30px' }}>
                    
                    <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />

                    <Form.Group>
                        <Form.Control name="_q" onChange={this.handleOnFilters.bind(this)} type="text" placeholder="Search Name" />
                    </Form.Group>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ float: 'left' }}>
                            <Form.Group controlId="selectItem">
                                <Form.Control name="slItem" onChange={this.handleSelectItem.bind(this)} as="select" size="sm" custom>
                                    <option>10</option>
                                    <option>50</option>
                                    <option>100</option>
                                </Form.Control>
                            </Form.Group>
                            {/* <Form.Group controlId="selectOrder">
                                <Form.Control name="slOrder" onChange={this.handleSelectOrder.bind(this)} as="select" size="sm" custom>
                                    <option>ASC</option>
                                    <option>DESC</option>
                                </Form.Control>
                            </Form.Group> */}
                        </div>
                        <div style={{ float: 'right' }}>
                            <Badge variant="light">({this.state.total} item)</Badge>
                            <Button as={Link} to='/users/add' variant="primary">
                                Add New
                            </Button>
                        </div>

                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>No.of Device(s)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUser()}
                        </tbody>
                    </Table>

                    <Pagination
                        activePage={this.state.current_page}
                        itemsCountPerPage={this.state.per_page}
                        totalItemsCount={this.state.total}
                        pageRangeDisplayed={10}
                        onChange={(pagenumber, limit) => this.fetchUsers(pagenumber, this.state.per_page)}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </Container>
            </div>
        );
    }
};

export default Home;