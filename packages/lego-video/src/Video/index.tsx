import { isEmpty } from 'lodash-es';
import React, { CSSProperties, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Player, { IPlayerOptions } from 'xgplayer';

// 默认速度控制
const DEFAULT_PLAY_BACK_RATE = [0.5, 0.75, 1, 1.5, 2];

// 默认记忆提示文字展示时长(s)
const DEFAULT_LAST_PLAY_TIME_DELAY = 5;

interface PlayerProps extends Player {
  currentVideoIndex?: number;
  video?: { duration: number };
  on: (eventName: string | symbol, listener: (...args: any[]) => void) => this;
  off: (eventName: string | symbol, listener: (...args: any[]) => void) => this;
  emit: (eventName: string | symbol, ...args: any[]) => boolean;
}

/** 清晰度视频项目,name 为清晰度,url 为视频源 */
export interface DefinitionItemProps {
  name: string;
  url: string;
}

/** 视频属性配置，继承 xgplayer 配置属性 */
interface VideoProps extends Omit<IPlayerOptions, 'url' | 'loop'> {
  /** 唯一id值 */
  id: string;
  /** 视频路径数组 */
  videoUrls: string[];
  /** 清晰度视频数组,顺序应与 videoUrls 保持一致 */
  definitionList?: DefinitionItemProps[][];
  /** 是否循环播放(多视频只支持循环播放) */
  isLoop?: boolean;
  /** 是否可见 */
  visible?: boolean;
  /** 是否静音播放 */
  muted?: boolean;
  /** 初始化显示首帧 */
  videoInit?: boolean;
  /** 是否允许记忆播放 */
  enableMemory?: boolean;
  /** 记忆提示文字展示时长(s) */
  lastPlayTimeHideDelay?: number;
  /** 手动控制当前播放集数 */
  currentIndex?: number;
  setCurrentIndex?: (currentIndex: number) => void;
  style?: CSSProperties;
  className?: string;
}

// 默认音量大小
const DEFAULT_VOLUME = 0.6;

export default forwardRef<PlayerProps, VideoProps>(
  (
    {
      id,
      videoUrls = [],
      definitionList = [],
      isLoop = true,
      muted = false,
      currentIndex: parentIndex,
      setCurrentIndex: setParentIndex,
      className,
      style,
      visible = true,
      autoplay = false,
      videoInit = true,
      enableMemory = false,
      lastPlayTimeHideDelay = DEFAULT_LAST_PLAY_TIME_DELAY,
      ...props
    },
    playerRef
  ) => {
    const player = useRef<PlayerProps>();
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [ready, setReady] = useState<boolean>(false);
    const currentPlayerIndex = useRef<number>(0);
    // 内置的 index 状态管理
    const [videoIndex, setVideoIndex] = useState<number>(0);

    const currentIndex = parentIndex ?? videoIndex;
    const setCurrentIndex = setParentIndex ?? setVideoIndex;

    const config = useRef<IPlayerOptions>({
      url: videoUrls[0],
      playbackRate: DEFAULT_PLAY_BACK_RATE, // 传入倍速可选数组
      playNext: {
        urlList: videoUrls.slice(1),
      },
      volume: muted ? 0 : DEFAULT_VOLUME,
      autoplay,
      videoInit,
      lastPlayTimeHideDelay,
      ...props,
    });

    /** 设置当前播放 index */
    const handleSetCurrentIndex = useCallback(
      ({ currentIdx, videoUrls }: { currentIdx?: number; videoUrls: string[] }) => {
        let newIdx = currentIdx ?? currentPlayerIndex.current + 1;
        if (newIdx >= videoUrls.length) {
          newIdx = 0;
        }
        setCurrentIndex(newIdx);
      },
      [setCurrentIndex]
    );

    /** 结束事件 */
    const onEnd = useCallback(
      (isLoop: boolean, videoUrls: string[]) => () => {
        // 如果是循环或有其他视频未播放完，继续播放下一个
        if (isLoop || (!isLoop && currentPlayerIndex.current < videoUrls.length - 1)) {
          setTimeout(() => player.current?.play());
        }
        handleSetCurrentIndex({ videoUrls });
      },
      [handleSetCurrentIndex]
    );

    /** 点击下一个事件 */
    const onPlayNextBtnClick = useCallback(
      (videoUrls: string[]) => () => {
        if (player.current) {
          // 防止 next 按钮消失
          player.current.currentVideoIndex = videoUrls.length - 2;
        }
        handleSetCurrentIndex({ videoUrls });
      },
      [handleSetCurrentIndex]
    );

    /** 播放下一个 */
    const handlePlayNext = useCallback(
      (currentIdx: number, isLoop: boolean) => {
        if (!player.current) {
          return;
        }
        player.current.src = videoUrls[currentIdx];
        player.current.emit('playerNext', currentIdx);
        player.current.play();
        currentPlayerIndex.current = currentIdx;
        if (isLoop) {
          // 防止 next 按钮消失
          player.current.currentVideoIndex = -videoUrls.length;
        }
      },
      [videoUrls]
    );

    /** 重置视频 */
    const handleReset = useCallback(() => {
      if (!player.current) {
        return;
      }
      setCurrentIndex(0);
      currentPlayerIndex.current = -1;
      player.current.destroy();
      player.current = undefined;
    }, [setCurrentIndex]);

    /** 弹窗中的视频关闭以后重置 */
    useEffect(() => {
      if (!visible) {
        handleReset();
      }
    }, [handleReset, visible]);

    /** 当 currentIndex 改变以后自动播放下一个 */
    useEffect(() => {
      if (!player.current || !visible) {
        return;
      }
      handlePlayNext(currentIndex ?? currentPlayerIndex.current, isLoop);
    }, [currentIndex, handlePlayNext, isLoop, visible]);

    /** 播放器初始化并绑定事件 */
    useEffect(() => {
      if (!visible || isEmpty(videoUrls) || player.current) {
        return;
      }
      const newConfig = {
        ...config.current,
        muted,
        volume: muted ? 0 : DEFAULT_VOLUME,
        autoplay,
        videoInit,
      };
      setReady(false);
      setFirstRender(false);
      // @ts-ignore
      player.current = new Player(newConfig);
      player.current!.currentVideoIndex = -videoUrls.length;
      player.current!.on('ended', onEnd(isLoop, videoUrls));

      // 播放记忆缓存
      if (enableMemory) {
        const videoPlayedTimeObj = JSON.parse(localStorage.getItem('videoPlayedTime') || '{}');
        player.current?.on('timeupdate', () => {
          if (currentPlayerIndex.current === -1) {
            return;
          }
          localStorage.setItem(
            'videoPlayedTime',
            JSON.stringify({
              ...videoPlayedTimeObj,
              [id]: {
                lastPlayTime: player.current?.currentTime,
                videoIndex: currentPlayerIndex.current,
              },
            })
          );
        });
      }
      player.current?.on('playNextBtnClick', onPlayNextBtnClick(videoUrls));
    }, [
      ready,
      autoplay,
      enableMemory,
      handleSetCurrentIndex,
      id,
      isLoop,
      videoUrls,
      videoUrls.length,
      visible,
      muted,
      videoInit,
      onEnd,
      onPlayNextBtnClick,
    ]);

    /** 读取缓存的播放记忆并跳转 */
    useEffect(() => {
      if (enableMemory && visible) {
        const { lastPlayTime, videoIndex } = JSON.parse(localStorage.getItem('videoPlayedTime') || '{}')?.[id] || {};
        setTimeout(() => {
          handleSetCurrentIndex({ currentIdx: videoIndex, videoUrls });
          setTimeout(() => {
            if (player.current) {
              player.current.currentTime = lastPlayTime;
            }
          });
        });
      }
    }, [visible, enableMemory, handleSetCurrentIndex, id, videoUrls]);

    /** 加载清晰度配置 */
    useEffect(() => {
      if (!isEmpty(definitionList[currentIndex]) && player.current) {
        player.current.emit('resourceReady', definitionList[currentIndex]);
      }
    }, [currentIndex, definitionList]);

    useEffect(() => {
      if (firstRender) {
        return;
      }
      player.current?.off('ended', onEnd(isLoop, videoUrls));
      player.current?.off('playNextBtnClick', onPlayNextBtnClick(videoUrls));
      player.current?.destroy();
      player.current = undefined;
      setReady(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted, isLoop, videoUrls, autoplay, videoInit, onEnd, onPlayNextBtnClick]);

    const getRef = useCallback(
      ref => {
        if (ref && visible) {
          const newConfig = {
            ...config.current,
            el: ref,
            url: videoUrls[0],
            playNext: {
              urlList: videoUrls.slice(1),
            },
          };
          if (enableMemory) {
            const { lastPlayTime } = JSON.parse(localStorage.getItem('videoPlayedTime') || '{}')?.[id] || {};
            Object.assign(newConfig, { lastPlayTime, lastPlayTimeHideDelay });
          }
          config.current = newConfig;
        }

        if (playerRef) {
          if (typeof playerRef === 'function') {
            playerRef(player.current!);
          } else {
            playerRef.current = player.current!;
          }
        }
      },
      [visible, playerRef, videoUrls, enableMemory, id, lastPlayTimeHideDelay]
    );
    return <div className={className} ref={getRef} style={style}></div>;
  }
);
