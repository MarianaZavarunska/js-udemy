'use strict';

const btn = document.querySelector('.btn-country');
const contriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');


// const renderCountry = (data, className = '') => {
//     const html = ` 
//     <article class="country ${className}">
//      <img class="country__img" src="${data.flag}" />
//      <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(2)} people</p>
//       <p class="country__row"><span>🗣</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${(data.currencies[0].name).split(' ').length > 1 ? ((data.currencies[0].name).split(' '))[1].charAt(0).toUpperCase() + ((data.currencies[0].name).split(' '))[1].slice(1) : data.currencies[0].name}</p >
//     </div >
//   </article > `;
//     contriesContainer.insertAdjacentHTML('beforeend', html);
//     // contriesContainer.style.opacity = 1;
// };

// const renderErr = (e) => {
//     contriesContainer.insertAdjacentText('beforeend', `${e.message}`);
//     // contriesContainer.style.opacity = 1;
// };

// // XMLHttpRequest

// // const getCountryAndNeighborData = (country) => {
// //     const request = new XMLHttpRequest();
// //     request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //     request.send();

// //     request.addEventListener('load', function () {
// //         const [data] = JSON.parse(this.responseText);
// //         console.log(data);

// //         // Render Country
// //         renderCountry(data);

// //         const [neighbour] = data.borders;

// //         if (!neighbour) return;

// //         const request2 = new XMLHttpRequest();
// //         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
// //         request2.send();

// //         request2.addEventListener('load', function () {
// //             const data = JSON.parse(this.responseText);
// //             console.log(data);

// //             renderCountry(data, 'neighbour');
// //         });

// //     });
// // };

// // getCountryAndNeighborData('ukraine');
// // // getCountryAndNeighborData('portugal');

// // Promises

// const getJSON = (url, errMsg = 'Something went wrong') => {
//     return fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`${errMsg}(${response.status})`);
//             }
//             return response.json();
//         });
// };


// // const getCountry = (country) => {
// //     fetch(`https://restcountries.com/v2/name/${country}`)
// //         .then(response => {
// //             if (!response.ok) {
// //                 throw new Error(`${errMsg}(${response.status})`);
// //             }
// //             response.json();

// //         }).then(data => {

// //             renderCountry(data[0]);
// //             const neighbor = data[0].borders?.[0];

// //             if (!neighbor) throw new Error(`${data[0].name} doesn't have neighbors`);

// //             return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);

// //         }).then(response => response.json())
// //         .then(data => renderCountry(data, 'neighbour'))
// //         .catch(err => renderErr(err))
// //         .finally(() => contriesContainer.style.opacity = 1);
// // };

// const getCountry = (country) => {
//     getJSON(`https://restcountries.com/v2/name/${country}`, 'Country is not found')
//         .then(data => {

//             renderCountry(data[0]);
//             const neighbor = data[0].borders?.[0];

//             if (!neighbor) throw new Error(`${data[0].name} doesn't have neighbors`);

//             return getJSON(`https://restcountries.com/v2/alpha/${neighbor}`, `${data[0].name} doesn't have neighbors`);
//         }).then(data => renderCountry(data, 'neighbour'))
//         .catch(err => renderErr(err))
//         .finally(() => contriesContainer.style.opacity = 1);
// };


// // Asynchronous JavaScript

// // Coding Challenge #1

// // 106424220309536e15913538x125425;
// // 'https://geocode.xyz/51.50354,-0.12768?geoit=json&auth=[106424220309536e15913538x125425]';


// const whereAmI = (lat, lng) => {
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(response => {

//         if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);

//         return response.json();

//     }).then(data => {

//         console.log(`You are in ${data.city}, ${data.country}`);
//         return fetch(`https://restcountries.com/v2/name/${data.country}`);

//     }).then(response => {
//         if (!response.ok) {
//             throw new Error(`${errMsg}(${response.status})`);
//         }
//         return response.json();

//     }).then(data => renderCountry(data[0]))
//         .catch(err => renderErr(err))
//         .finally(() => {
//             contriesContainer.style.opacity = 1;
//         });

// };

// btn.addEventListener('click', () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             whereAmI(latitude, longitude);
//         });
//     } else {
//         alert('Location undefined');
//     }

// });

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);


// Coding Challenge #2

const wait = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
};

const createImage = (imgPath) => {

    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = imgPath;


        img.addEventListener('load', () => {
            imgContainer.append(img);
            resolve(img);
        });
        img.addEventListener('error', () => reject(new Error('Img not found!'))
        );


    });
};
// let currImg;
// createImage('./img/img-1.jpg').then(img => {
//     currImg = img;
//     console.log('Img 1 is loaded');
//     return wait(2);
// }).then(() => {
//     currImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
// }).then(img => {
//     currImg = img;
//     console.log('Img 2 is loaded');
//     return wait(2);
// }).then(() => currImg.style.display = 'none')
//     .catch(err => console.error(err));


// Coding Challenge #3

const loadNPause = async () => {
    try {
        // Load img 1 
        let img = await createImage('./img/img-1.jpg');
        console.log('Img 1 is loaded');
        await wait(2);
        img.style.display = 'none';

        // Load img 2
        img = await createImage('./img/img-2.jpg');
        console.log('Img 2 is loaded');
        await wait(2);
        img.style.display = 'none';

    } catch (err) { console.error(err); };

};

// loadNPause();

//  Part 2
const loadAll = async (imgsArr) => {
    try {
        const imgs = imgsArr.map(async img => await createImage(img));
        console.log(imgs);

        const imgsEll = await Promise.all(imgs);
        console.log(imgsEll);
        imgsEll.forEach(img => img.classList.add('parallel'));
    } catch (error) {
        console.error(error);
    }
};
loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);