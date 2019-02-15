import React from 'react';
import classnames from 'classnames/bind';
import styles from './LoginButton.scss';

const cx = classnames.bind(styles);

const LoginButton = () => {

    const popupCenter = (url, title, w, h) => {
        // get this code from https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
        // Fixes dual-screen position                         Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
    
        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        const newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
    
        // Puts focus on the newWindow
        if (window.focus) newWindow.focus();
    }

    return (
        <div className={cx('login-button')} onClick={() => popupCenter('https://github.com/login/oauth/authorize?scope=user:email&client_id=103c2227f308788bc5c9', 'github login window', 800, 500)}>
            GITHUB LOGIN
        </div>
    );
};

export default LoginButton;