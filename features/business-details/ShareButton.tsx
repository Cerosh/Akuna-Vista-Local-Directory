"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  businessName: string;
}

/** Web Share API where supported, falling back to copy-link-to-clipboard. */
export function ShareButton({ businessName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: businessName, url });
      } catch {
        // User cancelled the native share sheet — not an error.
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleShare}
      aria-label={copied ? "Link copied to clipboard" : `Share ${businessName}`}
    >
      {copied ? (
        <>
          <Check className="size-4" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="size-4" aria-hidden="true" />
          Share
        </>
      )}
    </Button>
  );
}
