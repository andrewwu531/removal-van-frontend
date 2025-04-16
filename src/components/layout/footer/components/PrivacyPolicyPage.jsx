import Layout from "../../Layout";
import PrivacyContent from "./PrivacyContent";

export default function PrivacyPolicyPage() {
  return (
    <Layout showFooter={true}>
      <div className="max-w-4xl px-4 py-8 mx-auto mt-50 mb-30">
        <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
        <PrivacyContent />
      </div>
    </Layout>
  );
}
