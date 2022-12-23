import React, {Component} from 'react';
import {Button, NavbarBrand} from "reactstrap";
import {Link} from "react-router-dom";

class User extends Component {
    render() {
        return (
            <div>
                Обычные Пользователи

                <Button className="d-flex ms-auto"><NavbarBrand tag={Link}
                                                               to="/user/new">Add</NavbarBrand></Button>
            </div>
        );
    }
}

export default User;