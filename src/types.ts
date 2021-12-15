export interface Block {
  id: number;
  key: string;
  title: string;
  type: string;
  meta: any;
  blockable_id: number;
  blockable_type: string;
}

export interface Response {
  id: number;
  key: string;
  payload: any;
  respondable_id: number;
  respondable_type: string;
}
