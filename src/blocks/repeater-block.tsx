import { useState } from "react";
import BlockFromObject from "./block-from-object";
import { BlockProps, useBlocksStore } from "./common";
import RepeaterCreateForm from "./repeater-create-form";

export default function RepeaterBlock({ block, parent }: BlockProps) {
  const responses = useBlocksStore((state) =>
    state.responses.filter((r) => r.key.startsWith(`${block.key}.`))
  );
  const blocks = useBlocksStore((state) =>
    state.blocks.filter((b) => b.key.startsWith(`${block.key}.`))
  );
  const [open, setOpen] = useState(false);

  const groupedResponses = {};
  for (const response of responses) {
    groupedResponses[response.payload?.group] ||=  [];
    groupedResponses[response.payload?.group].push(response);
  }

  return (
    <div>
      <h2>{block.title}</h2>

      {responses?.length > 0 ? (
        <table>
          <thead>
            <tr>
              {blocks.map((b) => (
                <th key={b.id}>{b.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedResponses).map(
              (groupedResponse: any, i: number) => (
                <tr key={i}>
                  {blocks.map((b, y) => (
                    <td key={y}>
                      {groupedResponse.find((x) => x.key === b.key)?.payload?.value}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : null}

      {open ? (
        <button onClick={() => setOpen(false)}>Cancel</button>
      ) : (
        <button onClick={() => setOpen(true)}>Add</button>
      )}
      {open && <RepeaterCreateForm block={block} onCreate={() => setOpen(false)} />}
    </div>
  );
}
