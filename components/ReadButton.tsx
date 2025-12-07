"use client";
import { useEffect, useState } from "react";
import ReadButton from "@/components/ReadButton";
import { fetchAllSlugs } from "@/utils/allslug";

export default function ReadButtonWrapper({ slugPath }: { slugPath: string }) {
  const [allSlugs, setAllSlugs] = useState<string[]>([]);

  useEffect(() => {
    fetchAllSlugs().then(({ slugs }) => setAllSlugs(slugs));
  }, []);

  if (!allSlugs.length) return null;

  return <ReadButton slugPath={slugPath} allSlugs={allSlugs} />;
}
