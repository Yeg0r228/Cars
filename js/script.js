document.addEventListener('DOMContentLoaded', () => {
    const brandList = document.getElementById('brand-list');
    const modelList = document.getElementById('model-list');
    const yearList = document.getElementById('year-list');
    const imageGallery = document.getElementById('image-gallery');

    let structuredData = {};

    // Завантаження JSON-файлу
    fetch('js/image_sources.json')
        .then(response => response.json())
        .then(data => {
            structuredData = {};
            for (const key in data) {
                const [brand, model, year] = key.split('/');
                if (!structuredData[brand]) structuredData[brand] = {};
                if (!structuredData[brand][model]) structuredData[brand][model] = {};
                if (!structuredData[brand][model][year]) structuredData[brand][model][year] = [];
                structuredData[brand][model][year].push(data[key]);
            }
            populateBrandButtons();
        })
        .catch(error => console.error('Error loading JSON file:', error));

    // Заповнення кнопок брендів
    const populateBrandButtons = () => {
        brandList.innerHTML = '';
        modelList.innerHTML = '';
        yearList.innerHTML = '';
        imageGallery.innerHTML = '';

        const brands = Object.keys(structuredData).sort();
        brands.forEach(brand => {
            const button = document.createElement('button');
            button.textContent = brand;
            button.addEventListener('click', () => populateModelButtons(brand));
            brandList.appendChild(button);
        });
    };

    // Заповнення кнопок моделей
    const populateModelButtons = (brand) => {
        modelList.innerHTML = '';
        yearList.innerHTML = '';
        imageGallery.innerHTML = '';

        const models = Object.keys(structuredData[brand]).sort();
        models.forEach(model => {
            const button = document.createElement('button');
            button.textContent = model;
            button.addEventListener('click', () => populateYearButtons(brand, model));
            modelList.appendChild(button);
        });
    };

    // Заповнення кнопок років
    const populateYearButtons = (brand, model) => {
        yearList.innerHTML = '';
        imageGallery.innerHTML = '';

        const years = Object.keys(structuredData[brand][model]).sort();
        years.forEach(year => {
            const button = document.createElement('button');
            button.textContent = year;
            button.addEventListener('click', () => displayImages(brand, model, year));
            yearList.appendChild(button);
        });
    };

    // Відображення зображень
    const displayImages = (brand, model, year) => {
        imageGallery.innerHTML = '';

        const images = structuredData[brand][model][year];
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${brand} ${model} ${year}`;
            img.classList.add('car-image');
            imageGallery.appendChild(img);
        });
    };
});