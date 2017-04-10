import React from 'react';
import styles from './styles';

const SignInPage = () => (<div style={styles.signInPageWrapper}>
  <div className="card-panel z-depth-4">
    <h1>trello common news feed</h1>
    <h5>
      <a href="/auth/trello">
        sign in with trello
      </a>
    </h5>
  </div>
</div>);

export default SignInPage;
