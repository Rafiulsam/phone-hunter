const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data)
}
loadPhone('phone')

const displayPhone = phones => {
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    // display 10 phone 
    phones = phones.slice(0, 10)

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
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneDiv)

    });

    toggleSpinier(false)
}

document.getElementById('btn-search').addEventListener('click', function () {
    toggleSpinier(true)
    const inputValue = document.getElementById('input-field').value
    document.getElementById('input-field').value = '';
    if (inputValue === '') {
        alert('Please enter texts')
        toggleSpinier(false)
    }
    else {
        loadPhone(inputValue)
    }
})

const toggleSpinier = isLoading =>{
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}