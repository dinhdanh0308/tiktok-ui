import classNames from 'classnames/bind';
import { useState } from 'react';
import { FollowButton, TickFollowedButton } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './/ListActionUser.module.scss';
import Image from '~/components/Image';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import MenuShare from '~/components/MenuShare';

const cx = classNames.bind(styles);
function ListActionUser({ data, user, moreMenu, menu, className }) {
    const [tickFollowed, setTickFollowed] = useState(true);
    const [liked, setLiked] = useState(true);
    const [saved, setSaved] = useState(true);
    const [countLike, setCountLike] = useState(data.likes_count);
    const [countSave, setCountSave] = useState(0);
    const [menuShareItem, setMenuShareItem] = useState(false);
    const [more, setMore] = useState(true);

    const renderPreview = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <AccountPreview data={user} />
            </PopperWrapper>
        </div>
    );

    const renderShare = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <MenuShare more={more} onMore={handleMore} items={menuShareItem ? moreMenu : menu} />
            </PopperWrapper>
        </div>
    );
    const handleMore = () => {
        setMenuShareItem(true);
        setMore(false);
    };

    return (
        <div className={cx('action-list', { className })}>
            <div>
                <HeadlessTippy
                    interactive
                    delay={[800, 500]}
                    offset={[-12, 20]}
                    placement="bottom-start"
                    render={renderPreview}
                >
                    <Image className={cx('user-avatar')} src={user.avatar} alt={user.first_name}></Image>
                </HeadlessTippy>
            </div>

            {tickFollowed ? (
                <div onClick={() => setTickFollowed(false)}>
                    <FollowButton className={cx('follow')}></FollowButton>
                </div>
            ) : (
                <div onClick={() => setTickFollowed(true)}>
                    <TickFollowedButton className={cx('followed')} />
                </div>
            )}

            <button className={cx('action-item')}>
                {liked ? (
                    <div
                        onClick={() => {
                            setLiked(!liked);
                            setCountLike(data.likes_count + 1);
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setLiked(!liked);
                            setCountLike(data.likes_count);
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} className={cx('icon-active-red')} />
                    </div>
                )}
                <span className={cx('number')}>{countLike}</span>
            </button>
            <button className={cx('action-item')}>
                <FontAwesomeIcon className={cx('icon')} icon={faCommentDots} />
                <span className={cx('number')}>{data.comments_count}</span>
            </button>

            <button className={cx('action-item')}>
                {saved ? (
                    <div
                        onClick={() => {
                            setSaved(!saved);
                            setCountSave(countSave + 1);
                        }}
                    >
                        <FontAwesomeIcon className={cx('icon')} icon={faBookmark} />
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setSaved(!saved);
                            setCountSave(countSave - 1);
                        }}
                    >
                        <FontAwesomeIcon className={cx('icon-active-yellow')} icon={faBookmark} />
                    </div>
                )}
                <span className={cx('number')}>{countSave}</span>
            </button>
            <HeadlessTippy
                delay={[500, 600]}
                placement="top-start"
                offset={[-30, 10]}
                interactive
                render={renderShare}
                onHide={() => {
                    setMenuShareItem(false);
                    setMore(true);
                }}
            >
                <button className={cx('action-item')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                    <span className={cx('number')}>{data.shares_count}</span>
                </button>
            </HeadlessTippy>
        </div>
    );
}
ListActionUser.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default ListActionUser;
