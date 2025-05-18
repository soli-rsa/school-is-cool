
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
}) => {
  return (
    <div className="text-center p-8 bg-muted rounded-lg">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Button asChild>
        <Link to={ctaLink}>{ctaText}</Link>
      </Button>
    </div>
  );
};

export default EmptyState;
