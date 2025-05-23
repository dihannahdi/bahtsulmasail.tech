import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface SearchFiltersProps {
  filters: {
    dateRange: [Date | null, Date | null];
    topics: string[];
    minSimilarity: number;
    documentTypes: string[];
  };
  onFiltersChange: (filters: SearchFiltersProps["filters"]) => void;
  availableTopics: string[];
  onClose: () => void;
}

export function SearchFilters({
  filters,
  onFiltersChange,
  availableTopics,
  onClose,
}: SearchFiltersProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(filters.dateRange);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(filters.topics);
  const [minSimilarity, setMinSimilarity] = useState(filters.minSimilarity);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(filters.documentTypes);

  const documentTypes = [
    { id: "standard", label: "Standard Documents" },
    { id: "bahtsul_masail", label: "Bahtsul Masail" },
    { id: "fatwa", label: "Fatwa" },
    { id: "research", label: "Research Papers" },
  ];

  const handleApplyFilters = () => {
    onFiltersChange({
      dateRange,
      topics: selectedTopics,
      minSimilarity,
      documentTypes: selectedTypes,
    });
    onClose();
  };

  const handleResetFilters = () => {
    setDateRange([null, null]);
    setSelectedTopics([]);
    setMinSimilarity(0.6);
    setSelectedTypes([]);
    onFiltersChange({
      dateRange: [null, null],
      topics: [],
      minSimilarity: 0.6,
      documentTypes: [],
    });
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const toggleDocumentType = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Date Range</h4>
          {(dateRange[0] || dateRange[1]) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDateRange([null, null])}
              className="h-8 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="grid gap-2">
          <Calendar
            mode="range"
            selected={{
              from: dateRange[0] || undefined,
              to: dateRange[1] || undefined,
            }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                setDateRange([range.from, range.to]);
              }
            }}
            className="rounded-md border"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Document Types</h4>
          {selectedTypes.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTypes([])}
              className="h-8 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="grid gap-2">
          {documentTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Switch
                id={`type-${type.id}`}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => toggleDocumentType(type.id)}
              />
              <Label htmlFor={`type-${type.id}`}>{type.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Topics</h4>
          {selectedTopics.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTopics([])}
              className="h-8 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <ScrollArea className="h-[200px]">
          <div className="grid grid-cols-2 gap-2 pr-4">
            {availableTopics.map((topic) => (
              <Badge
                key={topic}
                variant={selectedTopics.includes(topic) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTopic(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Minimum Similarity</h4>
          <span className="text-sm text-muted-foreground">
            {Math.round(minSimilarity * 100)}%
          </span>
        </div>
        <Slider
          min={0.1}
          max={0.9}
          step={0.05}
          value={[minSimilarity]}
          onValueChange={(value) => setMinSimilarity(value[0])}
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
} 