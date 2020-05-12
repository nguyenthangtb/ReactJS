import React, { Component } from 'react';
import { Container, Table, DropdownButton, Dropdown, ButtonGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

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
        console.log(this.state.users);

    }

    async fetchUsers(pagenumber = 1) {
        const requestUrl = `http://localhost:8000/api/users?page=${pagenumber}`;
        const res = await fetch(requestUrl);
        const resJson = await res.json();
        this.setState({
            users: resJson.data,
            current_page: resJson.meta.current_page,
            per_page: resJson.meta.per_page,
            total: resJson.meta.total,
        });
    }

    handleOnFilters(){
        
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
                            <Dropdown.Item as={Link} to={"/edit/" + item.id} eventKey="2">Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDelete(item.id)} eventKey="3">Delete</Dropdown.Item>
                        </DropdownButton>
                    </td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div>
                <Container style={{ marginTop: '30px' }}>
                    <Form.Group>
                        <Form.Control name="_q" onChange={this.handleOnFilters.bind(this)} type="text" placeholder="Search Name" />
                    </Form.Group>

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
                        onChange={(pagenumber) => this.fetchUsers(pagenumber)}
                        //onChange={this.handlePageChange.bind(this)}
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