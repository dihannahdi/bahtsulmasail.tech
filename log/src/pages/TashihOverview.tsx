import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import MusohehDashboard from '../components/tashih/Verification/MusohehDashboard';
import { FileText, BookOpen, List, CheckCircle, FileCheck, Plus, UserCheck } from 'lucide-react';

const TashihOverview: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="container py-6 mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Tashih Al-Masa'il</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Verification System for Islamic Scholarly Documents
        </p>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid grid-cols-1 md:grid-cols-4 w-full">
          <TabsTrigger value="dashboard" className="flex items-center">
            <List className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Verification Queue
          </TabsTrigger>
          <TabsTrigger value="collections" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Document Collections
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center">
            <FileCheck className="mr-2 h-4 w-4" />
            Verification Statistics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>
                  Review and verify Islamic legal documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Verify the accuracy and authenticity of Taqrir Khass documents.</p>
                <Button onClick={() => setActiveTab('verification')}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Go to Verification Queue
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Document Collections</CardTitle>
                <CardDescription>
                  Manage Taqrir Jama'i collections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Create and manage collections of related legal discussions.</p>
                <Button onClick={() => setActiveTab('collections')}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Collections
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Reference Verification</CardTitle>
                <CardDescription>
                  Verify citations and references
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Ensure accuracy of Quranic verses, Hadith, and scholarly citations.</p>
                <Button onClick={() => navigate('/tashih/references')}>
                  <FileCheck className="mr-2 h-4 w-4" />
                  Check References
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest verification activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Document "Hukum Jual Beli Online" verified</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <span>New document added to "Fiqh Muamalah"</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Yesterday</span>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <FileCheck className="h-4 w-4 mr-2 text-purple-500" />
                      <span>5 references verified in "Zakat Digital"</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => navigate('/tashih/taqrir-jamai/create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Collection
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/tashih/taqrir-khass/create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Document
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/tashih/import')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Import Documents
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/tashih/references/verify')}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify References
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="verification">
          <MusohehDashboard />
        </TabsContent>
        
        <TabsContent value="collections">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Document Collections</CardTitle>
                  <CardDescription>
                    Manage Taqrir Jama'i collections and their documents
                  </CardDescription>
                </div>
                <Button onClick={() => navigate('/tashih/taqrir-jamai/create')}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Collection
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-4 text-muted-foreground">Select "Document Collections" from the main navigation to view and manage collections.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Verification Statistics</CardTitle>
              <CardDescription>
                Analytics and metrics for the verification process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileCheck className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-4 text-muted-foreground">Verification statistics will be shown here.</p>
                <p className="text-muted-foreground">Please check back later for this feature.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TashihOverview; 