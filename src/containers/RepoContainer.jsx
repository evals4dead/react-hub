import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { repoActions } from 'store/modules/repo';
import RepoListWrapper from 'components/repo/RepoListWrapper';
import Title from 'components/common/Title';
import OwnerInfo from 'components/repo/OwnerInfo';
import LoadingSpinner from 'components/common/LoadingSpinner';
import RepoInfo from 'components/repo/RepoInfo';

class RepoContainer extends Component {
  componentDidMount() {
    this.getRepo();
  }

  componentWillUnmount() {
    const { RepoActions } = this.props;
    RepoActions.initializeRepo();
  }

  getRepo = async () => {
    const { RepoActions, username, reponame } = this.props;

    try {
      await RepoActions.getRepo({ username, reponame });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { username, reponame, repo } = this.props;
    if (!repo) return <LoadingSpinner />;
    return (
      <RepoListWrapper>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <Title title={`${username}/${reponame}`} />
        </a>
        <OwnerInfo owner={repo.owner} />
        <RepoInfo repo={repo} />
      </RepoListWrapper>
    );
  }
}

export default connect(
  ({ user, repo }) => ({
    user: user.user,
    repo: repo.repo,
  }),
  dispatch => ({
    RepoActions: bindActionCreators(repoActions, dispatch),
  })
)(RepoContainer);
