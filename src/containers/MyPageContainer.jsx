import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { repoActions } from 'store/modules/repo';
import Title from 'components/common/Title';
import RepoListWrapper from 'components/repo/RepoListWrapper';
import RepoList from 'components/repo/RepoList';
import LoadingSpinner from 'components/common/LoadingSpinner';

class MyPageContainer extends Component {
  componentDidMount() {
    this.getRepoList();
  }

  getRepoList = async () => {
    const { RepoActions } = this.props;
    try {
      await RepoActions.repoList({ accessToken: localStorage.getItem('accessToken') });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { repoList } = this.props;
    if (repoList.length === 0) return <LoadingSpinner />;
    return (
      <RepoListWrapper>
        <Title title="My repo list" />
        <RepoList list={repoList} />
      </RepoListWrapper>
    );
  }
}

export default connect(
  ({ repo }) => ({
    repoList: repo.list,
  }),
  dispatch => ({
    RepoActions: bindActionCreators(repoActions, dispatch),
  })
)(MyPageContainer);
