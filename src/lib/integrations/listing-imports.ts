/**
 * Listing Imports Integration Stub
 *
 * Future import sources:
 * - CSV file upload
 * - MLS/IDX feed
 * - Legacy PHP page scraper
 * - Third-party property manager feeds
 */
import { NotImplementedError } from "./email";

export type ImportSource = "csv" | "mls" | "legacy_php" | "third_party";

export interface ImportResult {
  totalRecords: number;
  imported: number;
  skipped: number;
  errors: { row: number; message: string }[];
}

export async function importFromCSV(_file: File): Promise<ImportResult> {
  throw new NotImplementedError("CSV listing import");
}

export async function importFromMLS(_feedUrl: string, _credentials: Record<string, string>): Promise<ImportResult> {
  throw new NotImplementedError("MLS/IDX listing import");
}

export async function importFromLegacyPHP(_urls: string[]): Promise<ImportResult> {
  throw new NotImplementedError("Legacy PHP page import");
}
