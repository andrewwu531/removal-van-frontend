import { useState, useEffect } from "react";

export function useCookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent");

    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Save that user has accepted cookies
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  return {
    showBanner,
    handleAccept,
  };
}
