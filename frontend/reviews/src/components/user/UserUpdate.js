import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup} from "react-bootstrap";
import {NavbarBrand} from "reactstrap";
import Url from "../utils/Url";
import withNavigateHook from "../utils/withNavigateHook";

export class UserUpdate extends Component {


    emptyItem = {
        email: '',
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
        await fetch(url + '/reviews/users/' + this.props.params.id, {
            method: 'PUT',
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
            const client = await (await fetch(url + "/reviews/users/email/" + this.props.params.id)).json();
            this.setState({item: client});
            console.log(this.state.item)
        }
    }


    render() {
        const {item} = this.state;
        const title = <h2>{'Edit User'}</h2>;

        return (
            <div>
                <Container>
                    {title}
                    <Form>
                        <FormGroup>
                            <label>Email</label>
                            <input type="text" name="email" id="email" value={item.email || ''}
                                   onChange={this.handleChange} autoComplete="email"/>
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
export default withNavigateHook(UserUpdate)