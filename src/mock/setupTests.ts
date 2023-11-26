import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { setupServer } from "msw/node";
import type { RequestHandler } from "msw";
import type { GetServerSidePropsContext } from "next";
import { createRequest, createResponse } from 'node-mocks-http';

afterAll(() => {
  vi.clearAllMocks();
});

export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: "",
  ...ctx,
});
