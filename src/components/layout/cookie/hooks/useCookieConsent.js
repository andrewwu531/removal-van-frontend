import { useState, useEffect } from "react";

export function useCookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies and has seen the initial popup
    const hasAccepted = localStorage.getItem("cookieConsent");
    const hasSeenInitialPopup = localStorage.getItem("hasSeenInitialPopup");

    // Only show cookie banner if user has seen the initial popup and hasn't accepted cookies
    if (!hasAccepted && hasSeenInitialPopup === "true") {
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
