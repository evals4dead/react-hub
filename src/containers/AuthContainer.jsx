import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { authActions } from 'store/modules/auth';
import { userActions } from 'store/modules/user';
import LoginButton from 'components/auth/LoginButton';
import AuthPageWrapper from 'components/auth/AuthPageWrapper';
import LoadingSpinner from 'components/common/LoadingSpinner';

class AuthContainer extends Component {
  state = {
    processing: false,
  };

  componentDidMount() {
    const {
      location: { pathname, search },
    } = this.props;

    if (pathname === '/auth/login/processing') {
      console.log('processing...');
      this.setState({
        processing: true,
      });
      const code = search.split('?code=')[1];

      if (code) {
        console.log('process');
        this.getAccessToken({code});
      }
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.user !== this.props.user && this.props.user !== null) {
  //     this.props.history.push(`/${this.props.user.login}`);
  //   }
  // }

  getAccessToken = async ({ code }) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.getAccessToken({ code });
      localStorage.setItem('access_token', this.props.accessToken);
      console.log('getAccessToken');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.processing) {
      return <LoadingSpinner />;
    }
    return (
      <AuthPageWrapper>
        <LoginButton />
      </AuthPageWrapper>
    );
  }
}

export default withRouter(
  connect(
    ({ auth, user }) => ({
      accessToken: auth.accessToken,
      user: user.user,
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      UserActions: bindActionCreators(userActions, dispatch),
    })
  )(AuthContainer)
);
