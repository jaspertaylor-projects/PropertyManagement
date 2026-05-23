/**
 * Email Integration Stub
 *
 * Future implementation will use Resend, Postmark, or similar service.
 * Configure provider via RESEND_API_KEY environment variable.
 */

export class NotImplementedError extends Error {
  constructor(feature: string) {
    super(`${feature} is not yet implemented. This is a planned future feature.`);
    this.name = "NotImplementedError";
  }
}

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface InquiryNotification {
  inquiryId: string;
  listingTitle: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Send an email notification. Currently stubbed.
 * TODO: Implement with Resend SDK
 */
export async function sendEmail(_payload: EmailPayload): Promise<boolean> {
  console.log("[EMAIL STUB] Would send email:", _payload.subject);
  // throw new NotImplementedError("Email sending");
  return true;
}

/**
 * Send inquiry notification to property manager.
 */
export async function sendInquiryNotification(
  _notification: InquiryNotification
): Promise<boolean> {
  console.log("[EMAIL STUB] Inquiry notification for:", _notification.listingTitle);
  return sendEmail({
    to: process.env.PROPERTY_MANAGER_EMAIL || "",
    subject: `New Inquiry: ${_notification.listingTitle}`,
    html: `<p>New inquiry from ${_notification.name}</p>`,
  });
}
