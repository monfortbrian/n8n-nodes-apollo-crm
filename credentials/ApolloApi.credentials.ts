import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ApolloApi implements ICredentialType {
	name = 'apolloApi';
	displayName = 'Apollo API';
	documentationUrl = 'https://docs.apollo.io/docs/create-api-key';
	icon = 'file:apollo.svg' as const;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your Apollo API key. Go to Apollo → Settings → Integrations → API → Connect. Use a Master API Key for full access to all endpoints.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Api-Key': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.apollo.io',
			url: '/v1/auth/health',
			method: 'GET',
		},
	};
}
