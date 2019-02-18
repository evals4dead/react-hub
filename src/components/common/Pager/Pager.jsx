import React from 'react';
import debounce from 'lodash/debounce';
import classnames from 'classnames/bind';
import styles from './Pager.scss';

const cx = classnames.bind(styles);

const Pager = ({ pagingInfo, onClickPerPage, onSelect, setPage }) => {
  return (
    <div className={cx('Pager')}>
      <div
        className={cx('PagerButton', pagingInfo.currentPage === 1 && 'disabled')}
        onClick={debounce(e => pagingInfo.currentPage > 1 && setPage({ page: pagingInfo.currentPage - 1 }), 300)}
      >
        prev
      </div>
      <div className={cx('PerPage')}>
        <div className={cx('PerPageItems', pagingInfo.perPage.clicked && 'visible')}>
          <div className={cx('Item')} onClick={e => onSelect({ perPage: 10 })}>
            10
          </div>
          <div className={cx('Item')} onClick={e => onSelect({ perPage: 15 })}>
            15
          </div>
          <div className={cx('Item')} onClick={e => onSelect({ perPage: 20 })}>
            20
          </div>
        </div>
        <div
          className={cx('Selector')}
          onClick={e => {
            onClickPerPage({ clicked: !pagingInfo.perPage.clicked });
          }}
        >
          <div className={cx('Item', pagingInfo.perPage.visible === 10 && 'visible')}>10</div>
          <div className={cx('Item', pagingInfo.perPage.visible === 15 && 'visible')}>15</div>
          <div className={cx('Item', pagingInfo.perPage.visible === 20 && 'visible')}>20</div>
        </div>
      </div>
      <div
        className={cx('PagerButton', 'Next')}
        onClick={debounce(e => setPage({ page: pagingInfo.currentPage + 1 }), 300)}
      >
        next
      </div>
    </div>
  );
};

export default Pager;
