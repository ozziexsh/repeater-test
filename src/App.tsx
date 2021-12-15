import { useEffect } from "react";
import BlockFromObject from "./blocks/block-from-object";
import {
  getInitialBlocks,
  getInitialResponses,
  useBlocksStore,
} from "./blocks/common";

export default function App() {
  const blocks = useBlocksStore((state) =>
    state.blocks.filter((block) => !block.key.includes("."))
  );

  async function boot() {
    useBlocksStore.setState({
      blocks: await getInitialBlocks(),
      responses: await getInitialResponses(),
    });
  }

  useEffect(() => {
    boot();
  }, []);

  return (
    <div>
      {blocks.map((block) => (
        <BlockFromObject key={block.key} block={block} />
      ))}
    </div>
  );
}
