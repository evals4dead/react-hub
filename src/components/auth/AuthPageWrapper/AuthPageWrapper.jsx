import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './AuthPageWrapper.scss';

const cx = classnames.bind(styles);

class AuthPageWrapper extends Component {

    render() {
        return (
            <div className={cx('auth-page-wrapper')}>
                {this.props.children}
            </div>
        );
    }
}

export default AuthPageWrapper;