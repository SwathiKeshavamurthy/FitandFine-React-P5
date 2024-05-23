import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, Button, Alert, Tooltip, OverlayTrigger } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/noresults.JPG";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ChallengesPage.module.css";

const sports = [
  "All", 
  "Cycling", 
  "Hiking", 
  "Swimming", 
  "Yoga", 
  "Running", 
  "Physical_Activity", 
  "Nature", 
  "Other_Activities"
];

function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [selectedSport, setSelectedSport] = useState("All");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const currentUser = useCurrentUser();

  const fetchChallenges = useCallback(async (url = "/challenges/") => {
    try {
      const { data } = await axiosReq.get(url);
      console.log("Fetched challenges:", data);
      setChallenges(prevChallenges => [...prevChallenges, ...data.results]);
      setFilteredChallenges(prevChallenges => [...prevChallenges, ...data.results]);
      if (!data.next) {
        setHasLoaded(true);
      } else {
        fetchChallenges(data.next);
      }
    } catch (err) {
      console.error("Error fetching challenges:", err);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    setChallenges([]); 
    setFilteredChallenges([]);
    fetchChallenges();
  }, [currentUser, fetchChallenges]);

  const joinChallenge = async (id) => {
    if (!currentUser) {
      setShowAlert(true);
      return;
    }
    try {
      await axiosReq.post(`/challenges/${id}/join/`);
      alert("You have joined the challenge!");
      setChallenges((prevChallenges) => {
        const updatedChallenges = prevChallenges.map((challenge) =>
          challenge.id === id
            ? { ...challenge, is_joined: true }
            : challenge
        );
        setFilteredChallenges(updatedChallenges);
        return updatedChallenges;
      });
    } catch (err) {
      console.error("Error joining challenge:", err);
    }
  };

  const filterChallenges = (sport) => {
    setSelectedSport(sport);
    if (sport === "All") {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(challenge => challenge.sport.toLowerCase() === sport.toLowerCase());
      setFilteredChallenges(filtered);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please sign in or register to join a challenge.
    </Tooltip>
  );

  return (
    <Container className={styles.ChallengesPage}>
      <div className="d-flex justify-content-center my-3">
        {sports.map((sport) => (
          <Button
            key={sport}
            className={selectedSport === sport ? styles.SelectedFilterButton : styles.FilterButton}
            onClick={() => filterChallenges(sport)}
          >
            {sport}
          </Button>
        ))}
      </div>

      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          Please sign in or register to join a challenge.
        </Alert>
      )}
      {hasLoaded ? (
        filteredChallenges.length ? (
          <Row>
            {filteredChallenges.map(challenge => (
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
                    <Card.Text><strong>Sport:</strong> {challenge.sport}</Card.Text>
                    {currentUser ? (
                      challenge.is_joined ? (
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
