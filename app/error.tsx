'use client';

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oops! Something went wrong... it's not you, it's me! Maybe try refreshing?</p>
    </div>
  );
}
