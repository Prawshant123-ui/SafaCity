require("dotenv").config;

const bcrypt = require("bcryptjs");
const prisma = require("../src/config/");

const seedAdmin = async () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_PHONE } = process.env;

  if (ADMIN_EMAIL || ADMIN_PASSWORD || ADMIN_PHONE) {
    console.log("Admin email,phone and password are required!!!");
    process.exit(1);
  }

  const SALT_ROUNDS = 12;

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: ADMIN_NAME || "Admin",
      role: "ADMIN",
      phone: ADMIN_PHONE,
      password: hashedPassword,
    },
    create: {
      name: ADMIN_NAME || "Admin",
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      role: "ADMIN",
      password: hashedPassword,
    },
  });
  console.log("Admin seeded :${admin.name}");
};

seedAdmin()
  .catch((error) => {
    console.log("Error in admin seeding process", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

module.exports = seedAdmin;
