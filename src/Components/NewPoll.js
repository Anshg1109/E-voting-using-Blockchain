import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import './polling.css'

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);

    //this function will collect all the information and sends off to the blockchain
    //(all smart contract functions are are asynchronous) 
    //we have to wait for the respone to return to each time we make a contact call 

  const sendToBlockChain = async () => {
    changeDisable(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addCandidatePair({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
    });

    await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("head back to home page");
  };

  return (
    <Container style={{ marginTop: "40px", marginBottom: "6%" }}>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Candidiate 1 Name</Form.Label>
          <Form.Control
            ref={candidateName1}
            placeholder='Enter Candidate Name'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidate 1 Image URL</Form.Label>
          <Form.Control
            ref={candidateName1URL}
            placeholder='enter Image URL'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidiate 2 Name</Form.Label>
          <Form.Control
            ref={candidateName2}
            placeholder='Enter Candidate Name'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Candidate 2 Image URL</Form.Label>
          <Form.Control
            ref={candidateName2URL}
            placeholder='enter Image URL'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Prompt</Form.Label>
          <Form.Control ref={promptRef} placeholder='Add Prompt'></Form.Control>
        </Form.Group>
      </Form>

      {/* <Button
        disabled={disableButton}
        onClick={sendToBlockChain}
        variant='primary'
      >
        Submit
      </Button> */}
      <a onClick={sendToBlockChain} className="ct" style={{padding: "19px 18px",top:"10px", cursor: "pointer"}}>
      <span>Submit</span>
      <svg width="13px" height="10px" viewBox="0 0 13 10">
      <path d="M1,5 L11,5"></path>
      <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
      </a>
    </Container>
  );
};

export default NewPoll;