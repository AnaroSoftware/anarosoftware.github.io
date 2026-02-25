import { useRoute } from 'vue-router';

export const useRoutePrefix = () => {
  const route = useRoute();
  const routePrefix: string = typeof route.meta.name === 'string' ? route.meta.name : '';

  return { routePrefix };
};
