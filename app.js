const URL = "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json";
//const URL = "https://fakestoreapi.com/products";


const createRow = () => {
  let divRow = document.createElement("div");
  divRow.classList = "row";
  app.appendChild(divRow);
  return divRow;
  
}

const createColumn = (divRow) => {
  let divColumn = document.createElement("div");
  divColumn.classList = "column";
  divRow.appendChild(divColumn);
  return divColumn;
}

const createImg = (divColumn, photo) => {
  let imgPhoto = document.createElement("img");
  imgPhoto.src = photo.url;
  divColumn.appendChild(imgPhoto);
}

const orderPhotos = (photos) => {
  let divRow;
  let divColumn;
  photos.forEach(photo => {
    if (photos.indexOf(photo)%4 === 0) {
      divRow = createRow();
      divColumn = createColumn(divRow);
      createImg(divColumn, photo);
    } else {
      divColumn = createColumn(divRow);
      createImg(divColumn, photo);
    }
  })
}


const getPhotos = URL => {
  fetch(URL).then(response => onSuccesResponse(response)).catch(error => onErrorResponse (error))
}

const onSuccesResponse = response => response.json().then(photos => {
  orderPhotos(photos);
});
const onErrorResponse = error => console.error(`Aqui esta el error ${error}`);

getPhotos(URL);

/*
fetch('url')
.then(Resolve)
.then(Reject) OR .catch(Reject)

OR directly 

fetch('url').then(ResolveFuntion, RejectFuntion)

*/


const app = document.querySelector("#app");





