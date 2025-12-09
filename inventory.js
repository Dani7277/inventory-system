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
     /**
     * Static method to apply discount to an array of products
     * @param {Array} products - Array of Product objects
     * @param {number} discount - Discount percentage (e.g., 0.15 for 15%)
     */
    static applyDiscount(products, discount) {
        // Validate inputs
        if (!Array.isArray(products)) {
            throw new Error("First argument must be an array of products");
        }
        if (typeof discount !== 'number' || discount < 0 || discount > 1) {
            throw new Error("Discount must be a number between 0 and 1");
        }

        // Apply discount to each product
        products.forEach(product => {
            if (product instanceof Product) {
                product.price = product.price * (1 - discount);
            }
        });
    }
        /**
     * Static method to update quantity for multiple products
     * @param {Array} products - Array of products
     * @param {string} name - Product name
     * @param {number} quantity - New quantity
     * @returns {number} Number of products updated
     */
    static bulkUpdateQuantity(products, name, quantity) {
        let updated = 0;
        products.forEach(product => {
            if (product.name === name) {
                product.quantity = quantity;
                updated++;
            }
        });
        return updated;
    }

    /**
     * Static method to remove products below threshold
     * @param {Array} products - Array of products
     * @param {number} threshold - Quantity threshold
     * @returns {Array} Filtered products
     */
    static removeOutOfStock(products, threshold = 0) {
        return products.filter(product => product.quantity > threshold);
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
    /**
     * Checks if product is expired
     * @param {string} currentDate - Optional current date (YYYY-MM-DD)
     * @returns {boolean} True if expired
     */
    isExpired(currentDate = new Date().toISOString().split('T')[0]) {
        return this.expirationDate < currentDate;
    }

    /**
     * Checks if product will expire within days
     * @param {number} days - Days threshold
     * @returns {boolean} True if expiring soon
     */
    isExpiringSoon(days = 7) {
        const today = new Date();
        const expireDate = new Date(this.expirationDate);
        const daysUntilExpire = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpire <= days && daysUntilExpire >= 0;
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
     displayInventory() {
        if (this.inventory.length === 0) {
            return '<p>No products in inventory</p>';
        }

        let html = `<div class="product-list">`;
        
        this.inventory.forEach(product => {
            const isPerishable = product instanceof PerishableProduct;
            const productClass = isPerishable ? 'perishable' : 'regular';
            const typeLabel = isPerishable ? '🕒 Perishable' : '📦 Regular';
            
            html += `
                <div class="product-card ${productClass}">
                    <h3>${product.name} <small>(${typeLabel})</small></h3>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${product.quantity}</p>
                    <p><strong>Total Value:</strong> $${product.getTotalValue().toFixed(2)}</p>
            `;
            
            if (isPerishable) {
                html += `<p><strong>Expires:</strong> ${product.expirationDate}</p>`;
            }
            
            html += `</div>`;
        });
        
        html += `</div>`;
        return html;
    }
      /**
     * Searches products by name (case-insensitive partial match)
     * @param {string} searchTerm - Term to search for
     * @returns {Array} Array of matching products
     */
    searchProducts(searchTerm) {
        if (!searchTerm || typeof searchTerm !== 'string') {
            return [];
        }
        const term = searchTerm.toLowerCase();
        return this.inventory.filter(product => 
            product.name.toLowerCase().includes(term)
        );
    }

    /**
     * Filters products by price range
     * @param {number} minPrice - Minimum price
     * @param {number} maxPrice - Maximum price
     * @returns {Array} Filtered products
     */
    filterByPriceRange(minPrice, maxPrice) {
        return this.inventory.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }

    /**
     * Filters products that are low in stock
     * @param {number} threshold - Low stock threshold
     * @returns {Array} Products with quantity below threshold
     */
    getLowStockProducts(threshold = 10) {
        return this.inventory.filter(product => 
            product.quantity < threshold
        );
    }
    /**
     * Generates a sales report
     * @returns {object} Report object with various statistics
     */
    generateSalesReport() {
        const report = {
            totalProducts: this.inventory.length,
            totalValue: this.getInventoryValue(),
            averagePrice: 0,
            highestValueProduct: null,
            lowestValueProduct: null,
            perishableCount: 0,
            regularCount: 0
        };

        if (this.inventory.length > 0) {
            // Calculate average price
            const totalPrice = this.inventory.reduce((sum, product) => 
                sum + product.price, 0);
            report.averagePrice = totalPrice / this.inventory.length;

            // Find highest and lowest value products
            report.highestValueProduct = this.inventory.reduce((max, product) => 
                product.getTotalValue() > max.getTotalValue() ? product : max
            );
            
            report.lowestValueProduct = this.inventory.reduce((min, product) => 
                product.getTotalValue() < min.getTotalValue() ? product : min
            );

            // Count product types
            report.perishableCount = this.inventory.filter(product => 
                product instanceof PerishableProduct).length;
            report.regularCount = report.totalProducts - report.perishableCount;
        }

        return report;
    }

    /**
     * Displays sales report in HTML format
     * @returns {string} HTML formatted report
     */
    displaySalesReport() {
        const report = this.generateSalesReport();
        let html = '<div class="sales-report">';
        html += '<h3>📊 Sales Report</h3>';
        html += `<p>Total Products: <strong>${report.totalProducts}</strong></p>`;
        html += `<p>Total Inventory Value: <strong>$${report.totalValue.toFixed(2)}</strong></p>`;
        html += `<p>Average Price: <strong>$${report.averagePrice.toFixed(2)}</strong></p>`;
        html += `<p>Regular Products: <strong>${report.regularCount}</strong></p>`;
        html += `<p>Perishable Products: <strong>${report.perishableCount}</strong></p>`;
        
        if (report.highestValueProduct) {
            html += `<p>Highest Value: <strong>${report.highestValueProduct.name}</strong> ($${report.highestValueProduct.getTotalValue().toFixed(2)})</p>`;
        }
        
        if (report.lowestValueProduct) {
            html += `<p>Lowest Value: <strong>${report.lowestValueProduct.name}</strong> ($${report.lowestValueProduct.getTotalValue().toFixed(2)})</p>`;
        }
        
        html += '</div>';
        return html;
    }
      /**
     * Exports inventory to CSV format
     * @returns {string} CSV data
     */
    exportToCSV() {
        const headers = ['Name', 'Price', 'Quantity', 'Total Value', 'Expiration Date', 'Type'];
        const rows = this.inventory.map(product => {
            const isPerishable = product instanceof PerishableProduct;
            return [
                `"${product.name}"`,
                product.price.toFixed(2),
                product.quantity,
                product.getTotalValue().toFixed(2),
                isPerishable ? product.expirationDate : 'N/A',
                isPerishable ? 'Perishable' : 'Regular'
            ];
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        return csvContent;
    }

    /**
     * Downloads the CSV file
     */
    downloadCSV() {
        const csv = this.exportToCSV();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}