import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import styles from './App.module.css';
import { Container } from 'react-bootstrap';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";



function App() {
  return (
    <Router>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/" render={() => <h1>Home Page</h1>} />
            <Route path="/challenges" render={() => <h1>Challenges Page</h1>} />
            <Route path="/collaborate" render={() => <h1>About & Collaborate</h1>} />
            <Route path="/signin" render={() => <SignInForm />} />
            <Route path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/posts/postcreate" render={() => <PostCreateForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route component={() => <p>Page not found!</p>} /> 
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
