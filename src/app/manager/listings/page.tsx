import type { Metadata } from "next";
import { ListingsManager } from "@/components/manager/listings-manager";

export const metadata: Metadata = { title: "Manage Listings" };

export default function ManagerListingsPage() {
  return <ListingsManager />;
}
