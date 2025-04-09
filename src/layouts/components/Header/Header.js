import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faQrcode,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { IconFacebook, IconGoogle, IconUser, InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import FormRegister from '~/components/FormRegister';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import LoginModal from '~/components/LoginModal';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const LOGIN_ITEMS = {
    header: 'Đăng nhập vào TikTok',
    bottomLink: 'Đăng ký',
    textBottom: 'Bạn không có tài khoản?',
    items: [
        {
            icon: <FontAwesomeIcon icon={faQrcode} />,
            title: 'Sử dụng mã QR',
            active: true,
        },
        {
            icon: <IconUser />,
            title: 'Số điện thoại / Email/ TikTok ID',
            children: {
                header: 'Đăng nhập',
                bottomLink: 'Đăng ký',
                textBottom: 'Bạn không có tài khoản?',
                rePassword: false,
                noBackground: true,
            },
        },
        {
            icon: <IconFacebook />,
            iconFacebook: true,
            title: 'Tiếp tục với Facebook',
            active: true,
        },
        {
            icon: <IconGoogle />,
            title: 'Tiếp tục với Google',
            active: true,
        },
        {
            icon: <IconFacebook />,
            iconFacebook: true,
            title: 'Tiếp tục với Facebook',
            active: true,
        },
        {
            icon: <IconGoogle />,
            title: 'Tiếp tục với Google',
            active: true,
        },
        {
            icon: <IconFacebook />,
            iconFacebook: true,
            title: 'Tiếp tục với Facebook',
            active: true,
        },
    ],
};
const SIGNUP_ITEMS = {
    header: 'Đăng ký vào TikTok',
    bottomLink: 'Đăng nhập',
    textBottom: 'Bạn đã có tài khoản?',
    items: [
        {
            icon: <FontAwesomeIcon icon={faQrcode} />,
            title: 'Sử dụng mã QR',
            active: true,
        },
        {
            icon: <IconUser />,
            title: 'Số điện thoại / Email/ TikTok ID',
            children: {
                header: 'Đăng ký',
                bottomLink: 'Đăng nhập',
                textBottom: 'Bạn đã có tài khoản?',
                rePassword: true,
                noBackground: true,
            },
        },
        {
            icon: <IconFacebook />,
            iconFacebook: true,
            title: 'Tiếp tục với Facebook',
            active: true,
        },
        {
            icon: <IconGoogle />,
            title: 'Tiếp tục với Google',
            active: true,
        },
    ],
};

function Header() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignUp] = useState(false);
    const currentUser = true;
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button onClick={() => setOpenLogin(true)} primary>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
            {openLogin ? (
                <FormRegister setOpenSignUp={setOpenSignUp} setOpenLogin={setOpenLogin} items={LOGIN_ITEMS} />
            ) : (
                <div></div>
            )}
            {openSignup ? (
                <FormRegister setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp} items={SIGNUP_ITEMS} />
            ) : (
                <div></div>
            )}
        </header>
    );
}

export default Header;
