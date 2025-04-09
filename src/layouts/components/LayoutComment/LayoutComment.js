import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPause, faPlay, faVolumeHigh, faVolumeTimes } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';

import styles from './LayoutComment.module.scss';
import LayoutCommentContainer from './LayoutCommentContainer';
const cx = classNames.bind(styles);
function LayoutComment({ data, setTurnVideo }) {
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(true);
    const [volumeValue, setVolumeValue] = useState(100);

    const videoRef = useRef([]);
    const refInputVideo = useRef([]);
    const progressBarRef = useRef();
    const progressVolumeRef = useRef();
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('html').style.height = 'auto';

    const handleChangeInputVideo = (e) => {
        const seekTime = (videoRef.current.duration / 100) * e.target.value;
        videoRef.current.currentTime = seekTime;
        progressBarRef.current.style.transform = `scaleX(${e.target.value / 100}) translateY(-50%)`;
    };

    const handleClickVideo = (e) => {
        if (play) {
            setPlay(false);
            e.target.pause();
        } else {
            setPlay(true);
            e.target.play();
        }
    };
    const handlePlayVideo = (e) => {
        videoRef.current.play();
        setPlay(false);
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-user')}>
                <video
                    muted={volume}
                    ref={videoRef}
                    onEnded={(e) => e.target.play()}
                    onClick={(e) => handleClickVideo(e)}
                    onPlay={() => setPlay(true)}
                    autoPlay
                    onTimeUpdate={(e) => handleTimeUpDate(e)}
                    id="video"
                    className={cx('video')}
                    width="320"
                    height="230"
                >
                    <source type="video/webm" src={data.file_url} />
                </video>
                <FontAwesomeIcon onClick={() => setTurnVideo(false)} className={cx('close')} icon={faClose} />

                {!play ? (
                    <FontAwesomeIcon onClick={(e) => handlePlayVideo(e)} className={cx('icon-action')} icon={faPlay} />
                ) : (
                    <div></div>
                )}

                <div className={cx('video-content')}>
                    <div className={cx('video-volume')}>
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
            <div className={cx('content-container')}>
                <LayoutCommentContainer data={data} />
            </div>
        </div>
    );
}

LayoutComment.propTypes = {
    data: PropTypes.object.isRequired,
};

export default LayoutComment;
