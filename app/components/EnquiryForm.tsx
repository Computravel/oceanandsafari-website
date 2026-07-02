"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

interface Props {
  experienceTitle?: string;
  experienceUrl?: string;
}

export default function EnquiryForm({ experienceTitle, experienceUrl }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: experienceTitle || "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    const { error } = await supabase
      .from("enquiries")
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        message: formData.message,
      }]);

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    try {
      await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          experienceUrl: experienceUrl || "",
        }),
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    setStatus("success");
    setFormData({ name: "", email: "", phone: "", destination: experienceTitle || "", message: "" });
  };

  if (status === "success") {
    return (
      <div style={{
        background: "rgba(29,165,160,0.1)",
        border: "0.5px solid var(--teal)",
        borderRadius: "8px",
        padding: "40px",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "28px",
          color: "var(--teal)",
          marginBottom: "12px",
        }}>Thank you for your enquiry</div>
        <p style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "16px",
          color: "var(--muted)",
          lineHeight: 1.7,
        }}>
          One of our consultants will be in touch within 24 hours
          to begin crafting your personalised journey.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "14px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            display: "block",
            marginBottom: "6px",
            fontWeight: 500,
          }}>Full name</label>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            style={{
              width: "100%",
              padding: "13px 16px",
              border: "0.5px solid var(--border)",
              borderRadius: "4px",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "15px",
              color: "var(--charcoal)",
              background: "white",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "14px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            display: "block",
            marginBottom: "6px",
            fontWeight: 500,
          }}>Email address</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            style={{
              width: "100%",
              padding: "13px 16px",
              border: "0.5px solid var(--border)",
              borderRadius: "4px",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "15px",
              color: "var(--charcoal)",
              background: "white",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "14px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            display: "block",
            marginBottom: "6px",
            fontWeight: 500,
          }}>Phone number</label>
          <input
            type="tel"
            placeholder="+27 ..."
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            style={{
              width: "100%",
              padding: "13px 16px",
              border: "0.5px solid var(--border)",
              borderRadius: "4px",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "15px",
              color: "var(--charcoal)",
              background: "white",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "14px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            display: "block",
            marginBottom: "6px",
            fontWeight: 500,
          }}>Experience or destination</label>
          <input
            type="text"
            placeholder="e.g. Serengeti & Zanzibar..."
            value={formData.destination}
            onChange={e => setFormData({...formData, destination: e.target.value})}
            style={{
              width: "100%",
              padding: "13px 16px",
              border: "0.5px solid var(--border)",
              borderRadius: "4px",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "15px",
              color: "var(--charcoal)",
              background: "white",
              outline: "none",
            }}
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "14px",
            letterSpacing: "0.08em",
            color: "var(--charcoal)",
            display: "block",
            marginBottom: "6px",
            fontWeight: 500,
          }}>Tell us about your dream journey</label>
          <textarea
            placeholder="Dates, number of travellers, special occasions, budget range, anything else we should know..."
            rows={4}
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            style={{
              width: "100%",
              padding: "13px 16px",
              border: "0.5px solid var(--border)",
              borderRadius: "4px",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "15px",
              color: "var(--charcoal)",
              background: "white",
              outline: "none",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            style={{
              width: "100%",
              background: status === "sending" ? "var(--muted)" : "var(--gold)",
              color: "var(--abyss)",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "16px",
              borderRadius: "4px",
              border: "none",
              cursor: status === "sending" ? "wait" : "pointer",
            }}>
            {status === "sending" ? "Sending..." : "Send My Enquiry"}
          </button>
          {status === "error" && (
            <div style={{
              marginTop: "12px",
              textAlign: "center",
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "14px",
              color: "var(--coral)",
            }}>
              Something went wrong — please try again or email us directly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}