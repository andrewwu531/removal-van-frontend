import Layout from "../../Layout";
import TermsContent from "./TermsContent";

export default function TermsConditionsPage() {
  return (
    <Layout showFooter={true}>
      <div className="max-w-4xl px-4 py-8 mx-auto mt-50 mb-30">
        <TermsContent />
      </div>
    </Layout>
  );
}
