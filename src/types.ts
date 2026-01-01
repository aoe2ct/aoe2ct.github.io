
export type DraftAction = { action: "ban" | "pick" | "snipe" | "steal", map: string, type: "admin" | "player" }
export type Draft = { bracket: string, draft: DraftAction[], draftId: string, stage: string }
export type Drafts = { civDrafts: Draft[], mapDrafts: Draft[] };
export type DraftCounts = { pick: number, ban: number, snipe: number, steal: number }
export type AllCounts = { admin: DraftCounts, player: DraftCounts };
export type Counts = [string, AllCounts];
