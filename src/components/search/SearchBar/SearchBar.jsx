import React from 'react';
import classnames from 'classnames/bind';
import styles from './SearchBar.scss';

const cx = classnames.bind(styles);

const SearchBar = ({ onChangeInput, input, onSearchUser }) => {
  const searchUser = e => {
    if (e.key === 'Enter') {
      onSearchUser();
    }
  };

  return (
    <div className={cx('SearchBarWrapper')}>
      <input type="text" value={input} onChange={onChangeInput} onKeyPress={searchUser} />
    </div>
  );
};

export default SearchBar;
