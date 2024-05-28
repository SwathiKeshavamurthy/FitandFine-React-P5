import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/DailyRoutineCreateEditForm.module.css";

const ChallengeEditForm = () => {
  const [challengeData, setChallengeData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    sport: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const { data } = await axiosReq.get(`/challenges/${id}/`);
        setChallengeData({
          ...data,
          image: data.image || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setChallengeData((prevChallengeData) => ({
      ...prevChallengeData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    setChallengeData({
      ...challengeData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", challengeData.title);
    formData.append("description", challengeData.description);
    formData.append("start_date", challengeData.start_date);
    formData.append("end_date", challengeData.end_date);
    formData.append("sport", challengeData.sport);
    if (challengeData.image && typeof challengeData.image === "object") {
      formData.append("image", challengeData.image);
    }

    try {
      await axiosRes.put(`/challenges/${id}/`, formData);
      history.push(`/challenges`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleCancel = () => {
    history.push("/challenges");
  };

  return (
    <Container className={styles.Container}>
      <h1>Edit Challenge</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={challengeData.title}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={challengeData.description}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.description?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="start_date">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            value={challengeData.start_date}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.start_date?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="end_date">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            value={challengeData.end_date}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.end_date?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="sport">
          <Form.Label>Sport</Form.Label>
          <Form.Control
            as="select"
            name="sport"
            value={challengeData.sport}
            onChange={handleChange}
          >
            <option value="">Select a sport</option>
            <option value="cycling">Cycling</option>
            <option value="hiking">Hiking</option>
            <option value="swimming">Swimming</option>
            <option value="yoga">Yoga</option>
            <option value="running">Running</option>
            <option value="physical_activity">Physical Activity</option>
            <option value="nature">Nature</option>
            <option value="other_activities">Other Activities</option>
          </Form.Control>
        </Form.Group>
        {errors.sport?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </Form.Group>
        {errors.image?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <div className={styles.ButtonGroup}>
          <Button className={`${styles.Button} ${styles.CreateButton}`} type="submit">
            Save
          </Button>
          <Button className={`${styles.Button} ${styles.CancelButton}`} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ChallengeEditForm;
