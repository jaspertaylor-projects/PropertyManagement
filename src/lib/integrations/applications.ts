/**
 * Applications Integration Stub
 *
 * Future application system features:
 * - Applicant profile with co-applicants
 * - Employment/income details
 * - Rental history and references
 * - Document upload
 * - Application fee collection
 * - Background check integration
 * - Status tracking
 */

import { NotImplementedError } from "./email";

export type ApplicationStatus = "submitted" | "under_review" | "approved" | "denied" | "withdrawn";

export interface ApplicationData {
  listingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  currentAddress: string;
  employer: string;
  annualIncome: number;
  desiredMoveIn: string;
  coApplicants: { name: string; email: string; relationship: string }[];
  rentalHistory: { address: string; landlord: string; phone: string; duration: string }[];
  references: { name: string; phone: string; relationship: string }[];
}

export interface ApplicationResult {
  id: string;
  status: ApplicationStatus;
  applicationFeeRequired: boolean;
  applicationFeeAmount: number;
}

export async function submitApplication(_data: ApplicationData): Promise<ApplicationResult> {
  throw new NotImplementedError("Online rental applications");
}

export async function getApplicationStatus(_applicationId: string): Promise<ApplicationResult> {
  throw new NotImplementedError("Application status tracking");
}
