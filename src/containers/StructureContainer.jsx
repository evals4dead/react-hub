import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { authActions } from 'store/modules/auth';
import WholeWrapper from 'components/common/WholeWrapper';
import { baseActions } from '../store/modules/base';

class StructureContainer extends Component {
  logout = async () => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.logout();
      localStorage.removeItem('access_token');
    } catch (e) {
      console.log(e);
    }
  };

  goToMyRepo = () => {
    const { history, user } = this.props;
    history.push(`/@${user.login}`);
  };

  openSearchModal = () => {
    const { BaseActions } = this.props;
    BaseActions.openModal({ name: 'search' });
  };

  render() {
    const { logout, goToMyRepo, openSearchModal } = this;
    return (
      <WholeWrapper onLogout={logout} goToMyRepo={goToMyRepo} openSearchModal={openSearchModal}>
        {this.props.children}
      </WholeWrapper>
    );
  }
}

export default withRouter(
  connect(
    ({ user }) => ({
      user: user.user,
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      BaseActions: bindActionCreators(baseActions, dispatch),
    })
  )(StructureContainer)
);
