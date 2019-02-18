import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { repoActions } from 'store/modules/repo';
import Title from 'components/common/Title';
import RepoListWrapper from 'components/repo/RepoListWrapper';
import RepoList from 'components/repo/RepoList';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Pager from 'components/common/Pager';

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

  hoverPerPage = ({ hovered }) => {
    const { RepoActions } = this.props;
    RepoActions.hoverPerPage({ hovered });
  };

  selectPerPage = ({ perPage }) => {
    const { RepoActions } = this.props;
    RepoActions.selectPerPage({ perPage });
  };

  render() {
    const { repoList, pagingInfo } = this.props;
    const { hoverPerPage, selectPerPage } = this;
    if (repoList.length === 0) return <LoadingSpinner />;
    return (
      <RepoListWrapper>
        <Title title="My repo list" />
        <RepoList list={repoList} />
        <Pager pagingInfo={pagingInfo} onHover={hoverPerPage} onSelect={selectPerPage} />
      </RepoListWrapper>
    );
  }
}

export default connect(
  ({ repo }) => ({
    repoList: repo.list,
    pagingInfo: repo.pagingInfo,
  }),
  dispatch => ({
    RepoActions: bindActionCreators(repoActions, dispatch),
  })
)(MyPageContainer);
