import React, { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { toast } from 'react-toastify';
import Asset from "../../components/Asset";
import NoResults from "../../assets/noresults.JPG";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteChallengeId, setDeleteChallengeId] = useState(null);
  const currentUser = useCurrentUser();
  const history = useHistory();

  const fetchChallenges = useCallback(async (url = "/challenges/") => {
    try {
      const { data } = await axiosReq.get(url);
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

  const handleEdit = (id) => {
    history.push(`/challenges/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosReq.delete(`/challenges/${id}/`);
      setChallenges((prevChallenges) => prevChallenges.filter(challenge => challenge.id !== id));
      setFilteredChallenges((prevFilteredChallenges) => prevFilteredChallenges.filter(challenge => challenge.id !== id));
      toast.success("Challenge deleted successfully!");
    } catch (err) {
      console.error("Error deleting challenge:", err);
      toast.error("Failed to delete challenge.");
    }
  };

  const confirmDelete = (id) => {
    setDeleteChallengeId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete(deleteChallengeId);
    setShowDeleteModal(false);
    setDeleteChallengeId(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteChallengeId(null);
  };

  const joinChallenge = async (id) => {
    if (!currentUser) {
      setShowAlert(true);
      return;
    }
    try {
      await axiosReq.post(`/challenges/${id}/join/`);
      toast.success("You have joined the challenge!");
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
      toast.error("Failed to join the challenge.");
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
          <InfiniteScroll
            dataLength={filteredChallenges.length}
            loader={<Asset spinner />}
            hasMore={!!filteredChallenges.next}
            next={() => fetchMoreData(filteredChallenges, setFilteredChallenges)}
          >
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
                        <>
                          {challenge.is_joined ? (
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
                          )}
                          {currentUser.is_superuser && (
                            <div className={styles.ActionIcons}>
                              <i
                                className={`fas fa-edit ${styles.EditIcon}`}
                                onClick={() => handleEdit(challenge.id)}
                              ></i>
                              <i
                                className={`fas fa-trash ${styles.DeleteIcon}`}
                                onClick={() => confirmDelete(challenge.id)}
                              ></i>
                            </div>
                          )}
                        </>
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
          </InfiniteScroll>
        ) : (
          <Asset src={NoResults} message="No challenges available." />
        )
      ) : (
        <Asset spinner />
      )}

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
    </Container>
  );
}

export default ChallengesPage;
