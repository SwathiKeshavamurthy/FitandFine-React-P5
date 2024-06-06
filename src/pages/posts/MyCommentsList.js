import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import Post from './Post';
import NoResults from '../../assets/noresults.JPG';
import PopularProfiles from '../profiles/PopularProfiles';
import appStyles from '../../App.module.css';
import styles from '../../styles/PostsPage.module.css';
import { fetchMoreData } from '../../utils/utils';

function MyCommentsList() {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/posts/?commented_by_me=True&search=${query}`
        );
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                dataLength={posts.results.length}
                next={() => fetchMoreData(posts, setPosts)}
                hasMore={!!posts.next}
                loader={<Asset spinner />}
              >
                {posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
              </InfiniteScroll>
            ) : (
              <Container className={appStyles.Content}>
                <Asset
                  src={NoResults}
                  message="You haven't commented on any posts yet."
                />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default MyCommentsList;
