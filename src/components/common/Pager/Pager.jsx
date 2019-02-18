import React from 'react';
import classnames from 'classnames/bind';
import debounce from 'lodash/debounce';
import styles from './Pager.scss';

const cx = classnames.bind(styles);

const Pager = ({ pagingInfo, onHover, onSelect }) => {
  return (
    <div className={cx('Pager')}>
      <div className={cx('PagerButton')}>prev</div>
      <div className={cx('PerPage')}>
        <div
          className={cx('Selector')}
          onMouseEnter={e => onHover({ hovered: true })}
          onMouseLeave={e => {
            debounce(() => onHover({ hovered: false }), 500);
          }}
        >
          <div className={cx('Item', pagingInfo.perPage.visible === 10 && 'visible')}>10</div>
          <div className={cx('Item', pagingInfo.perPage.visible === 15 && 'visible')}>15</div>
          <div className={cx('Item', pagingInfo.perPage.visible === 20 && 'visible')}>20</div>
        </div>
        <div
          className={cx('PerPageItems', pagingInfo.perPage.hovered && 'visible')}
          onMouseEnter={e => onHover({ hovered: true })}
          onMouseLeave={e => onHover({ hovered: false })}
        >
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
      </div>
      <div className={cx('PagerButton', 'Next')}>next</div>
    </div>
  );
};

export default Pager;
