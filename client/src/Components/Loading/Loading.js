import React, { Component } from 'react';


class Loading extends Component {
    render() {
        return (
            <div className="loader-container">
                <div className="loader">
                    <img src={process.env.PUBLIC_URL + '/assets/images/spinner.gif'} alt="loading"/> 
                </div>
            </div>
        );
    }
}

export default Loading;