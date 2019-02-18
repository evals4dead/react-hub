import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { userActions } from '../store/modules/user';

class Base extends Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.props.history.push('/login');
      return;
    }

    this.getMyInfo();
  }

  getMyInfo = async () => {
    const { UserActions } = this.props;

    try {
      await UserActions.getMyInfo({ accessToken: localStorage.getItem('accessToken') });
    } catch (e) {
      console.log(e);
      this.props.history.push('/login');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.props.history.push(`/${this.props.user.login}`);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(
  connect(
    ({ auth, user }) => ({
      loggedIn: auth.loggedIn,
      user: user.user,
    }),
    dispatch => ({
      UserActions: bindActionCreators(userActions, dispatch),
    })
  )(Base)
);
