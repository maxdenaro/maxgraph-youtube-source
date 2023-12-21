class GraphPlayer {
  constructor(selector, options) {
    let defaultOptions = {
      isMuted: () => {},
      isEnded: () => {},
      isPlayed: () => {},
      isPaused: () => {},
      modClass: "",
      initialVolume: 1,
    };

    this.selector = selector;
    this.options = Object.assign(defaultOptions, options);
    this.video = document.querySelector(this.selector);
    this.parent = null;
    this.elements = {};

    this.draggingTimeline = false;
    this.draggingVolume = false;
    this.playing = false;
    this.muted = false;

    this.volumePanelWidth = 0;
    this.volumeHandleWidth = 0;
    this.maxHandleDistance = 0;
    this.timelineRect = 0;
    this.timelineWidth = 0;

    this.previousVolume = 0.5;

    this.check();
    this.init();
    this.events();
    this.standardEvents();
  }

  check() {
    if (!this.video) {
      console.error('Элемента с таким селектором не существует!');
      return;
    }

    if (!this.video.getAttribute('src')) {
      console.error('Не заполнен атрибут src!');
      return;
    }
  }

  calculateSizes() {
    this.volumePanelWidth = this.elements.volumePanel.offsetWidth;
    this.volumeHandleWidth = this.elements.volumeHandle.offsetWidth;
    this.maxHandleDistance = this.volumePanelWidth - this.volumeHandleWidth;
    this.timelineRect = this.elements.timeline.getBoundingClientRect();
    this.timelineWidth = this.timelineRect.width;
  }

  formatTime = (time, format = "colon") => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    if (format === "dot") {
      return minutes + ' мин. ' + seconds + ' сек.';
    }

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  setAria(el, attr, val) {
    el.setAttribute(attr, val);
  }

  createElements() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('video-player');
    wrapper.setAttribute('tabindex', '0');
    this.video.setAttribute('tabindex', '-1');

    if (this.options.modClass) {
      wrapper.classList.add(this.options.modClass);
    }

    this.video.parentNode.insertBefore(wrapper, this.video);
    wrapper.appendChild(this.video);

    wrapper.insertAdjacentHTML('beforeend', `
      <div class="video-player__volume-indicator hidden">0%</div>
        <div class="video-player__controls">
          <div class="video-player__timeline timeline" tabindex="0" role="slider" aria-label="Ползунок видео" aria-valuemin="0" aria-valuemax="" aria-valuenow="0" aria-valuetext="">
            <div class="timeline__progress"></div>
            <div class="timeline__handle"></div>
          </div>
          <div class="video-player__bottom">
            <button class="video-player-btn video-player__play" type="button" aria-keyshortcuts="k" aria-label="Для активации кнопки Смотреть нажмите k">
              <span class="video-player-btn__play-icon video-player-btn__icon video-player-btn__icon--play"></span>
            </button>
            <div class="video-player__volumes">
              <button class="video-player-btn video-player__volume" type="button" aria-keyshortcuts="m" aria-label="Для активации кнопки Отключение звука нажмите m">
                <span class="video-player-btn__volume-icon video-player-btn__icon video-player-btn__icon--unmuted"></span>
              </button>
              <div class="video-player-volume-panel" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="" aria-valuetext="" aria-label="Громкость">
                <div class="video-player-volume-panel__slider">
                  <div class="video-player-volume-panel__handle"></div>
                </div>
              </div>
            </div>
            <div class="video-player__time">0:00 / 0:00</div>
            <button class="video-player-btn video-player__fullscreen" type="button" aria-keyshortcuts="f" aria-label="Для активации кнопки Во весь экран нажмите f">
              <span class="video-player-btn__icon video-player-btn__icon--fullscreen"></span>
            </button>
          </div>
        </div>
    `);
  }

  findElements() {
    const parent = this.video.closest('.video-player');
    this.parent = parent;

    this.elements = {
      timeline: parent.querySelector('.timeline'),
      timelineProgress: parent.querySelector('.timeline__progress'),
      timelineHandle: parent.querySelector('.timeline__handle'),
      volumePanel: parent.querySelector('.video-player-volume-panel'),
      volumeHandle: parent.querySelector('.video-player-volume-panel__handle'),
      volumeBtn: parent.querySelector('.video-player__volume'),
      volumeIndicator: parent.querySelector('.video-player__volume-indicator'),
      timeDisplay: parent.querySelector('.video-player__time'),
      playButton: parent.querySelector('.video-player__play'),
      fullscreenButton: parent.querySelector('.video-player__fullscreen'),
      playButtonIcon: parent.querySelector('.video-player-btn__play-icon'),
      volumeButtonIcon: parent.querySelector('.video-player-btn__volume-icon'),
    };
  }

  initElements() {
    this.video.addEventListener('loadedmetadata', function() {
      const duration = this.video.duration;
      const currentTime = this.video.currentTime;
      console.log(duration);
      this.elements.timeDisplay.textContent = this.formatTime(currentTime) + " / " + this.formatTime(duration);

      this.setAria(this.elements.timeline, 'aria-valuemax', Math.floor(duration));
      this.setAria(this.elements.timeline, 'aria-valuenow', Math.floor(currentTime));
      this.setAria(this.elements.timeline, 'aria-valuetext', `${this.formatTime(currentTime, 'dot')} (общая длительность ${this.formatTime(duration, 'dot')})`);

      this.initVolume();
    }.bind(this));
  }

  init() {
    this.video.controls = false;
    this.video.setAttribute('muted', '');
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('preload', 'metadata');

    this.createElements();
    this.findElements();
    this.calculateSizes();
    this.initElements();
  }

  updateTimelineAria() {
    const currentTime = this.video.currentTime;
    const duration = this.video.duration;

    this.setAria(this.elements.timeline, 'aria-valuemax', `${Math.floor(duration)}`);
    this.setAria(this.elements.timeline, 'aria-valuenow', `${Math.floor(currentTime)}`);
    this.setAria(this.elements.timeline, 'aria-valuetext', `${this.formatTime(currentTime, 'dot')} (общая длительность ${this.formatTime(duration, 'dot')})`);
  }

  initVolume() {
    const newHandleDistance = this.options.initialVolume * this.maxHandleDistance;
    const volume = (this.options.initialVolume * 100).toFixed(0);

    this.video.volume = this.options.initialVolume;

    this.elements.volumeHandle.style.left = `${newHandleDistance}px`;

    this.setAria(this.elements.volumePanel, 'aria-valuenow', volume);
    this.setAria(this.elements.volumePanel, 'aria-valuetext', `${volume}% громкость`);
    this.elements.volumeIndicator.textContent = `${volume}%`;
  }

  updateVolume(event, changeVolume) {

    let volume = this.video.volume;
    let newHandleDistance = 0;
    let mutedText = "";

    if (event.type === 'mousedown' || event.type === 'click' || event.type === 'mousemove') {
      let offsetX = event.clientX - this.elements.volumePanel.getBoundingClientRect().left;

      newHandleDistance = Math.min(this.maxHandleDistance, Math.max(0, offsetX - this.volumeHandleWidth / 2));

      volume = (newHandleDistance / this.maxHandleDistance);
    }

    if (event.type === 'keydown') {
      if (changeVolume === 'inc') {
        volume = Math.min(1, volume + 0.05);
      } else if (changeVolume === 'dec') {
        volume = Math.max(0, volume - 0.05);
      }

      newHandleDistance = (volume * this.maxHandleDistance);
    }

    if (event.type === 'volumechange') {
      volume = this.video.volume;
      newHandleDistance = (volume * this.maxHandleDistance);
    }

    this.elements.volumeHandle.style.left = `${newHandleDistance}px`;
    this.video.volume = volume;

    if (this.video.muted) {
      mutedText = ' звук отключен';
    }

    if (volume === 0 && !this.muted) {
      this.mute();
    } else if (volume > 0 && this.muted) {
      this.unmute();
    }

    this.updateVolumeIndicator();
    this.setAria(this.elements.volumePanel, 'aria-valuenow', (volume * 100).toFixed(0));
    this.setAria(this.elements.volumePanel, 'aria-valuetext', `${(volume * 100).toFixed(0)}% громкость${mutedText}`);
  }

  updateVolumeIndicator() {
    const volume = (this.video.volume * 100).toFixed(0);

    this.elements.volumeIndicator.textContent = `${volume}%`;

    if (!this.video.muted) {
      this.elements.volumeIndicator.classList.remove('hidden');
    }

    setTimeout(() => {
      this.elements.volumeIndicator.classList.add('hidden');
    }, 500);
  }

  play() {
    this.playing = true;

    this.video.play();
    this.elements.playButton.setAttribute('aria-label', 'Для активации кнопки Пауза нажмите k');
    this.elements.playButtonIcon.classList.replace('video-player-btn__icon--play', 'video-player-btn__icon--pause');
  }

  pause() {
    this.playing = false;

    this.video.pause();
    this.elements.playButton.setAttribute('aria-label', 'Для активации кнопки Смотреть нажмите k');
    this.elements.playButtonIcon.classList.replace('video-player-btn__icon--pause', 'video-player-btn__icon--play');
  }

  mute() {
    this.previousVolume = this.video.volume;
    this.muted = true;
    this.options.isMuted(this);
    this.video.muted = true;

    this.elements.volumeBtn.setAttribute('aria-label', 'Для активации кнопки Включить звук нажмите k');
    this.elements.volumeButtonIcon.classList.replace('video-player-btn__icon--unmuted', 'video-player-btn__icon--muted');
  }

  unmute() {
    this.muted = false;
    this.video.muted = false;

    this.elements.volumeBtn.setAttribute('aria-label', 'Для активации кнопки Отключение звука нажмите k');
    this.elements.volumeButtonIcon.classList.replace('video-player-btn__icon--muted', 'video-player-btn__icon--unmuted');
  }

  updateTimeline(event) {
    const timelineWidth = this.timelineWidth;
    const clickX = event.clientX - this.timelineRect.left;

    const seekTime = (clickX / timelineWidth) * this.video.duration;

    const progressWidth = this.elements.timelineProgress.offsetWidth;
    this.elements.timelineHandle.style.transform = `translateX(${progressWidth}px)`;

    this.video.currentTime = seekTime;

    this.updateTimelineAria();
  }

  enterFullscreen(element) {
    setTimeout(() => {
      this.elements.playButton.focus();
    }, 200);

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  adjuctVideoTime(seconds) {
    if (this.video) {
      this.video.currentTime += seconds;
    }
  }

  toggleFullScreen() {
    this.calculateSizes();
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen(this.parent);
    }
  }

  events() {
    window.addEventListener('resize', () => {
      this.calculateSizes();
    });

    this.video.addEventListener('click', function() {
      if (!this.playing) {
        this.play();
      } else {
        this.pause();
      }
    }.bind(this));

    this.elements.playButton.addEventListener('click', function() {
      if (!this.playing) {
        this.play();
      } else {
        this.pause();
      }
    }.bind(this));

    this.elements.volumeBtn.addEventListener('click', function() {
      if (!this.muted) {
        this.mute();
      } else {
        this.unmute();
      }
    }.bind(this));

    this.video.addEventListener('timeupdate', function() {
      const currentTime = this.video.currentTime;
      const duration = this.video.duration;
      const progressWidth = (currentTime / duration) * 100 + "%";
      this.elements.timelineProgress.style.width = progressWidth;

      const progressWidth2 = this.elements.timelineProgress.offsetWidth;

      const translateX = (progressWidth2) + 'px';
      this.elements.timelineHandle.style.transform = 'translateX(' + translateX + ')';

      this.elements.timeDisplay.textContent = this.formatTime(currentTime) + ' / ' + this.formatTime(duration);

      this.updateTimelineAria();
    }.bind(this));

    document.addEventListener('keydown', function(event) {
      if (this.video.parentNode.contains(document.activeElement)) {
        const keyCode = event.keyCode;

        switch(keyCode) {
          case 75:
            event.preventDefault();
            if (!this.playing) {
              this.play();
            } else {
              this.pause();
            }
            break;
          case 77:
            if (!this.muted) {
              this.mute();
            } else {
              this.unmute();
            }
            this.updateVolumeIndicator();
            break;
          case 70:
            event.preventDefault();
            this.toggleFullScreen.bind(this)();
            break;
          case 13:
            event.preventDefault();
            this.toggleFullScreen.bind(this)();
            break;
          case 38:
            event.preventDefault();
            this.updateVolume(event, 'inc');
            break;
          case 40:
            event.preventDefault();
            this.updateVolume(event, 'dec');
            break;
        }

        if (document.activeElement !== this.elements.volumePanel) {
          switch(keyCode) {
            case 37:
              event.preventDefault();
              this.adjuctVideoTime(-5);
              break;
            case 39:
              event.preventDefault();
              this.adjuctVideoTime(5);
              break;
          }
        }

        if (document.activeElement === this.parent ||
          document.activeElement === this.elements.timeline ||
          document.activeElement === this.elements.volumePanel
        ) {
          switch(keyCode) {
            case 32:
              event.preventDefault();
              if (!this.playing) {
                this.play();
              } else {
                this.pause();
              }
              break;
          }
        }

        if (document.activeElement === this.elements.volumePanel) {
          switch(keyCode) {
            case 37:
              event.preventDefault();
              this.updateVolume(event, 'dec');
              break;
            case 39:
              event.preventDefault();
              this.updateVolume(event, 'inc');
              break;
          }
        }
      }
    }.bind(this));

    this.elements.timeline.addEventListener('mousedown', function(event) {
      this.draggingTimeline = true;
      this.updateTimeline(event);
    }.bind(this));

    this.elements.volumePanel.addEventListener('mousedown', function(event) {
      this.draggingVolume = true;
      this.updateVolume(event);
    }.bind(this));

    document.addEventListener('mousemove', function(event) {
      if (this.draggingTimeline) {
        this.updateTimeline(event);
      }

      if (this.draggingVolume) {
        this.updateVolume(event);
      }
    }.bind(this));

    document.addEventListener('mouseup', function(event) {
      if (this.draggingTimeline) {
        this.draggingTimeline = false;
      }

      if (this.draggingVolume) {
        this.draggingVolume = false;
      }
    }.bind(this));

    this.elements.fullscreenButton.addEventListener('click', function() {
      this.toggleFullScreen();
    }.bind(this));
  }

  standardEvents() {
    this.video.addEventListener('play', function() {
      this.video.play();
      this.options.isPlayed(this);
    }.bind(this));

    this.video.addEventListener('pause', function() {
      this.video.pause();
      this.options.isPaused(this);
    }.bind(this));

    this.video.addEventListener('ended', function() {
      this.options.isEnded(this);
    }.bind(this));
  }
}
