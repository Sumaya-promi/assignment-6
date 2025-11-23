
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}

const displayCategories = (arr) => {
    const categoryContainer = document.getElementById('Category-container')
    categoryContainer.innerHTML = '';

    arr.forEach((el) => {
        const category = document.createElement('div')
        category.innerHTML = `
       <h2 id="category-${el.id}" class="p-2 hover:bg-[#15803d] active:bg-[#15803d]  text-[#1f2937] active:text-[#1f2937] hover:text-white ml-4">${el.category_name}</h2>
       `
        categoryContainer.appendChild(category)
    })
}
loadCategories()