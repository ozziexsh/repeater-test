import { createContext, useContext, useState } from "react";
import { Block, Response } from "../types";
import create from "zustand";
import produce from "immer";
import { v4 as uuid } from "uuid";

let id = 0;

export const useBlocksStore = create<{
  blocks: Block[];
  responses: Response[];
  addResponse(res: Response): void;
  addRepeater(res: Response[]): void;
}>((set, get) => ({
  blocks: [],
  responses: [],
  addResponse: (response) =>
    set(produce((state) => state.responses.push(response))),
  addRepeater: (responses) =>
    set(produce((state) => state.responses.push(...responses)))
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

export async function getInitialBlocks() {
  return [
    {
      id: ++id,
      key: "name",
      title: "Your name",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application"
    },
    {
      id: ++id,
      key: "email",
      title: "Your email",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application"
    },
    {
      id: ++id,
      key: "phone",
      title: "Your phone",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application"
    },
    {
      id: ++id,
      key: "education",
      title: "Enter your education",
      type: "repeater",
      meta: {},
      blockable_id: 1,
      blockable_type: "application"
    },
    {
      id: ++id,
      key: "education.school",
      title: "School name",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application"
    },
    {
      id: ++id,
      key: "education.field_of_study",
      title: "Field of study",
      type: "text",
      meta: {},
      blockable_id: 1,
      blockable_type: "application"
    }
  ];
}

export async function getInitialResponses() {
  const group1 = uuid();
  const group2 = uuid();
  return [
    {
      id: ++id,
      key: "name",
      payload: {
        value: "My name1"
      },
      respondable_id: 1,
      respondable_type: "application"
    },
    {
      id: ++id,
      key: "education.school",
      payload: {
        value: "My name1",
        group: group1
      },
      respondable_id: 1,
      respondable_type: "application"
    },
    {
      id: ++id,
      key: "education.field_of_study",
      payload: {
        value: "Eng",
        group: group1
      },
      respondable_id: 1,
      respondable_type: "application"
    },
    {
      id: ++id,
      key: "education.school",
      payload: {
        value: "My name2",
        group: group2
      },
      respondable_id: 1,
      respondable_type: "application"
    },
    {
      id: ++id,
      key: "education.field_of_study",
      payload: {
        value: "Phsyics",
        group: group2
      },
      respondable_id: 1,
      respondable_type: "application"
    }
    // {
    //   id: ++id,
    //   key: "education",
    //   payload: [
    //     {
    //       school: {
    //         value: "school"
    //       },
    //       field_of_study: {
    //         value: "something"
    //       }
    //     },
    //     {
    //       school: {
    //         value: "another school"
    //       },
    //       field_of_study: {
    //         value: "something else"
    //       }
    //     }
    //   ],
    //   respondable_id: 1,
    //   respondable_type: "application"
    // }
  ];
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
    onPayloadChange
  };
}
