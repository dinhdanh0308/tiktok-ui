import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar} alt=""></img>
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </header>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{data.first_name + ' ' + data.last_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers_count} </strong>
                    <span className={cx('label')}>Followers </span>
                    <strong className={cx('value')}>{data.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
