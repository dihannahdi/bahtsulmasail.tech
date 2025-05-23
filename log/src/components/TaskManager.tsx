import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Button, Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableHead, TableRow, TableCell, Spinner, Alert } from './ui';
import { RefreshCw } from 'lucide-react';

interface Task {
  task_id: string;
  entity_id: string;
  task_type: string;
  status: string;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  retry_count: number;
  error: string | null;
  result: string | null;
}

interface TaskManagerProps {
  documentId?: string;
  autoRefresh?: boolean;
  maxItems?: number;
}

const TaskManager: React.FC<TaskManagerProps> = ({ 
  documentId, 
  autoRefresh = true,
  maxItems = 10
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = '/api/tasks/';
      if (documentId) {
        url += `?entity_id=${documentId}`;
      }
      
      const response = await axios.get<Task[]>(url);
      setTasks(response.data.slice(0, maxItems));
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Set up auto-refresh interval if enabled
    let intervalId: NodeJS.Timeout | null = null;
    
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchTasks();
      }, 5000); // Refresh every 5 seconds
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [documentId, autoRefresh, maxItems]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      'pending': { color: 'bg-yellow-500', label: 'Pending' },
      'running': { color: 'bg-blue-500', label: 'Running' },
      'success': { color: 'bg-green-500', label: 'Success' },
      'failure': { color: 'bg-red-500', label: 'Failed' },
      'retry': { color: 'bg-purple-500', label: 'Retrying' },
      'canceled': { color: 'bg-gray-500', label: 'Canceled' },
    };
    
    const { color, label } = statusMap[status] || { color: 'bg-gray-500', label: status };
    
    return (
      <Badge className={`${color} text-white`}>
        {label}
      </Badge>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const handleRefresh = () => {
    fetchTasks();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Task Status</CardTitle>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}
        
        {loading ? (
          <div className="flex justify-center p-4">
            <Spinner size="lg" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 p-4">No tasks found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Retries</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.task_id}>
                  <TableCell className="font-medium">{task.task_type}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{formatDate(task.created_at)}</TableCell>
                  <TableCell>{formatDate(task.completed_at)}</TableCell>
                  <TableCell>{task.retry_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskManager; 