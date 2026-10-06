export const FREE_CLAIM_COOKIE = "red_free";
export const FREE_CLAIM_MAX_AGE = 60 * 60 * 6;

export function claimCookieName(handle: string) {
  return `${FREE_CLAIM_COOKIE}_${handle.replace(/[^a-z0-9_-]/gi, "")}`;
}
