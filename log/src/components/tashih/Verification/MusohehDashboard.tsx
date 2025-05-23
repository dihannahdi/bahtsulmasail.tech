import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tashihApi } from '../../../lib/api';
import { useToast } from '../../ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  BarChart2, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  AlertTriangle,
  CalendarCheck
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";

// Define types
interface TaqrirKhassItem {
  id: number;
  title: string;
  status: string;
  taqrir_jamai: number | { id: number; title: string };
  created_at: string;
  updated_at: string;
  confidence_score?: number;
  priority_score?: number;
  verification_progress?: number;
  created_by?: { id: number; username: string };
  completion_estimate?: string;
}

interface VerificationMetrics {
  total_pending: number;
  total_completed: number;
  total_needs_revision: number;
  verified_last_7_days: number;
  verification_rate: number;
  average_time_to_verify: string;
  verification_by_component: {
    nash_masalah: number;
    khalfiyyah: number;
    munaqashah: number;
    jawaban: number;
    talil_jawab: number;
    referensi: number;
  };
}

const MusohehDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState<string>('queue');
  const [documents, setDocuments] = useState<TaqrirKhassItem[]>([]);
  const [completedDocuments, setCompletedDocuments] = useState<TaqrirKhassItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('priority');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showStatsDialog, setShowStatsDialog] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<VerificationMetrics | null>(null);
  
  // Fetch documents for verification
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch pending documents
        const pendingData = await tashihApi.getPendingVerifications();
        setDocuments(pendingData.map((doc: any) => ({
          ...doc,
          // Calculate priority score (simulated for now - in real implementation this would come from backend)
          priority_score: doc.confidence_score ? (1 - doc.confidence_score) * 100 : 
                           Math.floor(Math.random() * 100),
          // Calculate verification progress
          verification_progress: doc.verification_progress || Math.floor(Math.random() * 100),
          // Estimate completion time
          completion_estimate: getCompletionEstimate(doc)
        })));
        
        // Fetch completed verifications
        const completedData = await tashihApi.getCompletedVerifications();
        setCompletedDocuments(completedData);
        
        // Fetch verification metrics
        const metricsData = await tashihApi.getVerificationMetrics();
        setMetrics(metricsData);
      } catch (error) {
        console.error('Error fetching verification data:', error);
        toast({
          title: "Error",
          description: "Failed to load verification queue. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Get estimated completion time based on document length, complexity, etc.
  const getCompletionEstimate = (doc: any): string => {
    // This would be calculated based on actual document properties
    // For now using a simplified simulation
    const baseTime = 30; // Base time in minutes
    let complexity = 1.0;
    
    // Adjust based on complexity factors
    if (doc.talil_jawab && doc.talil_jawab.length > 1000) complexity += 0.5;
    if (doc.referensi && doc.referensi.length > 500) complexity += 0.3;
    
    const totalMinutes = Math.floor(baseTime * complexity);
    
    if (totalMinutes < 60) {
      return `~${totalMinutes} minutes`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return `~${hours}h ${mins}m`;
    }
  };
  
  // Handle document selection for verification
  const handleSelectDocument = (id: number) => {
    navigate(`/tashih/taqrir-khass/${id}/verify`);
  };
  
  // Filter documents based on search and filter criteria
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });
  
  // Sort documents based on the selected sort criteria
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return (b.priority_score || 0) - (a.priority_score || 0);
      case 'date':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'confidence':
        return (a.confidence_score || 1) - (b.confidence_score || 1);
      default:
        return (b.priority_score || 0) - (a.priority_score || 0);
    }
  });
  
  // Render component
  return (
    <div className="container py-6 mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Mushoheh Dashboard</h1>
        <p className="text-muted-foreground">
          Verify and approve Islamic scholarly documents
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Card className="flex-1 min-w-[150px]">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Pending Verification</p>
                  <p className="text-2xl font-bold">{documents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[150px]">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Verified Documents</p>
                  <p className="text-2xl font-bold">{completedDocuments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[150px]">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CalendarCheck className="mr-2 h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Last 7 Days</p>
                  <p className="text-2xl font-bold">{metrics?.verified_last_7_days || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[150px]">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Verification Rate</p>
                  <p className="text-2xl font-bold">{metrics?.verification_rate || 0}/day</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={() => setShowStatsDialog(true)}
            variant="outline" 
            className="flex-1 min-w-[150px]"
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            View Detailed Metrics
          </Button>
        </div>
      </header>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="queue">Verification Queue</TabsTrigger>
          <TabsTrigger value="completed">Completed Verifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Documents Pending Verification</CardTitle>
              <CardDescription>
                Documents are prioritized based on confidence scores and urgency
              </CardDescription>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="date">Date Added</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="confidence">Confidence Score</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="needs_revision">Needs Revision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              {isLoading ? (
                <div className="py-8 text-center">
                  <p>Loading documents...</p>
                </div>
              ) : sortedDocuments.length === 0 ? (
                <div className="py-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-muted-foreground">No documents found matching your criteria</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Verification Progress</TableHead>
                      <TableHead>Est. Time</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div>
                            {doc.title}
                            <div className="text-sm text-muted-foreground">
                              Added {new Date(doc.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            doc.status === 'needs_revision' ? 'destructive' :
                            doc.status === 'in_progress' ? 'secondary' : 'outline'
                          }>
                            {doc.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {doc.priority_score && doc.priority_score > 80 ? (
                              <AlertTriangle className="mr-1 h-4 w-4 text-red-500" />
                            ) : doc.priority_score && doc.priority_score > 50 ? (
                              <AlertCircle className="mr-1 h-4 w-4 text-orange-500" />
                            ) : (
                              <Clock className="mr-1 h-4 w-4 text-blue-500" />
                            )}
                            {doc.priority_score ? Math.round(doc.priority_score) : 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-full flex flex-col gap-1">
                            <Progress value={doc.verification_progress} />
                            <span className="text-xs text-muted-foreground">
                              {doc.verification_progress}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {doc.completion_estimate}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button onClick={() => handleSelectDocument(doc.id)}>
                            Verify
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Verifications</CardTitle>
              <CardDescription>
                Documents you have already verified
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isLoading ? (
                <div className="py-8 text-center">
                  <p>Loading documents...</p>
                </div>
              ) : completedDocuments.length === 0 ? (
                <div className="py-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-muted-foreground">No verified documents found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verified On</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          {doc.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="success">Verified</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(doc.updated_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            onClick={() => navigate(`/tashih/taqrir-khass/${doc.id}`)}
                          >
                            View
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Detailed Analytics Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Verification Metrics</DialogTitle>
            <DialogDescription>
              Detailed analysis of verification performance
            </DialogDescription>
          </DialogHeader>
          
          {metrics && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Documents Verified</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.total_completed}</div>
                    <p className="text-xs text-muted-foreground">
                      Last 7 days: {metrics.verified_last_7_days}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Average Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.average_time_to_verify}</div>
                    <p className="text-xs text-muted-foreground">
                      Per document
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Component Verification Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Nash Masalah</span>
                        <span className="text-sm">{metrics.verification_by_component.nash_masalah}%</span>
                      </div>
                      <Progress value={metrics.verification_by_component.nash_masalah} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Khalfiyyah</span>
                        <span className="text-sm">{metrics.verification_by_component.khalfiyyah}%</span>
                      </div>
                      <Progress value={metrics.verification_by_component.khalfiyyah} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Munaqashah</span>
                        <span className="text-sm">{metrics.verification_by_component.munaqashah}%</span>
                      </div>
                      <Progress value={metrics.verification_by_component.munaqashah} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Jawaban</span>
                        <span className="text-sm">{metrics.verification_by_component.jawaban}%</span>
                      </div>
                      <Progress value={metrics.verification_by_component.jawaban} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Ta'lil Jawab</span>
                        <span className="text-sm">{metrics.verification_by_component.talil_jawab}%</span>
                      </div>
                      <Progress value={metrics.verification_by_component.talil_jawab} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Referensi</span>
                        <span className="text-sm">{metrics.verification_by_component.referensi}%</span>
                      </div>
                      <Progress value={metrics.verification_by_component.referensi} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MusohehDashboard; 