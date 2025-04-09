import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import ContentCenter from '~/layouts/components/ContentCenter';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);
function Home() {
    const [dataVideo, setDataVideo] = useState([]);
    console.log(dataVideo);

    useEffect(() => {
        const fetchVideo = async () => {
            const result = await videoService.getVideo(2);
            setDataVideo(result);
        };
        fetchVideo();
        // fetch('https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=2')
        //     .then((res) => res.json())
        //     .then((data) => setDataVideo(data.data))
        //     .catch((error) => console.log(error));
    }, []);

    return (
        <div className={cx('wrapper')}>
            {dataVideo.map((item) => (
                <ContentCenter key={item.id} data={item} />
            ))}
        </div>
    );
}

export default Home;
