// shop.js
const DEFAULT_SIZE = 'xl';
fetch('data/data.json').then(response => response.json()).then(data => {
    const productsBox = document.getElementById('products-box');

    for (var product of data.products) {
        for (var i = 0; i < 10; i++) {
            var card = getCard(product);
            productsBox.appendChild(card);
        }
    }
});

function getCard(product) {
    var item = `<div class="col-sm col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
    				<div class="product">
    					<a href="${getItemLink(product)}" class="img-prod"><img class="img-fluid" src="${getImgSrc(product)}" alt="">
    						${getStatus(product)}
    					</a>
    					<div class="text py-3 px-3">
    						<h3><a href="${getItemLink(product)}">${product.name}</a></h3>
    						<div class="d-flex">
    							<div class="pricing">
		    						${getPrice(product)}
		    					</div>
	    					</div>
	    					<hr>
    						<p class="bottom-area d-flex">
    						</p>
    					</div>
    				</div>
    			</div>`;
    return $.parseHTML(item)[0];
}
function getStatus(product) {
    if (product.status) {
        return `<span class="status">${product.status}</span>`;
    } else {
        return '';
    }
}
function getPrice(product) {
    if (product.prices[DEFAULT_SIZE].cancelledPrice) {
        return `<p class="price"><span class="mr-2 price-dc">Rs. ${product.prices[DEFAULT_SIZE].cancelledPrice}</span><span class="price-sale">Rs. ${product.prices[DEFAULT_SIZE].price}</span></p>`;
    } else {
        return `<p class="price">
            <span class="price-sale">Rs. ${product.prices[DEFAULT_SIZE].price}</span></p>`;
    }
}
function getImgSrc(product) {
    return `images/product-${product.id}.jpg`;
}
function getItemLink(product) {
    return `product-single.html?productId=${product.id}`;
}