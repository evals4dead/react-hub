import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { repoActions } from 'store/modules/repo';
import { userActions } from 'store/modules/user';
import Title from 'components/common/Title';
import RepoListWrapper from 'components/repo/RepoListWrapper';
import RepoList from 'components/repo/RepoList';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Pager from 'components/common/Pager';

class UserPageContainer extends Component {
  componentDidMount() {
    const {
      pagingInfo: {
        currentPage,
        perPage: { visible },
      },
    } = this.props;
    this.getRepoList({ page: currentPage, perPage: visible });
  }

  getRepoList = async ({ page, perPage }) => {
    const { RepoActions, username } = this.props;
    try {
      await RepoActions.repoList({
        page,
        perPage,
        username,
      });
      this.nextRepoList({ page: page + 1, perPage });
    } catch (e) {
      console.log(e);
    }
  };

  nextRepoList = async ({ page, perPage }) => {
    const { RepoActions, username } = this.props;
    try {
      await RepoActions.nextRepoList({
        page,
        perPage,
        username,
      });
    } catch (e) {
      console.log(e);
    }
  };

  showNextRepoList = () => {
    const {
      RepoActions,
      nextList,
      pagingInfo: {
        currentPage,
        perPage: { visible },
      },
    } = this.props;
    RepoActions.showNextRepoList({ nextList });
    this.nextRepoList({ page: currentPage + 1, perPage: visible });
  };

  handleClickPerPage = ({ clicked }) => {
    const { RepoActions } = this.props;
    RepoActions.clickPerPage({ clicked });
  };

  selectPerPage = ({ perPage }) => {
    const { RepoActions } = this.props;
    RepoActions.selectPerPage({ perPage });
  };

  setPage = ({ page }) => {
    const { RepoActions } = this.props;
    RepoActions.setPage({ page });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pagingInfo.currentPage !== this.props.pagingInfo.currentPage) {
      if (prevProps.pagingInfo.currentPage > this.props.pagingInfo.currentPage) {
        this.getRepoList({ page: this.props.pagingInfo.currentPage, perPage: this.props.pagingInfo.perPage.visible });
      } else {
        this.showNextRepoList();
      }
    }

    if (prevProps.pagingInfo.perPage.visible !== this.props.pagingInfo.perPage.visible) {
      this.getRepoList({ page: 1, perPage: this.props.pagingInfo.perPage.visible });
      this.setPage({ page: 1 });
    }
  }

  render() {
    const { repoList, pagingInfo, nextList, username } = this.props;
    const { handleClickPerPage, selectPerPage, setPage } = this;
    if (repoList.length === 0) return <LoadingSpinner />;
    return (
      <RepoListWrapper>
        <Title title={`${username}'s repo list`} />
        <RepoList list={repoList} />
        <Pager
          pagingInfo={pagingInfo}
          onClickPerPage={handleClickPerPage}
          onSelect={selectPerPage}
          setPage={setPage}
          nextList={nextList}
        />
      </RepoListWrapper>
    );
  }
}

export default connect(
  ({ repo, user }) => ({
    repoList: repo.list,
    pagingInfo: repo.pagingInfo,
    nextList: repo.nextList,
    user: user.user,
  }),
  dispatch => ({
    RepoActions: bindActionCreators(repoActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(UserPageContainer);
