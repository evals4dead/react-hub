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

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return;
    }

    if (pathname === '/auth/login/processing') {
      this.setState({
        processing: true,
      });
      const code = search.split('?code=')[1];

      if (code) {
        this.loginProcess({ code });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user && this.props.user !== null) {
      this.props.history.push(`/${this.props.user.login}`);
    }
  }

  loginProcess = async ({ code }) => {
    try {
      await this.getAccessToken({ code });
      //   await this.getMyInfo({ accessToken: this.props.accessToken });
      //   this.setLoggedIn();
    } catch (e) {
      console.log(e);
    }
  };

  getAccessToken = async ({ code }) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.getAccessToken({ code });
      localStorage.setItem('accessToken', this.props.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  getMyInfo = async ({ accessToken }) => {
    const { UserActions } = this.props;
    try {
      await UserActions.getMyInfo({ accessToken });
    } catch (e) {
      console.log(e);
    }
  };

  //   setLoggedIn = () => {
  //     const { AuthActions } = this.props;
  //     AuthActions.setLoggedIn({ loggedIn: true });
  //   };

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
