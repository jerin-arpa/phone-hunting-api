const loadPhone = async (searchText = 13, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');

    // clear container cards before adding new cards
    phoneContainer.textContent = '';


    // DIsplay Show all button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }


    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;

        phoneCard.innerHTML = `
        <figure>
        <img src="${phone.image}" />
        </figure>
        <div class="card-body">
            <h2 class="text-center">${phone.phone_name}</h2>
            <p class="text-center">${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick= "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    // Hidden loading Spinner
    toggleLoadingSpinner(false);
}


// Modal
const handleShowDetails = async (id) => {
    console.log('clicked show details', id)
    // load single phone data
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();

    const phone = data.data;
    console.log(phone);

    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    // Show the modal
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
    <div class= "flex justify-center"> 
    <img class= "m-5" src="${phone?.image || 'Nothing to show'}" alt="" />
    </div>
    <p> <span class="font-bold"> Storage: </span>${phone?.mainFeatures?.storage || 'Nothing to show'}</p>

    <p> <span class="font-bold"> Display Size: </span>${phone?.mainFeatures?.displaySize || 'Nothing to show'}</p>

    <p> <span class="font-bold"> ChipSet: </span>${phone?.mainFeatures?.chipSet || 'Nothing to show'}</p>

    <p> <span class="font-bold"> Memory: </span>${phone?.mainFeatures?.memory || 'Nothing to show'}</p>

    <p> <span class="font-bold"> Slug: </span>${phone?.slug || 'Nothing to show'}</p>

    <p> <span class="font-bold"> Release data: </span>${phone?.releaseDate || 'Nothing to show'}</p>

    <p> <span class="font-bold"> Brand: </span>${phone?.brand || 'Nothing to show'}</p>

    <p> <span class="font-bold"> GPS: </span>${phone?.others?.GPS || 'Nothing to show'}</p>
    `;

    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}


// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

