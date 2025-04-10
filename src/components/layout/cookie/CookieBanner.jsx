import { CookieContent } from "./components/CookieContent";
import { useCookieConsent } from "./hooks/useCookieConsent";

export default function CookieBanner() {
  const { showBanner, handleAccept } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <CookieContent onAccept={handleAccept} />
    </div>
  );
}
