import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: ""
    }
  }
});

async function main() {
  const matter = [
    "https://frontends-demo.vercel.app/logo.svg",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/43/67/fa/himbeereis.jpg?width=400&ts=1596695159",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/33/88…/Barefoot-Living-2746.jpg?width=280&ts=1596695193",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/f7/47/04/Barefoot_02.jpg?width=400&ts=1596695153",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/5b/34…-MoI_cHNcSK8-unsplash.jpg?width=400&ts=1596695157",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/bc/ba…annon-294645-unsplash.jpg?width=400&ts=1732024576",
    "",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/a6/a0…-c9FQyqIECds-unsplash.jpg?width=400&ts=1676640063",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/3c/da…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/31/10…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/dd/c6…jpg?width=280&ts=1596695205?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/e3/4e…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/22/1a…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/d1/8e…jpg?width=280&ts=1596695194?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/02/23…jpg?width=280&ts=1596695205?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/f7/d4…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/3c/6e…jpg?width=280&ts=1596695205?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/40/1f…jpg?width=280&ts=1596695205?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/4b/8a…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/65/d3…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/a6/29…jpg?width=280&ts=1596695206?&height=300&fit=cover",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/12/b2/b9/1671435737/aaa.png?ts=1671435737",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/12/b2/b9/1671435737/aaa.png?ts=1671435737",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/ec/03…haelter_01j58XkqfbdjI9K_800x800.jpg?ts=1596695206",
    "https://cdn.shopware.store/a/B/m/pPkDE/media/02/02…ne-Elli-mit-Kompressor-1-2L_003.jpg?ts=1596695206",
    "https://frontends-demo.vercel.app/logo.svg",
  ];

  const names = [
    "logo of the shop",
    "Category image",
    "Category image",
    "Category image",
    "Category image",
    "Category image",
    "Category image",
    "Category image",
    "Bay leaves",
    'Blue sapphire salt "Sel Bleu De Perse"',
    "Curry Madras, original indian, seasoning",
    "Fleur de Sel",
    "Ground mustard (brown)",
    'Hawaii sea-salt "Black Lava"',
    "Himalaya natural crystal salt, rough",
    "Mediterrarean seasoning",
    "Mustard, yellow",
    "Pepper black, ground",
    "Pepper black, Tellicherry extrabold",
    "Pepper white, ground, Muntok pearl",
    "Pepper white, Muntok pearl",
    "",
    "",
    "",
    "",
    "logo of the shop",
  ];

  // await prisma.category.create({
  //   data: {
  //     name: "groceries",
  //     description: "Food and household items"
  //   }
  // });

  const products = Array.from({ length: matter.length }).map((_, index) => ({
    name: names[index],
    imageUrl: [matter[index].replace("https://", "")],
    productDescription:
      "This is one of the best products in the world in the category of groceries",
    categoryName: "groceries",
    price: Math.ceil(Math.random() * 100) + 0.99,
    details: "Excellent product and used for extra benefits",
    highlights: ["An amazing product"],
    sizes: ["S", "M", "L"],
    stockQuantity: Math.floor(Math.random() * 100) + 1,
    colors: [],
    displayImage: matter[index],
    rating: 0,
    usersPurchased: 0,
  }));
  await prisma.products.createMany({ data: products });
  console.log("done");
}

main();
