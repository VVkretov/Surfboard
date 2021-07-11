let player;
const playerContainer = $(".player");

let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        if(playerContainer.hasClass("paused")) {
            playerContainer.removeClass("paused");
            player.pauseVideo();
        } else {
            playerContainer.addClass("paused");
            player.playVideo();
        }

    });
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }; 

    return `${minutes} : ${seconds}`;
}


const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $(".player__duration-estimate").text(formatTime(durationSec));

    if(typeof interval !== "undefined") {
        clearInterval(interval);
    }
    
    interval = setInterval(() => {
        const completedSec = player.getGurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;
        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

      function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
          height: '390',
          width: '660',
          videoId: 'FmzHq3U0UFE',
          events: {
            onReady: onPlayerReady,
            // 'onStateChange': onPlayerStateChange
          },
          playerVars: {
              controls: 0,
              disablekd: 0,
              showinfo: 0,
              rel: 0,
              autoplay: 0,
              modestbranding: 0
          }
        });
      }
