import { Award, Globe, Cloud, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATES, type Certificate } from "@/data/certificates";

const CATEGORY_CONFIG: Record<Certificate["category"], { label: string; Icon: typeof Award; color: string }> = {
  cloud: { label: "Cloud", Icon: Cloud, color: "text-blue-500" },
  language: { label: "Language", Icon: Globe, color: "text-emerald-500" },
  development: { label: "Development", Icon: Code, color: "text-violet-500" },
  other: { label: "Other", Icon: Award, color: "text-amber-500" },
};

export function Certificates() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Certificates</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CERTIFICATES.map((cert) => {
          const { Icon, color } = CATEGORY_CONFIG[cert.category];
          const Wrapper = cert.credentialUrl ? "a" : "div";
          const wrapperProps = cert.credentialUrl
            ? { href: cert.credentialUrl, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <Wrapper
              key={cert.title}
              {...wrapperProps}
              className="flex items-start gap-4 rounded-xl border bg-card p-4 hover:border-primary/50 transition-colors group"
            >
              <div className={`mt-0.5 shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                  {cert.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {cert.year}
                </Badge>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
