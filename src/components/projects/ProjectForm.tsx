'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateProjectDetailsAction } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './../ui/card';

const projectSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters.'),
  projectIdea: z.string().min(20, 'Project idea must be at least 20 characters.'),
  projectDescription: z.string().min(50, 'Project description must be at least 50 characters.'),
  fundingGoal: z.coerce.number().min(100, 'Funding goal must be at least $100.'),
  requiredSkills: z.string().min(3, 'Please list at least one required skill.'),
});

const AiButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      className="gap-2"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="h-4 w-4" />
      )}
      Generate with AI
    </Button>
  );
};

export function ProjectForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      projectIdea: '',
      projectDescription: '',
      fundingGoal: 10000,
      requiredSkills: '',
    },
  });

  const [aiState, aiFormAction] = useFormState(generateProjectDetailsAction, {
    message: '',
  });

  useEffect(() => {
    if (aiState.message === 'success' && aiState.data) {
      form.setValue('projectDescription', aiState.data.projectDescription, {
        shouldValidate: true,
      });
      form.setValue('fundingGoal', aiState.data.fundingGoal, {
        shouldValidate: true,
      });
      form.setValue('requiredSkills', aiState.data.requiredSkills, {
        shouldValidate: true,
      });
      toast({
        title: 'Project Details Generated!',
        description: 'The AI has populated the form with suggestions.',
      });
    } else if (aiState.message === 'Validation failed' || aiState.errors?._server) {
      toast({
        title: 'Error',
        description:
          aiState.errors?.projectIdea?.[0] ||
          aiState.errors?._server?.[0] ||
          'An error occurred.',
        variant: 'destructive',
      });
    }
  }, [aiState, form, toast]);

  function onSubmit(values: z.infer<typeof projectSchema>) {
    console.log(values);
    toast({
      title: 'Project Submitted!',
      description: 'Your project is now under review.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CodeStream AI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectIdea"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Your Project Idea</FormLabel>
                    <form action={aiFormAction}>
                      <input
                        type="hidden"
                        name="projectIdea"
                        value={form.watch('projectIdea')}
                      />
                      <AiButton />
                    </form>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your core idea. What problem does it solve? Who is it for?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use our AI to help generate the fields below based on your
                    idea.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A detailed description of your project..."
                      className="resize-vertical min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fundingGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Goal ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requiredSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Skills</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., React, Node.js, Python"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of skills.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="gap-2">
            Submit Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
