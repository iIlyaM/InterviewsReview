import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup} from "react-bootstrap";
import {NavbarBrand} from "reactstrap";
import Url from "../utils/Url";

export default class HrEmailAdd extends Component {


    emptyItem = {
        email: '',
        company: {
            companyName: ''
        }
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
        if (name === "companyName") {
            item["company"].companyName = value;
        }
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
        await fetch(url + '/email/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        window.location.reload()
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Hr Email' : 'Add Hr Email'}</h2>;

        return (
            <div>
                <Container>
                    {title}
                    <Form>
                        <FormGroup>
                            <label>Company name</label>
                            <input type="text" name="companyName" id="companyName" value={item.companyName || ''}
                                   onChange={this.handleChange} autoComplete="companyName"/>
                        </FormGroup>
                        <FormGroup>
                            <label>Email</label>
                            <input type="text" name="email" id="email" value={item.email || ''}
                                   onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup>
                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>Save</Button>
                            <Button><NavbarBrand tag={Link} to="/emails">Cansel</NavbarBrand></Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>);
    }
}
