import fs from "fs";
import faker from "faker";

const generateRandomArray = (length, generator) => {
  return Array.from({ length }, generator);
};
const userIds = [
  "6511b7c15751406670da8520",
  "6511b7c15751406670da8521",
  "6511b7c15751406670da8522",
  "6511b7c15751406670da8523",
  "6511b7c15751406670da8524",
  "6511b7c15751406670da8525",
  "6511b7c15751406670da8526",
];

let userIndex = 0;
const generateProyecto = () => {
  const today = new Date("2023-09-23");
  const targetDate = new Date("2023-09-02");

  const owner = userIds[userIndex];

  const areaslegales = [
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
  userIndex = (userIndex + 1) % userIds.length;
  return {
    nombre: faker.commerce.productName(),
    descripcion: faker.lorem.paragraph(),
    fechaInicio: faker.date.past(),
    fechaPublicacion: faker.date.between(targetDate, today),
    fechaFin: faker.date.future(),
    habilidadesRequeridas: generateRandomArray(3, () => faker.hacker.ingverb()),
    owner,

    areaLegal: faker.random.arrayElement(areaslegales),

    cityOfProject: generateRandomArray(2, () =>
      faker.random.arrayElement(ciudades)
    ),
    typeOfCase: generateRandomArray(2, () =>
      faker.random.arrayElement([
        "civil",
        "penal",
        "contencioso-administrativo",
        "laboral",
      ])
    ),

    estatus: faker.random.arrayElement(["Abierto", "En Proceso", "Cerrado"]),
    prioridad: faker.random.arrayElement(["Alta", "Media", "Baja"]),
    documentoAdjuntos: generateRandomArray(2, () => faker.system.fileName()),
    tarifa: faker.commerce.price(),
    modalidadPago: faker.random.arrayElement([
      "efectivo",
      "cheque",
      "transferencia",
      "domiciliación bancaria",
      "contrareembolso",
      "tarjeta",
      "bizum",
      "paypal",
    ]),
    surveyNumber: faker.datatype.objectId(),
    cliente: faker.company.companyName(),
    resultadosEsperados: faker.lorem.sentence(),
    etapasProyecto: generateRandomArray(3, () => faker.lorem.word()),

    jurisdiccion: faker.random.arrayElement([
      "Jurisdicción Civil",
      "Jurisdicción Penal",
      "Jurisdicción Contencioso-Administrativa",
      "Jurisdicción Social",
    ]),
    requisitosLegales: generateRandomArray(2, () => faker.lorem.sentence()),
  };
};

const proyectos = generateRandomArray(100, generateProyecto);

fs.writeFile("proyectos.json", JSON.stringify(proyectos, null, 2), (err) => {
  if (err) throw err;
  console.log("Datos generados y guardados en proyectos.json");
});
