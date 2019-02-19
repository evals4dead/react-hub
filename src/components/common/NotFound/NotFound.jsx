import React from 'react';
import classnames from 'classnames/bind';
import styles from './NotFound.scss';

const cx = classnames.bind(styles);

const NotFound = () => {
  return <div className={cx('NotFoundWrapper')}>404 - NotFound</div>;
};

export default NotFound;
