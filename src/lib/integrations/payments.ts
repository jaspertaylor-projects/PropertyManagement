/**
 * Payments Integration Stub
 *
 * Future payment options should prioritize ACH/eCheck.
 *
 * Suggested providers:
 * - Stripe ACH
 * - Plaid + ACH processor
 * - Property-management-specific payment provider
 */

import { NotImplementedError } from "./email";

export type PaymentMethod = "ach" | "card" | "check" | "cash" | "other";
export type PaymentType = "rent" | "deposit" | "application_fee" | "late_fee" | "maintenance" | "other";
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded";

export interface PaymentIntent {
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
  tenantId: string;
  listingId: string;
  description?: string;
}

export interface PaymentResult {
  id: string;
  status: PaymentStatus;
  amount: number;
  convenienceFee: number;
  processorId?: string;
}

export async function createPayment(_intent: PaymentIntent): Promise<PaymentResult> {
  throw new NotImplementedError("Payment processing");
}

export async function getPaymentStatus(_paymentId: string): Promise<PaymentResult> {
  throw new NotImplementedError("Payment status lookup");
}

export async function processRefund(_paymentId: string, _amount?: number): Promise<PaymentResult> {
  throw new NotImplementedError("Payment refunds");
}

/** ACH-specific convenience fee calculation */
export function calculateConvenienceFee(amount: number, method: PaymentMethod): number {
  if (method === "ach") return 0;
  if (method === "card") return Math.round(amount * 0.029 + 30); // 2.9% + $0.30
  return 0;
}
