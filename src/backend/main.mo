import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat32 "mo:core/Nat32";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Blob "mo:core/Blob";
import Order "mo:core/Order";

actor {
  type Product = {
    id : Nat32;
    name : Text;
    description : Text;
    priceCents : Nat32;
    category : Text;
    imageUrl : Text;
  };

  type CartItem = {
    productId : Nat32;
    quantity : Nat32;
  };

  type Cart = [CartItem];

  type ShippingInfo = {
    name : Text;
    email : Text;
    address : Text;
    city : Text;
    zip : Text;
    country : Text;
  };

  type Order = {
    id : Nat32;
    cart : [CartItem];
    shippingInfo : ShippingInfo;
    paymentCardLast4 : Nat32;
    totalPriceCents : Nat32;
  };

  module CartItem {
    public func compare(item1 : CartItem, item2 : CartItem) : Order.Order {
      Nat32.compare(item1.productId, item2.productId);
    };
  };

  let products = Map.empty<Nat32, Product>();
  let carts = Map.empty<Text, Cart>();
  let orders = Map.empty<Nat32, Order>();

  var productIdCounter = 1 : Nat32;
  var orderIdCounter = 1 : Nat32;

  let sampleProducts = [
    { name = "Laptop"; description = "Powerful laptop for work and play"; priceCents : Nat32 = 120000; category = "Electronics"; imageUrl = "" },
    { name = "Jeans"; description = "Comfortable denim jeans"; priceCents : Nat32 = 4000; category = "Clothing"; imageUrl = "" },
    { name = "Bluetooth Speaker"; description = "Portable wireless speaker"; priceCents : Nat32 = 3500; category = "Electronics"; imageUrl = "" },
    { name = "T-shirt"; description = "Soft cotton t-shirt"; priceCents : Nat32 = 2000; category = "Clothing"; imageUrl = "" },
    { name = "Coffee Maker"; description = "Brew delicious coffee at home"; priceCents : Nat32 = 5000; category = "Home"; imageUrl = "" },
    { name = "Headphones"; description = "Noise-cancelling headphones"; priceCents : Nat32 = 8000; category = "Electronics"; imageUrl = "" },
    { name = "Jacket"; description = "Warm winter jacket"; priceCents : Nat32 = 7000; category = "Clothing"; imageUrl = "" },
    { name = "Blender"; description = "Make smoothies and shakes"; priceCents : Nat32 = 4500; category = "Home"; imageUrl = "" },
    { name = "Watch"; description = "Stylish analog watch"; priceCents : Nat32 = 3000; category = "Accessories"; imageUrl = "" },
    { name = "Shoes"; description = "Comfortable running shoes"; priceCents : Nat32 = 5000; category = "Clothing"; imageUrl = "" },
    { name = "Vacuum Cleaner"; description = "Powerful vacuum for cleaning"; priceCents : Nat32 = 9000; category = "Home"; imageUrl = "" },
    { name = "Backpack"; description = "Carry all your essentials"; priceCents : Nat32 = 3500; category = "Accessories"; imageUrl = "" },
    { name = "Smartphone"; description = "Latest model smartphone"; priceCents : Nat32 = 100000; category = "Electronics"; imageUrl = "" },
    { name = "Dress"; description = "Elegant evening dress"; priceCents : Nat32 = 6000; category = "Clothing"; imageUrl = "" },
    { name = "Sunglasses"; description = "Protect your eyes in style"; priceCents : Nat32 = 2500; category = "Accessories"; imageUrl = "" },
  ];

  func seedProducts() {
    products.clear();
    productIdCounter := 1;
    for (p in sampleProducts.values()) {
      let product : Product = { p with id = productIdCounter };
      products.add(productIdCounter, product);
      productIdCounter += 1;
    };
  };

  seedProducts();

  system func postupgrade() {
    seedProducts();
  };

  public query ({ caller }) func listProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProduct(id : Nat32) : async ?Product {
    products.get(id);
  };

  public shared ({ caller }) func addItemToCart(cartKey : Text, productId : Nat32, quantity : Nat32) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };
    if (quantity > 10) { Runtime.trap("Quantity cannot exceed 10") };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (_) {};
    };
    let cart : Cart = switch (carts.get(cartKey)) {
      case (?existingCart) { existingCart };
      case (null) { [] };
    };
    let existingIndex = cart.findIndex(func(item) { item.productId == productId });
    let newCart : Cart = switch (existingIndex) {
      case (?index) {
        let item = cart[index];
        if (item.quantity + quantity > 10) { Runtime.trap("Total quantity for an item cannot exceed 10") };
        Array.tabulate<CartItem>(cart.size(), func(i) {
          if (i == index) { { item with quantity = item.quantity + quantity } } else { cart[i] };
        });
      };
      case (null) { cart.concat([{ productId; quantity }]) };
    };
    carts.add(cartKey, newCart.sort());
  };

  public shared ({ caller }) func removeItemFromCart(cartKey : Text, productId : Nat32) : async () {
    switch (carts.get(cartKey)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let newCart = cart.filter(func(item) { item.productId != productId });
        if (newCart.size() == cart.size()) { Runtime.trap("Item not found in cart") };
        carts.add(cartKey, newCart.sort());
      };
    };
  };

  public shared ({ caller }) func updateCartItem(cartKey : Text, productId : Nat32, quantity : Nat32) : async () {
    if (quantity > 10) { Runtime.trap("Quantity cannot exceed 10") };
    switch (carts.get(cartKey)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let itemIndex = cart.findIndex(func(item) { item.productId == productId });
        switch (itemIndex) {
          case (null) { Runtime.trap("Item not found in cart") };
          case (?index) {
            let newCart = Array.tabulate(cart.size(), func(i) {
              if (i == index) { { productId; quantity } } else { cart[i] };
            });
            carts.add(cartKey, newCart.sort());
          };
        };
      };
    };
  };

  public shared ({ caller }) func clearCart(cartKey : Text) : async () {
    carts.add(cartKey, []);
  };

  public query ({ caller }) func getCart(cartKey : Text) : async Cart {
    switch (carts.get(cartKey)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func placeOrder(cartKey : Text, shippingInfo : ShippingInfo, paymentCardLast4 : Nat32) : async Nat32 {
    let cartSize = switch (carts.get(cartKey)) {
      case (null) { 0 };
      case (?cart) { cart.size() };
    };
    if (cartSize == 0) { Runtime.trap("Cart is empty") };
    let cart = switch (carts.get(cartKey)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?c) { c };
    };
    var totalPrice : Nat32 = 0;
    for (item in cart.values()) {
      switch (products.get(item.productId)) {
        case (null) { Runtime.trap("Product does not exist") };
        case (?p) { totalPrice += p.priceCents * item.quantity };
      };
    };
    let order : Order = { id = orderIdCounter; cart; shippingInfo; paymentCardLast4; totalPriceCents = totalPrice };
    orders.add(orderIdCounter, order);
    carts.add(cartKey, []);
    orderIdCounter += 1;
    order.id;
  };

  public query ({ caller }) func getOrder(orderId : Nat32) : async ?Order {
    orders.get(orderId);
  };
};
