import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { users } from '@/lib/data';
import { Target, Users, Tag, ArrowRight } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const creator = users.find((u) => u.id === project.creatorId);
  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 group bg-card/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5">
      <CardHeader className="p-0 border-b border-border/50">
        <Link href={`/projects/${project.id}`}>
          <Image
            src={project.imageUrl}
            alt={project.name}
            width={600}
            height={400}
            className="object-cover w-full h-48 opacity-90 group-hover:opacity-100 transition-opacity"
            data-ai-hint={project.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">
          <Link
            href={`/projects/${project.id}`}
            className="hover:text-primary transition-colors"
          >
            {project.name}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={creator?.avatarUrl} alt={creator?.name} data-ai-hint={creator?.imageHint} />
            <AvatarFallback>{creator?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{creator?.name}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        <div>
          <Progress value={fundingPercentage} className="h-2 mb-2" />
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-primary">
              {Math.round(fundingPercentage)}%
            </span>
            <span className="text-muted-foreground">
              ${project.currentFunding.toLocaleString()} raised
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/projects/${project.id}`}>
            View Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
