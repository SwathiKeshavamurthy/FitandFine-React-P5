import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/noresults.JPG";
import styles from "../../styles/UserChallengesPage.module.css";

function UserChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await axiosReq.get("/my-challenges/");
        setChallenges(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChallenges();
  }, []);

  const leaveChallenge = async (id) => {
    try {
      await axiosReq.post(`/challenges/${id}/leave/`);
      alert("You have left the challenge!");
      setChallenges(challenges.filter(challenge => challenge.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={styles.ChallengesPage}>
      
      {hasLoaded ? (
        challenges.length ? (
          <Row>
            {challenges.map((challenge) => (
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
                    <Button onClick={() => leaveChallenge(challenge.id)} variant="danger" className={styles.LeaveButton}>
                      Leave Challenge
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Asset src={NoResults} message="You haven't joined any Challenges yet." />
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default UserChallengesPage;
