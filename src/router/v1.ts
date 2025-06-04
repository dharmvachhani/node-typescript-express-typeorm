import { Router } from 'express';

const v1Router = Router();

type IRoute = {
    path: string;
    route: Router;
}

const v1Route: IRoute[] = [
    // {
    //     path: '/docs',
    //     route: docsRoute,
    // },
];

v1Route.forEach((route) => {
    v1Router.use(route.path, route.route);
});

export default v1Router;