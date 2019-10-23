import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index',
  external: ['react'],
  output: {
    format: 'umd',
    name: 'react-media-breakpoints',
    globals: {
      react: 'React',
      'prop-types': 'prop-types',
    },
  },
  plugins: [
    // resolve(),
    babel({
      runtimeHelpers: false,
    }),
  ]
}