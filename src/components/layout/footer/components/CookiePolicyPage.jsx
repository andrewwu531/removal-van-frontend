import Layout from "../../Layout";
import CookieContent from "./CookieContent";

export default function CookiePolicyPage() {
  return (
    <Layout showFooter={true}>
      <div className="max-w-4xl px-4 py-8 mx-auto mt-50 mb-30">
        <CookieContent />
      </div>
    </Layout>
  );
}
