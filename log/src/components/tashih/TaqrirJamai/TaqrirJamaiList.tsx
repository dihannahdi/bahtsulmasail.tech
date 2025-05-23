import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { CalendarIcon, PlusIcon, SearchIcon, FileEditIcon, EyeIcon } from 'lucide-react';
import { Input } from '../../ui/input';
import { format } from 'date-fns';
import { Skeleton } from '../../ui/skeleton';

interface TaqrirJamai {
  id: number;
  title: string;
  date: string;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
  taqrir_khass_count: number;
}

const statusColors = {
  draft: 'bg-yellow-200 text-yellow-900',
  under_review: 'bg-blue-200 text-blue-900',
  approved: 'bg-green-200 text-green-900',
  published: 'bg-indigo-200 text-indigo-900'
};

const TaqrirJamaiList: React.FC = () => {
  const [taqrirJamaiList, setTaqrirJamaiList] = useState<TaqrirJamai[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTaqrirJamaiList();
  }, []);

  const fetchTaqrirJamaiList = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/taqrir-jamai/');
      setTaqrirJamaiList(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load Taqrir Jamai documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = taqrirJamaiList.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    const colorClass = statusColors[status as keyof typeof statusColors] || 'bg-gray-200 text-gray-900';
    return <Badge className={colorClass}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Taqrir Jamai Documents</CardTitle>
            <CardDescription>
              Manage Bahtsul Masail session documents
            </CardDescription>
          </div>
          <Button onClick={() => navigate('/tashih/taqrir-jamai/new')}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Taqrir Jamai
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by title or location..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-16" />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm 
              ? "No Taqrir Jamai documents match your search" 
              : "No Taqrir Jamai documents found. Create one to get started."}
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      {item.date && (
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                          {format(new Date(item.date), 'MMM d, yyyy')}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{item.location || '—'}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.taqrir_khass_count}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/tashih/taqrir-jamai/view/${item.id}`)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/tashih/taqrir-jamai/edit/${item.id}`)}
                        >
                          <FileEditIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          {!loading && `Showing ${filteredList.length} of ${taqrirJamaiList.length} documents`}
        </div>
        <Button variant="outline" onClick={() => fetchTaqrirJamaiList()}>
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaqrirJamaiList; 