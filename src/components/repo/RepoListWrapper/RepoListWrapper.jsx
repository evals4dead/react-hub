import React from 'react';
import classnames from 'classnames/bind';
import styles from './RepoListWrapper.scss';

const cx = classnames.bind(styles);

const RepoListWrapper = ({ children }) => {
  return <div className={cx('RepoListWrapper')}>{children}</div>;
};

export default RepoListWrapper;
