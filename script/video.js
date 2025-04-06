

function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;


    return ` ${hour} hour ${minutes} minutes ${remainingSeconds} seconds ago`
}


const removeActiveClass =()=>{
    const buttons = document.getElementsByClassName("category-btn");
  for(let btn of buttons){
    btn.classList.remove("active");
  }

}



const loadCatagories =()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - convert promise to json
    .then((res) => res.json())
    //3 - send data to display
    .then((data) => displayCategories(data.categories));
    
   
}
// load videos
const loadVideos =(searchText = " ")=>{
    fetch( `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    //2 - convert promise to json
    .then((res) => res.json())
    //3 - send data to display
    .then((data) => displayVideos(data.videos));
    
   
}

const loadCategoryVideo =(id)=>{
  
    fetch(` https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    //2 - convert promise to json
    .then((res) => res.json())
    //3 - send data to display
    .then((data) => {
        removeActiveClass();
    const activeBtn = document.getElementById(`btn-${id}`);
       activeBtn.classList.add("active");
        displayVideos(data.category)
    });

}

const loadDetails = async(videoId)=>{
    // console.log(videoId)
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video)
   
    

}

const displayDetails = (video) =>{
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML = `
    <img src=${video.thumbnail}/>
    <p>${video.description}<p/>
    `
// way 1
    // document.getElementById('showModalData').click()
    // way 2
    document.getElementById("customModal").showModal();

}

// display videos
const displayVideos =(videos) =>{
    // console.log(videos)
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML= ""
    if(videos.length == 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-screen flex flex-col gap-5 justify-center items-center">
        <img  src="assets/Icon.png"/>
        <h2 class="text-center text-xl font-bold">No Content Found</h2>

        </div>
        `
        return;
}else{
    videoContainer.classList.add("grid")
}
    videos.forEach((video)=>{
        // console.log(video);
        const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      alt="Shoes"
      class="h-full w-full object-cover" 
      
      />
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white text-xs rounded p-1 ">${getTimeString(video.others.posted_date)} </span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2 ">
   <div>
            <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt="" srcset="">
        </div>
        <div>
            <h2 class="font-bold">${video.title}</h2>
           
            <div class=" flex item-center gap-2">
             <p class="text-gray-400">${video.authors[0].profile_name}</p>
             ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />` : ""}

            
            
        </div>
            <p><button onClick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
        </div>
        
  </div>
    `
    videoContainer.append(card)
    })

}



const displayCategories =(categories)=>{
    const categoryContainer = document.getElementById("categories")
    // console.log(categories)
    categories.forEach(item=>{
        // console.log(item)
        // create a button

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onClick="loadCategoryVideo(${item.category_id})" class="btn category-btn"> ${item.category}</button>
        `

        
        categoryContainer.append(buttonContainer)

    
    })
   
}





document.getElementById("search-input").addEventListener("keyup",(e)=>{
    loadVideos(e.target.value);

})

loadCatagories();
loadVideos();