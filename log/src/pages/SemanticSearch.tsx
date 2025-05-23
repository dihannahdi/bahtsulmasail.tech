import MainLayout from "@/components/layout/MainLayout";
import SemanticSearch from "@/components/processing/SemanticSearch";

const SemanticSearchPage = () => {
  return (
    <MainLayout>
      <section className="bg-secondary/30 pattern-bg py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">
            Semantic Search
          </h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-center mb-12">
            Find relevant Islamic legal documents based on meaning, not just keywords. Our semantic 
            search uses AI to understand your query and find the most relevant documents.
          </p>

          <div className="max-w-4xl mx-auto">
            <SemanticSearch />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SemanticSearchPage; 