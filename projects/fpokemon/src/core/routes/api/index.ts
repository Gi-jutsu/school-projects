import { Router } from 'express'
import pokemons from '@/core/routes/api/pokemons'

const router = Router()

router.use('/pokemons', pokemons)

export default router
