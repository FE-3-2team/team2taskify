// components/common/WithSkeleton.tsx
import React from "react";

interface WithSkeletonProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export default function WithSkeleton({
  isLoading,
  skeleton,
  children,
}: WithSkeletonProps) {
  return <>{isLoading ? skeleton : children}</>;
}
