import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Container,Card,Button, Navbar, Nav} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import Icon from '@mdi/react';
import { mdiAccount, mdiLogout } from '@mdi/js';

const HomePage = () => {
    const {isAuthenticated,user,logout} = useAuth0();
    const signOut = () => {
        logout();
        <Redirect to="/" />
    }
    return(
        isAuthenticated && (
        <Container>
            <Navbar sticky="top" bg="primary">
                <Container>
                    <Navbar.Brand><Icon path={mdiAccount} title="User" size={1} color="#fff" /></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#" style={{color:"#fff"}}>{user.nickname}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="secondary" onClick={()=>signOut()} style={{color:"#fff"}}><Icon path={mdiLogout} title="Logout" size={1} color="#fff" />Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
            <h3>Welcome to Ticket Rejection</h3>
        </Container>
        )
    )
}
export default HomePage;