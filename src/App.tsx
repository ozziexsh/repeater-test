import BlockFromObject from "./blocks/block-from-object";
import { useBlocksStore } from "./blocks/common";

export default function App() {
  const blocks = useBlocksStore((state) =>
    state.blocks.filter((block) => !block.key.includes("."))
  );

  return (
    <div>
      {blocks.map((block) => (
        <BlockFromObject key={block.key} block={block} />
      ))}
    </div>
  );
}
