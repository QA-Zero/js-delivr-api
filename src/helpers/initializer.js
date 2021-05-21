export default async ({ store }) => {
  /* eslint no-underscore-dangle: 0 */
  if (store._actions['auth/init']) {
    await store.dispatch('auth/init');
  }
};
