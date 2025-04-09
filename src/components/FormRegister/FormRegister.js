import classNames from 'classnames/bind';
import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './FormRegister.module.scss';
import PopperForm from '../PopperForm';
import LoginModal from '../LoginModal';

const cx = classNames.bind(styles);
function FormRegister({ items, setOpenSignUp, setOpenLogin }) {
    const [history, setHistory] = useState();
    const [loginModal, setLoginModal] = useState(false);

    const refWapperPopper = useRef();

    const handleTurnOn = () => {
        if (items.bottomLink === 'Đăng ký') {
            setOpenLogin(false);
            setOpenSignUp(true);
        } else {
            setOpenLogin(true);
            setOpenSignUp(false);
        }
    };

    return (
        <PopperForm handleTurnOn={handleTurnOn} data={items} setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp}>
            <div className={cx('options')}>
                {items.items.map((item, index) => {
                    const isParent = !!item.children;
                    const active = item.active;
                    return (
                        <div
                            onClick={() => {
                                if (isParent) {
                                    setHistory(item.children);
                                    setLoginModal(true);
                                }
                            }}
                            key={index}
                            className={cx('items', { active })}
                        >
                            <i className={cx('icon')}>{item.icon}</i>
                            <p className={cx('title')}>{item.title}</p>
                        </div>
                    );
                })}
            </div>
            <div className={cx('agreeme')}>
                <div className={cx('text')}>
                    Bằng việc tiếp tục với tài khoản có vị trí tại <Link className={cx('link')}>Vietnam</Link>, bạn đồng
                    ý với <Link className={cx('link')}>Điều khoản Sử dụng</Link>, đồng thời xác nhận rằng bạn đã đọc{' '}
                    <Link className={cx('link')}>Chính sách Quyền riêng tư</Link> của chúng tôi.
                </div>
            </div>
            {loginModal ? (
                <PopperForm
                    handleTurnOn={handleTurnOn}
                    data={history}
                    setOpenLogin={setOpenLogin}
                    setOpenSignUp={setOpenSignUp}
                >
                    <LoginModal data={history} />
                </PopperForm>
            ) : (
                <div></div>
            )}
        </PopperForm>
    );
}

export default memo(FormRegister);
