import React from 'react';
import {
    ChasingDots
} from 'better-react-spinkit';
import classnames from 'classnames/bind';
import styles from './LoadingSpinner.scss';

const cx = classnames.bind(styles);

const LoadingSpinner = () => {
    return (
        <div className={cx('SpinnerWrapper')}>
            <ChasingDots size={30} color="white" />
        </div>
    );
};

export default LoadingSpinner;