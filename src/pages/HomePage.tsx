import React from 'react';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import ServiceCarousel from '../components/ServiceCarousel';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <ServiceCarousel />
    </>
  );
}