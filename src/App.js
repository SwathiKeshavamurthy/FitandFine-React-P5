import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import styles from './App.module.css';
import { Container } from 'react-bootstrap';

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
            <Route path="/signin" render={() => <h1>Sign In</h1>} />
            <Route path="/signup" render={() => <h1>Sign Up</h1>} />
            <Route component={() => <p>Page not found!</p>} />
            
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
