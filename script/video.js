const loadCatagories =()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - convert promise to json
    .then((res) => res.json())
    //3 - send data to display
    .then((data) => displayCategories(data.categories));
    
   
}
// load videos
const loadVideos =()=>{
    fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
    //2 - convert promise to json
    .then((res) => res.json())
    //3 - send data to display
    .then((data) => displayVideos(data.videos));
    
   
}

// display videos
const displayVideos =(videos) =>{
    // console.log(videos)
    const videoContainer = document.getElementById("videos");
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
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1 ">${video.others.posted_date} </span>`}
      
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
            <p></p>
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

        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;

        
        categoryContainer.append(button)

    
    })
   
}







loadCatagories();
loadVideos();