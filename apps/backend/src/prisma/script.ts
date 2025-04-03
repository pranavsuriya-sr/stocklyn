import { PrismaClient } from "@prisma/client";

const prismaLocal = new PrismaClient({
  datasources: {
    db: {
      url: "",
    },
  },
});

const prismaProd = new PrismaClient({
  datasources: {
    db: {
      url: "",
    },
  },
});

const category = "gym";

async function main() {
  const matter = [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHwxfHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHwyfHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHwzfHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1550345332-09e3ac987658?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHw0fHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHw1fHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHw2fHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHw3fHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHw4fHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHw5fHxneW18ZW58MHx8fHwxNzQzNjYzMzA5fDA&ixlib=rb-4.0.3&w=600",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixid=M3w3MzIxMzJ8MHwxfHNlYXJjaHwxMHx8Z3ltfGVufDB8fHx8MTc0MzY2MzMwOXww&ixlib=rb-4.0.3&w=600",
  ];

  const names = [
    "GymFlex Pro Dumbbells",
    "IronGrip Gym Kettlebell",
    "PowerLift Gym Bench",
    "CardioMax Gym Treadmill",
    "MuscleForge Gym Barbell",
    "CoreCrush Gym Mat",
    "EnduroSpin Gym Bike",
    "FlexiFit Gym Resistance Bands",
    "TitanGym Power Rack",
    "GymPulse Rowing Machine",
  ];

  const products = Array.from({ length: matter.length }).map((_, index) => ({
    name: names[index],
    imageUrl: [matter[index]],
    productDescription: `This is one of the best products in the world in the category of ${category}`,
    categoryName: category,
    price: Math.ceil(Math.random() * 1000) + 400,
    details: "Excellent product and used for extra benefits",
    highlights: ["Great deal", "Amazing product", "Maalelo Certified"],
    sizes: ["S", "M", "L"],
    stockQuantity: Math.floor(Math.random() * 1000) + 400,
    colors: [],
    displayImage: matter[index],
    rating: 0,
    usersPurchased: 0,
  }));
  await Promise.all([
    prismaLocal.category.upsert({
      where: { name: category },
      update: {},
      create: {
        name: category,
        description: "good item",
      },
    }),
    prismaProd.category.upsert({
      where: { name: category },
      update: {},
      create: {
        name: category,
        description: "good item",
      },
    }),
  ]);

  await Promise.all([
    prismaLocal.products.createMany({ data: products }),
    prismaProd.products.createMany({ data: products }),
  ]);

  console.log("Done inserting into both databases");
}

main()
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(async () => {
    await prismaLocal.$disconnect();
    await prismaProd.$disconnect();
  });
