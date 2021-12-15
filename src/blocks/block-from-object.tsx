import { BlockProps } from "./common";
import RepeaterBlock from "./repeater-block";
import TextBlock from "./text-block";

export default function BlockFromObject({ block, parent }: BlockProps) {
  switch (block.type) {
    case "repeater":
      return <RepeaterBlock block={block} parent={parent} />;
    case "text":
      return <TextBlock block={block} parent={parent} />;
    default:
      return null;
  }
}
