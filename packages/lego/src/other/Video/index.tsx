import React, { forwardRef, useRef, useEffect, useCallback, useState, CSSProperties } from 'react';
import flv from 'flv.js';
import { isEmpty } from 'lodash-es';
import classNames from 'classnames';
import './index.less';
import { useRAF } from '../../hooks/useRAF';
import emptyImg from '../../assets/pic_empty.png';
import playIcon from '../../assets/play_icon.png';
import useStyle from '../../hooks/useStyle';

interface VideoProps {
  /** 唯一id值 */
  id: string;
  /** 视频路径数组 */
  videoUrls: string[];
  /** 显示工具条 */
  controls?: boolean;
  /** 是否循环播放 */
  isLoop?: boolean;
  /** 自动播放 */
  autoPlay?: boolean;
  /** 是否可见 */
  visible?: boolean;
  /** 延后加载 */
  loadDelay?: number;
  /** 是否静音播放 */
  muted?: boolean;
  style?: CSSProperties;
  className?: string;
}

// 开始播放时间
let startPlayTime = '';

const Video = forwardRef<HTMLDivElement, VideoProps>(
  (
    {
      id,
      visible = true,
      videoUrls = [],
      controls = true,
      isLoop = true,
      autoPlay = true,
      loadDelay = 0,
      muted = false,
      className,
      style,
    },
    ref
  ) => {
    const video = useRef<HTMLVideoElement>(null);
    const timer = useRef<symbol>();
    const player = useRef<flv.Player>();
    const { raf } = useRAF();
    const [play, setPlay] = useState(false);
    const { length } = videoUrls;
    const path = window.location.href;
    const videoKeyRef = useRef<string>('');
    const videoIndexRef = useRef<number>(0);
    const { style: modifiedStyle } = useStyle(style);

    /** 得到当前第几个 video */
    const getVideoKey = useCallback(() => {
      const videoDom = document.getElementById(id);
      if (!videoDom) {
        return '';
      }
      return `${path}${id}`;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    /** 加载视频 */
    const loadVideo = useCallback(
      (index: number, initialTimeStr?: string | null) => {
        if (flv.isSupported() && video.current && videoUrls[index]) {
          player.current = flv.createPlayer({
            type: 'mp4',
            url: videoUrls[index],
          });
          player.current.attachMediaElement(video.current);
          player.current.load();
          if (initialTimeStr) {
            const initialTime = +initialTimeStr;
            player.current.currentTime = player.current.duration > initialTime ? initialTime : 0;
          }
        }
      },
      [videoUrls]
    );

    /** 播放视频 */
    const playVideo = useCallback(() => {
      if (visible) {
        setPlay(true);
        player.current?.play();
      }
    }, [visible]);

    /** 暂停视频 */
    const pauseVideo = useCallback(() => {
      if (video.current?.seeking) {
        return;
      }
      setPlay(false);
      video.current?.pause();
    }, []);

    useEffect(() => {
      /** 播放下一个视频 */
      const playNextVideo = () => {
        const playIndex = videoIndexRef.current;
        if (playIndex >= length - 1) {
          videoIndexRef.current = 0;
          loadVideo(0);
          if (isLoop) {
            player.current?.play();
          }
        } else if (playIndex < length - 1) {
          videoIndexRef.current += 1;
          loadVideo(playIndex + 1);
          player.current?.play();
        }
      };
      if (video.current) {
        video.current.onended = playNextVideo;
        video.current.onplay = () => setPlay(true);
        video.current.onpause = () => pauseVideo();
      }
    }, [length, isLoop, loadVideo, pauseVideo]);

    useEffect(() => {
      if (visible) {
        if (timer.current) {
          raf.clearTimeout(timer.current);
        }
        /** 延后加载,防止打开弹窗播放卡顿 */
        timer.current = raf.setTimeout(() => {
          videoKeyRef.current = getVideoKey();
          loadVideo(0);
          autoPlay && playVideo();
        }, loadDelay);
      } else {
        setPlay(false);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, visible, JSON.stringify(videoUrls)]);

    /** 刷新页面清除视频播放记忆 */
    useEffect(() => {
      // 离开当前页面存储相关信息
      const currentHashChangeFunc = () => {
        const { currentTime } = player.current || {};
        const paused = video.current ? video.current.paused : true;
        startPlayTime = '';
        if (currentTime && videoKeyRef.current) {
          const playersStatusInfo = JSON.parse(sessionStorage.getItem('playersStatusInfo') ?? '{}');
          const newInfo = {
            ...playersStatusInfo,
            [videoKeyRef.current]: { currentTime, paused },
          };
          sessionStorage.setItem('playersStatusInfo', JSON.stringify(newInfo));
        }
        window.onhashchange = nextHashChangeFunc;
      };
      // 返回当前页面使用相关信息，播放视频
      const nextHashChangeFunc = () => {
        const isCurrentPath = path === window.location.href;
        window.onhashchange = currentHashChangeFunc;
        if (isCurrentPath) {
          if (!videoKeyRef.current) {
            return;
          }
          const playersStatusInfo = JSON.parse(sessionStorage.getItem('playersStatusInfo') ?? '{}') || {};
          const { currentTime, paused } = playersStatusInfo[videoKeyRef.current] || {};

          if (currentTime && player.current && !startPlayTime) {
            startPlayTime = currentTime;
            const initialTime = +currentTime;
            player.current.currentTime = player.current.duration > initialTime ? initialTime : 0;
            if (!paused) {
              playVideo();
            }
          }
        }
      };
      // 项目中 config 需要配置 hash
      window.onhashchange = currentHashChangeFunc;
      window.onbeforeunload = function () {
        sessionStorage.removeItem('playersStatusInfo');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.current]);

    return (
      <div ref={ref} className={classNames('td-lego-video-container', className)} style={modifiedStyle}>
        {!isEmpty(videoUrls) ? (
          <>
            {!play && (
              <div className="td-lego-video-cover" onClick={() => playVideo()}>
                <img src={playIcon} className="td-lego-video-play-icon" />
              </div>
            )}
            {visible && (
              <video
                id={id}
                onClick={() => {
                  !controls && pauseVideo();
                }}
                muted={muted}
                controls={controls}
                playsInline
                ref={video}
                className="td-lego-video"
              ></video>
            )}
          </>
        ) : (
          <div className="td-lego-video-empty-wrap">
            <img src={emptyImg} className="td-lego-video-empty-img" />
          </div>
        )}
      </div>
    );
  }
);

export default Video;
