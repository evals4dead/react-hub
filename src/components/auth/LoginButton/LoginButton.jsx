import React from 'react';
import classnames from 'classnames/bind';
import styles from './LoginButton.scss';

const cx = classnames.bind(styles);

const LoginButton = () => {
  const handleClickLoginButton = () => {
    window.location.replace(
      `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    );
  };

  return (
    <div className={cx('login-button')} onClick={handleClickLoginButton}>
      GITHUB LOGIN
    </div>
  );
};

export default LoginButton;
