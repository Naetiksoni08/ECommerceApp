require("dotenv").config();
const connectdb = require('./config/db');
const ProductModel = require("./models/productSchema");

connectdb();

async function seedProducts() {
    const products = [
      {
        name:'Iphone 14',
        Image:'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:200,
        description:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    },

    {
        name: 'Mackbook Pro',
        Image:'https://images.unsplash.com/photo-1420406676079-b8491f2d07c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hY2tib29rJTIwcHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:1000,
        description:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    },

    {
        name:'Nike Shoes',
        Image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5pa2UlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:200,
        description:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    },

    {
        name:'OnePlus TWS',
        Image:'https://images.unsplash.com/photo-1655560378428-7605bda51749?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHdzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:80,
        description:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    },

    {
        name:'Knife Set',
        Image:'https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtuaWZlJTIwc2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:50,
        description:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    },

    {
        name:'Canon Camera',
        Image:'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:800,
        description:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    },

    {
        name:'Drone',
        Image:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:1500,
        description:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    }
];

await ProductModel.deleteMany({});
   await ProductModel.create(products);
   console.log("Db seeded");
}

seedProducts();