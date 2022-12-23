import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(currentTime) {
  const seconds = currentTime.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
}

const currentSeconds = localStorage.getItem('videoplayer-current-time');
const parsedCurrentSeconds = JSON.parse(currentSeconds) || 0;

player
  .setCurrentTime(parsedCurrentSeconds)
  .then(function () {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(error.message);
        break;

      default:
        console.log(error.message);
        break;
    }
  });
