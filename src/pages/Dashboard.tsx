import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getUserTasks, runTask } from '@/services/mockApi';
import CreateTaskDialog from '@/components/CreateTaskDialog';
import TaskStatusBadge from '@/components/TaskStatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OPERATION_LABELS, type Task, type Operation, type TaskStatus } from '@/types';
import { Play, Eye, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [operationFilter, setOperationFilter] = useState<Operation | 'all'>('all');
  const [page, setPage] = useState(1);

  const refresh = useCallback(() => {
    if (user) setTasks(getUserTasks(user.id));
  }, [user]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 1500);
    return () => clearInterval(interval);
  }, [refresh]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;
      if (operationFilter !== 'all' && t.operation !== operationFilter) return false;
      return true;
    });
  }, [tasks, search, statusFilter, operationFilter]);

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

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v as TaskStatus | 'all')}>
          <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={operationFilter} onValueChange={v => setOperationFilter(v as Operation | 'all')}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Operation" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Operations</SelectItem>
            {(Object.entries(OPERATION_LABELS) as [Operation, string][]).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No tasks yet</p>
          <p className="text-sm">Create your first AI task to get started.</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No matching tasks</p>
          <p className="text-sm">Try adjusting your filters.</p>
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
              {filteredTasks.map(task => (
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
