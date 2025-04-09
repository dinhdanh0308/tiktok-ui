import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './LayoutCommentContainer.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import CommentList from '~/components/CommentList';
const cx = classNames.bind(styles);
function LayoutCommentContainer({ data }) {
    const { user } = data;
    const [activeComment, setActiveComment] = useState(true);
    const [activeVideo, setActiveVideo] = useState(false);
    const videoLinkRef = useRef();

    useEffect(() => {
        fetch('https://tiktok.fullstack.edu.vn/api/videos/1/comments')
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    }, []);

    const hanldeClickCopy = () => {
        navigator.clipboard.writeText(videoLinkRef.current.innerHTML);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('description-content')}>
                <div className={cx('info-container')}>
                    <Image className={cx('image-user')} src={user.avatar} />
                    <div className={cx('name-container')}>
                        <div className={cx('user-nickname')}>{user.nickname}</div>
                        <div className={cx('user-name')}>{user.first_name + ' ' + user.last_name}</div>
                    </div>
                    <Button small primary>
                        Follow
                    </Button>
                </div>
                <div className={cx('user-text')}>{data.description}</div>
            </div>
            <div className={cx('copy-link')}>
                <p ref={videoLinkRef} className={cx('video-link')}>
                    {data.file_url}
                </p>
                <button onClick={hanldeClickCopy} className={cx('copy')}>
                    Sao chép liên kết
                </button>
            </div>
            <div className={cx('tab-menu-container')}>
                <div
                    onClick={(e) => {
                        setActiveComment(true);
                        setActiveVideo(false);
                    }}
                    className={cx('tab-item', { active: activeComment })}
                >
                    Bình luận
                </div>
                <div
                    onClick={(e) => {
                        setActiveComment(false);
                        setActiveVideo(true);
                    }}
                    className={cx('tab-item', { active: activeVideo })}
                >
                    Video của nhà sáng tạo
                </div>
            </div>
            <div className={cx('border-div')}>
                <CommentList />
            </div>
        </div>
    );
}
LayoutCommentContainer.propTypes = {
    data: PropTypes.object.isRequired,
};

export default LayoutCommentContainer;
