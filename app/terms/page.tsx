import LegalPageView from "@/app/components/LegalPageView";
import type { Metadata } from "next";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Terms | Ocean & Safari Luxury Travel",
  description: "Ocean & Safari's terms and conditions.",
};

export default function TermsPage() {
  return <LegalPageView pageKey="terms" fallbackTitle="Terms & Conditions" />;
}
