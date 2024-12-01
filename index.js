const mainProductImage= document.querySelector('.img1');
const productThumbnailImages= document.querySelectorAll('.btns');
const lightboxContainer= document.querySelector('.lightbox-container');
const galleryButtons= document.querySelectorAll('.gallery-buttons');
const galleryMainImage= document.querySelector('.gallery-main-image');
const nextButton= document.querySelector(".next");
const previousButton= document.querySelector(".previous");
const closeButton= document.querySelector('.close-icon');
const scrollContainer= document.querySelector('.scroll-container');
const increasteQte= document.getElementById('increase-qte');
const decreaseQte= document.getElementById('decrease-qte');
const quantity= document.querySelector('.quantity');
const addToCart= document.querySelector('.add-cart');
const listOfItems= document.getElementById('list-of-items');
const notifBadge= document.getElementById('notif-badge');
const cart= document.querySelector('.icon1');
const cartContents= document.getElementById('cart-contents');
const checkoutButton= document.getElementById('checkout');
const menuButton= document.querySelector('.menu-icon');
const listBackground= document.querySelector('.ul-bg');
const closeMenuButton= document.querySelector('.icon-close');

let qte= 0;
let currentIndexMain= 1;
let currentIndexLightboxGallery= 1;

const imageMap= {
    1: "images/image-product-1.jpg",
    2: "images/image-product-2.jpg",
    3: "images/image-product-3.jpg",
    4: "images/image-product-4.jpg"
}; 

productThumbnailImages.forEach(thumbnail => { thumbnail.addEventListener('click', () => {

    let index= thumbnail.querySelector('img').dataset.index;
    assignImage(index, mainProductImage);
    currentIndexMain= index;
    removeActive(productThumbnailImages)
    thumbnail.classList.add('active')
})});

mainProductImage.addEventListener('click', ()=> {
 
    assignImage(currentIndexMain, galleryMainImage);
    removeActive(galleryButtons);
    AddActiveThumbnail(currentIndexMain, galleryButtons);
    lightboxContainer.classList.add('active');
    lightboxContainer.setAttribute('aria-hidden', 'false');
    scrollContainer.classList.add('active');
});
galleryButtons.forEach(button=>{
    button.addEventListener('click', ()=>{

        let index= button.querySelector('img').dataset.index;
        assignImage(index, galleryMainImage);
        currentIndexLightboxGallery= index; 
        removeActive(galleryButtons);
        button.classList.add('active')
    })
});
closeButton.addEventListener('click', ()=>{
    lightboxContainer.classList.remove('active');
    lightboxContainer.setAttribute('aria-hidden', 'true');
    scrollContainer.classList.remove('active');
});
nextButton.addEventListener('click', ()=>{

    if (lightboxContainer.classList.contains('active')) {
        currentIndexLightboxGallery= (currentIndexLightboxGallery% productThumbnailImages.length)+ 1;
        assignImage(currentIndexLightboxGallery, galleryMainImage);
        removeActive(galleryButtons);
        AddActiveThumbnail(currentIndexLightboxGallery, galleryButtons);
    }
    else {
        currentIndexMain= (currentIndexMain% productThumbnailImages.length)+  1
        assignImage(currentIndexMain, mainProductImage);
    }
});
previousButton.addEventListener('click', ()=>{

    if (lightboxContainer.classList.contains('active')) {
        currentIndexLightboxGallery= (currentIndexLightboxGallery - 2 + productThumbnailImages.length)% productThumbnailImages.length +1;
        assignImage(currentIndexLightboxGallery, galleryMainImage);
        removeActive(galleryButtons);
        AddActiveThumbnail(currentIndexLightboxGallery, galleryButtons);
    }
    else{
        currentIndexMain= (currentIndexMain - 2 + productThumbnailImages.length)% productThumbnailImages.length +1;
        assignImage(currentIndexMain, mainProductImage);
    }
});
increasteQte.addEventListener('click', ()=>{
    qte++;
    quantity.innerHTML= qte.toString();
    
});
decreaseQte.addEventListener('click', ()=>{
    if (qte> 0){
    qte--;
    quantity.innerHTML= qte.toString();
    }
});
addToCart.addEventListener('click', ()=>{
    if (qte> 0){
        document.querySelector('.empty-cart-msg').style.display="none";
        const content= `
        <li>
                <img class="cart-product-img" src="images/image-product-1-thumbnail.jpg" alt="product image">
                <div class="list-item">
                <p>Fall Limited Edition Sneakers</p>
                <div class="total-price">
                    <p>$125.00 x<span class='item-quantity'>${qte}</span</p>
                    <p class="total">$375.00</p>
                </div>
                </div>
                <button class="delete">
                <img src="images/icon-delete.svg" alt="delete icon">
                </button>
            </li>
        `;
        listOfItems.innerHTML+= content;
        checkoutButton.classList.remove('hidden');
        notifBadge.innerHTML= (Number(notifBadge.innerHTML)+ qte).toString();
        if (cartContents.classList.contains('hidden')){
            notifBadge.classList.remove('hidden');
        }
        else {
            notifBadge.innerHTML= "0";
        }
        qte= 0;
        quantity.innerHTML= "0";
    }
});
cart.addEventListener('click',()=>{
    const isHidden= cartContents.classList.toggle('hidden');
    
    if (!isHidden){
        notifBadge.classList.add('hidden');
        notifBadge.innerHTML= "0";
        cart.setAttribute('aria-expanded', 'true')}

    else{
        cart.setAttribute('aria-expanded', 'false');
    }
});
menuButton.addEventListener('click', ()=>{
    listBackground.classList.add('active');
    listBackground.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded','true')
});
closeMenuButton.addEventListener('click', ()=>{
    listBackground.classList.remove('active');
    listBackground.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded','false')
});
function assignImage(index, imageId){

    imageId.src= imageMap[index];
    // currentIndex= index; 
}
function removeActive(array){
    array.forEach(element =>element.classList.remove('active'));
}
function AddActiveThumbnail(index, array){

    const thumbnail= array[index- 1];
    thumbnail.classList.add('active')
}
