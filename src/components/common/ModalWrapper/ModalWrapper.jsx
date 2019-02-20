import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import classnames from 'classnames/bind';
import styles from './ModalWrapper.scss';

const cx = classnames.bind(styles);

class ModalWrapper extends React.Component {
  state = {
    animate: false,
  };

  startAnimation = () => {
    this.setState({
      animate: true,
    });

    setTimeout(() => {
      this.setState({
        animate: false,
      });
    }, 300);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.startAnimation();
    }
  }

  render() {
    const { visible, hideModal } = this.props;
    const { animate } = this.state;

    const animation = animate || visible ? 'visible' : 'hidden';
    console.log(animation);
    return (
      <div className={cx('ModalWrapper', animation)}>
        <FaTimesCircle className={cx('closeButton')} onClick={hideModal} />
      </div>
    );
  }
}

export default ModalWrapper;
