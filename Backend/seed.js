require("dotenv").config();
const connectdb = require('./config/db');
const ProductModel = require("./models/productSchema");

connectdb();

async function seedProducts() {
    const products = [
      {
        name: "Wireless Mouse",
        price: 1999,
        Image:
          "https://images.unsplash.com/photo-1631749352438-7d576312185d?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Ergonomic wireless mouse with 2.4GHz connectivity and adjustable DPI.",
      },
      {
        name: "Mechanical Keyboard",
        price: 5499,
        Image:
          "https://images.unsplash.com/photo-1602025882379-e01cf08baa51?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "RGB backlit mechanical keyboard with blue switches and metal frame.",
      },
      {
        name: "Gaming Laptop",
        price: 84999,
        Image:
          "https://images.unsplash.com/photo-1640955014216-75201056c829?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "High-performance gaming laptop with RTX 4070 GPU and 16GB RAM.",
      },
      {
        name: "Bluetooth Headphones",
        price: 2999,
        Image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Over-ear wireless headphones with noise cancellation and 40-hour battery life.",
      },
      {
        name: "4K Monitor",
        price: 19999,
        Image:
          "https://plus.unsplash.com/premium_photo-1681816189679-fa02d1acd1de?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "27-inch UHD 4K display with HDR support and 144Hz refresh rate.",
      },
        {
          name: "Smart Glasses VisionX",
          price: 24999,
          Image: "data:image/jpeg;base64,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",
          description: "Augmented reality smart glasses with voice control, real-time translation, and a minimalist frame design."
        },
        {
          name: "Self-Cleaning Water Bottle",
          price: 3999,
          Image: "https://cdn.shopify.com/s/files/1/0649/8494/0772/files/LARQ_Still-Kitchen_1.jpg?v=1683087986",
          description: "A UV-powered stainless steel bottle that purifies your water in minutes and eliminates odors."
        },
        {
          name: "Magnetic Levitating Speaker",
          price: 15999,
          Image: "https://images-cdn.ubuy.co.in/65e1f5f90d3ed972d6706c05-magnetic-levitating-bluetooth-speaker.jpg",
          description: "A Bluetooth speaker that floats in the air, providing 360° sound and futuristic aesthetics."
        },
        {
          name: "Portable Espresso Maker Pro",
          price: 6999,
          Image: "https://www.coffeeness.de/wp-content/uploads/2024/07/conqueco-portable-espresso-machine-main.jpg",
          description: "Compact espresso maker for coffee lovers on the go, with stainless steel design and hand-pump brewing."
        },
        {
          name: "Mini Projector Cube",
          price: 12999,
          Image: "https://djx5h8pabpett.cloudfront.net/wp-content/uploads/sites/4/2020/01/28195934/merlin_digital-cube.png",
          description: "A pocket-sized 4K-ready projector with wireless connectivity for instant movie nights anywhere."
        },
        {
          name: "Smart Plant Pot",
          price: 5499,
          Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbS7yAH3Qy7djjO6a7QpMDhT5DB6onFfDew&s",
          description: "Self-watering pot with a built-in sensor to monitor soil moisture, sunlight, and plant health."
        },
        {
          name: "Temperature Control Smart Mug",
          price: 7999,
          Image: "https://m.media-amazon.com/images/I/71obku-TOiL._UF894,1000_QL80_.jpg",
          description: "Keeps your drink at the perfect temperature for hours, controllable via a mobile app."
        },
        {
          name:"IPhone 16 Pro Max",
          price: 99999,
          Image:"https://media.assettype.com/deccanherald%2F2024-11-21%2Fcbbyt4o4%2FApple-iPhone-16-Pro-Max-Cover-Photos-Selected-8.jpg?w=undefined",
          description:"iPhone 16 Pro Max – Powered by the A18 Bionic chip, stunning 6.9-inch display, pro triple-camera system, and all-day battery in a sleek titanium design."
        },
        {
          name:"Sony Camera",
          price: 10000,
          Image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww",
          description:"Sony Alpha ZV-E1 – A full-frame mirrorless camera designed for creators, featuring 4K 120fps video, advanced autofocus, and exceptional low-light performance in a lightweight body."
        },
        {
          name:"Nexx X.R3R Zero Pro Carbon 2023 Helmet",
          price:"41000",
          Image:"https://images.unsplash.com/photo-1711356027342-4a8d3b1f1b38?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:"The Nexx X.R3R is a great full face helmet by Nexx for Race/Sport riders"
        }
      ];
await ProductModel.deleteMany({});
   await ProductModel.create(products);
   console.log("Db seeded");
}

seedProducts();