import React from 'react';
import classnames from 'classnames/bind';
import styles from './Footer.scss';

const cx = classnames.bind(styles);

const Footer = ({onLogout, goToMyRepo}) => {
    return (
        <div className={cx('Footer')}>
            <div className={cx('Menu')} onClick={goToMyRepo}>
                나의 레포지토리
            </div>
            <div className={cx('Menu')}>
                유저 검색
            </div>
            <div className={cx('Menu')} onClick={onLogout}>
                로그아웃
            </div>
        </div>
    );
};

export default Footer;