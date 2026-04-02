import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTaskById } from '@/services/mockApi';
import TaskStatusBadge from '@/components/TaskStatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OPERATION_LABELS, type Task } from '@/types';
import { ArrowLeft } from 'lucide-react';

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const load = () => {
      if (id) setTask(getTaskById(id) ?? null);
    };
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, [id]);

  if (!task) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Task not found</p>
        <Link to="/dashboard"><Button variant="link">Back to Dashboard</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/dashboard">
        <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
        <TaskStatusBadge status={task.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm text-muted-foreground">Operation</CardTitle></CardHeader>
          <CardContent><p className="font-medium">{OPERATION_LABELS[task.operation]}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-muted-foreground">Created</CardTitle></CardHeader>
          <CardContent><p className="font-medium">{new Date(task.createdAt).toLocaleString()}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm text-muted-foreground">Input Text</CardTitle></CardHeader>
        <CardContent><pre className="whitespace-pre-wrap text-sm bg-muted p-3 rounded-md">{task.inputText}</pre></CardContent>
      </Card>

      {task.result !== null && (
        <Card>
          <CardHeader><CardTitle className="text-sm text-muted-foreground">Result</CardTitle></CardHeader>
          <CardContent><pre className="whitespace-pre-wrap text-sm bg-muted p-3 rounded-md font-semibold">{task.result}</pre></CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle className="text-sm text-muted-foreground">Execution Logs</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {task.logs.map((log, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-muted-foreground font-mono shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-foreground">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetail;
