export default function (hash) {
  return hash ?
    `http://trello-avatars.s3.amazonaws.com/${hash}/50.png` :
    `img/default_user_icon.png`;
}
