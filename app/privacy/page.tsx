import LegalPlaceholderPage from "@/app/components/LegalPlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ocean & Safari Luxury Travel",
  description: "Ocean & Safari's privacy policy.",
};

export default function PrivacyPage() {
  return <LegalPlaceholderPage title="Privacy Policy" />;
}
