import 'dotenv/config'
import z from 'zod'
const envSchemma = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchemma.safeParse(process.env)

if (!_env.success) {
  console.log('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
