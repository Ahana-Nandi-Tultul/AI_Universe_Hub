const loadTools = async(dataLimit) =>{
    try{
        // start Spinner;
        isLoading(true);

        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
        const data = await res.json();
        displayTools(data.data.tools, dataLimit);
    }
    catch(error){
        console.log(error);
        isLoading(false);
        alert("Sorry! Fixing some internal problems");
        return 0;
    }
}

const displayTools = (data, dataLimit) =>{
    console.log(data);
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
                <button class= "btn"><i class="fa fa-long-arrow-right text-danger" aria-hidden="true"></i></button>
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
    ol.style.height = '72px';
    features = features.slice(0, 3);
    features.forEach(feature => {
        // console.log(feature);
        ol.innerHTML += `
        <li>${feature}</li>
        `;
    });
    toolcardBody.appendChild(ol);
}
document.getElementById('btn-seeMore').addEventListener('click', function(){
    loadTools();
})

const isLoading = (status) =>{
    console.log(status);
    const spinner = document.getElementById('spinner');
    if(!status){
        spinner.classList.add('d-none');
    }
    else{
        spinner.classList.remove('d-none');
    }
}

loadTools(6);