import React from 'react';
import {Container, Card,Button} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

const LoginButton = ()=> {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return(
        isAuthenticated ? <Redirect to="/" /> : (
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
            <div className="w-100" style={{maxWidth:"400px"}}>
        <Card>
            <Card.Body>
                <Button className="w-100" variant="primary" onClick={()=>loginWithRedirect()}>Click here! to Login</Button>
            </Card.Body>
        </Card>
        </div>
        </Container>
        )
    )
}
export default LoginButton;