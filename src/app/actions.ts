'use server';

import { summarizeContactFormSubmission, SummarizeContactFormSubmissionOutput } from '@/ai/flows/summarize-contact-form-submission';

interface SubmissionResult {
    success: boolean;
    data?: SummarizeContactFormSubmissionOutput;
    error?: string;
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<SubmissionResult> {
  try {
    const result = await summarizeContactFormSubmission(formData);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An error occurred while processing your message.' };
  }
}
