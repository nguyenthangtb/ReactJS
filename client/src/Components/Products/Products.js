import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faRecycle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
        }
    }

    onClickProduct(id){
        console.log(id);
    }


    componentDidMount() {
        this.handleFetchData();
    }

    async handleFetchData() {

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
    
    render() {
        return (
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
                                    <i onClick={() => this.onClickProduct(item.id)}><FontAwesomeIcon icon={faEye} /></i> <Link to={"/edit/" + item.id}><FontAwesomeIcon icon={faEdit} /></Link> <i><FontAwesomeIcon icon={faRecycle} /></i>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        );
    }
};

export default Products;