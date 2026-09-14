import LegalPlaceholderPage from "@/app/components/LegalPlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | Ocean & Safari Luxury Travel",
  description: "Ocean & Safari's terms and conditions.",
};

export default function TermsPage() {
  return <LegalPlaceholderPage title="Terms & Conditions" />;
}
