import { getApi } from '../controller/api';

export class APIRoute {
  public routes(app): void {
    app.route('/api').get(getApi);
  }
}
