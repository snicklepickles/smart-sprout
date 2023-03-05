import fetch from "node-fetch";

const TOKEN = "sk-rEHy6402d3f38e1fa160";
const id = 728;

(async () => {
    const response = await fetch(`https://perenual.com/api/species/details/${id}?key=${TOKEN}`);
    const json = await response.json();
    console.log(json["watering"]);
  })();

  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '63591a3a8amsh9c96b0be818b339p15bb70jsn02877705a3c1',
		'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
	}
};

fetch('https://house-plants.p.rapidapi.com/common/coralberry', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));