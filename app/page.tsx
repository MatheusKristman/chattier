import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Brands } from "./components/brands";
import { Header } from "./components/header";
import { MobileHeaderMenu } from "./components/mobile-header-menu";
import { Benefit } from "./components/benefit";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <MobileHeaderMenu />
      <Hero />
      <Brands />
      <About />
      <Benefit />
      <CTA />
      <Footer />
    </>
  );
}
