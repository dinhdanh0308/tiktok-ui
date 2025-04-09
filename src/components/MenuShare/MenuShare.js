import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './MenuShare.module.scss';

const cx = classNames.bind(styles);
function MenuShare({ items = [], onMore, more }) {
    return (
        <div className={cx('wrapper')}>
            {items.map((item, index) => (
                <div key={index}>
                    <Link to={item.to} className={cx('item')}>
                        <i className={cx('icon', item.color)}>{item.icon}</i>
                        <p className={cx('title')}>{item.title}</p>
                    </Link>
                </div>
            ))}
            {more ? <FontAwesomeIcon className={cx('more')} onClick={onMore} icon={faChevronDown} /> : <div></div>}
        </div>
    );
}

export default MenuShare;
