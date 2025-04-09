import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './LoginModal.module.scss';
import Button from '../Button';
import { HidePassWordIcon, PassWordIcon } from '../Icons';

const cx = classNames.bind(styles);
function LoginModal({ data }) {
    const [showPassword, setShowPassword] = useState(true);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRePassword, setInputRePassword] = useState('');
    const formMessageRef1 = useRef();
    const formMessageRef2 = useRef();
    const formMessageRef3 = useRef();

    const handleClickSubmit = (e) => {
        e.preventDefault();

        var boolEmail = false;
        var boolPassWord = false;
        var boolRePassWord = false;
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!data.rePassword) {
            if (!regex.test(inputEmail)) {
                formMessageRef1.current.innerText = 'Truong nay phai la email';
            } else {
                formMessageRef1.current.innerText = '';
                boolEmail = true;
            }
            if (inputPassword.length < 6) {
                formMessageRef2.current.innerText = 'Vui long nhap toi thieu 6 ky tu';
            } else {
                formMessageRef2.current.innerText = '';
                boolPassWord = true;
            }

            if (boolEmail && boolPassWord) {
                e.target.submit();
            }
        } else {
            if (!regex.test(inputEmail)) {
                formMessageRef1.current.innerText = 'Truong nay phai la email';
            } else {
                formMessageRef1.current.innerText = '';
                boolEmail = true;
            }
            if (inputPassword.length < 6) {
                formMessageRef2.current.innerText = 'Vui long nhap toi thieu 6 ky tu';
            } else {
                formMessageRef2.current.innerText = '';
                boolPassWord = true;
            }

            if (inputPassword !== inputRePassword) {
                formMessageRef3.current.innerText = 'Gia tri nhap vao khong chinh xac';
            } else {
                formMessageRef3.current.innerText = '';
                boolRePassWord = true;
            }
            if (boolEmail && boolPassWord && boolRePassWord) {
                e.target.submit();
            }
        }
    };

    const inputRef = useRef();

    const handlePassWord = (e) => {
        if (showPassword === true) {
            setShowPassword(false);
            inputRef.current.type = 'text';
        } else {
            setShowPassword(true);
            inputRef.current.type = 'password';
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('description')}>
                Email hoặc TikTok ID
                <a className={cx('link')}>Điện thoại</a>
            </div>
            <form onSubmit={(e) => handleClickSubmit(e)}>
                <div className={cx('container')}>
                    <input
                        defaultValue={inputEmail}
                        placeholder="Email hoặc TikTok ID"
                        onChange={(e) => setInputEmail(e.target.value)}
                        type="text"
                        name="username"
                        className={cx('input')}
                    />
                </div>
                <p ref={formMessageRef1} className={cx('form-message')}></p>
                <div className={cx('container')}>
                    <input
                        ref={inputRef}
                        onChange={(e) => setInputPassword(e.target.value)}
                        defaultValue={inputPassword}
                        placeholder="Mật khẩu"
                        type="password"
                        autoComplete="new-password"
                        className={cx('input')}
                    />
                    <div onClick={(e) => handlePassWord(e)} className={cx('icon')}>
                        {showPassword ? <HidePassWordIcon /> : <PassWordIcon />}
                    </div>
                </div>
                <p ref={formMessageRef2} className={cx('form-message')}></p>

                {data.rePassword ? (
                    <div className={cx('wrapper-container')}>
                        <div className={cx('container')}>
                            <input
                                // ref={inputRef}
                                onChange={(e) => setInputRePassword(e.target.value)}
                                defaultValue={inputRePassword}
                                placeholder="Nhập lại mật khẩu"
                                type="password"
                                autoComplete="new-password"
                                className={cx('input')}
                            />
                            <div onClick={(e) => handlePassWord(e)} className={cx('icon')}>
                                {showPassword ? <HidePassWordIcon /> : <PassWordIcon />}
                            </div>
                        </div>
                        <p ref={formMessageRef3} className={cx('form-message')}></p>
                    </div>
                ) : (
                    <div></div>
                )}

                {!data.rePassword ? <p className={cx('forgot-password')}>Quên mật khẩu?</p> : <div></div>}

                <Button
                    disable={!!!inputEmail || !!!inputPassword}
                    type="submit"
                    className={cx('button')}
                    large
                    primary
                >
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}

export default LoginModal;
