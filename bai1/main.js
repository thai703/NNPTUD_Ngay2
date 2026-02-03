// Câu 1: Khai báo constructor function Product
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// Câu 2: Tạo mảng products ít nhất 6 sản phẩm, tối thiểu 2 category
const products = [
    new Product(1, "iPhone 15 Pro", 32000000, 5, "Phones", true),
    new Product(2, "Samsung S24", 26000000, 0, "Phones", true),
    new Product(3, "MacBook Air M2", 28000000, 3, "Laptops", true),
    new Product(4, "Gaming Laptop", 35000000, 2, "Laptops", false),
    new Product(5, "AirPods Pro", 6000000, 10, "Accessories", true),
    new Product(6, "USB-C Cable", 250000, 0, "Accessories", true),
];

// Câu 3: Tạo mảng mới chỉ chứa name, price
const namePriceList = products.map(p => ({ name: p.name, price: p.price }));
console.log("Câu 3:", namePriceList);

// Câu 4: Lọc sản phẩm còn hàng (quantity > 0)
const inStockProducts = products.filter(p => p.quantity > 0);
console.log("Câu 4:", inStockProducts);

// Câu 5: Có ít nhất 1 sản phẩm giá > 30.000.000 không?
const hasOver30M = products.some(p => p.price > 30000000);
console.log("Câu 5:", hasOver30M);

// Câu 6: Tất cả sản phẩm category "Accessories" có đang bán (isAvailable=true) không?
const allAccessoriesAvailable = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true);

console.log("Câu 6:", allAccessoriesAvailable);

// Câu 7: Tính tổng giá trị kho (sum(price * quantity))
const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
console.log("Câu 7:", totalInventoryValue);

// Câu 8: Dùng for...of in: Tên sản phẩm - Danh mục - Trạng thái
console.log("Câu 8:");
for (const p of products) {
    const status = p.isAvailable ? "Đang bán" : "Ngừng bán";
    console.log(`${p.name} - ${p.category} - ${status}`);
}

// Câu 9: Dùng for...in để in ra tên thuộc tính và giá trị tương ứng
console.log("Câu 9:");
const sample = products[0];
for (const key in sample) {
    console.log(`${key}:`, sample[key]);
}

// Câu 10: Lấy danh sách tên sản phẩm đang bán và còn hàng
const sellingAndInStockNames = products
    .filter(p => p.isAvailable === true && p.quantity > 0)
    .map(p => p.name);

console.log("Câu 10:", sellingAndInStockNames);
