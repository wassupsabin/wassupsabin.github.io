import type { ValidationError } from './formValidation';

export interface NewsletterResponse {
  success: boolean;
  message?: string;
  errors?: ValidationError[];
}

interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
}

export async function subscribeToNewsletter(data: NewsletterSubscription): Promise<NewsletterResponse> {
  try {
    // Here you would typically integrate with your newsletter service (e.g., Mailchimp, SendGrid)
    const response = await fetch('/api/subscribe-newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      errors: [{ field: 'general', message: 'Failed to subscribe. Please try again.' }]
    };
  }
}

export function validateEmailFormat(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}