"use client";

import { QRCodeSVG } from "qrcode.react";
import { Mail, Send, MapPin, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const SITE_URL = "https://vitalii-popov.dev";

export function BusinessCard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-muted/20">
      {/* Print button — hidden when printing */}
      <div className="mb-8 print:hidden">
        <Button onClick={() => window.print()} variant="outline" className="gap-2">
          <Printer className="w-4 h-4" />
          Print business card
        </Button>
      </div>

      {/* Card — standard business card ratio 85.6 × 53.98 mm → use ~3.37 × 2.125 in */}
      <div
        className="
          relative w-[340px] h-[213px] rounded-2xl border-2 border-border bg-card shadow-2xl
          flex overflow-hidden
          print:shadow-none print:border print:rounded-none print:w-[85.6mm] print:h-[53.98mm]
        "
      >
        {/* Left accent strip */}
        <div className="w-1.5 bg-primary shrink-0" />

        {/* Main content */}
        <div className="flex flex-1 p-5 gap-4">
          {/* Text */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Full-Stack Engineer</p>
              <h1 className="text-xl font-bold leading-tight">Vitalii Popov</h1>
              <p className="text-xs text-muted-foreground mt-1">Distributed Systems · AI</p>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 shrink-0" />
                <span>msk.vitaly@gmail.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3 h-3 shrink-0" />
                <span>linkedin.com/in/mskvitalii</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GithubIcon className="w-3 h-3 shrink-0" />
                <span>github.com/mskvitalii</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Send className="w-3 h-3 shrink-0" />
                <span>t.me/mskvitalii</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 shrink-0" />
                <span>Chemnitz / Dresden, Germany</span>
              </div>
            </div>
          </div>

          {/* QR code */}
          <div className="flex flex-col items-center justify-end gap-1 shrink-0">
            <div className="bg-white p-1.5 rounded-lg">
              <QRCodeSVG
                value={SITE_URL}
                size={72}
                level="M"
                fgColor="#09090b"
              />
            </div>
            <p className="text-[9px] text-muted-foreground text-center leading-tight">
              portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Back side preview */}
      <div className="mt-6 print:hidden text-center">
        <p className="text-xs text-muted-foreground mb-4">Back side</p>
        <div
          className="
            relative w-[340px] h-[213px] rounded-2xl border-2 border-border bg-primary
            flex items-center justify-center overflow-hidden shadow-2xl
          "
        >
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-white font-mono text-xs opacity-50"
                style={{ top: `${i * 27}px`, left: `-10px`, whiteSpace: "nowrap" }}
              >
                func main() {"{"} go build() {"}"} · docker run · kubectl apply ·
              </div>
            ))}
          </div>
          <div className="text-center text-primary-foreground relative z-10">
            <p className="text-2xl font-bold">VP</p>
            <p className="text-xs opacity-70 mt-1">{SITE_URL}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:shadow-none, .print\\:shadow-none * { visibility: visible; }
          .print\\:shadow-none { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
}
