import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Loading from "../assets/loading.png";
import './polling.css';

const PollingStation = (props) => {
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
            <Row style={{ marginTop: "5vh", backgroundColor: "#494a54" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                  boxShadow: "10px 10px 20px -1px rgba(0,0,0,0.78)",
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
            <Row style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "1vw",
                  boxShadow: "10px 10px 20px -1px rgba(0,0,0,0.78)",}}>
                <h1>hello</h1>
            </Row>
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
                    backgroundColor: "#494a54",
                    color: "white",
                    borderRadius: "10px",
                    textShadow: "1px 1px 2px black, 0 0 25px black, 0 0 5px #000000",
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
              <Button className="Button" disabled={buttonStatus} onClick={() => addVote(0)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
        <Col className='justify-content-center d-flex align-items-center'>
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#494a54",
              height: "20vh",
              alignItems: "center",
              padding: "2vw",
              textAlign: "center",
              borderRadius: "10px",
              textShadow: "1px 1px 2px black, 0 0 25px black, 0 0 5px #000000",
              boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
            }}
          >
            {prompt}
          </div>
        </Col>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#494a54" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                  boxShadow: "10px 10px 20px -1px rgba(0,0,0,0.78)",
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
            <Row style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "1vw",
                  boxShadow: "10px 10px 20px -1px rgba(0,0,0,0.78)",}}>
                <h1>hello</h1>
            </Row>
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
                    backgroundColor: "#494a54",
                    color: "white",
                    borderRadius: "10px",
                    textShadow: "1px 1px 2px black, 0 0 25px black, 0 0 5px #000000",
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
              <Button className="Button" disabled={buttonStatus} onClick={() => addVote(1)}>
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