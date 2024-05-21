import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Tooltip, OverlayTrigger } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/noresults.JPG";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ChallengesPage.module.css";

function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const currentUser = useCurrentUser();

  const fetchChallenges = async () => {
    try {
      const { data } = await axiosReq.get("/challenges/");
      console.log("Fetched challenges:", data);
      setChallenges(data.results);
      setHasLoaded(true);
    } catch (err) {
      console.error("Error fetching challenges:", err);
      setHasLoaded(true); 
    }
  };

  const fetchJoinedChallenges = async () => {
    if (!currentUser) return;
    try {
      const { data } = await axiosReq.get(`/users/${currentUser.id}/joined_challenges/`);
      console.log("Fetched joined challenges:", data);
      setJoinedChallenges(data.map(challenge => challenge.id));
    } catch (err) {
      console.error("Error fetching joined challenges:", err);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchJoinedChallenges();
  }, [currentUser]);

  const joinChallenge = async (id) => {
    if (!currentUser) {
      setShowAlert(true);
      return;
    }
    try {
      await axiosReq.post(`/challenges/${id}/join/`);
      alert("You have joined the challenge!");
      fetchJoinedChallenges();
    } catch (err) {
      console.error("Error joining challenge:", err);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please sign in or register to join a challenge.
    </Tooltip>
  );

  return (
    <Container className={styles.ChallengesPage}>
      
      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          Please sign in or register to join a challenge.
        </Alert>
      )}
      {hasLoaded ? (
        challenges.length ? (
          <Row>
            {challenges.map(challenge => (
              <Col key={challenge.id} md={6} lg={4} className="mb-4">
                <Card className={styles.ChallengeCard}>
                  <Card.Img
                    variant="top"
                    src={challenge.image}
                    className={styles.CardImg}
                  />
                  <Card.Body>
                    <Card.Title>{challenge.title}</Card.Title>
                    <Card.Text>{challenge.description}</Card.Text>
                    {currentUser ? (
                      joinedChallenges.includes(challenge.id) ? (
                        <Button variant="success" disabled className={styles.JoinButton}>
                          Joined
                        </Button>
                      ) : (
                        <Button
                          onClick={() => joinChallenge(challenge.id)}
                          variant="primary"
                          className={styles.JoinButton}
                        >
                          Join Challenge
                        </Button>
                      )
                    ) : (
                      <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip}
                      >
                        <Button
                          variant="primary"
                          className={styles.JoinButton}
                        >
                          Join Challenge
                        </Button>
                      </OverlayTrigger>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Asset src={NoResults} message="No challenges available." />
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default ChallengesPage;
