
import HomePage from '../pages/home.jsx';
import Adv from '../pages/adv.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/adv',
    component: Adv,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
