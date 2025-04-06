"use client";

import React from "react";
import { TwitterIcon, LinkedinIcon, FacebookIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/Button";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="flex space-x-3">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => handleShare('twitter')}
        className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
      >
        <TwitterIcon className="h-5 w-5" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => handleShare('linkedin')}
        className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
      >
        <LinkedinIcon className="h-5 w-5" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => handleShare('facebook')}
        className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
      >
        <FacebookIcon className="h-5 w-5" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => handleShare('copy')}
        className="rounded-full h-10 w-10 p-2 text-stone-600 dark:text-amber-200"
      >
        <CopyIcon className="h-5 w-5" />
      </Button>
    </div>
  );
} 