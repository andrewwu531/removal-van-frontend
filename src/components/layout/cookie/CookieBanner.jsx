import { CookieContent } from "./components/CookieContent";
import { useCookieConsent } from "./hooks/useCookieConsent";

export default function CookieBanner() {
  const { showBanner, handleAccept } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed z-50 left-1/2 transform -translate-x-1/2 bottom-3 w-[calc(100%-10%)] min-[1200px]:w-[calc(100%-20%)]  min-[1370px]:w-[calc(100%-30%)]  bg-white border-t border-gray-200 shadow-lg rounded-3xl">
      <CookieContent onAccept={handleAccept} />
    </div>
  );
}
