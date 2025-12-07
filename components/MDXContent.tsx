"use client";
import { useState } from "react";
import { MDXRemote } from "next-mdx-remote";

export default function MDXContent({ source }: { source: any }) {
  return <MDXRemote {...source} />;
}
