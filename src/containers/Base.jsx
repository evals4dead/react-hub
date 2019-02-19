import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { userActions } from '../store/modules/user';

class Base extends React.Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.props.history.push('/auth/login');
      return;
    }

    this.getMyInfo();
  }

  getMyInfo = async () => {
    const { UserActions } = this.props;

    try {
      await UserActions.getMyInfo();
    } catch (e) {
      console.log(e);
      this.props.history.push('/auth/login');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      if (this.props.user) {
        this.props.history.push(`/${this.props.user.login}`);
      } else {
        this.props.history.push(`/${this.props.username}`);
      }
    }

    if (prevProps.repoError !== this.props.repoError) {
      const { status } = this.props.repoError;
      if (status === 404 && this.props.user) {
        this.props.history.push('/notfound');
      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(
  connect(
    ({ auth, user, repo }) => ({
      loggedIn: auth.loggedIn,
      username: auth.username,
      user: user.user,
      repoError: repo.error,
    }),
    dispatch => ({
      UserActions: bindActionCreators(userActions, dispatch),
    })
  )(Base)
);
