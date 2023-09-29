import fs from "fs";
import faker from "faker";

const generateRandomArray = (length, generator) => {
  return Array.from({ length }, generator);
};

const generateUser = () => {
  const legalAreas = [
    "Derecho Civil",
    "Derecho de Familia",
    "Derecho de Propiedad",
    "Derecho de Contratos",
    "Derecho de Sucesiones",
    "Derecho Penal",
    "Delitos",
    "Procedimiento Penal",
    "Derecho Administrativo",
    "Derecho Constitucional",
    "Derecho Laboral",
  ];

  const tiposde = ["civil", "penal", "contencioso-administrativo", "laboral"];

  const ciudades = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Balears",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lleida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  const preferences = {
    typeOfProjects: generateRandomArray(2, () =>
      faker.random.arrayElement(tiposde)
    ),
    cityOfProjects: generateRandomArray(2, () =>
      faker.random.arrayElement(ciudades)
    ),
    areaLegalProjects: generateRandomArray(2, () =>
      faker.random.arrayElement(legalAreas)
    ),
  };

  const cloudinaryImages = [
    "http://res.cloudinary.com/db87uybjo/image/upload/v1695472481/umpfhejfynomlaamstgb.jpg",
    "https://res.cloudinary.com/db87uybjo/image/upload/v1695406807/bn75pp37lr6c7hj6ypzz.jpg",
    "https://res.cloudinary.com/db87uybjo/image/upload/v1695030993/s3qppjz1mcqzqxix478u.webp",
    "https://res.cloudinary.com/db87uybjo/image/upload/v1695028163/samples/people/kitchen-bar.jpg",
    "https://res.cloudinary.com/db87uybjo/image/upload/v1695028172/samples/ecommerce/leather-bag-gray.jpg",
    "https://res.cloudinary.com/db87uybjo/image/upload/v1695028164/samples/food/fish-vegetables.jpg",
  ];
  const profileImage = faker.random.arrayElement(cloudinaryImages);
  return {
    email: faker.internet.email(),
    password: "$2b$10$8eJMQFg2I/kzqvCikdeS1us.bRymv4g4x9zEQSFTuIOIHphMMgZE.",
    telephone: faker.phone.phoneNumber(),
    avatar: faker.image.avatar(),
    isActive: faker.datatype.boolean(),
    profileImage,
    lastLogin: faker.date.past(),
    isVerified: faker.datatype.boolean(),
    notifications: generateRandomArray(3, () => faker.lorem.sentence()),
    companyName: faker.company.companyName(),
    nameCompanyRep: faker.name.firstName(),
    numColegiado: faker.name.firstName(),
    surnameCompanyRep: faker.name.lastName(),
    industryType: faker.commerce.department(),
    companySize: faker.datatype.number(),
    companyWebsite: faker.internet.url(),
    socialLinks: generateRandomArray(2, () => faker.internet.url()),
    location: faker.address.city(),
    companyDescription: faker.lorem.paragraph(),
    openRoles: generateRandomArray(3, () => faker.name.jobType()),
    jobTitle: faker.name.jobTitle(),
    educationLevel: "Bachelor's",
    languages: generateRandomArray(2, () => faker.random.locale()),
    certifications: generateRandomArray(2, () => faker.lorem.word()),
    portfolioUrl: faker.internet.url(),
    resumeUrl: faker.internet.url(),
    availability: "Full-Time",
    signupDate: faker.date.past(),
    isCompany: faker.datatype.boolean(),

    curriculum: generateRandomArray(2, () => faker.lorem.word()),

    skills: generateRandomArray(4, () => faker.name.jobArea()),
    preferences,
  };
};

const users = generateRandomArray(15, generateUser);

fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
  if (err) throw err;
  console.log("Datos generados y guardados en users.json");
});
