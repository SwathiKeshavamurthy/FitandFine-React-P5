import React, { useState } from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    image_filter,
    tags,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      toast.success('Post deleted successfully.');
      history.push('/');
    } catch (err) {
      toast.error('Failed to delete post.');
    }
    handleClose();
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      toast.error('Failed to like post.');
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      toast.error('Failed to unlike post.');
    }
  };

  return (
    <>
      <Card className={styles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleShow}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title} className={styles[image_filter]} />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {content && <Card.Text>{content}</Card.Text>}
          {tags && (
            <div className="text-center">
              <small>{tags}</small>
            </div>
          )}
          <div className={styles.PostBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can&apos;t like your own post!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            ) : like_id ? (
              <span
                role="button"
                tabIndex={0}
                onClick={handleUnlike}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUnlike();
                }}
                className={`fas fa-heart ${styles.Heart}`}
              />
            ) : currentUser ? (
              <span
                role="button"
                tabIndex={0}
                onClick={handleLike}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLike();
                }}
                className={`far fa-heart ${styles.HeartOutline}`}
              />
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            )}
            {likes_count}
            <Link to={`/posts/${id}`}>
              <i className="far fa-comments" />
            </Link>
            {comments_count}
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
