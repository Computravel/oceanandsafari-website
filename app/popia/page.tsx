import LegalPlaceholderPage from "@/app/components/LegalPlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POPIA Compliance | Ocean & Safari Luxury Travel",
  description: "Ocean & Safari's POPIA compliance statement.",
};

export default function PopiaPage() {
  return <LegalPlaceholderPage title="POPIA Compliance" />;
}
