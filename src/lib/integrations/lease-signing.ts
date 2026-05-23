/**
 * Lease Signing Integration Stub
 */
import { NotImplementedError } from "./email";

export interface LeaseDocument {
  leaseId: string;
  tenantId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  terms: Record<string, unknown>;
}

export async function generateLease(_doc: LeaseDocument): Promise<{ documentUrl: string }> {
  throw new NotImplementedError("Lease generation");
}

export async function sendForSignature(_leaseId: string): Promise<{ signingUrl: string }> {
  throw new NotImplementedError("Digital lease signing");
}
