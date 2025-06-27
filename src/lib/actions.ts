'use server';

import {
  generateProjectDetails,
  GenerateProjectDetailsOutput,
} from '@/ai/flows/generate-project-details';
import { z } from 'zod';

type FormState = {
  message: string;
  data?: {
    projectDescription: string;
    fundingGoal: number;
    requiredSkills: string;
  };
  errors?: {
    projectIdea?: string[];
    _server?: string[];
  };
};

const projectIdeaSchema = z.object({
  projectIdea: z
    .string()
    .min(10, 'Please describe your idea in at least 10 characters.'),
});

export async function generateProjectDetailsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = projectIdeaSchema.safeParse({
    projectIdea: formData.get('projectIdea'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const details: GenerateProjectDetailsOutput = await generateProjectDetails({
      projectIdea: validatedFields.data.projectIdea,
    });

    const fundingGoal = parseInt(details.fundingGoal.replace(/[^0-9]/g, ''), 10);
    const requiredSkills = details.requiredSkills
      .split(',')
      .map((skill) => skill.trim())
      .join(', ');

    return {
      message: 'success',
      data: {
        ...details,
        fundingGoal: isNaN(fundingGoal) ? 10000 : fundingGoal,
        requiredSkills: requiredSkills,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while generating project details.',
      errors: { _server: ['An error occurred. Please try again.'] },
    };
  }
}
