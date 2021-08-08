import React,{useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Container,Card,Button, Navbar, Nav, Modal, Form, ListGroupItem, ListGroup} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import Icon from '@mdi/react';
import { mdiAccount, mdiLogout, mdiPlusCircle } from '@mdi/js';
import axios from 'axios';
import moment from 'moment';

const HomePage = () => {
    const {isAuthenticated,user,logout} = useAuth0();
    const signOut = () => {
        logout();
        <Redirect to="/" />
    }
    const [ctData, setCtData] = useState([]);
    const [show, setShow] = useState(false);
    const modalShow = () => setShow(true);
    const modalClose = () => setShow(false);
    const [taskId, setTaskId] = useState("");
    const [ftName, setFtName] = useState("");
    const [reason, setReason] = useState("");
    const [updateOn, setUpdateOn] = useState(new Date());
    const [search, setSearch] = useState("");

    const saveData = () => {
        axios.post("https://wsglko.000webhostapp.com/api/rejected-task.php",JSON.stringify({"action":"newData","task_id":taskId,"ft_name":ftName,"reason":reason,"update_by":user.email,"update_on":updateOn}))
        .then(res=>{
            console.log(res.data);
            //setCtData(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(() =>{
        axios.post("https://wsglko.000webhostapp.com/api/rejected-task.php",JSON.stringify({"action":"fetchData"}))
        .then(res=>{
            //console.log(res.data);
            setCtData(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[]);
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
            <Button variant="primary"><Icon path={mdiPlusCircle} title="Add New" size={1} color="#fff" onClick={modalShow} /></Button>
            <Modal show={show} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Ticket/Task Number:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>FT/FE Name:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Reason:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>saveData()}>Save</Button>
                    <Button variant="secondary" onClick={modalClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            {!ctData ? <h3>No Data</h3> : ctData.filter((item)=>{return item.task_id.includes(search) || item.ft_name.toLowerCase().includes(search.toLowerCase())}).map((t)=>(<Card key={t.id} style={{width:"18rem"}}><Card.Body>
                <Card.Title>{t.task_id}</Card.Title><Card.Subtitle>{t.ft_name}</Card.Subtitle><Card.Text>{t.reason}</Card.Text></Card.Body><ListGroup className="list-group-flush"><ListGroupItem><b>Updated By: </b>{t.update_by}</ListGroupItem><ListGroupItem><b>Update On: </b>{moment(t.update_on).format("LL")}</ListGroupItem></ListGroup></Card>))}
        </Container>
        )
    )
}
export default HomePage;