import React, {Component, } from 'react';
import {Button, Container, Form, FormGroup} from "react-bootstrap";
import {Link} from "react-router-dom"
import {NavbarBrand} from "reactstrap";
import Url from "../utils/Url";
import jwt_decode from "jwt-decode";
import withNavigateHook from "../utils/withNavigateHook";

export class UserRecordUpdate extends Component {
    emptyItem = {
        rating: '',
        specialization: "",
        review: ""
      };

    constructor(props) {
        super(props);
        this.url = new Url();
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
        this.setState({item});
    }

        async componentDidMount() {
        console.log(this.props.params.id);
        if (this.props.params.id !== 'new') {
            const url = this.url.getUrl();
            const client = await (await fetch(url + "/users/records/record/record_data/" + this.props.params.id)).json();
            this.setState({item: client});
            console.log(this.state.item)
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("auth_token");
        const data = jwt_decode(token);
        const {item} = this.state;
        item.user_id = data.sub_id;
        const url = this.url.getUrl();
        await fetch(url + '/users/records/updated_record/' + this.props.params.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(item),
        });
        window.location.reload()
    }

    render() {
        const {item} = this.state;
        const title = <h2>{'Edit Record'}</h2>;

        return (
            <div>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <label>Rating</label>
                            <input type="text" name="rating" id="rating" value={item.rating || ''}
                                   onChange={this.handleChange} autoComplete="rating"/>
                        </FormGroup>
                        <FormGroup>
                            <label>Specialization</label>
                            <input type="text" name="specialization" id="specialization" value={item.specialization || ''}
                                   onChange={this.handleChange} autoComplete="specialization"/>
                        </FormGroup>
                        <FormGroup>
                            <label>Review</label>
                            <input type="text" name="review" id="review" value={item.review || ''}
                                   onChange={this.handleChange} autoComplete="review"/>
                        </FormGroup>
                        <FormGroup>
                            <Button variant="primary" type="submit">Save</Button>
                            <Button><NavbarBrand tag={Link} to="/records">Cancel</NavbarBrand></Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>);
    }
}
export default withNavigateHook(UserRecordUpdate)