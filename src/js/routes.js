
import HomePage from '../pages/home.jsx';
import Adv from '../pages/adv.jsx';
import Adv1 from '../pages/adv1.jsx';
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
    path: '/adv1',
    component: Adv1,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
