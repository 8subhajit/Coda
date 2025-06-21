// 'use server';

/**
 * @fileOverview Summarizes contact form submissions for quick understanding and prioritization.
 *
 * - summarizeContactFormSubmission - A function that summarizes the contact form submission.
 * - SummarizeContactFormSubmissionInput - The input type for the summarizeContactFormSubmission function.
 * - SummarizeContactFormSubmissionOutput - The return type for the summarizeContactFormSubmission function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContactFormSubmissionInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  message: z.string().describe('The message content from the contact form.'),
});
export type SummarizeContactFormSubmissionInput = z.infer<
  typeof SummarizeContactFormSubmissionInputSchema
>;

const SummarizeContactFormSubmissionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the contact form submission.'),
  category: z
    .string()
    .describe(
      'The category of the message (e.g., inquiry, support, feedback, sales).'
    ),
  priority: z
    .string()
    .describe(
      'The priority of the message (e.g., urgent, high, medium, low) based on its content.'
    ),
});
export type SummarizeContactFormSubmissionOutput = z.infer<
  typeof SummarizeContactFormSubmissionOutputSchema
>;

export async function summarizeContactFormSubmission(
  input: SummarizeContactFormSubmissionInput
): Promise<SummarizeContactFormSubmissionOutput> {
  return summarizeContactFormSubmissionFlow(input);
}

const summarizeContactFormSubmissionPrompt = ai.definePrompt({
  name: 'summarizeContactFormSubmissionPrompt',
  input: {schema: SummarizeContactFormSubmissionInputSchema},
  output: {schema: SummarizeContactFormSubmissionOutputSchema},
  prompt: `You are an AI assistant helping website administrators prioritize and respond to contact form submissions.

  Summarize the message below, identify a category for the message, and determine its priority.

  Name: {{{name}}}
  Email: {{{email}}}
  Message: {{{message}}}

  Provide a concise summary, category, and priority.
  `,
});

const summarizeContactFormSubmissionFlow = ai.defineFlow(
  {
    name: 'summarizeContactFormSubmissionFlow',
    inputSchema: SummarizeContactFormSubmissionInputSchema,
    outputSchema: SummarizeContactFormSubmissionOutputSchema,
  },
  async input => {
    const {output} = await summarizeContactFormSubmissionPrompt(input);
    return output!;
  }
);
