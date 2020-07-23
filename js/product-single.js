//product single
fetch('data/data.json').then(response => response.json()).then(data => {
    console.log(data);
    const DEFAULT_SIZE = 'xl';
    if (!checkURL(data)) {
        window.location.href = 'shop.html';
    }
    var productId = getProductId();
    var productData = data.products.filter(item => item.id === productId)[0];

    const productNameBox = document.getElementById('product-name-box');
    const productNameBoxHead = document.getElementById('product-name-box-heading');
    const descriptionBox = document.getElementById('description-box');
    const priceBox = document.getElementById('price-box');
    const cancelledPriceBox = document.getElementById('cancelled-price-box');
    const priceTableBody = document.getElementById('price-table-body');
    const imgTag = document.getElementById('img-tag');
    const breadcrumbNameBox = document.getElementById('breadcrumb-name-box');
    const productCodeBox = document.getElementById('product-code-box');

    productNameBox.textContent = productData.name;
    productNameBoxHead.textContent = productData.name;
    // descriptionBox.textContent = productData.description;
    priceBox.textContent = 'Rs. ' + productData.prices[DEFAULT_SIZE].price;
    cancelledPriceBox.textContent = productData.prices[DEFAULT_SIZE].cancelledPrice ? ('Rs. + ' + productData.prices[DEFAULT_SIZE].cancelledPrice) : '';
    imgTag.setAttribute('src', `images/product-${productId}.jpg`);
    breadcrumbNameBox.textContent = productData.name;
    productCodeBox.textContent = `Product Code: P-10${productData.id}`;

    var sizes = ['s_baby', 'm_baby', 'xl', 'xxl', 'xxxl'];
    for (var size of sizes) {
        if (productData.prices[size]) {
            var priceObj = productData.prices[size];
            var tr;
            if (priceObj.cancelledPrice) {
                tr = `<tr>
                    <td>${size.toUpperCase()}</td>
                    <td><span class="discount">Rs. ${priceObj.cancelledPrice}</span> Rs. ${priceObj.price}</td>
                    </tr>`;
            } else {
                tr = `<tr>
                    <td>${size.toUpperCase()}</td>
                    <td>Rs. ${priceObj.price}</td>
                    </tr>`;
            }
            tr = $.parseHTML(tr)[0];
            priceTableBody.appendChild(tr);
        }
    }
});

function getProductId() {
    var urlString = window.location.href;
    var url = new URL(urlString);
    var productId = url.searchParams.get("productId");
    console.log(`productId: ${productId}`);
    return parseInt(productId);
}
function checkURL(data) {
    var urlString = window.location.href;
    var url = new URL(urlString);
    var productId = url.searchParams.get("productId");
    if (!productId) {
        return false;
    }
    if (productId > data.products.length) {
        return false;
    }
    return true;
}