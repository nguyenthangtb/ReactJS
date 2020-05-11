import React, { Component } from 'react';
import DataUsers from './DataUsers';

class Users extends Component {
    render() {
        return (
                <div className="container-fluid">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>UserName</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Company</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <DataUsers />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Users;