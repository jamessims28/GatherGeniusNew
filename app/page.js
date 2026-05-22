"use client";

import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("Strategic acquisition core active");
  const [response, setResponse] = useState(
    "GatherGenius is quietly preparing acquisition readiness, strategic buyer fit, diligence materials, traction milestones, and investor narrative in the background."
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

      recognition.onstart = () => {
        setActive(true);
        setStatus("Listening...");
      };

      recognition.onresult = async () => {
        await activate();
      };

      recognition.onerror = () => quickResponse("I am active and ready.");

      recognitionRef.current = recognition;
    }
  }, []);

  function speak(text) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const message = new SpeechSynthesisUtterance(text);
      message.rate = 1.02;
      message.pitch = 1.05;
      message.volume = 0.96;
      window.speechSynthesis.speak(message);
    }
  }

  function quickResponse(text) {
    setActive(true);
    setStatus("Responding...");
    setResponse(text);
    speak(text);
    window.setTimeout(() => {
      setActive(false);
      setStatus("Strategic acquisition core active");
    }, 1200);
  }

  async function activate() {
    quickResponse("I am active and ready.");

    fetch("/api/phase16/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentUsers: 0, currentRevenue: 0 })
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.acquirerFit?.score) {
          setResponse(`Strategic acquisition readiness active. Acquirer fit score: ${result.acquirerFit.score}.`);
        }
      })
      .catch(() => {});
  }

  function start() {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        return;
      } catch {
        activate();
        return;
      }
    }
    activate();
  }

  return (
    <main className="gg-live-os">
      <button
        className={`gg-living-orb ${active ? "active" : ""}`}
        onClick={start}
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
        <div className="gg-live-note">Phase 16 — Strategic Acquisition Readiness</div>
      </section>
    </main>
  );
}
