import React, {Component} from 'react';
import {Button, Container, Form, Nav, Navbar, NavLink} from "react-bootstrap";
import logo from '../../assept/favicon.png'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './Home';
import HrRecord from "../hr-record/HrRecord";
import About from "../About";

class UserHeader extends Component {
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
                                <NavLink href="/hr/records"> HR-Records </NavLink>
                                <NavLink href="/user/records"> User-Records </NavLink>
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
                            <Route path="/hr/records" element={<HrRecord/>}/>
                            <Route path="/user/records" element={<HrRecord/>}/>
                            <Route path="/user/records" element={<HrRecord/>}/>
                        </Routes>
                    </div>
                </Router>
            </>
        )
    }
}

export default UserHeader;