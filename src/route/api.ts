import { getApi, closest, street } from '../controller/api';

export class APIRoute {
  public routes(app): void {
    app.route('/api').get(getApi);
    app.route('/api/closest').get(closest);
    app.route('/api/street').post(street);
  }
}
