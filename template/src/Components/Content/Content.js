import React, { Component } from 'react';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    message(x){
        alert(x);
    }

    thongbao = () =>{
        alert("ddd");
    }

    render() {
        return (
            <div>
                <section>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className={"col-lg-6 " + this.props.positionLeft }>
                                <div className="p-5">
                                    <img className="img-fluid rounded-circle" src={this.props.image} alt="" />
                                </div>
                            </div>
                            <div className={"col-lg-6 " + this.props.positionRight}>
                                <div className="p-5">
                                    <h2 className="display-4">{this.props.tieude}</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                                </div>
                                <div className="p-5">
                                    <div className="btn btn-group">
                                        <div className="btn btn-info" onClick={this.thongbao}>Chi tiết</div>
                                        <div className="btn btn-warning" onClick={() => this.message("dd")}>Mua ngay</div>
                                        <div className="btn btn-success" onClick={this.message.bind(this, "chia sẻ")}>Chia sẻ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Content;