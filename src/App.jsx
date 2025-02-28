import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BookingForm from "./components/BookingForm";

import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-gray-900">
      <Header />
      <HeroSection />

      <div className="flex flex-col w-full bg-blue-50">
        <BookingForm />
      </div>

      <Footer />
    </div>
  );
}

export default App;
