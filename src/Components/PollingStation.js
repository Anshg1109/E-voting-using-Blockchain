import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Loading from "../assets/loading.png";
import './polling.css';

const PollingStation = (props) => {
  // candidate1URL is a state variable  and changeCandidate1Url is a function     
  //// this is called react hooks  . this functions purpose is to change the value that reside
  // in candidate1 state variable  and this usestate function isgoing to set default value for this 
  const [candidate1URL, changeCandidate1Url] = useState(Loading);
  const [candidate2URL, changeCandidate2Url] = useState(Loading);
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeResultsDisplay(true);
  };

  return (
    <Container>
      <Row>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "rgb(218 218 218)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2vw",
                  boxShadow: "rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px, rgb(10 37 64 / 35%) 0px -2px 6px 0px inset",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                    borderRadius: "8px",
                  }}
                  src={candidate1URL}
                ></img>
              </div>
            </Row>
            {/* <Row style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "1vw",
                  boxShadow: "rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px, rgb(10 37 64 / 35%) 0px -2px 6px 0px inset",}}>
                <h1>hello</h1>
            </Row> */}
            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "3vw",
                    padding: "10px",
                    backgroundColor: "rgb(218 218 218)",
                    color: "white",
                    borderRadius: "10px",
                    textShadow: "black 1px 1px 3px, black 0px 0px 1px, rgb(0 0 0) 0px 0px 3px",
                    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
                  }}
                >
                  {candidate1Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <Button className="button-33" disabled={buttonStatus} onClick={() => addVote(0)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
        <Col className='justify-content-center d-flex align-items-center'>
          <div
            style={{
              color: "Black",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgb(218 218 218)",
              height: "20vh",
              alignItems: "center",
              padding: "2vw",
              textAlign: "center",
              borderRadius: "10px",
              // textShadow: "1px 1px 2px black, 0 0 25px black, 0 0 5px #000000",
              boxShadow: "rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px, rgb(10 37 64 / 35%) 0px -2px 6px 0px inset",
            }}
          >
            {prompt}
          </div>
        </Col>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "rgb(218 218 218)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2vw",
                  boxShadow: "rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px, rgb(10 37 64 / 35%) 0px -2px 6px 0px inset",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                    borderRadius: "8px",
                  }}
                  src={candidate2URL}
                ></img>
              </div>
            </Row>
            {/* <Row style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "1vw",
                  boxShadow: "rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px, rgb(10 37 64 / 35%) 0px -2px 6px 0px inset",}}>
                <h1>hello</h1>
            </Row> */}
            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "3vw",
                    padding: "10px",
                    backgroundColor: "rgb(218 218 218)",
                    color: "white",
                    borderRadius: "10px",
                    textShadow: "black 1px 1px 3px, black 0px 0px 1px, rgb(0 0 0) 0px 0px 3px",
                    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
                  }}
                >
                  {candidate2Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <Button className="button-33" disabled={buttonStatus} onClick={() => addVote(1)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PollingStation;