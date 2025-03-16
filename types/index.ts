export * from "./actions/actions-types";

export type ActionState = {
  status: "success" | "error";
  message: string;
  data?: any;
};
