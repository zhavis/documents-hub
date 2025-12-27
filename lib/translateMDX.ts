import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";


async function translateText(text: string) {
  return text.replace("Getting Started", "شروع به کار"); 
}

export async function translateMDX(mdx: string) {

  const processor = unified().use(remarkParse).use(remarkStringify);
  const tree = processor.parse(mdx);

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
