

const productsGrid = document.querySelector('.products-grid');
const loadMore = document.querySelector('.main-products__more');
let quantityProducts = 5;
let dataLength = '';

if (productsGrid) {
  const fetchProducts = (quantity = 5) => {
  fetch('../products.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    dataLength = data.length;
    productsGrid.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      if (i < quantity) {

        productsGrid.innerHTML += `

          <li class="products-grid__item">
            <article class="product">
              <div class="product__image">
                <img src="${data[i].image}" alt="${data[i].title}">
              </div>
              <h3 class="product__title">
                <a href="#">
                  ${data[i].title}
                </a>
              </h3>
              <span class="product__price">$${data[i].price}</span>
            </article>
          </li>

        `;
      }
    }
  });
};

fetchProducts(quantityProducts);

loadMore.addEventListener('click', (e) => {
  quantityProducts = quantityProducts + 5;
  console.log(quantityProducts);
  console.log(dataLength);

  fetchProducts(quantityProducts);

  if (quantityProducts == dataLength) {
    loadMore.style.display = 'none';
  } else {
    loadMore.style.display = 'inline-flex';
  }
});

}

