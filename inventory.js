/**
 * Base class for all products in the inventory system.
 * Represents a generic product with name, price, and quantity.
 */
class Product {
    /**
     * Constructor for Product class
     * @param {string} name - Product name
     * @param {number} price - Product price in dollars
     * @param {number} quantity - Quantity in stock
     */
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    /**
     * Calculates total value of this product in stock
     * @returns {number} Total value (price * quantity)
     */
    getTotalValue() {
        return this.price * this.quantity;
    }

    /**
     * Returns string representation of the product
     * @returns {string} Formatted product details
     */
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }
}
/**
 * Subclass of Product for perishable items with expiration dates.
 * Inherits all properties and methods from Product class.
 */
class PerishableProduct extends Product {
    /**
     * Constructor for PerishableProduct
     * @param {string} name - Product name
     * @param {number} price - Product price
     * @param {number} quantity - Quantity in stock
     * @param {string} expirationDate - Expiration date (YYYY-MM-DD format)
     */
    constructor(name, price, quantity, expirationDate) {
        // Call parent class constructor
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    /**
     * Overrides parent toString() method to include expiration date
     * @returns {string} Formatted product details with expiration
     */
    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}`;
    }
}

/**
 * Store class to manage inventory of products
 * Handles adding, finding, and calculating total inventory value
 */
class Store {
    /**
     * Constructor for Store class
     */
    constructor() {
        this.inventory = [];
    }

    /**
     * Adds a product to the store inventory
     * @param {Product} product - Product or PerishableProduct object
     */
    addProduct(product) {
        // Validate that it's a Product instance
        if (product instanceof Product) {
            this.inventory.push(product);
            console.log(`✅ Added: ${product.name} to inventory`);
        } else {
            throw new Error("Only Product or PerishableProduct objects can be added");
        }
    }

    /**
     * Calculates total value of all products in inventory
     * @returns {number} Total inventory value
     */
    getInventoryValue() {
        return this.inventory.reduce((total, product) => {
            return total + product.getTotalValue();
        }, 0);
    }

    /**
     * Finds a product by its name (case-insensitive)
     * @param {string} name - Product name to search for
     * @returns {Product|null} Found product or null if not found
     */
    findProductByName(name) {
        return this.inventory.find(product => 
            product.name.toLowerCase() === name.toLowerCase()
        ) || null;
    }
}