"use client";


import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Walkthroughs from "./components/Walkthroughs";
import RecentWork from "./components/RecentWork";
import Thesis from "./components/Thesis";
import Work from "./components/Work";
import Solutions from "./components/Solutions";
import HowWeWork from "./components/HowWeWork";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import LogoStrip from "./components/Logostrip";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <RecentWork />
      <Walkthroughs /> 
      <Thesis />
      <HowWeWork />
      <Solutions />
      <Testimonials />
      <Team />
      <FAQ />
      <LogoStrip />
      <Footer />
    </main>
  );
}