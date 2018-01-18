import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
              'id': 'dashboard',
              'title': 'Dashboard',
              'translate': 'NAV.DASHBOARD',
              'type': 'item',
              'icon': 'dashboard',
              'url': '/dashboard',
            },
            {
              'id': 'orders',
              'title': 'Orders',
              'type': 'group',
              'children': [
                {
                  'id': 'order-list',
                  'title': 'Order List',
                  'type': 'item',
                  'icon': 'email',
                  'url': 'apps/order',
                }
              ]
            }
        ];
    }
}
