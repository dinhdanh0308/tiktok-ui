import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import * as followingService from '~/services/followingService';
const cx = classNames.bind(styles);

const INNIT_PAGE = 1;
const PER_PAGE = 5;
function Sidebar() {
    const [page, setPage] = useState(INNIT_PAGE);
    const [perPage, setPerPage] = useState(PER_PAGE);
    const [isSeeAll, setSeeAll] = useState(false);
    const [suggested, setSuggestedUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page, perPage })
            .then((data) => {
                setSuggestedUsers((prevUsers) => [...prevUsers, ...data]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page]);

    const handleSeeAll = () => {
        setPage(page + 1);
        setSeeAll(true);
        setPerPage(perPage + 5);
    };

    const handleSeeLess = () => {
        setSuggestedUsers(suggested.splice(0, 5));
        setSeeAll(false);
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} title="For You" />
                <MenuItem
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                    title="Following"
                />
                <MenuItem to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} title="LIVE" />
            </Menu>
            <SuggestedAccounts
                label="Suggested accounts"
                data={suggested}
                isSeeAll={isSeeAll}
                handleSeeAll={handleSeeAll}
                handleSeeLess={handleSeeLess}
            />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
