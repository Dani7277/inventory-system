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
