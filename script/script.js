
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}

const loadAllPlant = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayAllPlant(data.plants))
}

const loadByCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) =>displayAllPlant(data.plants)
        )
}

const displayAllPlant = (arr) => {
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
                        <h2 class="card-title">
                          ${el.name}
                        </h2>
                        <p class="text-[#1f2937]">${el.description} </p>
                        <div class="flex justify-between">
                            <div class="btn rounded-3xl text-[#15803d] bg-[#dcfce7]">${el.category} </div>
                            <div class="text-[#1f2937] font-semibold">$${el.price}</div>
                        </div>
                        <button class="bg-[#15803d] p-2 rounded-3xl font-semibold text-white text-xl mt-4">Add to Cart </button>
                    </div>
                </div>
    `
        plantContainer.appendChild(plantCard);
    })
}

loadAllPlant()

const displayCategories = (arr) => {
    const categoryContainer = document.getElementById('Category-container')
    categoryContainer.innerHTML = '';

    arr.forEach((el) => {
        const category = document.createElement('div')
        category.innerHTML = `
       <h2 id="category-${el.id}"  onclick="loadByCategory(${el.id})" class="p-2 hover:bg-[#15803d] active:bg-[#15803d]  text-[#1f2937] active:text-[#1f2937] hover:text-white ml-4">${el.category_name}</h2>
       `
        categoryContainer.appendChild(category)
    })
}
loadCategories()