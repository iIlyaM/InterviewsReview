import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom"
import {Navbar, NavbarBrand} from "reactstrap";
import Url from "../utils/Url";


export default class UserRecord extends Component {
    constructor(props) {
        super(props);
        this.url = new Url();
        this.state = {records: []};
    }

    async componentDidMount() {
        const url = this.url.getUrl();
        const response2 = await fetch(url+ '/users/records');
        const body2 = await response2.json();
        this.setState({records: body2});
    }

    async remove(id) {
        const url = this.url.getUrl();
        await fetch(url + '/record/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.records].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
        window.location.reload()
    }

    render() {
        const {records: records} = this.state

        const recList = records.map(rec => {
            return <tr key={rec.id}>

                <td>{rec.recordTitle}</td>
                <td>{rec.user.hrName}</td>
                <td>{rec.record.rating}</td>
                <td>{rec.record.review}</td>
                <td>{rec.record.companyName}</td>
                <td>
                    <ButtonGroup>
                        {/*<Button><NavbarBrand tag={Link} to="/company/edit">Edit</NavbarBrand></Button>*/}
                        <Button size="sm" color="danger" onClick={() => this.remove(rec.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <Button className="d-flex ms-auto"><NavbarBrand tag={Link}
                                                                    to="/user_record/new">Add</NavbarBrand></Button>
                </Navbar>
                <Container className='fluid'>
                    <Table className="mt-5">
                        <thead>
                        <tr>
                            <th width="30%">Title</th>
                            <th width="30%">User-Name</th>
                            <th width="30%">Rating</th>
                            <th width="30%">Review</th>
                            <th width="30%">Company-Name</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}