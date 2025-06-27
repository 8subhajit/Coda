'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating project details including descriptions, funding goals, and required skills based on a project idea.
 *
 * - generateProjectDetails - A function that takes a project idea and returns generated project details.
 * - GenerateProjectDetailsInput - The input type for the generateProjectDetails function.
 * - GenerateProjectDetailsOutput - The return type for the generateProjectDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDetailsInputSchema = z.object({
  projectIdea: z
    .string()
    .describe('A description of the project idea for which details are to be generated.'),
});
export type GenerateProjectDetailsInput = z.infer<typeof GenerateProjectDetailsInputSchema>;

const GenerateProjectDetailsOutputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A compelling description of the project.'),
  fundingGoal: z
    .string()
    .describe('A suggested funding goal for the project.'),
  requiredSkills: z
    .string()
    .describe('A list of potential skills needed for the project team.'),
});
export type GenerateProjectDetailsOutput = z.infer<typeof GenerateProjectDetailsOutputSchema>;

export async function generateProjectDetails(
  input: GenerateProjectDetailsInput
): Promise<GenerateProjectDetailsOutput> {
  return generateProjectDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDetailsPrompt',
  input: {schema: GenerateProjectDetailsInputSchema},
  output: {schema: GenerateProjectDetailsOutputSchema},
  prompt: `You are an AI assistant designed to help project creators generate compelling project details.

  Based on the project idea provided, you will generate a project description, suggest a funding goal, and identify potential skills needed for the project team.

  Project Idea: {{{projectIdea}}}

  Instructions:
  1.  Craft a project description that is engaging and informative.
  2.  Suggest a funding goal that is appropriate for the scope of the project.
  3.  Identify potential skills needed for the project team.

  Output the response in JSON format.
  `,
});

const generateProjectDetailsFlow = ai.defineFlow(
  {
    name: 'generateProjectDetailsFlow',
    inputSchema: GenerateProjectDetailsInputSchema,
    outputSchema: GenerateProjectDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
