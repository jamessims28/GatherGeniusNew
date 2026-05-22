"use client";

import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("Acquisition-ready ambient core active");
  const [response, setResponse] = useState(
    "GatherGenius is running as a living Ambient AI Operating System with memory, voice, integrations, retention tracking, investor demo readiness, and protected execution in the background."
  );
  const [active, setActive] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = async (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript || "";
        await runCore(transcript, "voice_attempt");
      };

      recognition.onerror = () => {
        setStatus("Voice unavailable. Click orb to activate.");
      };

      recognitionRef.current = recognition;
    }
  }, []);

  function speak(text) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const message = new SpeechSynthesisUtterance(text);
      message.rate = 0.86;
      message.pitch = 1.08;
      message.volume = 0.96;
      window.speechSynthesis.speak(message);
    }
  }

  async function runCore(message = "investor demo acquisition readiness", event = "orb_click") {
    setActive(true);
    setStatus("Living ambient intelligence running...");

    try {
      const result = await fetch("/api/acquisition/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userKey: "anonymous_preview",
          clientState: {
            page: "landing",
            event,
            orbActive: true,
            device: "web"
          }
        })
      }).then((res) => res.json());

      const answer = result.response || "GatherGenius acquisition-ready core is active.";
      setResponse(answer);
      speak(answer);
      setStatus("Acquisition-ready ambient core active");
    } catch {
      const fallback = "GatherGenius is active. Acquisition runtime needs deployment verification.";
      setResponse(fallback);
      speak(fallback);
      setStatus("Deployment check needed");
    } finally {
      window.setTimeout(() => setActive(false), 2600);
    }
  }

  function activate() {
    if (recognitionRef.current) {
      try {
        setStatus("Listening...");
        recognitionRef.current.start();
        return;
      } catch {
        runCore();
        return;
      }
    }

    runCore();
  }

  return (
    <main className="gg-live-os">
      <button
        className={`gg-living-orb ${active ? "active" : ""}`}
        onClick={activate}
        type="button"
        aria-label="Activate GatherGenius"
      >
        <span />
        <i />
      </button>

      <section className="gg-live-stage">
        <div className="gg-live-badge">{status}</div>
        <h1>GatherGenius</h1>
        <div className="gg-live-response">{response}</div>
        <div className="gg-live-note">Ambient AI Operating System — Acquisition Ready Build</div>
      </section>
    </main>
  );
}
