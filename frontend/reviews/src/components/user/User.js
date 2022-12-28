import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom"
import {Navbar, NavbarBrand} from "reactstrap";
import Url from "../utils/Url";
import Paginate from '../utils/Paginate';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.url = new Url();
        this.state = {
            records: [],
            test: [],
            inputText: "",
            currPage: 1,
            recPerPage: 5,
        };
    }

    async componentDidMount() {
        const url = this.url.getUrl();
        const response2 = await fetch(url+ '/reviews/users/auth/users');
        const body2 = await response2.json();
        this.setState({records: body2});
    }

    async remove(id) {
        const url = this.url.getUrl();
        await fetch(url + '/reviews/users/' + id, {
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

    paginate = (pageNumber) => {
        this.setState({currPage: pageNumber});
    };

    previousPage = () => {
        if (this.state.currPage !== 1) {
            this.setState({currPage: this.state.currPage - 1});
        }
    };

    nextPage = () => {
        if (
            this.state.currPage !==
            Math.ceil(this.state.records.length / this.state.recPerPage)
        ) {
            this.setState({currPage: this.state.currPage + 1});
        }
    };

    indexOfLastRec = () => {
        return this.state.currPage * this.state.recPerPage;
    };

    indexOfFirstRec = () => {
        return this.indexOfLastRec() - this.state.recPerPage;
    };

    currentRec = () => {
        return this.state.records.slice(this.indexOfFirstRec(), this.indexOfLastRec());
    };

    render() {
        const {records: records} = this.state

        const recList =
            this.currentRec().filter((rec) => {
                if (this.state.inputText === "") {
                    return rec;
                }
            }).map(rec => {
            return <tr key={rec.id}>
                <td>{rec.id}</td>
                <td>{rec.username}</td>
                <td>{rec.email}</td>
                <td>
                    <ButtonGroup>
                        <Button><NavbarBrand tag={Link} to={"/users/" + rec.id}>Edit</NavbarBrand></Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(rec.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <Button className="d-flex ms-auto"><NavbarBrand tag={Link}
                                                                    to="/users/new">Add</NavbarBrand></Button>
                </Navbar>
                <Container className='fluid'>
                    <Table className="mt-5">
                        <thead>
                        <tr>
                            <th width="30%">id</th>
                            <th width="30%">Username</th>
                            <th width="40%">Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recList}
                        </tbody>
                    </Table>
                    <Paginate
                        recsPerPage={this.state.recPerPage}
                        totalRecs={this.state.records.length}
                        paginate={this.paginate}
                        previousPage={this.previousPage}
                        nextPage={this.nextPage}
                    />
                </Container>
            </div>
        );
    }
}
