import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
const cx = classNames.bind(styles);
function SuggestedAccounts({ label, data = [], followers = [], isSeeAll, handleSeeAll, handleSeeLess }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            {followers.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            {isSeeAll ? (
                <p className={cx('more-btn')} onClick={() => handleSeeLess()}>
                    See less
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={() => handleSeeAll()}>
                    See all
                </p>
            )}
        </div>
    );
}
SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
