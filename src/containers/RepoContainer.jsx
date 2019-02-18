import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { repoActions } from 'store/modules/repo';

class RepoContainer extends Component {
  componentDidMount() {
    this.getRepo();
  }

  getRepo = async () => {
    const { RepoActions, username, reponame } = this.props;

    try {
      await RepoActions.getRepo({ accessToken: localStorage.getItem('accessToken'), username, reponame });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return <div>RepoContainer</div>;
  }
}

export default connect(
  ({ user }) => ({
    user: user.user,
  }),
  dispatch => ({
    RepoActions: bindActionCreators(repoActions, dispatch),
  })
)(RepoContainer);
