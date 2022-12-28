import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup} from "react-bootstrap";
import {NavbarBrand} from "reactstrap";
import Url from "../utils/Url";
import withNavigateHook from "../utils/withNavigateHook";

export class UserAdd extends Component {


    emptyItem = {
        name: '',
        email: '',
        password: '',
        role: 'applicant',
      };

    constructor(props) {
        super(props);
        this.url = new Url()
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        console.log(item)
        this.setState({item});
    }

    handleChange0(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state};
        console.log(item.company.companyName)
        item[name].companyName = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        const url = this.url.getUrl();
        await fetch(url + '/reviews/users/superuser/new_user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        window.location.reload()
    }

    async componentDidMount() {
        console.log(this.props.params.id);
        if (this.props.params.id !== 'new') {
            const url = this.url.getUrl();
            const client = await (await fetch(url + "/reviews/usersauth/" + this.props.params.id)).json();
            this.setState({item: client});
            console.log(this.state.item)
        }
    }


    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;

        return (
            <div>
                <Container>
                    {title}
                    <Form>
                        <FormGroup>
                            <label>Name</label>
                            <input type="text" name="name" id="name" value={item.name || ''}
                                   onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>
                        <FormGroup>
                            <label>Email</label>
                            <input type="text" name="email" id="email" value={item.email || ''}
                                   onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup>
                            <label>Password</label>
                            <input type="text" name="password" id="password" value={item.password || ''}
                                   onChange={this.handleChange} autoComplete="password"/>
                        </FormGroup>
                        <FormGroup>
                            <label>Role</label>
                            {/* <input type="text" name="role" id="role" value={item.role || ''}
                                   onChange={this.handleChange} autoComplete="role"/> */}
                                <select value={item.role} onChange={this.handleChange} name="role" autoComplete="role">
                                    <option value="applicant">Applicant</option>
                                    <option value="hr">HR</option>
                                    <option value="admin">Admin</option>
                                </select>
                        </FormGroup>
                        <FormGroup>
                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>Save</Button>
                            <Button><NavbarBrand tag={Link} to="/users">Cancel</NavbarBrand></Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>);
    }
}
export default withNavigateHook(UserAdd)