import React from 'react';
import classnames from 'classnames/bind';
import RepoItem from 'components/repo/RepoItem';
import styles from './RepoList.scss';

const cx = classnames.bind(styles);

const RepoList = ({ list }) => {
  const repoList = list.map(item => <RepoItem key={item.id} repo={item} />);

  return <div className={cx('RepoList')}>{repoList}</div>;
};

export default RepoList;
