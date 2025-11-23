let total = 0;

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}

const loadAllPlant = () => {
    showSpinner();
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayAllPlant(data.plants))
}

const removeActive = () => {
    const categories = document.querySelectorAll('.categories')
    categories.forEach((category) => category.classList.remove('active'))
}

const loadByCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickCategory = document.getElementById(`category-${id}`)
            clickCategory.classList.add('active')
            displayAllPlant(data.plants)
        })
}

const loadPlantDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPlantDetail(data.plants);
}

//"id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500

const showSpinner = () => document.getElementById('spinner').classList.remove('hidden')
const hideSpinner = () => document.getElementById('spinner').classList.add('hidden')

const totalPrice = () => {
    const totalContainer = document.getElementById('total-container')
    totalContainer.innerHTML = `
<h2 class=" text-right p-3"><span class="font-bold">Total : </span>$${total}</h2>
`

}


const addToCart = (name, price) => {
    alert(`${name} has been added to the cart.`)
    const cartContainer = document.getElementById('cart-container')
    const cart = document.createElement('div')
    cart.innerHTML = `
 <div class="flex justify-between items-center  m-3 bg-gray-300 hover:bg-gray-400 px-3 rounded-lg">
     <div>
         <h2 class="font-semibold">${name} </h2>
         <p class="">$ ${price}</p>
     </div>
         <i class=" dlt fa-solid fa-x cursor-pointer"></i>
 </div>
  `
    total = total + parseInt(price);
    totalPrice()

    //Add dlt cart
    cart.querySelector('.dlt').addEventListener('click', () => {
        total = total - parseInt(price)
        totalPrice();
        cart.remove();
    })


    cartContainer.appendChild(cart);


}

const displayPlantDetail = (plant) => {
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
 <h2 class="text-2xl font-bold">${plant.name}</h2>
                <img class="w-[450px] h-[300px] rounded-2xl" src="${plant.image} " alt="">
                <p class=""><span class="text-lg font-semibold">Category :</span>${plant.category} </p>
                <p><span class="text-lg font-semibold">Price : </span>$${plant.price}</p>
                <p><span class="text-lg font-semibold">Description : </span>${plant.description} </p>
           
`
    document.getElementById('plant_modal').showModal()
}

//plants
//{id: 1, image: 'https://i.ibb.co.com/cSQdg7tf/mango-min.jpg', name: 'Mango Tree', description: 'A fast-growing tropical tree that produces delicio…s sweet fruits are rich in vitamins and minerals.', category: 'Fruit Tree', …}

loadAllPlant()

const displayCategories = (arr) => {
    const categoryContainer = document.getElementById('Category-container')
    categoryContainer.innerHTML = '';

    arr.forEach((el) => {
        const category = document.createElement('div')
        category.innerHTML = `
       <h2 id="category-${el.id}" onclick="loadByCategory(${el.id})" class="categories p-2 hover:bg-[#15803d] active:bg-[#15803d]  text-[#1f2937] active:text-[#1f2937] hover:text-white ml-4">${el.category_name}</h2>
       `
        categoryContainer.appendChild(category)
    })
}

const displayAllPlant = (arr) => {
    hideSpinner();
    const plantContainer = document.getElementById('plant-container')
    plantContainer.innerHTML = '';

    arr.forEach((el) => {
        const plantCard = document.createElement('div');
        plantCard.innerHTML = `
    <div class="card bg-base-100 max-w-full h-full m-2 md:m-0 shadow-sm">
                    <figure>
                        <img class="p-3 rounded-4xl w-full md:w-[300px] h-[230px]" src="${el.image}"
                            alt="" />
                    </figure>
                    <div class="card-body">
                        <h2 onclick="loadPlantDetail(${el.id})" class="card-title">
                          ${el.name}
                        </h2>
                        <p class="text-[#1f2937]">${el.description} </p>
                        <div class="flex justify-between">
                            <div class="btn rounded-3xl text-[#15803d] bg-[#dcfce7]">${el.category} </div>
                            <div class="text-[#1f2937] font-semibold">$${el.price}</div>
                        </div>
                        <button onclick="addToCart('${el.name}', '${el.price}')" class="bg-[#15803d] p-2 rounded-3xl font-semibold text-white text-xl mt-4">Add to Cart </button>
                    </div>
                </div>
    `
        plantContainer.appendChild(plantCard);
    })
}

loadCategories()