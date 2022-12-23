import React, {Component} from 'react';
import {Button, Container, Form, Nav, Navbar, NavLink} from "react-bootstrap";
import logo from '../../assept/favicon.png'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Home';
import About from '../About';
import Company from '../company/Company';
import Record from '../record/Record';
import CompanyAdd from "../company/CompanyAdd";
import RecordAdd from "../record/RecordAdd";
import HrEmail from "../hr-email/HrEmail";
import HrUser from "../hr-user/HrUser";
import HrRecord from "../hr-record/HrRecord";
import HrEmailAdd from "../hr-email/HrEmailAdd";
import HrUserAdd from "../hr-user/HrUserAdd";
import UserRecord from '../user-record/UserRecord';

class HrHeader extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                height="50"
                                width="50"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />{" "}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsible-navbar-nav"/>
                        <Navbar.Collapse id="responsible-navbar-nav">
                            <Nav>
                                <NavLink href="/"> Home </NavLink>
                                <NavLink href="/about"> About us </NavLink>
                                <NavLink href="/records"> Record </NavLink>
                                <NavLink href="/hr/records"> HR-Records </NavLink>
                            </Nav>
                            <Form className="d-flex ms-auto">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Router>
                    <div>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/companies" element={<Company/>}/>
                            <Route path="/records" element={<Record/>}/>
                            <Route path="/company/new" element={<CompanyAdd/>}/>
                            <Route path="/records/new" element={<RecordAdd/>}/>
                            <Route path="/emails" element={<HrEmail/>}/>
                            <Route path="/emails/new" element={<HrEmailAdd/>}/>
                            <Route path="/users/hr" element={<HrUser/>}/>
                            <Route path="/users/hr/new" element={<HrUserAdd/>}/>
                            <Route path="/user/hr/new" element={<HrUserAdd/>}/>
                            <Route path="/hr/records" element={<HrRecord/>}/>
                            <Route path="/user/records" element={<UserRecord/>}/>
                        </Routes>
                    </div>
                </Router>
            </>
        )
    }
}

export default HrHeader;