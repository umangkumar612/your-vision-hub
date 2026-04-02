import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getUserTasks, runTask } from '@/services/mockApi';
import CreateTaskDialog from '@/components/CreateTaskDialog';
import TaskStatusBadge from '@/components/TaskStatusBadge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OPERATION_LABELS, type Task } from '@/types';
import { Play, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  const refresh = useCallback(() => {
    if (user) setTasks(getUserTasks(user.id));
  }, [user]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 1500);
    return () => clearInterval(interval);
  }, [refresh]);

  const handleRun = (taskId: string) => {
    runTask(taskId);
    toast({ title: 'Task started', description: 'Processing has begun.' });
    setTimeout(refresh, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Task Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your AI tasks</p>
        </div>
        <CreateTaskDialog onCreated={refresh} />
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No tasks yet</p>
          <p className="text-sm">Create your first AI task to get started.</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Operation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{OPERATION_LABELS[task.operation]}</TableCell>
                  <TableCell><TaskStatusBadge status={task.status} /></TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(task.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {task.status === 'pending' && (
                      <Button size="sm" variant="outline" onClick={() => handleRun(task.id)}>
                        <Play className="h-3 w-3 mr-1" /> Run
                      </Button>
                    )}
                    <Link to={`/task/${task.id}`}>
                      <Button size="sm" variant="ghost"><Eye className="h-3 w-3 mr-1" /> View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
