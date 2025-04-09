import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLink, faMailBulk, faPaperPlane, faRepeat } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './ContentCenter.module.scss';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import VideoUser from './VideoUser';
import ListActionUser from './ListActionUser';
import { useState } from 'react';

const cx = classNames.bind(styles);
const SHARE_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faRepeat} />,
        title: 'Đăng lại',
        to: '/',
        color: 'yellow',
    },
    {
        icon: <FontAwesomeIcon icon={faCode} />,
        title: 'Nhúng',
        to: '/',
        color: 'gray',
    },
    {
        icon: <FontAwesomeIcon icon={faPaperPlane} />,
        title: 'Gửi đến bạn bè',
        to: '/',
        color: 'primary',
    },
    {
        icon: <FontAwesomeIcon icon={faFacebook} />,
        title: 'Chia sẻ với FaceBook',
        to: '/',
        color: 'blue',
    },
    {
        icon: <FontAwesomeIcon icon={faLink} />,
        title: 'Sao chép liên kết',
        to: '/',
        color: 'primary',
    },
];
function ContentCenter({ data }) {
    const moreMenu = [
        ...SHARE_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faTwitter} />,
            title: 'Chia sẻ với Twitter',
            to: '/',
            color: 'blue',
        },
        {
            icon: <FontAwesomeIcon icon={faMailBulk} />,
            title: 'Chia sẻ với Email',
            to: '/',
            color: 'gray',
        },
        {
            icon: <FontAwesomeIcon icon={faLink} />,
            title: 'Chia sẻ với Pinterest',
            to: '/',
            color: 'primary',
        },
    ];

    const { user } = data;

    return (
        <div className={cx('wrapper')}>
            <VideoUser data={data} user={user} />
            <ListActionUser data={data} user={user} moreMenu={moreMenu} menu={SHARE_ITEMS} />
        </div>
    );
}

ContentCenter.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ContentCenter;
