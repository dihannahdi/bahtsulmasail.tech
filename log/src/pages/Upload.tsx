import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { DocumentUploadForm } from "@/components/documents/UploadForm";

const Upload = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Document Upload</h1>
            <p className="mt-4 text-foreground/70">
              Upload Islamic legal texts and documents to enrich our knowledge base.
            </p>
                  </div>

        <DocumentUploadForm />
        </div>
    </MainLayout>
  );
};

export default Upload;
