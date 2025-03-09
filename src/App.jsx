import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PriceCalculator from "./components/PriceCalculator";
// import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import Form from "./components/Form";
import BookingSteps from "./components/BookingSteps";

function App() {
  return (
    <div className="font-sans text-gray-900">
      <Header />
      <BookingSteps />
      <PriceCalculator />

      <HeroSection />
      <Form />

      <Footer />
    </div>
  );
}

export default App;
