async function getWeather(location) {
    const requestUrl = `https://api.weatherapi.com/v1/current.json?key=688355bae9f243b0ab8202018230410&q=${location}`;
    const response = await fetch(requestUrl);
    const weather = await response.json();
    console.log(weather);
    displayTemp(weather);
}


// getWeather(locations);

function displayTemp(response) {
    const container = document.querySelector('.container');

    const content = document.createElement('div');
    content.classList.add('content');

    // Location header
    const locHeader = document.createElement('div');
    locHeader.classList.add('locheader');
    locHeader.textContent = `${response.location.name}, ${response.location.region}`;
    content.appendChild(locHeader);

    // Temperature content
    const temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = `${response.current.temp_f} F`;
    content.appendChild(temp);

    // Unit Checkbox
    const checkbox = document.createElement('div');
    checkbox.id = 'checkbox';
    const checklabel = document.createElement('label');
    checklabel.for = 'check';
    checklabel.textContent = 'Show in celcius';
    const check = document.createElement('input');
    check.id = 'check';
    check.type = 'checkbox';
    check.addEventListener('change', () => {
        let temp2 = document.querySelector('.temp');
        if (check.checked) {
            temp2.textContent = `${response.current.temp_c} C`;
        }
        else {
            temp2.textContent = `${response.current.temp_f} F`;
        }
    })
    checkbox.appendChild(check);
    checkbox.appendChild(checklabel);
    content.appendChild(checkbox);

    container.append(content);

}

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    try {
        const content = document.querySelector('.content');
        content.remove();
    }
    catch(err) {
        console.log(err);
    }

    const userInput = document.getElementById('location').value;
    getWeather(userInput);
})

//weather.location.name, weather.location.country


