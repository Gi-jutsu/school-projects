import { requestWithDecoder } from '@/core/helpers/request'

import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/lib/TaskEither'
import * as t from 'io-ts'

const PokemonList = t.type({
  count: t.number,
})

const Pokemon = t.type({
  id: t.number,
  name: t.string,
})

export const getPokemons = (
  offset = 0,
  limit = 20,
): TE.TaskEither<Error, t.TypeOf<typeof PokemonList>> =>
  pipe(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    requestWithDecoder(PokemonList),
  )

export const getPokemon = (
  name: string,
): TE.TaskEither<Error, t.TypeOf<typeof Pokemon>> =>
  pipe(`https://pokeapi.co/api/v2/pokemon/${name}`, requestWithDecoder(Pokemon))
