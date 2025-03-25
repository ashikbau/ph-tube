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
    <figure>
    <img
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
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