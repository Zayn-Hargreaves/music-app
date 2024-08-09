// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);

    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        lrcType:1,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
            lrc:dataSong.lyrics
        }],
        autoplay: true
    });

    const elementAvatar = document.querySelector(".singer-detail .inner-avatar")
    ap.on("play", function () {
        elementAvatar.style.animationPlayState = "running"
    })
    ap.on('pause', function () {
        elementAvatar.style.animationPlayState = "paused";
    });
    ap.on("ended", function () {
        const link = `/songs/listen/${dataSong._id}`
        const options = {
            method: "PATCH"
        }
        fetch(link, options)
            .then(res => res.json())
            .then(data => {
                if (data && data.code == 200) {
                    const span = document.querySelector(".inner-listen span")
                    span.innerHTML = `${data.listen} lượt nghe`
                }
            })
    })
}

// button like
const buttonLike = document.querySelector("[button-like]")
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const idSong = buttonLike.getAttribute("button-like")
        const isActive = buttonLike.classList.contains("active")
        const typeLike = isActive ? "dislike" : "like"
        const link = `/songs/like/${typeLike}/${idSong}`
        const options = {
            method: "PATCH"
        }
        fetch(link, options)
            .then(res => res.json())
            .then(data => {
                if (data && data.code == 200) {
                    const span = buttonLike.querySelector("span")
                    span.innerHTML = `${data.like}`
                    buttonLike.classList.toggle("active")
                }
            })
    })
}

// favorite_song
const listButtonFavorite = document.querySelectorAll("[button-favorite]")
if (listButtonFavorite.length > 0) {
    listButtonFavorite.forEach((buttonFavorite) => {
        buttonFavorite.addEventListener("click", () => {
            const idSong = buttonFavorite.getAttribute("button-favorite")
            const isActive = buttonFavorite.classList.contains("active")
            const typeFavorite = isActive ? "unfavorite" : "favorite"
            const link = `/songs/favorite/${typeFavorite}/${idSong}`
            const options = {
                method: "PATCH"
            }
            fetch(link, options)
                .then(res => res.json())
                .then(data => {
                    if (data && data.code == 200) {
                        buttonFavorite.classList.toggle("active")
                    }
                })
        })
    })
}

// suggest search
const boxSearch = document.querySelector(".box-search")
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const innerSuggest = boxSearch.querySelector(".inner-suggest")
    input.addEventListener("keyup", () => {
        const keyword = input.value
        const link = `/search/suggest?keyword=${keyword}`
        fetch(link)
            .then(res => res.json())
            .then(data => {
                if (data && data.code == 200) {
                    const songs = data.songs
                    if (songs.length > 0) {
                        const html = songs.map(item =>
                            `
                                <a class="inner-item" href="/songs/detail/${item.slug}">
                                    <div class="inner-image">
                                        <img src="${item.avatar}">
                                    </div>
                                    <div class="inner-info">
                                        <div class="inner-title">${item.title}</div>
                                        <div class="inner-singer">
                                            <i class="fa-solid fa-microphone-lines"></i> ${item.infoSinger.fullName}
                                        </div>
                                    </div>
                                </a>`
                        )
                        const innerList = boxSearch.querySelector(".inner-list")
                        innerList.innerHTML = html.join("")
                        innerSuggest.classList.add("show")
                    } else {
                        innerSuggest.classList.remove("show")
                    }
                }
            })
    })
}
