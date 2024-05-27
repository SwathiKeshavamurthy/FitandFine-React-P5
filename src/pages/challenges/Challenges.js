import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Challenge.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Challenge = ({
  id,
  owner,
  title,
  description,
  start_date,
  end_date,
  sport,
  image,
  participants,
  setChallenges,
}) => {
  const currentUser = useCurrentUser();
  const history = useHistory();

  const isParticipant = participants?.includes(currentUser?.id);

  const handleJoin = async () => {
    try {
      await axiosRes.post(`/challenges/${id}/join/`);
      setChallenges((prevChallenges) => ({
        ...prevChallenges,
        results: prevChallenges.results.map((challenge) =>
          challenge.id === id
            ? { ...challenge, participants: [...challenge.participants, currentUser.id] }
            : challenge
        ),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLeave = async () => {
    try {
      await axiosRes.post(`/challenges/${id}/leave/`);
      setChallenges((prevChallenges) => ({
        ...prevChallenges,
        results: prevChallenges.results.map((challenge) =>
          challenge.id === id
            ? { ...challenge, participants: challenge.participants.filter((pid) => pid !== currentUser.id) }
            : challenge
        ),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Challenge}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text><strong>Start Date:</strong> {start_date}</Card.Text>
        <Card.Text><strong>End Date:</strong> {end_date}</Card.Text>
        <Card.Text><strong>Sport:</strong> {sport}</Card.Text>
        {currentUser ? (
          isParticipant ? (
            <Button onClick={handleLeave} variant="danger">Leave Challenge</Button>
          ) : (
            <Button onClick={handleJoin} variant="primary">Join Challenge</Button>
          )
        ) : (
          <Button onClick={() => history.push("/signin")} variant="primary">Sign In to Join</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Challenge;
