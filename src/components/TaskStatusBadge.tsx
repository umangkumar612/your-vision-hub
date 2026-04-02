import { Badge } from '@/components/ui/badge';
import type { TaskStatus } from '@/types';

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-muted text-muted-foreground' },
  running: { label: 'Running', className: 'bg-primary/10 text-primary' },
  success: { label: 'Success', className: 'bg-accent text-accent-foreground border-primary/30' },
  failed: { label: 'Failed', className: 'bg-destructive/10 text-destructive' },
};

const TaskStatusBadge = ({ status }: { status: TaskStatus }) => {
  const config = statusConfig[status];
  return <Badge className={config.className}>{config.label}</Badge>;
};

export default TaskStatusBadge;
