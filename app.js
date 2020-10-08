const URL = "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json";
//const URL = "https://fakestoreapi.com/products";

let allPhotos = [];
const app = document.querySelector("#app");

const createCard = (divColumn, photo) => {

  let fecha = new Date(photo.pubdate);
  let dia = fecha.getUTCDate();
  let mes = fecha.getUTCMonth();
  let anyo = fecha.getUTCFullYear();

  let divCard = document.createElement("div");
  divCard.classList = "card";
  divCard.style.marginTop = "1rem";

  let divBodyCard = document.createElement("div");
  divBodyCard.classList = "card-body";

  let cardTitle = document.createElement("h5");
  cardTitle.classList = "card-title";
  cardTitle.innerText = photo.title;

  let pCard = document.createElement("p");
  pCard.classList = "card-text";
  pCard.innerText = photo.author;

  let dateCard = document.createElement("p");
  dateCard.classList = "card-text";

  let smallDate = document.createElement("small");
  smallDate.classList = "text-muted";
  smallDate.innerText = `${dia}-${mes}-${anyo}`

  let imgPhoto = document.createElement("img");
  imgPhoto.classList = "card-img-top";
  imgPhoto.style.marginTop = "0px";
  imgPhoto.src = photo.url;


  divColumn.appendChild(divCard);
  divCard.appendChild(imgPhoto);
  divCard.appendChild(divBodyCard);
  divBodyCard.appendChild(cardTitle);
  divBodyCard.appendChild(pCard);
  divBodyCard.appendChild(dateCard);
  dateCard.appendChild(smallDate);

}


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


const orderPhotos = (photos) => {
  let divRow;
  let divColumn;
  photos.forEach(photo => {
    if (photos.indexOf(photo)%4 === 0) {
      divRow = createRow();
      divColumn = createColumn(divRow);
      createCard(divColumn, photo);
    } else {
      divColumn = createColumn(divRow);
      createCard(divColumn, photo);
    }
  })
}

const findPhoto = (photos, element) => {
  let arrPhotos = [];
  
  console.log(element);
  photos.map(photo => {
    if (photo.title.toLowerCase() === element || photo.title.split("").includes(element))  arrPhotos.push(photo);
  });
  orderPhotos(arrPhotos);
}

const getPhotos = URL => {
  fetch(URL).then(response => onSuccesResponse(response)).catch(error => onErrorResponse (error))
}

const onSuccesResponse = response => response.json().then(photos => {
  allPhotos = photos;
  orderPhotos(photos);
});
const onErrorResponse = error => console.error(`Aqui esta el error ${error}`);

getPhotos(URL);

const search = document.getElementById("formSearch");
search.addEventListener("change", ()=>{
  console.log(search.value);
  findPhoto(allPhotos, search.value);
})





