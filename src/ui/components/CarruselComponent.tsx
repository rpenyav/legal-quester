import React from "react";
import { Carousel } from "react-bootstrap";
import {
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
} from "../../assets/";

const carouselData = [
  {
    image: carousel1,
    title: "Transforma tu Carrera Legal",
    description:
      "Da el salto a la vanguardia legal con herramientas y recursos innovadores.",
  },
  {
    image: carousel2,
    title: "Participa, Innova, Transforma",
    description:
      "Sé parte activa de la revolución legal. Tu contribución es el futuro.",
  },
  {
    image: carousel3,
    title: "Juntos definimos el Futuro Legal",
    description:
      "En comunidad, redefinimos los estándares y prácticas legales del mañana.",
  },
  {
    image: carousel4,
    title: "Legalidad, Comunidad, Progreso",
    description:
      "Uniendo esfuerzos, construimos un entorno legal más justo y actualizado.",
  },
  {
    image: carousel5,
    title: "Participa y Modela el Derecho del Mañana",
    description:
      "Tu voz es esencial. Ayuda a moldear un sistema legal más inclusivo y moderno.",
  },
];

export const CarruselComponent: React.FC = () => {
  return (
    <Carousel fade indicators={false}>
      {carouselData.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={item.image} alt={item.title} />
          <Carousel.Caption className="custom-caption">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
