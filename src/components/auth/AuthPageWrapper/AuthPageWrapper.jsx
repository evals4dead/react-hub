import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './AuthPageWrapper.scss';

const cx = classnames.bind(styles);

class AuthPageWrapper extends Component {

    componentDidMount() {
        const { location: { pathname, search } } = this.props;
        if(pathname === '/login/processing') {
            console.log(search.split('?code=')[1]);
            window.close();
        }
    }

    render() {
        return (
            <div className={cx('auth-page-wrapper')}>
                {this.props.children}
            </div>
        );
    }
}

export default AuthPageWrapper;