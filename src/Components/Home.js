// import {Tab} from "bootstrap";
import React, { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { login, logout } from "../utils"
import './polling.css'
const Home = props => {

    const [promptList, changePromptList] = useState([]);

    useEffect(() => {
        const getPrompts = async () => {
          changePromptList(await window.contract.getAllPrompts());
          console.log(await window.contract.getAllPrompts());
        };
        getPrompts();
    }, []);

    return (
        <Container >
            <Table style={{marginTop:"10vh", marginBottom:"20vh"}} striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>List of Polls</th>
                        <th>Go to polls</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        promptList.map((el,index)=>{
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el}</td>
                                <td>
                                <a style={{cursor: "pointer"}} onClick={window.accountId === "" ? login : ()=>props.changeCandidates(el)} className="ct">
                                <span>Go to Poll</span>
                                <svg width="13px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                                </a>
                                  {/* <Button onClick={window.accountId === "" ? login : ()=>props.changeCandidates(el)}>Go to Poll</Button> */}
                                </td>
                              </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
};



export default Home;