import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Challenge from './Challenges';
import Asset from '../../components/Asset';
import styles from '../../styles/Challenges.module.css';
import NoResults from '../../assets/noresults.JPG';

function Challenges() {
  const [challenges, setChallenges] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await axiosReq.get('/challenges/');
        setChallenges(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <Container>
      <h1 className={styles.Header}>Challenges</h1>
      <Row>
        {hasLoaded ? (
          challenges.results.length ? (
            challenges.results.map((challenge) => (
              <Col key={challenge.id} md={6} lg={4}>
                <Challenge {...challenge} />
              </Col>
            ))
          ) : (
            <Asset src={NoResults} message="No Challenges Found" />
          )
        ) : (
          <Asset spinner />
        )}
      </Row>
    </Container>
  );
}

export default Challenges;
