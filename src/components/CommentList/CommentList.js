import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Image from '../Image';
import styles from './CommentList.module.scss';
import config from '~/config';
import { LikeIcon } from '../Icons';
const cx = classNames.bind(styles);
function CommentList() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Image src="" className={cx('avatar')} />
                <div className={cx('content-container')}>
                    <Link className={cx('nick-name')} to={`/profile/phanhxg`}>
                        Phanh xg
                    </Link>
                    <div className={cx('comment')}>Teem thaoxinh dau roi</div>
                </div>

                <LikeIcon className={cx('action')} />
            </div>

            <div className={cx('reply')}>1/1/2002</div>
        </div>
    );
}

export default CommentList;
