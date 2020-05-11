import React, {Component} from 'react';
import ModelUserDetail from '../users/ModelUserDetail';
import {Link} from 'react-router-dom'

class Actionbtn extends Component {

    //xử lý xóa user
    handlerDelete() {
        console.log('xóa');
    }

    handlerToSlug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    render() {
        return (
            <div>
                <div>
                    <div className="btn-group">
                        <div className="btn btn-success"><i className="fa fa-home" data-toggle="modal"
                                                            data-target="#modalUserDetail"></i></div>
                        <Link className="btn btn-warning"
                              to={"/sua-tai-khoan/" + this.handlerToSlug(this.props.name) + "." + this.props.id + ".html"}><i
                            className="fa fa-edit"></i></Link>
                        <div className="btn btn-danger"><i className="fa fa-trash-restore"
                                                           onClick={() => this.handlerDelete()}></i></div>
                    </div>
                </div>
                <ModelUserDetail/>
            </div>
        );
    }
}

export default Actionbtn;