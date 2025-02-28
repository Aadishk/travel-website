async function search() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    // If the query is empty, hide the container and exit
    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();

        let foundResults = false;

        // Search in Countries and Cities
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(query)) {
                    foundResults = true;
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `
                        <h3>${city.name}</h3>
                        <img src="${city.imageUrl}" alt="${city.name}" class="result-image">
                        <p>${city.description}</p>
                    `;
                    resultsContainer.appendChild(resultItem);
                }
            });
        });

        // Search in Temples
        data.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(query)) {
                foundResults = true;
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <h3>${temple.name}</h3>
                    <img src="${temple.imageUrl}" alt="${temple.name}" class="result-image">
                    <p>${temple.description}</p>
                `;
                resultsContainer.appendChild(resultItem);
            }
        });

        // Search in Beaches
        data.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(query)) {
                foundResults = true;
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <h3>${beach.name}</h3>
                    <img src="${beach.imageUrl}" alt="${beach.name}" class="result-image">
                    <p>${beach.description}</p>
                `;
                resultsContainer.appendChild(resultItem);
            }
        });

        // Show the container
        resultsContainer.style.display = 'block';

        // Display "No results found." if nothing was found
        if (!foundResults) {
            resultsContainer.innerHTML = '<p style="color: black; font-size: 1em;">No results found.</p>';
        }

    } catch (error) {
        console.error('Error fetching JSON:', error);
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = '<p>Failed to load search results. Please try again later.</p>';
    }
}


function clearResults() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    // Clear the input field
    searchInput.value = '';

    // Clear the search results
    resultsContainer.innerHTML = '';

    // Hide the results container
    resultsContainer.style.display = 'none';
}