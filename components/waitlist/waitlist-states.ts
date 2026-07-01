export type Status = "idle" | "submitting" | "success" | "error";

export type WaitlistResponse = {
  ok: boolean;
  alreadyJoined?: boolean;
  code?: string;
  message?: string;
};
