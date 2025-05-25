import Jumbotron from "../components/Jumbotron";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  return (
    <main>
      <Jumbotron />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
