const loadTools = async() =>{
    try{

        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
        const data = await res.json();
        displayTools(data.data.tools);
    }
    catch(error){
        console.log(error);
        alert("Sorry! Fixing some internal problems");
        return 0;
    }
}

const displayTools = (data) =>{
    console.log(data);
    const toolsDiv = document.getElementById('tools-div');
    data.forEach(element => {
        const toolCardDiv = document.createElement('div');
        toolCardDiv.classList.add('col');
        console.log(element);
        toolCardDiv.innerHTML = `
        <div class="card mb-3">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
        </div>
        `;
        toolsDiv.appendChild(toolCardDiv);
        
    });
}

loadTools();