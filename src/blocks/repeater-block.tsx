import { useState } from "react";
import BlockFromObject from "./block-from-object";
import { BlockProps, useBlocksStore } from "./common";
import RepeaterCreateForm from "./repeater-create-form";

export default function RepeaterBlock({ block, parent }: BlockProps) {
  const response = useBlocksStore((state) =>
    state.responses.find((r) => r.key === block.key)
  );
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>{block.title}</h2>

      {response?.payload?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Field of Study</th>
            </tr>
          </thead>
          <tbody>
            {response?.payload?.map((row: any, i: number) => (
              <tr key={i}>
                <td>{row?.school?.value}</td>
                <td>{row?.field_of_study?.value}</td>
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
      {open && <RepeaterCreateForm block={block} />}
    </div>
  );
}
