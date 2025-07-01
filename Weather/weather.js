
let keyPromise = fetch('key.json')
  .then(res => res.json())
  .then(config => config.params.key);
const imgDiv = document.getElementById("Img");
imgDiv.style.backgroundSize = "contain";
imgDiv.style.backgroundPosition = "center";
imgDiv.style.backgroundRepeat = "no-repeat";
let para=document.getElementById("we-repo");
// const apiKey = '76f92af14e444478be190809252606';

const Weather_report = async(event) =>
{
    event.preventDefault();

try {
let city=document.getElementById("City-name").value;
const key = await keyPromise; 

const URL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

let response=await fetch(URL);
console.log(response);
let res=await response.json()
console.log(res)

//variable-declaration
const temp=res.current.temp_c;
const humidity=res.current.humidity;
const wind=res.current.wind_kph;
const feelslike=res.current.feelslike_c;
const condn=res.current.condition.text;
const img=res.current.condition.icon;
imgDiv.style.backgroundImage = `url("https:${img}")`;

//change content on fetching required data
para.innerHTML=`Temp in ${city} is ${temp}°C <br> Wind:${wind}kph <br>Humidity:${humidity}% <br>Condition:${condn} <br> Feelslike:${feelslike}°C `
}

catch(e)
{
    let para=document.getElementById("we-repo");
    para.innerText="Enter a valid City-Name";
}


//para-styling for data to be printed
para.style.color = "#E0FFFF"; 
para.style.fontFamily="Georgia, serif";
para.style.fontSize="18px";

}