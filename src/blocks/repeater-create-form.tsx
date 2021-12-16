import React, { useState } from "react";
import { Block } from "../types";
import { useBlocksStore } from "./common";
import TextInput from "../components/text-input";
import { vs as uuid } from "uuid";

export default function RepeaterCreateForm({
  block,
  onCreate
}: {
  block: Block;
  onCreate(): void;
}) {
  const blocks = useBlocksStore((state) =>
    state.blocks.filter((b) => b.key.startsWith(`${block.key}.`))
  );
  const addRepeater = useBlocksStore((state) => state.addRepeater);
  const [form, setForm] = useState<{ [key: string]: any }>(() => {
    const temp: { [key: string]: any } = {};
    for (const block of blocks) {
      if (block.type === "text") {
        temp[block.key] = "";
      }
    }
    return temp;
  });

  function onSave() {
    const groupId = uuid();
    const responses = [];
    for (const key in form) {
      // todo, handle more than text type
      responses.push({
        id: -1,
        key,
        payload: {
          value: form[key],
          group: groupId
        },
        respondable_id: block.blockable_id,
        respondable_type: block.blockable_type
      });
    }
    // await api.post(`applicaitons/1/blocks/${block.id}`, { responses });
    addRepeater(responses);
    setForm({});
    onCreate();
  }

  return (
    <div>
      {blocks.map((b) => {
        switch (b.type) {
          case "text":
            return (
              <TextInput
                label={b.title}
                value={form[b.key]}
                onChange={(newVal) => setForm({ ...form, [b.key]: newVal })}
              />
            );
          default:
            return null;
        }
      })}

      <button onClick={onSave}>Save</button>
    </div>
  );
}
