import { useState } from "react";
import BlockFromObject from "./block-from-object";
import { BlockProps, useBlocksStore } from "./common";

export default function RepeaterBlock({ block, parent }: BlockProps) {
  const blocks = useBlocksStore((state) =>
    state.blocks.filter((b) => b.key.startsWith(`${block.key}.`))
  );
  const responses = useBlocksStore((state) =>
    state.responses.filter((r) => r.key === block.key)
  );
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>{block.title}</h2>

      {responses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Field of Study</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response.id}>
                <td>{response.payload?.school?.value}</td>
                <td>{response.payload?.field_of_study?.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {open ? (
        <button onClick={() => setOpen(false)}>Cancel</button>
      ) : (
        <button onClick={() => setOpen(true)}>Add</button>
      )}
      {open && (
        <div>
          {blocks.map((b) => (
            <BlockFromObject key={b.key} block={b} parent={block} />
          ))}
        </div>
      )}
    </div>
  );
}
