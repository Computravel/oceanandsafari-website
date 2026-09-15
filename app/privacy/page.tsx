import LegalPageView from "@/app/components/LegalPageView";
import type { Metadata } from "next";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Privacy Policy | Ocean & Safari Luxury Travel",
  description: "Ocean & Safari's privacy policy.",
};

export default function PrivacyPage() {
  return <LegalPageView pageKey="privacy" fallbackTitle="Privacy Policy" />;
}
