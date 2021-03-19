// Check if there's local storage color option

let mainColors = localStorage.getItem("color-option");

if (mainColors !== null){ // it's mean the local storage is not empty becuse it is normal equal none

//console.log('local storage is not empty');
//console.log('localStorage.getItem("color-option")');

document.documentElement.style.setProperty('--main-color' ,mainColors );

 // Remove Active class from all  colors list item
document.querySelectorAll(".colors-list li").forEach(element => {  

  element.classList.remove("active");

// Add active class on Element With Data color === local storage item

if (element.dataset.color === mainColors) {

  // Add Active Class
  element.classList.add("active");

}

});

}

// Random Background option 
let backgroundOption = true;

// varible to control the background interval 
// I'm need varible interval to clear if any body click on button  tell the js to stop background randomize and make clear to interval for stop loop
let backgroundInterval; 

//check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not EMpty

if (backgroundLocalItem !== null) {

  if (backgroundLocalItem === 'true') {

    backgroundOption = true;
  
  } else {

    backgroundOption = false;

  }
}

  // Remove Active class from span 
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
   
   element.classList.remove("active");

  });
   
  if (backgroundLocalItem === 'true') {

    document.querySelector(".random-backgrounds .yes").classList.add("active");
  }else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    
    // Toggle Class fa-spin For Rotation on self
    this.classList.toggle("fa-spin");
     
    // toggle class open main setting Box 
    document.querySelector(".setting-box").classList.toggle("open");
};

//Switch colors 

const colorsLi = document.querySelectorAll(".colors-list li"); // kdh b2a 3ndy ekakoan bta3ty fi array a2dar alop 3liha or mmomkn testkhdm method arry from

 // loop in all list item

  colorsLi.forEach(li => {

    // click on every list item
  li.addEventListener("click", (e) => {

  // el li eli inta hados 3liha higib eldataset bta3tha 
  
    //set color on Root 
    document.documentElement.style.setProperty('--main-color' , e.target.dataset.color);

    // Set color on local storage

   localStorage.setItem("color-option" , e.target.dataset.color );

   handleActive(e); // el function di bt2bl mni al event fahdih el (e) el hia elevent

   });

  });
// Switch Random Background Option

const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach(span => {

  // Click On Every Span
  span.addEventListener("click", (e) => {

    handleActive(e); // el function di bt2bl mni al event fahdih el (e) el hia element
    
     e.target.classList.add("active");

    if (e.target.dataset.background === 'yes') {

      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);

    } else {

      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);

    }

  });


});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// Get array of images for select the random background images
let imgsArray =["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];



// function To Randomize Imgs

function randomizeImgs() {

  if (backgroundOption === true ) {

   
    backgroundInterval = setInterval(()=> {

  // Get random number
  let randomNumber = Math.floor(Math.random() * imgsArray.length);
  
  // change background image url
  
  landingPage.style.backgroundImage ='url("imgs/' + imgsArray[randomNumber] + '")';
  
  } , 5000);

  }

}

randomizeImgs();

// Select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

 // get skills offset top 
 let skillsOffsetTop = ourSkills.offsetTop; // (offsetTop)  returns the distance of the outer border of the current element relative to the inner border of the top of the offsetParent node.
                                                          // ao elmasfa mn our skills wl fo2
 // Skills Outer height 
 let skillsOuterHeight = ourSkills.offsetHeight;  //returns the height of an element, including vertical padding and borders
 
 //window Height
 let windowHeight = this.innerHeight; // el (innerheight) it's get the height of the window you are in
                                      // and (this) it's return to the window
    
 //Get window scrol top 
 let windowScrollTop = this.pageYOffset; // it's returns the number of pixels the document is curently scrolled
  //this.console.log(skillsOffsetTop);

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

    let allSkills =  document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = skill.dataset.progress;
    });
  }

};


