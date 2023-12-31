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
        console.log();
        alert(error);
        return 0;
    }
}

// show details info
const showDetails = (data) => {
    console.log(data);
    const detailsModal = document.getElementById('details-modal');
    detailsModal.innerHTML = '';
    detailsModal.innerHTML = `
    <div class="row p-2 row-cols-1 row-cols-md-2 g-4">
        <div class="col">
            <div class="h-100 card bg-danger bg-opacity-10 border border-1 border-danger">
                <div class="card-body">
                    <h5 class="card-title my-2">${data.description ? data.description : "Not Found" }</h5>
                    <div class="d-flex flex-column  flex-md-row text-center my-3" id="price-div">
                        
                    </div>
                    <div class ="d-flex flex-column flex-md-row"> 
                        <div id="features-div">
                            <h5 class="card-title">Features</h5>
                        </div>
                        <div id="integration-div">
                            <h5 class="card-title">Integrations</h5>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        <div class="col">
            <div class="card h-100">
                <div class="position-relative">
                <div class="p-1">
                    <img src="${data.image_link[0]? data.image_link[0]:data.image_link[1]}" class="card-img-top" alt="...">
                </div>
                    <button type="button" class="position-absolute btn btn-danger
                    top-0 end-0 m-2">${data.accuracy.score ? ((data.accuracy.score)*100)+"% accuracy" : "Not Found" }</button>
                </>
                <div class="card-body">
                    <h5 class="card-title text-center my-4">${data.accuracy.description ? "Hi, how are you doing today?": "Can you give any example?"}</h5>
                    <p class="card-text text-center mb-2">${data.accuracy.description ? data.accuracy.description:"No! Not Yet! Take a break!!!"}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    const priceDiv = document.getElementById('price-div');
    if((data.pricing) && (data?.pricing.length > 0)){
       priceDiv.innerHTML = `
       <div class="p-2">
            <p class="text-success fs-6 fw-semibold">${(data.pricing[0].plan!=='Free') ?data.pricing[0].price : "Free of Cost"}/ Basic</p>
        </div>
        <div class="p-2">
            <p class="text-warning-emphasis fs-6 fw-semibold">${(data.pricing[1].plan!=='Free')?data.pricing[1].price:"Free of Cost"}/ Pro</p>
        </div>
        <div class="p-2">
            <p class="text-danger fs-6 fw-semibold">${(data.pricing[2].plan!=='Free')?data.pricing[2].price:"Free of Cost"}/ Enterprise</p>
        </div>`;
    }
    else{
        priceDiv.innerHTML =`<h5 class="card-title text-center">No Pricing Info Found</h5>`;
    }

    const featuresDiv = document.getElementById('features-div');
    if(data.features && Object.keys(data.features).length > 0){
        displayFeaturesInsideModal(data.features, featuresDiv)
    }
    else{
        featuresDiv.innerHTML += 
        `<p class= "text-center">No Feature Found.</p>`;
    }
    const integrationDiv = document.getElementById('integration-div');
    if(data.integrations && Object.keys(data.integrations).length > 0){
        displayIntegrationsInsideModal(data.integrations, integrationDiv)
    }
    else{
        integrationDiv.innerHTML += `
        <p class= "text-center">No Integration Found.</p>
        `;
    }
}

// display features inside modal
const displayFeaturesInsideModal = (data, infoDiv) =>{
    const ol = document.createElement('ol');
    ol.classList.add('ps-3');
    ol.style.minHeight = '72px';
    for(const key in data){
        // console.log(features[key]);
        ol.innerHTML += `
        <li>${data[key]['feature_name']}</li>
        `;
    }
    infoDiv.appendChild(ol);
}

// display integrations inside modal
const displayIntegrationsInsideModal = (data, infoDiv)=>{
    const ol = document.createElement('ol');
    ol.classList.add('ps-3');
    ol.style.minHeight = '72px';
    data.forEach(element =>{
        // console.log(features[key]);
        ol.innerHTML += `
        <li>${element}</li>
        `;
    })
    infoDiv.appendChild(ol);
}

loadTools(6);