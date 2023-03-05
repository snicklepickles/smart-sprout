const TOK = '2b3705c06e9544f3f92a389f8903eb62';
const CNT = 12
const OPENWEATHER = `https://api.openweathermap.org/data/2.5/forecast?q=city&units=metric&cnt=${CNT}&appid=${TOK}`;
var carouselWidth = $(".carousel-inner")[0].scrollWidth;
var cardWidth = 80;
var scrollPosition = 0;
$(".carousel-control-next").on("click", function() {
    
    if (scrollPosition < (carouselWidth )) { 
        scrollPosition += cardWidth;  
        $(".carousel-inner").animate({ scrollLeft: scrollPosition },600); 
    }
});
$(".carousel-control-prev").on("click", function() {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(".carousel-inner").animate(
            { scrollLeft: scrollPosition },600);
    }
});
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const LAT = position.coords.latitude;
        const LONG = position.coords.longitude;
        const GTOK = 'AIzaSyAC3hHVwLfU-zF_GvlpFZBvFZ1_C5HGoNU'
      
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LONG}&key=${GTOK}`)
            .then(response => response.json())
            .then(data => {
                const CITY = data.results[0].address_components.find(component => component.types.includes('locality')).long_name.toLowerCase();
                getForcast();
                async function getForcast(){
                    const RESPONSE = await fetch(OPENWEATHER.replace('city', CITY));
                    const DATA = await RESPONSE.json();
                    const FORECASTDATA = DATA.list;
                   
                    const CAROUSEL = document.querySelector('#weather')
                    const WEATHERCAROUSEL = new bootstrap.Carousel(CAROUSEL, {interval:false})
                    const WEATHERROW = document.querySelector('.carousel-inner');
                    for (let i=0; i< FORECASTDATA.length; i +=4 ) {
                        const FORECASTITEMS = FORECASTDATA.slice(i, i+4);
           
                        const CAROUSELITEM = document.createElement('div');
                        CAROUSELITEM.classList.add('carousel-item')

                        if(i === 0){
                            CAROUSELITEM.classList.add('active')
                        }

                        FORECASTITEMS.forEach((forecast)=>{
                            const forecastTime = forecast.dt_txt.split(/(\s+)/)[1];
                        
                            const forecastTemp = Math.round(forecast.main.temp);
                            const forecastIcon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
                            const forecastItem = document.createElement('div');
                            forecastItem.innerHTML = `
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${forecastTime}</h5>
                                        <img src="${forecastIcon}" alt="Weather icon">
                                        <p class="card-text">${forecastTemp} &deg;C</p>
                                    </div>
                                </div>
                            `;
                            WEATHERROW.appendChild(forecastItem);
                            
                        })
                       
                    }
                    
                    
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}