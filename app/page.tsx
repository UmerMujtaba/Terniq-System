import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LiveShowcase from "@/components/LiveShowcase";
import MoreWork from "@/components/MoreWork";
import Expertise from "@/components/Expertise";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LiveShowcase />
        <MoreWork />
        <Expertise />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