// Create Popup With the images 

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', (e) => {

    //create over lay Element 
    let overlay = document.createElement("div");

    // Add class to overlay 
    overlay.className = "popup-overlay";

    // Append the overlay to body
    document.body.appendChild(overlay);

    // Create Popup 
    let popupBox = document.createElement("div");

    // Add class to the popup Box
    popupBox.className = 'popup-box';

    // if altrnate for image is empty
    if (img.alt !== null ) {

      //create Heading 
      let imgHeading = document.createElement("h3");

      // Create text for Heading 
      let imgText = document.createTextNode(img.alt);

       // Append the text to the Heading 
       imgHeading.appendChild(imgText);

       // Append the heading to the popup box
       popupBox.appendChild(imgHeading);
    } 

    // Create the Image
     let popupImage = document.createElement("img");
     
     // set Image source 
     popupImage.src = img.src;  //(img.src) dh el source bta3 elimage eli bt dos 3liha
     
     // Add image to popup box
     popupBox.appendChild(popupImage);

     // Append the popup box to the body
     document.body.appendChild(popupBox);

     // Create text close Span  
     let closeButton = document.createElement("span");

     // Create the close Button 
     let closeButtonText = document.createTextNode("X");

     // Append the text to close Button 

     closeButton.appendChild(closeButtonText);

     // Add close Button to the popup Box 
     popupBox.appendChild(closeButton);

     // Add class to close  Button 
     closeButton.className =  'close-button';

     // Add close button yo the popup box
     popupBox.appendChild(closeButton);
     

  });

});

 // close popup 
 // esta5dmna hna document 3shan n5tar el3onsor  la2no msh maogod fi elsf7a e7na ansh2nah b js.


 document.addEventListener("click", function (e) {

  if (e.target.className == 'close-button') {

    // remove the current popup
    e.target.parentNode.remove();

    // remove overlay 
    document.querySelector(".popup-overlay").remove();
    
  }

 });

 // Select All Bullets
 const allBullets = document.querySelectorAll(".nav-bullets .bullet");

 // Select All Links 
 const allLinks = document.querySelectorAll('.links a');

 function scrollToSomeWhere(element) {

  element.forEach(elem => {

    elem.addEventListener("click", (e) => {

      e.preventDefault();  // bnmn3 elftradi 3shan  al link lma tdos 3liha ma t3'yrsh fi link el sf7a wo twadi bs 3l elmkanb eli fih custom attribute
      
      document.querySelector(e.target.dataset.section).scrollIntoView({
        // Element.scrollIntoView() this is method existing in web API. to make scroll to some where. in a way smooth

        behavior: 'smooth'
      });

    });

  });

 }

 scrollToSomeWhere(allBullets);
 scrollToSomeWhere(allLinks);


 // Handle Active State 
 function handleActive(ev){

   // remove active class from all childerns 
   ev.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.classList.remove("active");

  });

  //add active on target  element eli hoa 3ka nafs el li eli bados 3liha

  ev.target.classList.add("active");
 }


 let bulletsSpan = document.querySelectorAll(".bullets-option span");

 let bulletsContainer = document.querySelector(".nav-bullets");

 let bulletlocalItem = localStorage.getItem("bullets_option");
 
 if (bulletlocalItem !== null ){ //m3naha inha msh fadih mehtagin fi el 7alt el show ndif 7aga wo fi el Hide ndif 7aga

  bulletsSpan.forEach(span => {

    span.classList.remove("active");

  });

  if (bulletlocalItem === 'block') {

    bulletsContainer.style.display = 'block';

    document.querySelector(".bullets-option .yes").classList.add("active");

  }else{
   
    bulletsContainer.style.display = 'none';

    document.querySelector(".bullets-option .no").classList.add("active");

  }

 }

 bulletsSpan.forEach(span => {


  span.addEventListener('click', (e) =>{


  if (span.dataset.display=== 'show') {

    localStorage.setItem("bullets_option" , 'block');
  
    bulletsContainer.style.display = 'block';  // dh css style
 
  }else{

    bulletsContainer.style.display = 'none';

    localStorage.setItem("bullets_option" , 'none');

  }

  handleActive(e);

  });

 });

 // Reset Buttton 
 document.querySelector(".reset-options").onclick = function () {

   //localStorage.clear();  dh hims7 ai 7aga fi el local storage mmkn ykon 3ndi 7aga ghir el setting

   localStorage.removeItem("color-option");
   localStorage.removeItem("background_option");
   localStorage.removeItem("bullets_option");

   window.location.reload();

  };

  // Toggle Menu 
  let toggleBtn = document.querySelector(".toggle-menu");
  let tLinks = document.querySelector(".links");

  toggleBtn.onclick = function (e) {

    //stop propagation
   // e.stopPropagation(); // 3shan lma ados 3la el span ma fish 7aga t7sl
                 // la2n dh lo msh mogod knt lma tdos 3la 5tot el hi  span kan hi2fl el menu wana 3wzha t2fl bs lma ados braha

    // Tpggle Class "menu-active " on Buttons
    this.classList.toggle('menu-active');
    // Tpggle Class "Open" on links
    tLinks.classList.toggle('open');
  };

  // Click anywhere outside Menu And toggle Button 
  document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) { //ya3ni lo elmakan eli btdos fih msh wa7d mn dol elzorar ao menu e3ml li h 2olk 3lih
         
      //console.log("This Is not the Button And Not the Menu");

      // Check if Menu is open 
      // msh hainf3 tro7 t2flo onta msh 3arf hoa mfto7 wala la 
      if (tLinks.classList.contains("open")) {

        //console.log("Menu Is Open");
        toggleBtn.classList.toggle('menu-active');
  
          tLinks.classList.toggle('open');

      }

    }

  });
  
  // Stop Propagation On Menu
  tLinks.onclick = function (e) {
     e.stopPropagation();
  }