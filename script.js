// Function to fetch data from API and create product cards
async function fetchProducts() {
    try {
        // Fetch data from API
        const response = await fetch('https://dummyjson.com/products?limit=15');
        const data = await response.json();

        // Get the product container element
        const productContainer = document.getElementById('product-container'); 


        // Clear previous products
        productContainer.innerHTML = '';

        // Set up grid layout
        productContainer.style.display = 'grid';
        productContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        productContainer.style.gridGap = '20px';
        // productContainer.style.backgroundColor='#FEDBD0';

        
    // Iterate through each product and create a product card
    data.products.forEach(product => {
        // Create a div for the product card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.style.border = '1px solid #ccc';
        productCard.style.borderRadius = '5px';
        productCard.style.padding = '20px';
        productCard.style.marginBottom = '20px';
        productCard.style.maxWidth = '300px';
        productCard.style.width = '100%';
        productCard.style.boxSizing = 'border-box';
        // productCard.style.backgroundColor='#442C2E';

        // Create an image element for the main image (thumbnail)
        const mainImage = document.createElement('img');
        mainImage.src = product.thumbnail;
        mainImage.classList.add('main-image');
        // Set fixed dimensions for the main image
        mainImage.style.width = '100%'; // Occupy full width of parent container
        mainImage.style.height = '200px'; // Set a fixed height for consistency
        // mainImage.style.objectFit = 'contain'; // Maintain aspect ratio while covering entire space

        productCard.appendChild(mainImage);

        // Create a div for the product title
        const title = document.createElement('div');
        title.classList.add('product-title');
        title.textContent = product.title;
        title.style.fontFamily = "Poppins";
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        title.style.marginTop = '5px';
        title.style.textAlign = 'left'; 
        productCard.appendChild(title);

        // Calculate the discounted price
        // const discountedPrice = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);



        // Create a div for the product price
        const price = document.createElement('div');
        price.classList.add('product-price');
        price.textContent = 'Rs. ' + product.price + "/-";
        price.style.fontFamily = "Poppins";
        price.style.marginBottom = '10px';
        price.style.color="grey";
        price.style.display = 'flex';
        // price.style.justifyContent = 'center';
        price.style.textDecoration='line-through';
        productCard.appendChild(price);

        // Create a div for the discounted price
        const discountedPrice = document.createElement('div');
        // discountedPrice.classList.add('discountPercentage');
        const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
        discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
        discountedPrice.style.fontFamily = "Poppins";
        discountedPrice.style.display = 'flex';
        // discountedPrice.style.justifyContent = 'center';
        discountedPrice.style.alignItems = 'center';
        discountedPrice.style.marginBottom = '10px';
        discountedPrice.style.fontWeight = 'bold';
        productCard.appendChild(discountedPrice);

        // Create a div for displaying the discount percentage
        const save = document.createElement('div');
        save.style.display = 'flex';
        save.style.alignItems = 'center';
        save.style.marginBottom = '10px';
        // Create a button element
        const button = document.createElement('button');
        button.textContent = 'save ' + (product.discountPercentage) + '%';
        button.style.backgroundColor = "red";
        button.style.fontSize='12px';
        button.style.color="white";
        button.style.padding="5px 10px";
        button.style.borderRadius="10%";
        button.style.backgroundColor='#442C2E';
        // Append the button to the save div
        save.appendChild(button);
        // Append the save div to an existing element in the document
        productCard.appendChild(save);
        // Create a div for the image gallery
        const imageGallery = document.createElement('div');
        imageGallery.style.display = 'flex';
        // Set flex-wrap property to wrap
        imageGallery.style.flexWrap = 'wrap';
        imageGallery.classList.add('image-gallery');
        // Create image elements for the additional images
        product.images.forEach(imageUrl => {
            const image = document.createElement('img');
            image.src = imageUrl;
            image.style.width = "50px";
            image.style.height = "80px";
            image.style.cursor = 'pointer';
            image.style.border = '1px solid #ccc';
            image.style.borderRadius = '5px';
            image.style.marginRight = '10px';
            image.style.objectFit = 'cover'; 
            imageGallery.appendChild(image);
        });
        imageGallery.style.marginBottom='10px';
        productCard.appendChild(imageGallery);

        // Create a div for the product rating
        const rating = document.createElement('div');
        if (product.rating >= 1 && product.rating <= 5) {
            for (let i = 0; i < product.rating; i++) {
                const star = document.createElement('span'); 
                star.textContent = "⭐";
                rating.appendChild(star);        
            }
        } 
        else {
            // Handle the case where the rating is out of range
            console.error('Invalid rating:', product.rating);
        }
        rating.style.marginBottom='10px';
        // Append the rating div to an existing element in the document
        productCard.appendChild(rating);


        // Create a button to show description
        const showDescriptionBtn = document.createElement('button');
        showDescriptionBtn.textContent = 'Show Description';
        showDescriptionBtn.style.width='100%';
        showDescriptionBtn.style.background='none';
        showDescriptionBtn.style.padding='5px 10px';
        showDescriptionBtn.style.borderRadius='10px';
        let count=0;
        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = product.description;
        description.style.marginTop = '10px';
        description.textAlign = 'center'; 
        showDescriptionBtn.addEventListener('click', () => {
            if(count%2==0){
                description.style.display = 'block';
                showDescriptionBtn.textContent = 'Less Description';
                count++;
            }
            else{
                description.style.display = 'none';
                description.textContent = product.description;
                showDescriptionBtn.textContent = 'Show Description';
                count++;
            }
            showDescriptionBtn.appendChild(description);

        });
        productCard.appendChild(showDescriptionBtn);
        productContainer.appendChild(productCard);
    });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


// Create search input field and button
const searchContainer = document.getElementById('searchContainer');
searchContainer.style.backgroundColor = '#4E0D3A';
searchContainer.style.width = '100%';
searchContainer.style.padding = '10px 10px';
searchContainer.style.display = 'flex';
searchContainer.style.alignItems = 'center';

// Create search input field
const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('id', 'searchInput');
searchInput.setAttribute('placeholder', 'Search products...');
searchInput.style.padding = '2px';
searchInput.style.border = '1px solid #ccc';
searchInput.style.borderRadius = '5px';
searchInput.style.fontSize = '14px';
searchInput.style.width='40%';
searchInput.style.marginRight = '10px';

// Create search button
const searchButton = document.createElement('button');
searchButton.setAttribute('id', 'searchButton');
searchButton.textContent = 'SEARCH';
searchButton.style.padding = '2px 5px';
searchButton.style.border = 'none';
searchButton.style.borderRadius = '5px';
searchButton.style.backgroundColor = '#720D5D';
searchButton.style.color = '#fff';
searchButton.style.fontSize = '14px';
searchButton.style.cursor = 'pointer';
searchButton.style.marginRight = '10px'; // Adjust margin as needed

// Create clear button
const clearButton = document.createElement('button');
clearButton.setAttribute('id', 'clearButton');
clearButton.textContent = 'CLEAR';
clearButton.style.padding = '2px 5px';
clearButton.style.border = 'none';
clearButton.style.borderRadius = '5px';
clearButton.style.backgroundColor = '#720D5D';
clearButton.style.color = '#fff';
clearButton.style.fontSize = '14px';
clearButton.style.cursor = 'pointer';
clearButton.style.marginRight = '10px';

// Add event listener to clear button
clearButton.addEventListener('click', () => {
    searchInput.value = ''; // Clear search input
    fetchProducts(); // Fetch and display all products again
});


// Create a select element
const sortSelect = document.createElement('select');

// Define the options for sorting
const options = [
    { text: "Price Low To High", value: "priceLowToHigh" },
    { text: "Price High To Low", value: "priceHighToLow" },
    { text: "Rating High To Low", value: "ratingHighToLow" }
];

// Create and append option elements to the select element
options.forEach(optionData => {
    const option = document.createElement('option');
    option.textContent = optionData.text;
    option.value = optionData.value;
    sortSelect.appendChild(option);
});
sortSelect.style.color='white';
sortSelect.style.padding='5px';
sortSelect.style.backgroundColor='#720D5D';
sortSelect.style.borderRadius="60px"
sortSelect.style.marginLeft='400px';
searchContainer.appendChild(sortSelect);



// Append search input field and button to search container
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
searchContainer.appendChild(clearButton);
searchContainer.appendChild(sortSelect);

fetchProducts();
// Function to render product cards
function renderProducts(products) {
    console.log(products);

    // Get the product container element
    const productContainer = document.getElementById('product-container'); 

    // Clear previous products
    productContainer.innerHTML = '';

    // Set up grid layout
    productContainer.style.display = 'grid';
    productContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    productContainer.style.gridGap = '20px';

    // Iterate over each product
    products.forEach(product => {
        // Create a div for the product card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.style.border = '1px solid #ccc';
        productCard.style.borderRadius = '5px';
        productCard.style.padding = '20px';
        productCard.style.marginBottom = '20px';
        productCard.style.maxWidth = '300px';
        productCard.style.width = '100%';
        productCard.style.boxSizing = 'border-box';

        // Create an image element for the main image (thumbnail)
        const mainImage = document.createElement('img');
        mainImage.src = product.thumbnail;
        mainImage.classList.add('main-image');
        mainImage.style.width = '100%'; // Occupy full width of parent container
        mainImage.style.height = '200px'; // Set a fixed height for consistency

        productCard.appendChild(mainImage);

        // Create a div for the product title
        const title = document.createElement('div');
        title.classList.add('product-title');
        title.textContent = product.title;
        title.style.fontFamily = "Poppins";
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        title.style.marginTop = '5px';
        title.style.textAlign = 'left'; 
        productCard.appendChild(title);

        // Create a div for the product price
        const price = document.createElement('div');
        price.classList.add('product-price');
        price.textContent = 'Rs. ' + product.price + "/-";
        price.style.fontFamily = "Poppins";
        price.style.marginBottom = '10px';
        price.style.color="grey";
        price.style.display = 'flex';
        price.style.textDecoration='line-through';
        productCard.appendChild(price);

        // Create a div for the discounted price
        const discountedPrice = document.createElement('div');
        const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
        discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
        discountedPrice.style.fontFamily = "Poppins";
        discountedPrice.style.display = 'flex';
        discountedPrice.style.alignItems = 'center';
        discountedPrice.style.marginBottom = '10px';
        discountedPrice.style.fontWeight = 'bold';
        productCard.appendChild(discountedPrice);

        // Create a div for displaying the discount percentage
        const save = document.createElement('div');
        save.style.display = 'flex';
        save.style.alignItems = 'center';
        save.style.marginBottom = '10px';
        const button = document.createElement('button');
        button.textContent = 'save ' + (product.discountPercentage) + '%';
        button.style.backgroundColor = "red";
        button.style.fontSize='12px';
        button.style.color="white";
        button.style.padding="5px 10px";
        button.style.borderRadius="10%";
        button.style.backgroundColor='#442C2E';
        save.appendChild(button);
        productCard.appendChild(save);

        // Create a div for the image gallery
        const imageGallery = document.createElement('div');
        imageGallery.style.display = 'flex';
        imageGallery.style.flexWrap = 'wrap';
        imageGallery.classList.add('image-gallery');
        product.images.forEach(imageUrl => {
            const image = document.createElement('img');
            image.src = imageUrl;
            image.style.width = "50px";
            image.style.height = "80px";
            image.style.cursor = 'pointer';
            image.style.border = '1px solid #ccc';
            image.style.borderRadius = '5px';
            image.style.marginRight = '10px';
            image.style.objectFit = 'cover'; 
            imageGallery.appendChild(image);
        });
        imageGallery.style.marginBottom='10px';
        productCard.appendChild(imageGallery);

        // Create a div for the product rating
        const rating = document.createElement('div');
        if (product.rating >= 1 && product.rating <= 5) {
            for (let i = 0; i < product.rating; i++) {
                const star = document.createElement('span'); 
                star.textContent = "⭐";
                rating.appendChild(star);        
            }
        } 
        else {
            console.error('Invalid rating:', product.rating);
        }
        rating.style.marginBottom='10px';
        productCard.appendChild(rating);

        // Create a button to show description
        const showDescriptionBtn = document.createElement('button');
        showDescriptionBtn.textContent = 'Show Description';
        showDescriptionBtn.addEventListener('click', () => {
            description.style.display = 'block';
            showDescriptionBtn.style.display = 'none';
        });
        productCard.appendChild(showDescriptionBtn);

        // Create a div for the product description
        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = product.description;
        description.style.display = 'none';
        description.style.marginTop = '10px';
        description.textAlign = 'center'; 
        productCard.appendChild(description);

        // Create a button to hide description
        const lessDescriptionBtn = document.createElement('button');
        lessDescriptionBtn.textContent = 'Less Description';
        lessDescriptionBtn.addEventListener('click', () => {
            description.style.display = 'none';
            showDescriptionBtn.style.display = 'block';
        });
        description.appendChild(lessDescriptionBtn);

        // Append the product card to the product container
        productContainer.appendChild(productCard);
    });
}

sortSelect.addEventListener('change', () => {
    const selectedOption = sortSelect.value;

    // Fetch products and sort based on the selected option
    fetch('https://dummyjson.com/products?limit=15')
        .then(response => response.json())
        .then(data => {
            let sortedProducts;

            // Calculate discounted price for each product
            data.products.forEach(product => {
                const discountedPrice = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
                product.discountedPrice = discountedPrice; // Add discountedPrice property to each product
            });

            switch (selectedOption) {
                case 'priceLowToHigh':
                    sortedProducts = data.products.slice().sort((a, b) => a.discountedPrice - b.discountedPrice);
                    break;
                case 'priceHighToLow':
                    sortedProducts = data.products.slice().sort((a, b) => b.discountedPrice - a.discountedPrice);
                    break;
                default:
                    // If no sorting option is selected, default to sorting by discounted price low to high
                    sortedProducts = data.products.slice().sort((a, b) => a.discountedPrice - b.discountedPrice);
            }

            // Render product cards with sorted data
            renderProducts(sortedProducts);
        })
        .catch(error => console.error('Error fetching and sorting products:', error));
});

// Add event listener to clearButton
clearButton.addEventListener('click', () => {
    searchInput.value = ''; // Clear search input
    fetchProducts(); // Fetch and display all products again
});
