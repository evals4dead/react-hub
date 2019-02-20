import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalWrapper from 'components/common/ModalWrapper';
import { baseActions } from 'store/modules/base';

class SearchModalContainer extends Component {
  hideModal = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal({ name: 'search' });
  };

  render() {
    const { visible, children } = this.props;
    const { hideModal } = this;
    return (
      <ModalWrapper visible={visible} hideModal={hideModal}>
        {children}
      </ModalWrapper>
    );
  }
}

export default connect(
  ({ base }) => ({
    visible: base.modal.visible.search,
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(SearchModalContainer);
