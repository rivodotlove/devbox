/**
 * Shared Result type for total, never-throwing domain functions.
 * Every module's domain layer returns Result instead of throwing.
 */

export interface DomainError {
  code: string;
  message: string;
}

export type Ok<T> = { ok: true; value: T };
export type Err<E> = { ok: false; error: E };
export type Result<T, E = DomainError> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E = DomainError>(error: E): Err<E> => ({ ok: false, error });

export const domainError = (code: string, message: string): Err<DomainError> =>
  err({ code, message });
