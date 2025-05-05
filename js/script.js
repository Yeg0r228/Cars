// Fetch data from the JSON file
fetch('js/image_sources.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('image-gallery');

        // Loop through the JSON data and create image elements
        for (const key in data) {
            const img = document.createElement('img');
            img.src = data[key];
            img.alt = key.split('/').join(' ');
            gallery.appendChild(img);
        }
    })
    .catch(error => console.error('Error loading JSON:', error));