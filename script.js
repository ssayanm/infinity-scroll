const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash api
const count = 3;
const apiKey = "9v-iHcKbKs7E7GZyvLUf6QzFcxLXkDIx9y8X8riSLNU";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const proxyUrl = "https://cors.sayanmukherjee.com/";

// Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 20;
  }
};

//helper function to set attribtues on Dom elements
const setAttributes = (element, attriutes) => {
  for (const key in attriutes) {
    element.setAttribute(key, attriutes[key]);
  }
};

//create elements for links and photos and add to dom
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.map((photo) => {
    //create a link to unsplash
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });

    //create img for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //putting <img> inside <a> -> imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from unsplash api
const getPhotos = async () => {
  try {
    const res = await fetch(proxyUrl + apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
    // getQuote();
  }
};

//scrolling near bottom checking
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
