import React, { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { axiosReq } from "../../api/axiosDefaults";
import { toast } from 'react-toastify';
import Asset from "../../components/Asset";
import NoResults from "../../assets/noresults.JPG";
import styles from "../../styles/UserChallengesPage.module.css";

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

function UserChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [selectedSport, setSelectedSport] = useState("All");
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchChallenges = useCallback(async (url = "/my-challenges/") => {
    try {
      const { data } = await axiosReq.get(url);
      setChallenges(data.results);
      setFilteredChallenges(data.results);
      setHasLoaded(true);
    } catch (err) {
      console.error("Error fetching challenges:", err);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const leaveChallenge = async (id) => {
    try {
      await axiosReq.post(`/challenges/${id}/leave/`);
      toast.success("You have left the challenge!");
      setChallenges(challenges.filter(challenge => challenge.id !== id));
      setFilteredChallenges(filteredChallenges.filter(challenge => challenge.id !== id));
    } catch (err) {
      toast.error("Failed to leave the challenge.");
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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

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
      
      {hasLoaded ? (
        filteredChallenges.length ? (
          <Row>
            {filteredChallenges.map((challenge) => (
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
                    <Card.Text>
                      <strong>Joined on:</strong> 
                      {challenge.joined_at ? formatDate(challenge.joined_at) : 'N/A'}
                    </Card.Text>
                    <Button onClick={() => leaveChallenge(challenge.id)} variant="danger" className={styles.LeaveButton}>
                      Leave Challenge
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Asset src={NoResults} message="You haven't joined any Challenges in this category yet." />
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default UserChallengesPage;
