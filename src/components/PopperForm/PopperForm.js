import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import styles from './PopperForm.module.scss';

const cx = classNames.bind(styles);
function PopperForm({ setOpenLogin, setOpenSignUp, children, data, handleTurnOn }) {
    const background = data.noBackground;
    return (
        <div className={cx('wrapper', { background })}>
            <div className={cx('container')}>
                <div className={cx('close-btn')}>
                    <FontAwesomeIcon
                        icon={faClose}
                        onClick={() => {
                            setOpenLogin(false);
                            setOpenSignUp(false);
                        }}
                    />
                </div>
                <h3 className={cx('header')}>{data.header}</h3>
                {children}
                <div className={cx('footer')}>
                    <p className={cx('text-bottom')}>{data.textBottom} </p>
                    <a onClick={handleTurnOn} className={cx('link-bottom')}>
                        {data.bottomLink}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PopperForm;
