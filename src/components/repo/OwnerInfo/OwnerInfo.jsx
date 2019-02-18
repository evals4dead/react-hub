import React from 'react';
import classnames from 'classnames/bind';
import styles from './OwnerInfo.scss';

const cx = classnames.bind(styles);

const OwnerInfo = ({ owner }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={owner.html_url} className={cx('OwnerInfoWrapper')}>
      <img src={owner.avatar_url} alt={owner.avatar_url} />
      <div className={cx('name')}>{owner.login}</div>
    </a>
  );
};

export default OwnerInfo;
