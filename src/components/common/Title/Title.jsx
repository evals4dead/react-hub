import React from 'react';
import classnames from 'classnames/bind';
import styles from './Title.scss';

const cx = classnames.bind(styles);

const Title = ({ title }) => {
  return <div className={cx('TitleWrapper')}>{title}</div>;
};

export default Title;
