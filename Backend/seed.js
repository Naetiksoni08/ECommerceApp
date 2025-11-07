require("dotenv").config();
const connectdb = require('./config/db');
const ProductModel = require("./models/productSchema");

connectdb();
async function seedProducts() {
    const products = [
        {
            name: 'iPhone 17 Pro Max',
            Image: 'https://www.mobileana.com/wp-content/uploads/2025/06/Apple-iPhone-17-Pro-Max-Cosmic-Orange.webp',
            price: 149900,
            description: 'The iPhone 17 Pro Max features Apple’s latest A20 Bionic chip, a titanium body, and 120Hz OLED display for an unmatched experience.'
        },

        {
            name: 'MacBook Pro M3 Max',
            Image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
            price: 98999,
            description: 'Apple’s MacBook Pro M3 Max is a powerhouse for creators with a 16-inch Liquid Retina XDR display and up to 48GB unified memory.'
        },

        {
            name: 'Louis Vuitton Horizon Light Up Speaker',
            Image: 'https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-louis-vuitton-horizon-light-up-speaker--QAC000_PM1_Closeup%20view.png?wid=2400&hei=2400',
            price: 381334,
            description: 'A portable Bluetooth speaker that blends luxury fashion with premium sound and mesmerizing LED lighting.'
        },


        {
            name: 'Hermès Birkin Bag 35',
            Image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSBIaBJUJT1sG5yk6qjqwu_CEXqYdGlUpBQtOCMQ26DQ9o548MqOFR9RnNeEKr5lod070uRymBdhiZlos9s3Lazu96GtODmMFwGtKTxE-JDJa5CdaHaWIFnBA',
            price: 1850000,
            description: 'An iconic handbag handmade in France with premium Togo leather and palladium hardware.'
        },

        {
            name: 'Gucci Ace Embroidered Sneakers',
            Image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            price: 75000,
            description: 'Gucci’s signature Ace sneakers, crafted in Italy with bee embroidery and Web detail.'
        },

        {
            name: 'Dior Sauvage Elixir',
            Image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRW05mpz0UpkXQbKnv5hFM289hv5LwMxwitPcREpzXGpwmsi-e6HmEl-7ZYdkFUXcMwh3sqbD82njXuE80dMkg66GwEwbAEmgvl6ivytcT5rNBRMa-Ky4d9-La0kmQnDTUtIowOFA&usqp=CAc',
            price: 23000,
            description: 'A bold and intense fragrance from Dior featuring notes of lavender, cinnamon, and sandalwood.'
        },

        {
            name: 'Audemars Piguet Royal Oak',
            Image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAB5LkgaQefgMouqAMEQ-ecTegKo4Y5WHaBdL1fDAwChCniOUGbUtV1kPT38bNkoDgLokZQ5_41CxydSQiUR_AyDfhTVyGN3Jlaj7Vf5v-',
            price: 20000000,
            description: 'An icon of Swiss watchmaking, crafted in stainless steel with a blue “Grande Tapisserie” dial.'
        },

        {
            name: 'Bose Noise Cancelling Headphones 700 Limited Edition',
            Image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ3NhWWZfjC9IyJDdT4G1xQnoMFuit9iq5J9ZSlTQYKTo9oTMN9RoiwM6ERA8ARoQrkinRQyn64OBBm1ezgdeDNo99wHv96XgaZjrHEnaEsu0e9hTFt_BJQJQ',
            price: 39999,
            description: 'Bose’s flagship wireless headphones with adaptive noise cancellation and crystal-clear audio quality.'
        },

        {
            name: 'Montblanc Meisterstück LeGrand Fountain Pen',
            Image: 'https://img.tatacliq.com/images/i14/1316Wx1468H/MP000000019896961_1316Wx1468H_202310312223351.jpeg',
            price: 151000,
            description: 'A luxurious writing instrument crafted in precious resin with gold-coated details and hand-crafted nib.'
        },

        {
            name: 'Versace Medusa Belt',
            Image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRelD86CoHDnei7HRRTH25S3WsWR3xrS2T2WJlTxZ5bp3nwJS9pUguigB21HhbpLgrMcXm8rf8Q',
            price: 50000,
            description: 'A statement leather belt featuring the iconic Medusa head buckle symbolizing power and luxury.'
        },

        {
            name: 'Chanel J12 White Ceramic Watch',
            Image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQBdPCoG3G2AhNgbl15OGO3E1oE5c56hWL7Ud6bc42uCuetrd25Mtd89ZQRC8Nu2Po55h6g8Rz5LCaXB7rndgkOiU3tTJWV',
            price: 457000,
            description: 'An elegant Chanel J12 watch crafted in white ceramic with automatic movement and diamond indexes.'
        },

        {
            name: 'Rolex Cosmograph Daytona Everose Gold',
            Image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRY7CTngBLXFZ7siV62HrvezUNgFLcgKB38nbffITl7CI8wMn6B0oNQvboD8uEqEUj9JuSDxdicy5EXAdjo__ugRrzmjQCA7C5HQinYoPu3PNk9jMpxY_8sX8g2',
            price: 4690225,
            description: 'Rolex 126505 Cosmograph Daytona 18K Rose Gold Black Dial Oyster Bracelet Complete Set 2024.The Rolex Cosmograph Daytona 126505 features an 18K rose gold case, fixed tachymeter bezel, black dial with luminous hour markers, chronograph subdials, and an 18K rose gold Oyster bracelet. This complete 2024 set includes the original Rolex box and papers',
        },
        {
            name: 'Canon Camera',
            Image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            price: 61999,
            description: 'The Canon EOS 1500D (Rebel T7) is a 24.1MP DSLR camera featuring a DIGIC 4+ image processor, built-in Wi-Fi, and Full HD video recording, ideal for beginners and enthusiasts seeking high-quality photography.'
        },
        {
            name: 'Nike Shoes',
            Image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5pa2UlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            price: 20000,
            description: 'The Nike Air Jordan 1 Retro High OG combines classic basketball heritage with modern street style. Crafted with premium leather, responsive cushioning, and bold colorways for unmatched comfort and fashion.'
        },
        {
            name: 'rolex oyster perpetual cosmograph daytona rainbow',
            Image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT97j29hX8ShGXcrn7YcSsIAaGVL982uQRv0WLizu7ytqtLNsEcp9hOTuW-Bc3zFU7t2d0dYwvzIxPpGWvMTXP_YTVh6CJH',
            price: 42098488,
            description: 'Rolex Daytona Cosmograph Daytona 40mm Rainbow Sapphire Bezel Everose Gold Black Diamond Baguette Dial',
        }

    ];

    await ProductModel.deleteMany({});
    await ProductModel.create(products);
    console.log("Luxury products seeded successfully!");
}

seedProducts();
