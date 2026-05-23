/**
 * Background Checks Integration Stub
 */
import { NotImplementedError } from "./email";

export interface BackgroundCheckRequest {
  applicantId: string;
  firstName: string;
  lastName: string;
  ssn?: string;
  dateOfBirth: string;
  checkTypes: ("credit" | "criminal" | "eviction")[];
}

export interface BackgroundCheckResult {
  id: string;
  status: "pending" | "completed" | "failed";
  creditScore?: number;
  criminalRecords?: boolean;
  evictionRecords?: boolean;
  reportUrl?: string;
}

export async function initiateBackgroundCheck(_request: BackgroundCheckRequest): Promise<BackgroundCheckResult> {
  throw new NotImplementedError("Background checks");
}
