import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { userActions } from 'store/modules/user';


class Base extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.handleChange);
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken && !this.props.location.pathname.includes('/auth/login')) {
      window.location.replace('/auth/login');
      return;
    }
    
    this.getMyInfo();
  }

  handleChange = location => {
    console.log('Route has changed!');
    console.log(location);
    window.shouldCancel = false;
  };

  componentWillUnmount() {
    this.unlisten();
  }

  getMyInfo = async () => {
    const { UserActions, location } = this.props;

    try {
      await UserActions.getMyInfo();
      if(localStorage.getItem('access_token') && location.pathname.includes('/auth/login')) {
        this.props.history.push(`/@${this.props.user.login}`);
        return;
      }
    } catch (e) {
      console.log(e);
      localStorage.removeItem('access_token');
      this.props.history.push('/auth/login');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      if (this.props.user) {
        window.location.replace(`/@${this.props.user.login}`);
        // this.props.history.push(`/@${this.props.user.login}`);
      } else {
        window.location.replace(`/@${this.props.username}`);
        // this.props.history.push(`/@${this.props.username}`);
      }
    }

    // if (prevProps.repoError !== this.props.repoError) {
    //   const { status } = this.props.repoError;
    //   if (status === 404 && this.props.user) {
    //     this.props.history.push('/notfound');
    //   }
    // }
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
      repoError: repo.error
    }),
    dispatch => ({
      UserActions: bindActionCreators(userActions, dispatch)
    })
  )(Base)
);
