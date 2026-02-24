import type { RouteRecordRaw } from 'vue-router';
import PortfolioPage from 'src/pages/PortfolioPage.vue';
import ServicesPage from 'src/pages/ServicesPage.vue';
import IndexPage from 'src/pages/IndexPage.vue';
import ErrorNotFound from 'src/pages/ErrorNotFound.vue';
import MainLayout from 'src/layouts/MainLayout.vue';
import AboutUs from 'src/pages/AboutUs.vue';
import ReviewsPage from 'src/pages/ReviewsPage.vue';
import ContactPage from 'src/pages/ContactPage.vue';
import BlogsOverview from 'src/pages/BlogsOverview.vue';
import PrivacyStatement from 'src/pages/PrivacyStatement.vue';

export type ChildRecord = RouteRecordRaw & {
  meta: {
    name: string;
    includeInLinks?: boolean;
  };
};

const routes: Array<
  RouteRecordRaw & {
    children?: ChildRecord[];
  }
> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: IndexPage,
        name: 'IndexPage',
        meta: {
          name: 'indexPage',
        },
      },
      {
        path: '/services',
        component: ServicesPage,
        name: 'ServicesPage',
        meta: {
          name: 'servicesPage',
        },
      },
      {
        path: '/portfolio',
        component: PortfolioPage,
        name: 'PortfolioPage',
        meta: {
          name: 'portfolioPage',
          includeInLinks: true,
        },
      },
      {
        path: '/blog',
        component: BlogsOverview,
        name: 'BlogsOverview',
        meta: {
          name: 'blogsPage',
          includeInLinks: true,
        },
      },
      {
        path: '/about-us',
        component: AboutUs,
        name: 'AboutUs',
        meta: {
          name: 'aboutUsPage',
          includeInLinks: true,
        },
      },
      {
        path: '/reviews',
        component: ReviewsPage,
        name: 'ReviewsPage',
        meta: {
          name: 'reviewsPage',
        },
      },
      {
        path: '/contact-us',
        component: ContactPage,
        name: 'ContactPage',
        meta: {
          name: 'contactPage',
          includeInLinks: true,
        },
      },
      {
        path: '/privacy-statement',
        component: PrivacyStatement,
        name: 'PrivacyStatement',
        meta: {
          name: 'privacyStatementPage',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
