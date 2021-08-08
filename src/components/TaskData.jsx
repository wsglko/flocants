import React,{useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Container,Card,Button, Navbar, Nav, Modal, Form, ListGroupItem, ListGroup} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const TaskData = () => {
    const [ctData, setCtData] = useState([])
    useEffect(() =>{
        axios.post("https://wsglko.000webhostapp.com/api/rejected-task.php",JSON.stringify({"action":"fetchData"}))
        .then(res=>{
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[]);
    return(
        <div>
            {ctData.map((item)=>(<ListGroup key={item.id}><ListGroup.Item>{item.task_id}</ListGroup.Item></ListGroup>))}
        </div>
    )
}
export default TaskData;
/*----------------------------------------------------------------
{!ctData ? <h3>No Data</h3> : ctData.filter((item)=>{return item.task_id.includes(search) || item.ft_name.toLowerCase().includes(search.toLowerCase())}).map((t)=>(<Card key={t.id} style={{width:"18rem"}}><Card.Body>
                <Card.Title>{t.task_id}</Card.Title><Card.Subtitle>{t.ft_name}</Card.Subtitle><Card.Text>{t.reason}</Card.Text></Card.Body><ListGroup className="list-group-flush"><ListGroupItem><b>Updated By: </b>{t.update_by}</ListGroupItem><ListGroupItem><b>Update On: </b>{moment.update_on("LL")}</ListGroupItem></ListGroup></Card>))}
                */