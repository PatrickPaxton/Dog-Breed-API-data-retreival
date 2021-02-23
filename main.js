let sam = document.getElementById("breed");
let con = document.getElementById("con");
let timer
let deleteFirstPhotoDelay

async function start(){
   try {
  
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data =  await response.json();
    consumeData(data.message);
   }catch (e) {
        console.log("There was a problem loading the various breeds")
   }
}

start();

   function consumeData(breeds){
       
    
    sam.innerHTML = `
    <select onchange = "loadByBreed(this.value)"> 
        <option class = "breed-option"> select a breed of dogs </option>
        ${Object.keys(breeds).map(function(breed){
            return `<option> ${breed} </option>` 
    }).join("")}
    </select>
    `
};

async function loadByBreed(breed){
   const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
   const data =  await response.json();
   createSlide(data.message);
};




function createSlide(images){
    let count = 0;
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if( images.length > 1){
        let imageCon = document.querySelector(".image-slide");
        imageCon.innerHTML =`
        <div class="img-container" style = "background-image: url('${images[0]}')">
        <div class="img-container" style = "background-image: url('${images[1]}')">
        `
        count += 2;
        if(images.length == 2) count = 0
        timer = setInterval(nextSlide, 3000);
    }else{
        let imageCon = document.querySelector(".image-slide");
        imageCon.innerHTML =`
        <div class="img-container" style = "background-image: url('${images[0]}')">
        <div class="img-container"></div>
        `
        timer = setInterval(nextSlide, 3000);

    }
        function nextSlide(){
        document.querySelector(".image-slide").insertAdjacentHTML("beforeend", `
            <div class="img-container" style = "background-image: url('${images[count]}')">
            `);
            deleteFirstPhotoDelay = setTimeout(function(){
                document.querySelector(".img-container").remove();
            }, 1100);
            if( count +1 >= images.length){
                count = 0;
            } else {
                count++;
            }
        }
}

