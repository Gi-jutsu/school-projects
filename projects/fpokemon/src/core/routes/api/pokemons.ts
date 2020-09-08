import { Router } from 'express'
import { getPokemon, getPokemons } from '@/core/pokemon'

import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/lib/TaskEither'

const router = Router()

// List Pokemons
router.get('/', ({ query }, res) =>
  pipe(
    getPokemons(
      parseInt(typeof query.offset === 'string' ? query.offset : ''),
      parseInt(typeof query.limit === 'string' ? query.limit : ''),
    ),
    TE.map(res.json.bind(res)),
    TE.mapLeft(error => {
      res.json({ error: error.message })
    }),
  )(),
)

// Get Pokemon Details
router.get('/:name', ({ params }, res) =>
  pipe(
    getPokemon(params.name),
    TE.map(res.json.bind(res)),
    TE.mapLeft(error => {
      res.json({ error: error.message })
    }),
  )(),
)

export default router
