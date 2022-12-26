//------------start setting -------------
let settingBox = document.querySelector(".setting-box");

let toggleSetting = document.querySelector(".toggle-setting");

toggleSetting.onclick = function () {
  this.classList.toggle("setting");
  settingBox.classList.toggle("open");
};

//switch color
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  //remove class active  color from item
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");

    //add  class active
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

let colorList = document.querySelectorAll(".color-list li");

colorList.forEach(function (li) {
  li.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    //us function handelActive
    handelActive(e)

  });
});

//end switch color

//start background color
let changeBackground = document.querySelectorAll(".change-background span");

let backgroundOption = true;

let backgroundInterval;

let backgroundLocal = localStorage.getItem("background-option");

if (backgroundLocal !== null) {
  if (backgroundLocal === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".change-background span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocal === "true") {
    document.querySelector(".change-background .yes").classList.add("active");
  } else {
    document.querySelector(".change-background .no").classList.add("active");
  }
}

changeBackground.forEach((span) => {
  span.addEventListener("click", function (e) {
      
    //use function handelActive
    handelActive(e)

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      changBackground();

      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background-option", false);
    }
  });
});

//end background color

//------------end setting ----------------

//------------start landingPage-----------
let landingPage = document.querySelector(".landing-page");
let imageArray = [
  "land-1.jpg",
  "land-2.jpg",
  "land-3.jpg",
  "land-4.jpg",
  "land-5.jpg",
];

function changBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomImage = Math.floor(Math.random() * imageArray.length);
      landingPage.style.background =
        'url("../images/' + imageArray[randomImage] + '")';
      landingPage.style.backgroundSize = "cover";
      landingPage.style.backgroundPosition = "center";
    }, 3000);
  }
}
changBackground();

//-----------end landingPage----------------

//-----------start Services

let ourServices = document.querySelector(".services");

window.onscroll = function () {
  let serviceOffsetTop = ourServices.offsetTop;

  let serviceOuterHight = ourServices.offsetHeight;

  let windowOutHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (
    serviceOffsetTop >

    serviceOuterHight + windowOutHeight - windowScrollTop

  ) 
  {
    let allSpan = document.querySelectorAll(".service-box .service-prog span");

    allSpan.forEach(function (span) {

      span.style.width = span.dataset.prog;

    });
  }
};
//-----------end Services

//--------start gallery---------------

//create popup
let ourGallery=document.querySelectorAll(".images-box img")

ourGallery.forEach ( img => {

  img.addEventListener("click" , (e) => {

    let overLay = document.createElement("div")

    overLay.className = "popup-overlay"

    document.body.appendChild(overLay)


    let popupBox=document.createElement("div")

    popupBox.className="popup-box"

    if(img.alt !== null){

      let headingImg=document.createElement("h3")

      let textImag=document.createTextNode(img.alt)

      headingImg.appendChild(textImag)

      popupBox.appendChild(headingImg)


    }

    let popupImag =document.createElement("img")

    popupImag.src=img.src

    popupBox.appendChild(popupImag)

    document.body.appendChild(popupBox)

    let closeBtn=document.createElement("span")

    let closeBtnText=document.createTextNode("X")

    closeBtn.appendChild(closeBtnText)

    closeBtn.className="close-btn"

    popupBox.appendChild(closeBtn)


  })
})

//close popup
document.addEventListener("click",function(e){

if(e.target.className =="close-btn"){

  e.target.parentNode.remove()

  document.querySelector(".popup-overlay").remove()

}
})
//--------end gallery---------------


//--------start bullets-----------------------

const allBullets = document.querySelectorAll(".nav-bulltes .bulltes")

let allLink=document.querySelectorAll(".links a")

function goToLinks(element){
  element.forEach(el=>{

    el.addEventListener("click",(e)=>{

    e.preventDefault()
     document.querySelector(e.target.dataset.section).scrollIntoView({
      
      behavior:"smooth"
     })
    })
  })
}

goToLinks(allBullets);
goToLinks(allLink)

//show or bullets in box

let allBulletsSpan=document.querySelectorAll(".bullets-option span")

let bulletsContainer=document.querySelector(".nav-bulltes")

let bulletStorage=localStorage.getItem("bullet-option")

if(bulletStorage !== null){

  allBulletsSpan.forEach(span=>{
    
    span.classList.remove("active")
  });

  if(bulletStorage === "block"){

    bulletsContainer.style.display="block"

    document.querySelector(".bullets-option .yes").classList.add("active")
  }

  else{

    bulletsContainer.style.display="none"

    document.querySelector(".bullets-option .no").classList.add("active")
 
  }
}


allBulletsSpan.forEach(span =>{

  span.addEventListener("click",function(e){

    if(span.dataset.display === "show"){

      bulletsContainer.style.display="block"

      localStorage.setItem("bullet-option","block")
      
    }else{
      bulletsContainer.style.display="none"
      localStorage.setItem("bullet-option","none")

    }
    handelActive(e)

  })
})
//--------end bullets-----------------------


//reset option on setting box

let clearLocalStorage=["color-option","background-option","bullet-option"]

document.querySelector(".reset-option").onclick=function(){

 //localStorage.removeItem("color-option")
  //localStorage.removeItem("background-option")
  //localStorage.removeItem("bullet-option")
 
  localStorage.clear(clearLocalStorage)
  window.location.reload()
}

//function handelActiveClass
function handelActive(ev){

  ev.target.parentElement.querySelectorAll(".active").forEach(ele =>{
   
    ele .classList.remove("active")
  
  })
  ev.target.classList.add("active")


}

//----------- start toggel menu-----------

let toggelBtn=document.querySelector(".toggel-menu")

let linksToggle=document.querySelector(" .links")

toggelBtn.onclick=function(e){
  e.stopPropagation()

  this.classList.toggle("menu-active")

  linksToggle.classList.toggle("open")
}


//click anywhere outside to close menu

document.addEventListener("click", (e)=> {

  if(e.target !== toggelBtn && e.target !== linksToggle){
   
    if(linksToggle.classList.contains("open")){

      toggelBtn.classList.toggle("menu-active");

      linksToggle.classList.toggle("open")
    }
  }
})


//stop propagation  on menu
landingPage .onclick=function(e){
  e.stopPropagation()
}

//----------- end toggel menu-----------


