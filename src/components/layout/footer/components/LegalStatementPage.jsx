import TermsContent from "./TermsContent";
import PrivacyContent from "./PrivacyContent";
import CookieContent from "./CookieContent";
import { Helmet } from "react-helmet-async";

export default function LegalStatementPage() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-4xl max-[500px]:px-12 max-[500px]:mt-42 px-4 py-8 mx-auto mt-40 min-[1339px]:mt-46 min-[1920px]:mt-50">
        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-bold">Terms and Conditions</h2>
          <TermsContent />
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-bold">Privacy Policy</h2>
          <PrivacyContent />
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-bold">Cookie Policy</h2>
          <CookieContent />
        </section>
      </div>
    </>
  );
}
