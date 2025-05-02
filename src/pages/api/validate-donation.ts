import type { APIRoute } from 'astro';
import { validateRequired, validateEmail, validateDonationAmount, validatePhoneNumber, type ValidationError } from '../../utils/formValidation';

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const errors: ValidationError[] = [];

    // Required field validation
    if (!validateRequired(data.firstName)) {
      errors.push({ field: 'firstName', message: 'First name is required' });
    }
    if (!validateRequired(data.lastName)) {
      errors.push({ field: 'lastName', message: 'Last name is required' });
    }
    if (!validateRequired(data.email)) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!validateEmail(data.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    // Donation amount validation
    const amount = parseFloat(data.amount);
    if (!validateRequired(amount)) {
      errors.push({ field: 'amount', message: 'Please select or enter a donation amount' });
    } else if (!validateDonationAmount(amount)) {
      errors.push({ field: 'amount', message: 'Please enter a valid donation amount between £1 and £50,000' });
    }

    // Optional phone number validation
    if (data.phone && !validatePhoneNumber(data.phone)) {
      errors.push({ field: 'phone', message: 'Please enter a valid UK phone number' });
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, errors }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        errors: [{ field: 'general', message: 'An unexpected error occurred' }]
      }),
      { status: 500 }
    );
  }
}