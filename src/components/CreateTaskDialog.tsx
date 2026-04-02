import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createTask, runTask } from '@/services/mockApi';
import { OPERATION_LABELS, type Operation } from '@/types';
import { toast } from '@/hooks/use-toast';

interface Props {
  onCreated: () => void;
}

const CreateTaskDialog = ({ onCreated }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [operation, setOperation] = useState<Operation>('uppercase');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !inputText.trim()) return;
    const task = createTask(user.id, title.trim(), inputText.trim(), operation);
    toast({ title: 'Task created', description: `"${task.title}" is now pending.` });
    setTitle('');
    setInputText('');
    setOperation('uppercase');
    setOpen(false);
    onCreated();
  };

  const handleRun = () => {
    if (!user || !title.trim() || !inputText.trim()) return;
    const task = createTask(user.id, title.trim(), inputText.trim(), operation);
    runTask(task.id);
    toast({ title: 'Task running', description: `"${task.title}" is being processed.` });
    setTitle('');
    setInputText('');
    setOperation('uppercase');
    setOpen(false);
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-1" /> New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create AI Task</DialogTitle>
          <DialogDescription>Fill in the details and run your task.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inputText">Input Text</Label>
            <Textarea id="inputText" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Enter text to process..." required maxLength={5000} rows={4} />
          </div>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select value={operation} onValueChange={v => setOperation(v as Operation)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.entries(OPERATION_LABELS) as [Operation, string][]).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="submit" variant="outline">Create</Button>
            <Button type="button" onClick={handleRun}>Run</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
