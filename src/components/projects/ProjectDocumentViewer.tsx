import { ExternalLink, FileText } from "lucide-react";

export interface ProjectDocument {
  title: string;
  url: string;
}

export function ProjectDocumentViewer({
  documents,
  openInNewTabLabel,
}: {
  documents: ProjectDocument[];
  openInNewTabLabel: string;
}) {
  return (
    <div className="mb-10 space-y-6">
      {documents.map((doc) => (
        <div key={doc.url} className="rounded-xl border bg-card overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b bg-muted/30">
            <span className="flex items-center gap-2 text-sm font-medium min-w-0">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{doc.title}</span>
            </span>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {openInNewTabLabel}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <iframe src={doc.url} title={doc.title} className="h-[75vh] w-full" />
        </div>
      ))}
    </div>
  );
}
