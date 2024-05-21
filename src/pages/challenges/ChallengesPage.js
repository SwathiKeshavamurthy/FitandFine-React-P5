import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/noresults.JPG";
import styles from "../../styles/ChallengesPage.module.css";

function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await axiosReq.get("/challenges/");
        setChallenges(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChallenges();
  }, []);

  const joinChallenge = async (id) => {
    try {
      await axiosReq.post(`/challenges/${id}/join/`);
      alert("You have joined the challenge!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={styles.ChallengesPage}>
      <Row>
        <Col>
          <h1 className={styles.Header}>Challenges</h1>
          {hasLoaded ? (
            challenges.length ? (
              challenges.map((challenge) => (
                <Card key={challenge.id} className={styles.ChallengeCard}>
                  <Card.Img variant="top" src={challenge.image} />
                  <Card.Body>
                    <Card.Title>{challenge.title}</Card.Title>
                    <Card.Text>{challenge.description}</Card.Text>
                    <Card.Text>
                      <strong>Start Date:</strong> {challenge.start_date}
                    </Card.Text>
                    <Card.Text>
                      <strong>End Date:</strong> {challenge.end_date}
                    </Card.Text>
                    <Button onClick={() => joinChallenge(challenge.id)} variant="primary">Join Challenge</Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Asset src={NoResults} message="No challenges available" />
            )
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ChallengesPage;
