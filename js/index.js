const loadTools = async() =>{
    try{

        const res = await fetch(`https://openapi.programming-hero.co/api/ai/tools`);
        const data = await res.json();
        console.log(data);
    }
    catch(error){
        alert("Sorry! Fixing some internal problems");
        xonsole.log(error);
        return 0;
    }
}

loadTools();