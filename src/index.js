import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import countryCardTpl from './templates/country-card.hbs'
import countrylistTpl from './templates/country-list.hbs'
import fetchCountries from "./fetchCountries.js"
import debounce  from 'lodash.debounce';
import {error} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css'

const inputRef = document.querySelector("input");
const cardWrapper = document.querySelector('.wrapper');

inputRef.addEventListener('input', debounce(onInputClick, 500))

function onInputClick(evt) {
    fetchCountries(evt.target.value).then(countryRender).catch(error => {alert("Enter country name, please")})
}

function countryRender(countries) {
    cardWrapper.innerHTML = ' ';
if (countries.length > 10) {
    error({title: false,
        text: "Too many matches found. Please enter a more specific query!", 
        shadow: true,
        stiker: false,
        delay: 3000, 
       })
      
} else if(countries.length > 1 && countries.length <= 10){
   
    countries.forEach(countryRenderList)
    
} else {
    countryRenderCard(countries)
}
}

function countryRenderList(country) {
    const markup = countrylistTpl(country);
    cardWrapper.insertAdjacentHTML('beforeend', markup)     
}

function countryRenderCard([country]) {
    const markup = countryCardTpl(country);
    cardWrapper.innerHTML = markup 
}

