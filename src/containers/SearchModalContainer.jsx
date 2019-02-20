import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { baseActions } from 'store/modules/base';
import ModalWrapper from 'components/common/ModalWrapper';
import SearchBar from 'components/search/SearchBar';
import { searchActions } from '../store/modules/search';
import axios from 'axios';

class SearchModalContainer extends Component {
  hideModal = () => {
    const { BaseActions, SearchActions } = this.props;
    BaseActions.hideModal({ name: 'search' });
    SearchActions.initialize();
  };

  changeInput = e => {
    const { SearchActions } = this.props;
    SearchActions.changeInput({ value: e.target.value });
  };

  searchUser = async () => {
    const { SearchActions, input, user } = this.props;
    // try {
    //   await SearchActions.searchUser({ username: input, page: user.page, perPage: user.perPage });
    //   this.hideModal();
    // } catch (e) {
    //   console.log(e);
    // }

    try {
      //   const response = await fetch(`https://api.github.com/search/users?q=eval&page=1&per_page=30`, {
      //     method: 'GET',
      // headers: {
      //   Authorization: `bearer ${localStorage.getItem('access_token')}`,
      //   'Content-Type': 'application/json',
      // },
      //   });
      // .then(response => {
      //   console.log(response.headers.values());
      //   return response.json();
      // })
      // .then(data => {
      //   console.log(data);
      // });

      await SearchActions.searchUser({ username: input, page: user.page, perPage: user.perPage });

      //   const response = await axios.get('https://api.github.com/search/users?q=eval&page=1&per_page=30', {
      //     headers: {
      //       Authorization: `bearer ${localStorage.getItem('access_token')}`,
      //       'Content-Type': 'application/json',
      //     },
      //   });

      //   console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { visible, input } = this.props;
    const { hideModal, changeInput, searchUser } = this;
    return (
      <ModalWrapper visible={visible} hideModal={hideModal}>
        <SearchBar onChangeInput={changeInput} input={input} onSearchUser={searchUser} />
      </ModalWrapper>
    );
  }
}

export default connect(
  ({ base, search }) => ({
    visible: base.modal.visible.search,
    input: search.input,
    user: search.user,
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch),
  })
)(SearchModalContainer);
