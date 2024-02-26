const artist = 'kanye';
const album = 'donda';
const specialEdition = true;
const songs = ['jail', 'god breathed', 'off the grid', 'hurricane', 'praise god'];
const duration = 300;
let totalNumbers = 0;

function addSong(song) {
    songs.push(song);
}

console.log(artist, album, specialEdition, songs, duration);
if (specialEdition != false) {
    console.log('dit album is heel speciaal');
}
;

// if (duration <= 30) {
//     console.log('kort album');
// } else if (duration <= 60) {
//     console.log('gemiddeld album');
// } else if (duration <= 90) {
//     console.log('groot album');
// } else {
//     console.log('mega album');
// }

// const albumType =
//     duration <= 30 ? 'kort album' :
//         duration <= 60 ? 'gemiddeld album' :
//             duration <= 90 ? 'groot album' :
//                 'mega album';
//
// console.log(albumType);

switch (true) {
    case duration <= 30:
        console.log('zeer kort');
        break;
    case duration <= 60:
        console.log('gemiddeld');
        break;
    case duration <= 90:
        console.log('best lang');
        break;
    default:
        console.log('onmogelijke lengte');
}


songs.push('ok ok');

console.log(`er staan ${songs.length} nummers in dit album`);

songs[1] = 'jonah';

console.log(artist, album, specialEdition, songs, duration);

// for (let i = 0; i < songs.length; i++) {
//     console.log(songs[i])
// }

for (const song of songs) {
    console.log(song);
}


addSong('24');
addSong('moon');
console.log(artist, album, specialEdition, songs, duration);

function showDate(now) {
    const date = new Date();
    const month = date.toLocaleString('nl-NL', {month: 'long'});
    console.log(`${date.getDate()} ${month} ${date.getFullYear()}`);
}

showDate()


function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log(reverseString('olleh'));

function theAnswerToLife(numbersArray) {

    let numberChecker;
    for (const number of numbersArray) {
        totalNumbers += number;
        // console.log(totalNumbers)
        if (number === 42) {
            numberChecker = true;
            break;
        } else {
            numberChecker = false;
        }
    }
        if (totalNumbers === 42 || numberChecker === true) {
            console.log('true')
        } else {
            console.log('false')

        }
}
theAnswerToLife([40, 2, 1000]);
theAnswerToLife([40, 2, 1000, 42, 10, 20]);

function daysUntilMyBirthday(birthDate) {

}