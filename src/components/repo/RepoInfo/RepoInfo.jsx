import React from 'react';
import classnames from 'classnames/bind';
import styles from './RepoInfo.scss';

const cx = classnames.bind(styles);

const RepoInfo = ({ repo }) => {
  return (
    <div className={cx('RepoInfoWrapper')}>
      <div className={cx('Lang')}>{repo.language}</div>
      <div className={cx('pubPriv', repo.private ? 'red' : 'blue')}>{repo.private ? 'private' : 'public'}</div>
      <div className={cx('fork')}>
        {repo.fork ? 'forked from ' : 'not forked'}
        {repo.fork && (
          <a target="_blank" rel="noopener noreferrer" href={repo.parent.html_url}>
            <img src={repo.parent.owner.avatar_url} alt={repo.parent.owner.avatar_url} />
          </a>
        )}
      </div>
      <div className={cx('Lang')}>watcher: {repo.watchers_count}</div>
      <div className={cx('Lang')}>forks count: {repo.forks_count}</div>
      <div className={cx('Lang')}>license: {repo.license === null ? 'no license' : repo.license.name}</div>
      <div className={cx('Lang')}>default branch: {repo.default_branch}</div>
    </div>
  );
};

export default RepoInfo;
