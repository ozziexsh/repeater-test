import { createContext, useContext, useState } from "react";
import { Block, Response } from "../types";
import create from "zustand";
import produce from "immer";

let id = 0;

export const useBlocksStore = create<{
  blocks: Block[];
  responses: Response[];
  updateResponse(id: number, payload: Pick<Response, "payload">): void;
}>((set, get) => ({
  blocks: [
    {
      id: ++id,
      key: "name",
      title: "Your name",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application",
    },
    {
      id: ++id,
      key: "email",
      title: "Your email",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application",
    },
    {
      id: ++id,
      key: "phone",
      title: "Your phone",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application",
    },
    {
      id: ++id,
      key: "education",
      title: "Enter your education",
      type: "repeater",
      meta: {},
      blockable_id: 1,
      blockable_type: "application",
    },
    {
      id: ++id,
      key: "education.school",
      title: "School name",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application",
    },
    {
      id: ++id,
      key: "education.field_of_study",
      title: "Field of study",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application",
    },
  ],
  responses: [
    {
      id: ++id,
      key: "name",
      payload: {
        value: "My name",
      },
      respondable_id: 1,
      respondable_type: "application",
    },
    {
      id: ++id,
      key: "education",
      payload: {
        school: {
          value: "school",
        },
        field_of_study: {
          value: "something",
        },
      },
      respondable_id: 1,
      respondable_type: "application",
    },
    {
      id: ++id,
      key: "education",
      payload: {
        school: {
          value: "another school",
        },
        field_of_study: {
          value: "something else",
        },
      },
      respondable_id: 1,
      respondable_type: "application",
    },
  ],
  updateResponse: (id: number, payload: any) => {
    set(
      produce((state) => {
        const index = state.responses.findIndex((r: Response) => r.id === id);
        if (index !== -1) {
          state.responses[index].payload = payload;
        }
      })
    );
  },
}));

export interface BlockProps {
  block: Block;
  parent?: Block;
}

async function createOrUpdateResponse(key: string, data: any) {
  const { responses } = useBlocksStore.getState();
  const response = responses.find((r) => r.key === key);
  if (response) {
    return { ...response, payload: data };
  }
  return { id: ++id, payload: data, key };
}

export function useResponse({ key, parent }: { key: string; parent?: Block }) {
  const response = useBlocksStore((state) =>
    state.responses.find((r) => r.key === key)
  );
  const [payload, setPayload] = useState<any>(response?.payload || {});

  function onPayloadChange(newPayload: any) {
    setPayload(newPayload);
    // createOrUpdateResponse(key, newPayload);
  }

  return {
    response,
    payload,
    onPayloadChange,
  };
}
