import { UmbEntryPointOnInit, UmbEntryPointOnUnload } from '@umbraco-cms/backoffice/extension-api';
import { client } from '../api/client.gen';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbElement } from '@umbraco-cms/backoffice/element-api';

export const onInit: UmbEntryPointOnInit = (host, _extensionRegistry) => {
  console.log('Hello from Extend Everything 👋');

  configureAuthToken(host);
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
  console.log('Goodbye from Extend Everything 👋');
};

const configureAuthToken = (host: UmbElement) => {
  host.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
    if(!authContext) {
      console.warn('No auth context found, skipping token configuration.');
      return;
    }

    const config = authContext.getOpenApiConfiguration();

    config.token().then(token => {
      client.interceptors.request.use((request) => {
        request.headers.set('Authorization', `Bearer ${token}`);
        return request;
      });
    });
  });
}
