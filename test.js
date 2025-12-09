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
