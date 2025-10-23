const api_url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/quotes");


function randoms(max,min)
{
    return Math.floor(Math.random()*(max-min))+min;
}

const quotes = async()=>
{
    const response = await fetch(api_url);
    var data = await response.json();
    let q1=JSON.parse(data.contents)
    console.log(q1)
    let x=randoms(0,49)
    console.log(q1[x].q)
    document.getElementById("quotes").innerText=q1[x].q
}




