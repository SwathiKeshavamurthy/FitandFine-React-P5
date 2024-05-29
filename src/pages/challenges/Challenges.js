import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { axiosRes } from "../../api/axiosDefaults";
import { toast } from 'react-toastify';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      toast.success("You have joined the challenge!");
    } catch (err) {
      toast.error("Failed to join the challenge.");
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
      toast.success("You have left the challenge!");
    } catch (err) {
      toast.error("Failed to leave the challenge.");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/challenges/${id}/`);
      setChallenges((prevChallenges) => ({
        ...prevChallenges,
        results: prevChallenges.results.filter((challenge) => challenge.id !== id),
      }));
      toast.success("Challenge deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete challenge.");
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
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
          {currentUser && currentUser.is_superuser && (
            <div className={styles.ActionIcons}>
              <i className={`fas fa-edit ${styles.EditIcon}`} onClick={() => history.push(`/challenges/${id}/edit`)}></i>
              <i className={`fas fa-trash ${styles.DeleteIcon}`} onClick={confirmDelete}></i>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this challenge?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Challenge;
