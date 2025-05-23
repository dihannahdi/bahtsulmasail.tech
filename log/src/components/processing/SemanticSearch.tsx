import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, History, Filter, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { searchApi } from "@/lib/api";
import { LoadingSection } from "@/components/ui/loading-section";
import { motion, AnimatePresence } from "framer-motion";
import { SearchFilters } from "./SearchFilters";

// Define interfaces
interface SearchResult {
  id: number;
  title: string;
  author: string | null;
  similarity: number;
  matching_text: string;
  topics: string | null;
  upload_date: string;
  approval_status?: string;
  is_public?: boolean;
}

interface SearchFilters {
  dateRange: [Date | null, Date | null];
  topics: string[];
  minSimilarity: number;
  documentTypes: string[];
}

const SemanticSearch = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: [null, null],
    topics: [],
    minSimilarity: 0.6,
    documentTypes: [],
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  // Create form with react-hook-form
  const form = useForm({
    defaultValues: {
      query: "",
      numResults: 5,
      threshold: 0.6,
    },
  });

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (query: string) => {
    const updatedHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  // Load available topics
  useEffect(() => {
    // In a real application, this would be fetched from an API
    setAvailableTopics([
      "Worship",
      "Prayer",
      "Fasting",
      "Zakat",
      "Hajj",
      "Family Law",
      "Marriage",
      "Divorce",
      "Inheritance",
      "Financial Transactions",
      "Business",
      "Trade",
      "Contemporary Issues",
      "Technology",
      "Medical Ethics",
      "Social Issues",
    ]);
  }, []);

  const onSubmit = async (values: any) => {
    setIsSearching(true);
    
    try {
      // Save query to history
      if (values.query.trim()) {
        saveToHistory(values.query.trim());
      }

      // Make API request using the searchApi
      const searchResults = await searchApi.semanticSearch(
        values.query,
        values.numResults,
        values.threshold
      );

      // Apply filters
      const filteredResults = searchResults.filter((result: SearchResult) => {
        // Apply date range filter
        if (filters.dateRange[0] && filters.dateRange[1]) {
          const uploadDate = new Date(result.upload_date);
          if (uploadDate < filters.dateRange[0] || uploadDate > filters.dateRange[1]) {
            return false;
          }
        }

        // Apply topic filter
        if (filters.topics.length > 0 && result.topics) {
          const resultTopics = result.topics.split(',').map(t => t.trim());
          if (!filters.topics.some(topic => resultTopics.includes(topic))) {
            return false;
          }
        }

        // Apply similarity threshold
        if (result.similarity < filters.minSimilarity) {
          return false;
        }

        return true;
      });

      setResults(filteredResults);
      
      if (filteredResults.length === 0) {
        toast({
          title: "No results found",
          description: "Try modifying your search query or adjusting the filters.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: error instanceof Error ? error.message : "Failed to perform search",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Format the similarity score as a percentage
  const formatSimilarity = (similarity: number) => {
    return `${Math.round(similarity * 100)}%`;
  };

  // Highlight matching segments in text with improved accuracy
  const highlightMatches = (text: string, query: string) => {
    if (!query || !text) return text;
    
    // Split into meaningful phrases
    const phrases = query.toLowerCase()
      .split(/[,.;!?]/)
      .map(phrase => phrase.trim())
      .filter(phrase => phrase.length > 2);
    
    // Create a regex pattern that matches any of the phrases
    const pattern = phrases
      .map(phrase => phrase.split(/\s+/)
        .filter(word => word.length > 2)
        .map(word => `\\b${word}\\w*\\b`)
        .join('\\s+'))
      .join('|');
    
    try {
      const regex = new RegExp(`(${pattern})`, 'gi');
      return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900">$1</mark>');
    } catch (e) {
      console.error('Regex error:', e);
      return text;
    }
  };

  // Format topics string to array
  const formatTopics = (topics: string | null) => {
    if (!topics) return [];
    return topics.split(',').map(t => t.trim());
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Query</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Input 
                            placeholder="Enter your search query..." 
                            className="pr-10"
                            {...field} 
                          />
                          {field.value && (
                            <button
                              type="button"
                              onClick={() => form.setValue('query', '')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Filter className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Search Filters</SheetTitle>
                              <SheetDescription>
                                Refine your search results
                              </SheetDescription>
                            </SheetHeader>
                            <SearchFilters
                              filters={filters}
                              onFiltersChange={setFilters}
                              availableTopics={availableTopics}
                              onClose={() => setIsFiltersOpen(false)}
                            />
                          </SheetContent>
                        </Sheet>
                        <Button 
                          type="submit" 
                          disabled={isSearching}
                        >
                          {isSearching ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Search className="h-4 w-4 mr-2" />
                          )}
                          Search
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Recent searches:
                      <div className="flex flex-wrap gap-2">
                        {searchHistory.slice(0, 3).map((query, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-secondary/80"
                            onClick={() => form.setValue('query', query)}
                          >
                            {query}
                          </Badge>
                        ))}
                      </div>
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="numResults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Results: {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Similarity Threshold: {Math.round(field.value * 100)}%</FormLabel>
                      <FormControl>
                        <Slider
                          min={0.1}
                          max={0.9}
                          step={0.05}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        Higher values return more relevant but fewer results
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isSearching ? (
        <LoadingSection message="Searching documents..." />
      ) : (
        <AnimatePresence mode="wait">
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">
                  Search Results ({results.length})
                </h3>
                <Button variant="outline" size="sm" onClick={() => setResults([])}>
                  Clear Results
                </Button>
              </div>

              <div className="space-y-4">
                {results.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-medium mb-2">{result.title}</h3>
                          <Badge variant="outline" className="ml-2">
                            {formatSimilarity(result.similarity)}
                          </Badge>
                        </div>

                        <div className="text-sm text-foreground/60 mb-3">
                          {result.author && <span>By {result.author} | </span>}
                          <span>Added on {new Date(result.upload_date).toLocaleDateString()}</span>
                        </div>

                        {formatTopics(result.topics).length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {formatTopics(result.topics).map((topic, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div 
                          className="text-sm leading-relaxed prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatches(
                              result.matching_text,
                              form.getValues("query")
                            ),
                          }}
                        />

                        <div className="mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/documents/${result.id}`}>View Document</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SemanticSearch; 