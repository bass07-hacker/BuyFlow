import nextConfig from 'eslint-config-next/core-web-vitals'
import nextTypescriptConfig from 'eslint-config-next/typescript'

const config = [
  ...nextConfig,
  ...nextTypescriptConfig,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
    },
  },
]

export default config
