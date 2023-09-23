const fs = require("fs");
const faker = require("faker");

const generateRandomArray = (length, generator) => {
  return Array.from({ length }, generator);
};

const generateProyecto = () => {
  return {
    nombre: faker.commerce.productName(),
    descripcion: faker.lorem.paragraph(),
    fechaInicio: faker.date.past(),
    fechaFin: faker.date.future(),
    habilidadesRequeridas: generateRandomArray(3, () => faker.hacker.ingverb()),
    areaLegal: faker.lorem.word(),
    estatus: faker.random.arrayElement(["Abierto", "En Proceso", "Cerrado"]),
    prioridad: faker.random.arrayElement(["Alta", "Media", "Baja"]),
    documentoAdjuntos: generateRandomArray(2, () => faker.system.fileName()),
    tarifa: faker.commerce.price(),
    modalidadPago: faker.finance.transactionType(),
    cliente: faker.company.companyName(),
    resultadosEsperados: faker.lorem.sentence(),
    etapasProyecto: generateRandomArray(3, () => faker.lorem.word()),
    jurisdiccion: faker.address.country(),
    requisitosLegales: generateRandomArray(2, () => faker.lorem.sentence()),
  };
};

const proyectos = generateRandomArray(100, generateProyecto);

fs.writeFile("proyectos.json", JSON.stringify(proyectos, null, 2), (err) => {
  if (err) throw err;
  console.log("Datos generados y guardados en proyectos.json");
});
