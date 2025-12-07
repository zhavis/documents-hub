import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

// Dummy translation function
async function translateText(text: string) {
  return text.replace("Getting Started", "شروع به کار"); // replace with real translation
}

export async function translateMDX(mdx: string) {
  // Parse MDX into AST
  const processor = unified().use(remarkParse).use(remarkStringify);
  const tree = processor.parse(mdx);

  // Walk through all text nodes
  async function visit(node: any) {
    if (node.type === "text") {
      node.value = await translateText(node.value);
    }
    if (node.children) {
      for (const child of node.children) {
        await visit(child);
      }
    }
  }

  await visit(tree);

  const translatedMDX = await processor.stringify(tree);
  return translatedMDX;
}
