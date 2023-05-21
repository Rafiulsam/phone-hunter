const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data, dataLimit)
}
loadPhone('apple')

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    // display 10 phone 
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9)
        showAll.classList.remove('d-none')

    }
    else{
        showAll.classList.add('d-none')
    }

    // display warning msg 
    const noFound = document.getElementById('no-found-msg')
    if (phones.length === 0) {
        noFound.classList.remove('d-none')
    }
    else {
        noFound.classList.add('d-none')
    }

    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `<div class="card h-100 p-4">
                        <img src="${phone.image}" class="card-img-top p-5" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Phone Details</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneDiv)

    });

    toggleSpinier(false)
}

document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        makeSearch(9)
    }
});


const makeSearch= (dataLimit) =>{
    toggleSpinier(true)
    const inputValue = document.getElementById('input-field').value
    if (inputValue === '') {
        alert('Please enter texts')
        toggleSpinier(false)
    }
    else {
        loadPhone(inputValue, dataLimit)
    }
}
document.getElementById('btn-search').addEventListener('click', function () {
    makeSearch(9)
})
document.getElementById('btn-show-all').addEventListener('click', function () {
    makeSearch()
 })
const toggleSpinier = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data);
}
