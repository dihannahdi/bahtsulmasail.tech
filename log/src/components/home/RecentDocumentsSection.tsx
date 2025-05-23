import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchRecentDocuments, Document } from "@/lib/api";
import { format } from 'date-fns';

// Map of categories to colors
const categoryColors: Record<string, string> = {
  "Worship": "bg-islamic-blue",
  "Family Law": "bg-islamic-green",
  "Financial Transactions": "bg-islamic-gold",
  "Inheritance & Wills": "bg-islamic-purple",
  "Contemporary Issues": "bg-islamic-teal",
  "Criminal Law": "bg-islamic-earth",
  "Legal Theory": "bg-islamic-maroon"
};

// Function to determine category from topics
const getCategoryAndColor = (topics?: string) => {
  if (!topics) return { category: "Uncategorized", categoryColor: "bg-gray-400" };
  
  // Convert topics string to array if needed
  const topicsArray = typeof topics === 'string' ? topics.split(',').map(t => t.trim()) : topics;
  
  // Find the first topic that matches a category
  for (const topic of topicsArray) {
    for (const [category, color] of Object.entries(categoryColors)) {
      if (topic.toLowerCase().includes(category.toLowerCase())) {
        return { category, categoryColor: color };
      }
    }
  }
  
  // Default category
  return { category: "General", categoryColor: "bg-islamic-blue" };
};

// Function to get excerpt from text
const getExcerpt = (text?: string): string => {
  if (!text) return "";
  return text.length > 200 ? text.substring(0, 200) + "..." : text;
};

interface DocumentCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  categoryColor: string;
  id: number;
}

const DocumentCard = ({ title, excerpt, author, date, category, categoryColor, id }: DocumentCardProps) => {
  return (
    <Card className="overflow-hidden border h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <div className={`h-2 w-2 rounded-full ${categoryColor}`}></div>
          <span className="text-xs font-medium text-foreground/60">{category}</span>
        </div>
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-foreground/70 line-clamp-3 mb-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t bg-secondary/30 flex items-center justify-between">
        <div className="text-xs text-foreground/60">
          <span>{author || "Unknown Author"}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/documents/${id}`}>Baca</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const RecentDocumentsSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await fetchRecentDocuments(4);
        setDocuments(data);
      } catch (err) {
        console.error('Error loading recent documents:', err);
        setError('Failed to load recent documents');
        // Fallback to mock data
        setDocuments([
          {
            id: 1,
            title: "Ruling on Digital Currencies in Islamic Finance",
            extracted_text: "A comprehensive analysis of cryptocurrencies from an Islamic perspective, examining issues of gharar, speculation, and their compliance with Shariah principles.",
            author: "Dr. Ahmad Al-Farsi",
            uploaded_at: "2023-03-15T14:30:00Z",
            topics: "Financial Transactions, Contemporary Issues, Technology",
            processing_status: "completed",
            source: "Journal of Islamic Economics"
          },
          {
            id: 2,
            title: "Guidelines for Prayers During Travel",
            extracted_text: "Detailed ruling on shortening and combining prayers while traveling, including minimum travel distances and durations according to different schools of thought.",
            author: "Sheikh Muhammad Al-Yaqoubi",
            uploaded_at: "2023-02-08T10:15:00Z",
            topics: "Worship, Prayer, Travel",
            processing_status: "completed",
            source: "Islamic Jurisprudence Council"
          },
          {
            id: 3,
            title: "Islamic Perspective on Surrogacy and Assisted Reproduction",
            extracted_text: "Contemporary fatwa examining the ethical and legal aspects of various assisted reproductive technologies in light of Islamic principles.",
            author: "Mufti Ismail Menk",
            uploaded_at: "2023-01-22T09:45:00Z",
            topics: "Contemporary Issues, Family Law, Medical Ethics",
            processing_status: "completed",
            source: "International Islamic Fiqh Academy"
          },
          {
            id: 4,
            title: "The Concept of Necessity (Darura) in Islamic Law",
            extracted_text: "An exploration of how necessity affects the application of Islamic rulings, with examples from classical texts and contemporary applications.",
            author: "Dr. Yasir Qadhi",
            uploaded_at: "2022-12-05T16:20:00Z",
            topics: "Legal Theory, Usul al-Fiqh, Contemporary Issues",
            processing_status: "completed",
            source: "Journal of Islamic Studies"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white dark:bg-card dark:bg-opacity-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="flex justify-between mb-12">
              <div>
                <div className="h-8 bg-foreground/20 w-48 rounded mb-4"></div>
                <div className="h-1 w-16 bg-foreground/20 rounded-full"></div>
              </div>
              <div className="h-10 w-32 bg-foreground/20 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-foreground/10 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-card dark:bg-opacity-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">Dokumen Terbaru</h2>
            <div className="h-1 w-16 bg-islamic-purple mt-4 rounded-full"></div>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link href="/documents">Lihat Semua Dokumen</Link>
          </Button>
        </div>

        {error && (
          <div className="mb-8 text-amber-600 text-sm">
            Catatan: Data dokumen saat ini menggunakan data contoh.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.isArray(documents) ? documents.map((doc) => {
            const { category, categoryColor } = getCategoryAndColor(doc.topics);
            const excerpt = getExcerpt(doc.extracted_text);
            const formattedDate = doc.uploaded_at ? 
              format(new Date(doc.uploaded_at), 'MMMM d, yyyy') : 
              'Unknown Date';

            return (
              <DocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                excerpt={excerpt}
                author={doc.author || 'Unknown Author'}
                date={formattedDate}
                category={category}
                categoryColor={categoryColor}
              />
            );
          }) : (
            <p>No documents available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentDocumentsSection;
