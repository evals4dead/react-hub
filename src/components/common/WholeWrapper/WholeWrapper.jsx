import React from 'react';
import classnames from 'classnames/bind';
import styles from './WholeWrapper.scss';
import Footer from 'components/common/Footer';

const cx = classnames.bind(styles);

const WholeWrapper = ({ children, onLogout, goToMyRepo, openSearchModal }) => {
  return (
    <div className={cx('WholeWrapper')}>
      {children}
      <Footer onLogout={onLogout} goToMyRepo={goToMyRepo} openSearchModal={openSearchModal} />
    </div>
  );
};

export default WholeWrapper;
