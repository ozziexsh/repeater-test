import React from "react";
import { Block } from "../types";
import BlockFromObject from "./block-from-object";
import { useBlocksStore } from "./common";

export default function RepeaterCreateForm({ block }: { block: Block }) {
  const blocks = useBlocksStore((state) =>
    state.blocks.filter((b) => b.key.startsWith(`${block.key}.`))
  );

  // collect information
  // on submit create? or save as you type?

  return (
    <div>
      {blocks.map((b) => (
        <BlockFromObject key={b.key} block={b} parent={block} />
      ))}
    </div>
  );
}
