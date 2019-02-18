import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './RepoItem.scss';

const cx = classnames.bind(styles);

const RepoItem = ({ repo }) => {
  return (
    <Link to={`/${repo.owner.login}/${repo.name}`} className={cx('RepoItem')}>
      {repo.name}
    </Link>
  );
};

export default RepoItem;
