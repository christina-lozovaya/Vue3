app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /* html */
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="[ inStock ? image : noProductImage ]" alt="">
            </div>
            <div class="product-info">
                <h1>{{ onSale ? showOnSale : title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                
                <p>Shipping: {{ shipping }}</p>
                
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div
                     v-for=" (variant, index) in variants"
                     :key="variant.id"
                     @mouseover="updateVariant(index)"
                     class="color-circle"
                     :style="{ 'background-color': variant.color }"
                ></div>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
                <button class="button" type="button"
                        :class="{ disabledButton: !inStock }"
                        :disabled="!inStock"
                        v-on:click="addToCart"
                >Add to Cart</button>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: true,
            noProductImage: './assets/images/no-product.jpg',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            sizes: ['36-38', '39-41', '42-44']
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateVariant(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        showOnSale() {
            return this.brand + ' ' + this.product + " is on sale"
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return '2.99$'
        }
    }
})