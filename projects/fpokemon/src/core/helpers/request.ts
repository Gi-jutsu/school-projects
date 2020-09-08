import fetch, { Response } from 'node-fetch'
import { decodeWith } from '@/core/helpers/io'

import { flow } from 'fp-ts/function'
import * as TE from 'fp-ts/lib/TaskEither'
import * as t from 'io-ts'

const safeCall = <T>(f: () => Promise<T>): TE.TaskEither<Error, T> =>
  TE.tryCatch(f, (reason: unknown): Error => new Error(String(reason)))

const safeFetch = (url: string) => safeCall<Response>(() => fetch(url))

const safeJson = (response: Response) => safeCall(() => response.json())

const request = flow(safeFetch, TE.chain(safeJson))

export const requestWithDecoder = <T>(
  decoder: t.Decoder<unknown, T>,
): ((url: string) => TE.TaskEither<Error, T>) =>
  flow(
    request,
    TE.chain((results: Response) => decodeWith<T>(decoder)(results)),
  )
