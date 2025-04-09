import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';

import styles from './VideoUser.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import config from '~/config';
import ContentCenter from '../ContentCenter';
import ContentVideo from '../../LayoutComment/LayoutComment';

const cx = classNames.bind(styles);
function VideoUser({ data, user }) {
    const [play, setPlay] = useState(false);
    const [turnVideo, setTurnVideo] = useState(false);
    const [dataVideo, setDataVideo] = useState();
    const [volume, setVolume] = useState(true);
    const [volumeValue, setVolumeValue] = useState(100);
    const [scrollVideo, setScrollVideo] = useState(0);
    const [more, setMore] = useState(false);
    const [close, setClose] = useState(true);

    const videoRef = useRef([]);
    const refInputVideo = useRef([]);
    const progressBarRef = useRef();
    const progressVolumeRef = useRef();
    const descRef = useRef();
    const elements = document.querySelectorAll('#video');
    document.querySelector('html').style.overflow = 'auto';
    document.querySelector('html').style.height = 'auto';

    useEffect(() => {
        setScrollVideo(window.innerHeight);

        elements.forEach((element) => {
            observer.observe(element);
        });
        if (descRef.current.offsetWidth <= 300) {
            setMore(false);
        } else {
            setMore(true);
        }
        return () => {
            setScrollVideo(window.innerHeight);
        };
    }, [scrollVideo]);

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio === 1) {
                    entry.target.play();
                    setPlay(true);
                } else {
                    entry.target.load();
                    setPlay(false);
                    setVolume(true);
                }
            });
        },
        {
            threshold: 1,
            rootMargin: '200px 200px',
        },
    );
    const handleChangeInputVideo = (e) => {
        const seekTime = (videoRef.current.duration / 100) * e.target.value;
        videoRef.current.currentTime = seekTime;
        progressBarRef.current.style.transform = `scaleX(${e.target.value / 100}) translateY(-50%)`;
    };

    const handlePlayVideo = () => {
        videoRef.current.pause();
        setPlay(false);
    };

    const handlePauseVideo = () => {
        videoRef.current.play();
        setPlay(true);
    };

    const handleTurnOnVolumeVideo = () => {
        setVolume(false);
        videoRef.current.volume = 1;
    };

    const handleMuteVolumeVideo = () => {
        setVolume(true);
        videoRef.current.volume = 0;
    };
    const handleChangeValueVolume = (e) => {
        const seekVolume = e.target.value / 100;
        videoRef.current.volume = seekVolume;
        progressVolumeRef.current.style.transform = `scaleX(${seekVolume}) translateY(-50%)`;
        setVolumeValue(seekVolume);
        if (videoRef.current.volume === 0) {
            setVolume(false);
        }
    };
    const handleTimeUpDate = (e) => {
        if (e.target.duration) {
            const progressPercent = Math.floor((e.target.currentTime / e.target.duration) * 100);
            refInputVideo.current.value = progressPercent;
            progressBarRef.current.style.transform = `scaleX(${
                e.target.currentTime / e.target.duration
            }) translateY(-50%)`;
        }
    };
    const handleTurnOnVideo = (e) => {
        setTurnVideo(true);
    };
    const handleClickMore = () => {
        if (close) {
            descRef.current.setAttribute('style', '-webkit-line-clamp : 100');
            setClose(false);
        } else {
            descRef.current.setAttribute('style', '-webkit-line-clamp : 1');
            setClose(true);
        }
    };

    return (
        <div className={cx('video-user')}>
            <video
                muted={volume}
                ref={videoRef}
                onEnded={(e) => e.target.play()}
                onPlay={() => setPlay(true)}
                onTimeUpdate={(e) => handleTimeUpDate(e)}
                id="video"
                className={cx('video')}
                width="320"
                height="230"
                onClick={(e) => handleTurnOnVideo(e)}
            >
                <source type="video/webm" src={data.file_url} />
            </video>
            {turnVideo ? <ContentVideo setTurnVideo={setTurnVideo} data={data} /> : <div></div>}

            <div className={cx('video-content')}>
                <div className={cx('video-content-list')}>
                    <div className={cx('video-content-item')}>
                        <Link
                            style={{ textDecoration: 'underline' }}
                            className={cx('name-user')}
                            to={config.routes.profile}
                        >
                            {user.nickname}
                        </Link>
                        <div className={cx('media')}>
                            <p ref={descRef} className={cx('description')}>
                                {data.description}
                            </p>
                            {more ? (
                                <div className={cx('more')} onClick={() => handleClickMore()}>
                                    {close ? 'thêm' : 'đóng'}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    {!volume ? (
                        <div>
                            <HeadlessTippy
                                interactive="true"
                                placement="top-start"
                                offset={[-35, 35]}
                                render={(args) => (
                                    <div className={cx('background-volume')} tabIndex="-1" {...args}>
                                        <input
                                            onChange={(e) => handleChangeValueVolume(e)}
                                            type="range"
                                            className={cx('volume')}
                                            id={cx('volume')}
                                            defaultValue={volumeValue}
                                            step="1"
                                            min="0"
                                            max="100"
                                        />
                                        <div ref={progressVolumeRef} className={cx('progress-volume')}></div>
                                    </div>
                                )}
                            >
                                <FontAwesomeIcon
                                    className={cx('icon-volume')}
                                    onClick={handleMuteVolumeVideo}
                                    icon={faVolumeHigh}
                                />
                            </HeadlessTippy>
                        </div>
                    ) : (
                        <div>
                            <FontAwesomeIcon
                                className={cx('icon-volume')}
                                onClick={handleTurnOnVolumeVideo}
                                icon={faVolumeTimes}
                            />
                        </div>
                    )}
                </div>
                <div className={cx('action-video')}>
                    {play ? (
                        <FontAwesomeIcon className={cx('icon-action')} icon={faPause} onClick={handlePlayVideo} />
                    ) : (
                        <FontAwesomeIcon className={cx('icon-action')} icon={faPlay} onClick={handlePauseVideo} />
                    )}
                    <div className={cx('input-progress')}>
                        <input
                            ref={refInputVideo}
                            onChange={(e) => handleChangeInputVideo(e)}
                            type="range"
                            className={cx('progress')}
                            id={cx('progress')}
                            defaultValue="0"
                            step="1"
                            min="0"
                            max="100"
                        />
                        <div ref={progressBarRef} className={cx('progress-bar')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
VideoUser.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default VideoUser;
