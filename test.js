// Create product instances for testing
const createTestProducts = () => {
    console.log("📝 Creating test products...");
    
    // Create regular products
    const apple = new Product("Apple", 0.99, 150);
    const bread = new Product("Bread", 2.49, 30);
    const chips = new Product("Potato Chips", 3.99, 45);
    
    // Create perishable products
    const milk = new PerishableProduct("Milk", 1.99, 20, "2024-12-31");
    const yogurt = new PerishableProduct("Yogurt", 0.89, 50, "2024-11-15");
    const cheese = new PerishableProduct("Cheese", 4.99, 15, "2025-01-20");
    
    return [apple, bread, chips, milk, yogurt, cheese];
};
const testProductMethods = () => {
    console.log("🧪 Testing Product methods...");
    
    // Create a test product
    const testProduct = new Product("Test Item", 10, 5);
    
    // Test getTotalValue()
    const totalValue = testProduct.getTotalValue();
    console.log(`Total value of ${testProduct.name}: $${totalValue}`);
    
    // Test toString()
    const productString = testProduct.toString();
    console.log("Product toString():", productString);
    
    // Test PerishableProduct
    const perishable = new PerishableProduct("Test Perishable", 5, 10, "2024-12-01");
    const perishableString = perishable.toString();
    console.log("PerishableProduct toString():", perishableString);
    
    return "✅ Product methods tested successfully";
};
const runTests = () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h3>Test Results:</h3>';
    
    try {
        // Create products
        const products = createTestProducts();
        outputDiv.innerHTML += "<p>✅ Test products created successfully</p>";
        
        // Create store and add products
        const myStore = new Store();
        products.forEach(product => myStore.addProduct(product));
        outputDiv.innerHTML += `<p>✅ ${products.length} products added to store</p>`;
        
        // Test 1: Display initial inventory value
        const initialValue = myStore.getInventoryValue();
        outputDiv.innerHTML += `<p>💰 Initial Inventory Value: <strong>$${initialValue.toFixed(2)}</strong></p>`;
        
        // Test 2: Apply 15% discount
        outputDiv.innerHTML += "<p>🔽 Applying 15% discount to all products...</p>";
        Product.applyDiscount(myStore.inventory, 0.15);
        
        // Test 3: Display discounted inventory value
        const discountedValue = myStore.getInventoryValue();
        outputDiv.innerHTML += `<p>💰 Discounted Inventory Value: <strong>$${discountedValue.toFixed(2)}</strong></p>`;
        
        // Test 4: Find a specific product
        const foundProduct = myStore.findProductByName("Milk");
        if (foundProduct) {
            outputDiv.innerHTML += `<p>🔍 Found product: ${foundProduct.toString()}</p>`;
        } else {
            outputDiv.innerHTML += `<p>❌ Product not found</p>`;
        }
        
        // Test 5: Try finding non-existent product
        const notFound = myStore.findProductByName("Nonexistent");
        outputDiv.innerHTML += `<p>${notFound === null ? '✅' : '❌'} Search for non-existent product returned: ${notFound}</p>`;
        
        // Display inventory
        const inventoryDiv = document.getElementById('inventoryDisplay');
        inventoryDiv.innerHTML = `
            <h3>Store Inventory (${myStore.inventory.length} items):</h3>
            <p>Total Value: <strong>$${myStore.getInventoryValue().toFixed(2)}</strong></p>
            ${myStore.displayInventory()}
        `;
        
        // Log to console for debugging
        console.log("Initial Inventory Value:", initialValue);
        console.log("Discounted Inventory Value:", discountedValue);
        console.log("Products after discount:", myStore.inventory);
        
        outputDiv.innerHTML += "<p>✅ All tests completed successfully!</p>";
        
    } catch (error) {
        outputDiv.innerHTML += `<p style="color: red;">❌ Error: ${error.message}</p>`;
        console.error("Test Error:", error);
    }
};
const clearOutput = () => {
    document.getElementById('output').innerHTML = '';
    document.getElementById('inventoryDisplay').innerHTML = '';
    console.log("🗑️ Output cleared");
};
// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("🛒 Inventory Management System Loaded");
    console.log("Available commands: runTests(), clearOutput()");
    
    // Display welcome message
    document.getElementById('output').innerHTML = `
        <h3>Welcome to the Inventory Management System</h3>
        <p>Click "Run Tests" to execute the inventory system demo.</p>
        <p>This will:</p>
        <ol>
            <li>Create 6 products (3 regular, 3 perishable)</li>
            <li>Add them to a store inventory</li>
            <li>Calculate total inventory value</li>
            <li>Apply a 15% discount</li>
            <li>Recalculate discounted value</li>
            <li>Search for a specific product</li>
        </ol>
    `;
});
const runUnitTests = () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h3>🧪 Unit Test Results:</h3>';
    
    const tests = [];
    
    // Test 1: Product Creation
    try {
        const product = new Product("Test", 10, 5);
        tests.push({
            name: "Product Creation",
            passed: product.name === "Test" && product.price === 10 && product.quantity === 5
        });
    } catch (e) {
        tests.push({ name: "Product Creation", passed: false, error: e.message });
    }
    
    // Test 2: Total Value Calculation
    try {
        const product = new Product("Test", 10, 5);
        tests.push({
            name: "Total Value Calculation",
            passed: product.getTotalValue() === 50
        });
    } catch (e) {
        tests.push({ name: "Total Value Calculation", passed: false, error: e.message });
    }
    
    // Test 3: Perishable Product Creation
    try {
        const perishable = new PerishableProduct("Milk", 2, 10, "2024-12-31");
        tests.push({
            name: "Perishable Product Creation",
            passed: perishable instanceof PerishableProduct && perishable.expirationDate === "2024-12-31"
        });
    } catch (e) {
        tests.push({ name: "Perishable Product Creation", passed: false, error: e.message });
    }
    
    // Test 4: Store Operations
    try {
        const store = new Store();
        const product = new Product("Test", 10, 5);
        store.addProduct(product);
        tests.push({
            name: "Store Add Product",
            passed: store.inventory.length === 1
        });
    } catch (e) {
        tests.push({ name: "Store Add Product", passed: false, error: e.message });
    }
    
    // Test 5: Inventory Value
    try {
        const store = new Store();
        store.addProduct(new Product("A", 10, 2));
        store.addProduct(new Product("B", 20, 3));
        tests.push({
            name: "Inventory Value Calculation",
            passed: store.getInventoryValue() === 80
        });
    } catch (e) {
        tests.push({ name: "Inventory Value Calculation", passed: false, error: e.message });
    }
    
    // Display test results
    tests.forEach(test => {
        const color = test.passed ? 'green' : 'red';
        const icon = test.passed ? '✅' : '❌';
        outputDiv.innerHTML += `<p style="color: ${color};">${icon} ${test.name}: ${test.passed ? 'PASSED' : 'FAILED'}`;
        if (test.error) {
            outputDiv.innerHTML += ` - ${test.error}`;
        }
        outputDiv.innerHTML += '</p>';
    });
    
    // Summary
    const passedCount = tests.filter(t => t.passed).length;
    const totalCount = tests.length;
    outputDiv.innerHTML += `<h4>Summary: ${passedCount}/${totalCount} tests passed</h4>`;
};

// Update the HTML to add a unit test button