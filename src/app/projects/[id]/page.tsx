import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects, users, contributions } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tag, Target, Users, Code, Send } from 'lucide-react';
import Link from 'next/link';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const creator = users.find((u) => u.id === project.creatorId);
  const projectContributions = contributions.filter(
    (c) => c.projectId === project.id
  );
  const backers = projectContributions
    .map((c) => users.find((u) => u.id === c.backerId))
    .filter(Boolean);
  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden mb-8">
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={1200}
              height={600}
              className="w-full object-cover"
              data-ai-hint={project.imageHint}
            />
          </Card>
          <h1 className="font-headline text-4xl font-bold mb-2">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 mb-6 text-muted-foreground">
            <Avatar className="h-8 w-8">
              <AvatarImage src={creator?.avatarUrl} alt={creator?.name} data-ai-hint={creator?.imageHint} />
              <AvatarFallback>{creator?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>
              Created by{' '}
              <Link href={`/profile/${creator?.id}`} className="text-primary hover:underline">
                {creator?.name}
              </Link>
            </span>
          </div>
          <p className="text-lg leading-relaxed">{project.longDescription}</p>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardContent className="p-6">
              <Progress value={fundingPercentage} className="h-3 mb-4" />
              <div className="mb-4">
                <p className="text-3xl font-bold text-primary">
                  ${project.currentFunding.toLocaleString()}
                </p>
                <p className="text-muted-foreground">
                  pledged of ${project.fundingGoal.toLocaleString()} goal
                </p>
              </div>
              <div className="flex justify-between text-muted-foreground mb-6">
                <div className="text-center">
                  <p className="font-bold text-xl text-foreground">
                    {project.backers}
                  </p>
                  <span>backers</span>
                </div>
              </div>
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                Fund this Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <span>Required Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
          
           {creator?.id === '1' && ( // Simulated check for project creator
            <Button variant="outline" className="w-full" asChild>
                <Link href={`/projects/${project.id}/thank-you`}>
                    <Send className="mr-2 h-4 w-4" />
                    Thank Backers
                </Link>
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}
