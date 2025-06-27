'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { contributions, users } from '@/lib/data';
import type { Contribution, User } from '@/lib/types';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type ThankYouFormProps = {
  projectId: string;
};

export function ThankYouForm({ projectId }: ThankYouFormProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const projectContributions = contributions.filter(
    (c) => c.projectId === projectId
  );

  const backers = projectContributions
    .map((c) => users.find((u) => u.id === c.backerId))
    .filter((u): u is User => !!u);
  
  const handleSend = () => {
    if (message.trim().length < 10) {
      toast({
        title: 'Message too short',
        description: 'Please write a message of at least 10 characters.',
        variant: 'destructive',
      });
      return;
    }
    console.log('Sending message:', message);
    toast({
      title: 'Messages Sent!',
      description: 'Your thank you message has been sent to all backers.',
    });
    setMessage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Thank Your Backers</CardTitle>
        <CardDescription>
          Show your appreciation by sending a message to everyone who has
          supported your project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{backers.length} Backers</h3>
          <div className="flex flex-wrap gap-2">
            {backers.map((backer) => (
              <Avatar key={backer.id}>
                 <AvatarImage src={backer.avatarUrl} alt={backer.name} data-ai-hint={backer.imageHint} />
                 <AvatarFallback>{backer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Textarea
            placeholder="Write your thank you message here..."
            className="min-h-[150px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSend} className="w-full md:w-auto">
            <Send className="mr-2 h-4 w-4" />
            Send to All Backers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
