import React from 'react';

import classnames from 'classnames/bind';
import styles from './RepoItem.scss';

const cx = classnames.bind(styles);

const RepoItem = ({ repo }) => {
  return <div className={cx('RepoItem')}>{repo.name}</div>;
};

export default RepoItem;
