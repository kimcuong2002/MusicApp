const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $(".playlist");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const player = $(".player");
const progress = $("#progress")
const btnPlay = $(".btn-toggle-play");
const btnPrev = $(".btn-prev")
const btnNext = $(".btn-next")
const btnRandom = $(".btn-random")

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: "Chiều hôm ấy",
            singer: "JayKii",
            path:
                "./utils/musics/chieuhomay.mp3",
            image:
                "./utils/images/chieuhomay.jpg"
        },
        {
            name: "Lặng Yên",
            singer: "Bùi Anh Tuấn",
            path:
                "./utils/musics/langyen.mp3",
            image:
                "./utils/images/langyen.jpg"
        },
        {
            name: "Lối nhỏ",
            singer: "Bùi Anh Tuấn",
            path:
                "./utils/musics/chieuhomay.mp3",
            image:
                "./utils/images/chieuhomay.jpg"
        },
        {
            name: "Hai triệu năm",
            singer: "Bùi Anh Tuấn",
            path:
                "./utils/musics/chieuhomay.mp3",
            image:
                "./utils/images/chieuhomay.jpg"
        },
        {
            name: "Cho tôi lang thang",
            singer: "Bùi Anh Tuấn",
            path:
                "./utils/musics/chieuhomay.mp3",
            image:
                "./utils/images/chieuhomay.jpg"
        },
        {
            name: "Mơ",
            singer: "Bùi Anh Tuấn",
            path:
                "./utils/musics/chieuhomay.mp3",
            image:
                "./utils/images/chieuhomay.jpg"
        }, {
            name: "Nấu cho các em ăn",
            singer: "Bùi Anh Tuấn",
            path:
                "./utils/musics/chieuhomay.mp3",
            image:
                "./utils/images/chieuhomay.jpg"
        },

    ],
    render: function () {
        const renderSongs = this.songs.map((song, index) => {
            return `
                 <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = renderSongs.join("")
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function () {
        const cdWidth = cd.offsetWidth
        const _this = this;
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ],{
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause()
        //Xử  lí zoom cd
        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            const newCDWidth = cdWidth - scrollTop
            cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0
            cd.style.opacity = newCDWidth / 100
        }
        //Xử lí nút play
        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        //When song play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play()
        };
        //When song pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause()
        };
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const durationPercent = Math.floor(100 / audio.duration * audio.currentTime)
                progress.value = durationPercent
            }
        }
        progress.onchange = function (e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }       
        btnPrev.onclick = function () {
              if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }
        btnRandom.onclick = function () {
            _this.randomSong()
            audio.play()
            _this.isRandom = !_this.isRandom
            btnRandom.classList.toggle("active", _this.isRandom)
        } 
        audio.onended = function () {
             if (_this.isRandom) {
                 _this.randomSong()
                 audio.play()
             } else {
                _this.nextSong()
                audio.play()
             }
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path
    },
    nextSong : function () {
        this.currentIndex ++
        if (this.currentIndex > this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong : function () {
        this.currentIndex --
        if (this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong : function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        //Render playlist
        this.render();
        //Đinh nghĩa các thuộc tính cho object
        this.defineProperties();
        //Lắng nghe và xử lý các sự kiện trong DOM envents
        this.handleEvents();
        //Load bài hát đầu tiên trong list
        this.loadCurrentSong();
    }
}
app.start()