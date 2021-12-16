export interface Block {
  id: number;
  key: string; // name, employer, phone
  title: string; // Your name:
  type: string; // text, select,
  meta: any; // unused
  blockable_id: number; 
  blockable_type: string;
}

export interface Response {
  id: number;
  key: string; // block key
  payload: any; // jsonb
  respondable_id: number;
  respondable_type: string;
}
