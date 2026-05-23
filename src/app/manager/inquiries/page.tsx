import type { Metadata } from "next";
import { InquiriesInbox } from "@/components/manager/inquiries-inbox";

export const metadata: Metadata = { title: "Inquiries" };

export default function ManagerInquiriesPage() {
  return <InquiriesInbox />;
}
