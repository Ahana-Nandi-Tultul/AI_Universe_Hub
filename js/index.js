const loadTools = async(dataLimit, sorted) =>{
    try{
        // start Spinner;
        isLoading(true);

        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
        const data = await res.json();
        displayTools(data.data.tools, dataLimit, sorted);
    }
    catch(error){
        console.log(error);
        isLoading(false);
        alert("Sorry! Fixing some internal problems");
        return 0;
    }
}

const displayTools = (data, dataLimit, sorted) =>{
    // console.log(data);
    const toolsDiv = document.getElementById('tools-div');
    
    // display silce of data
    const seeMoreBtnDiv = document.getElementById('see-more-btn-div')
    if(dataLimit && data.length > 6){
        data = data.slice(0,6);
        seeMoreBtnDiv.classList.remove('d-none');
    }
    else{
        seeMoreBtnDiv.classList.add('d-none');
    }

    // sort data by date
    if(sorted){
        data.sort((date1, date2)=>{
            return new Date(date1.published_in) - new Date(date2.published_in);
        });
    }
    
    toolsDiv.innerHTML = '';

    data.forEach(element => {
        
        const toolCardDiv = document.createElement('div');
        toolCardDiv.classList.add('col');
        // console.log(element);
        const toolCard = document.createElement('div');
        toolCard.classList.add("card", "mb-3", "p-3");
        let toolcardBody = document.createElement('div');
        toolcardBody.classList.add('card-body');
        toolCard.innerHTML = `
            <img src="${element.image}" class="card-img-top rounded" alt="...">
        `;
        toolcardBody.innerHTML = `
        <h5 class="card-title">Features</h5>
        `;
        if(element.features){
            displayFeatures(toolcardBody, element.features);
        }
        else(
            toolcardBody.innerHTML += `<p class= "text-center">No Feature Found.</p>`
        )
        toolcardBody.innerHTML += `
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title">${element.name}</h5>
                <p><i class="fa fa-calendar-o" aria-hidden="true"></i> ${element.published_in?element.published_in: "Not Found"}</p>
            </div>
            <div>
                <button type="button" onclick="loadDetails('${element.id}')" class="btn" data-bs-toggle="modal" data-bs-target="#showDetailsModal">
                <i class="fa fa-long-arrow-right text-danger" aria-hidden="true"></i>
            </button>
            </div>
        </div>
        `;
        toolCard.appendChild(toolcardBody)
        toolCardDiv.appendChild(toolCard)
        toolsDiv.appendChild(toolCardDiv);
        
    });
    // stop Spinner
    isLoading(false);
}



const displayFeatures = (toolcardBody, features) =>{
    const ol = document.createElement('ol');
    ol.classList.add('ps-3');
    ol.style.minHeight = '72px';
    features = features.slice(0, 3);
    features.forEach(feature => {
        // console.log(feature);
        ol.innerHTML += `
        <li>${feature}</li>
        `;
    });
    toolcardBody.appendChild(ol);
}

// see more button
document.getElementById('btn-seeMore').addEventListener('click', function(){
    loadTools();
})

// adding spinner
const isLoading = (status) =>{
    // console.log(status);
    const spinner = document.getElementById('spinner');
    if(!status){
        spinner.classList.add('d-none');
    }
    else{
        spinner.classList.remove('d-none');
    }
}

// sort by date
document.getElementById('btn-sort-date').addEventListener('click', function(){
    loadTools('', true);
})

// load details Info of tools
const loadDetails = async(id) =>{
    try{
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        showDetails(data.data);

    }
    catch(error){
        console.log(error);
        alert("Sorry! Fixing some internal problems");
        return 0;
    }
}

// show details info
const showDetails = (data) => {
    console.log(data);
    const detailsModal = document.getElementById('details-modal');
    detailsModal.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>    
        </div>
        <div class="col">
            <div class="card">
                <div class="position-relative">
                <div class="p-1">
                    <img src="${data.image_link[0]? data.image_link[0]:data.image_link[1]}" class="card-img-top" alt="...">
                </div>
                    <button type="button" class="position-absolute btn btn-danger
                    top-0 end-0 m-2">${(data.accuracy.score)*100 }% accuracy</button>
                </>
                <div class="card-body">
                    <h5 class="card-title text-center">${data.accuracy.description?"Hi, how are you doing today?": "Can you give any example?"}</h5>
                    <p class="card-text text-center">${data.accuracy.description?data.accuracy.description:"No! Not Yet! Take a break!!!"}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}
loadTools(6);