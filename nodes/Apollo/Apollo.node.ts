import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

export class Apollo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Apollo',
		name: 'apollo',
		icon: 'file:apollo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Interact with Apollo.io - sales intelligence, prospecting, data enrichment, CRM, outreach sequences, deals, tasks, and calls',
		defaults: { name: 'Apollo' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'apolloApi',
				required: true,
			},
		],
		properties: [
			// ─── RESOURCE ────────────────────────────────────────────────────
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Call', value: 'call' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Deal', value: 'deal' },
					{ name: 'Enrichment', value: 'enrichment' },
					{ name: 'Miscellaneous', value: 'misc' },
					{ name: 'People (Prospecting)', value: 'people' },
					{ name: 'Sequence', value: 'sequence' },
					{ name: 'Task', value: 'task' },
				],
				default: 'people',
			},

			// ─── ACCOUNT OPERATIONS ──────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['account'] } },
				options: [
					{
						name: 'Bulk Create Accounts',
						value: 'bulkCreateAccounts',
						description: 'Create multiple company accounts in a single request',
						action: 'Bulk create accounts',
					},
					{
						name: 'Bulk Update Accounts',
						value: 'bulkUpdateAccounts',
						description: 'Update multiple company accounts in a single request',
						action: 'Bulk update accounts',
					},
					{
						name: 'Create an Account',
						value: 'createAccount',
						description: 'Add a new company account to your Apollo CRM',
						action: 'Create an account',
					},
					{
						name: 'List Account Stages',
						value: 'listAccountStages',
						description: 'Retrieve all available account stages',
						action: 'List account stages',
					},
					{
						name: 'Search for Accounts',
						value: 'searchAccounts',
						description: 'Search company accounts in your Apollo CRM',
						action: 'Search for accounts',
					},
					{
						name: 'Update an Account',
						value: 'updateAccount',
						description: 'Update an existing company account record',
						action: 'Update an account',
					},
					{
						name: 'Update Account Owner',
						value: 'updateAccountOwner',
						description: 'Reassign one or more accounts to a new owner',
						action: 'Update account owner',
					},
					{
						name: 'Update Account Stage',
						value: 'updateAccountStage',
						description: 'Move one or more accounts to a different stage',
						action: 'Update account stage',
					},
					{
						name: 'View an Account',
						value: 'viewAccount',
						description: 'Retrieve a single account by its ID',
						action: 'View an account',
					},
				],
				default: 'createAccount',
			},

			// ─── CALL OPERATIONS ─────────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['call'] } },
				options: [
					{
						name: 'Create Call Records',
						value: 'createCallRecords',
						description: 'Log one or more calls against contacts',
						action: 'Create call records',
					},
					{
						name: 'Search for Calls',
						value: 'searchCalls',
						description: 'Search and filter call records in your account',
						action: 'Search for calls',
					},
					{
						name: 'Update Call Records',
						value: 'updateCallRecords',
						description: 'Update the details of existing call records',
						action: 'Update call records',
					},
				],
				default: 'createCallRecords',
			},

			// ─── CONTACT OPERATIONS ──────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['contact'] } },
				options: [
					{
						name: 'Bulk Create Contacts',
						value: 'bulkCreateContacts',
						description: 'Create multiple contacts in a single request',
						action: 'Bulk create contacts',
					},
					{
						name: 'Bulk Update Contacts',
						value: 'bulkUpdateContacts',
						description: 'Update multiple contacts in a single request',
						action: 'Bulk update contacts',
					},
					{
						name: 'Create a Contact',
						value: 'createContact',
						description: 'Add a new contact to your Apollo account',
						action: 'Create a contact',
					},
					{
						name: 'List Contact Stages',
						value: 'listContactStages',
						description: 'Retrieve all available contact stages',
						action: 'List contact stages',
					},
					{
						name: 'Search for Contacts',
						value: 'searchContacts',
						description: 'Search contacts in your Apollo account',
						action: 'Search for contacts',
					},
					{
						name: 'Update a Contact',
						value: 'updateContact',
						description: 'Update an existing contact record',
						action: 'Update a contact',
					},
					{
						name: 'Update Contact Owner',
						value: 'updateContactOwner',
						description: 'Reassign one or more contacts to a new owner',
						action: 'Update contact owner',
					},
					{
						name: 'Update Contact Stage',
						value: 'updateContactStage',
						description: 'Move one or more contacts to a different stage',
						action: 'Update contact stage',
					},
					{
						name: 'View a Contact',
						value: 'viewContact',
						description: 'Retrieve a single contact by its ID',
						action: 'View a contact',
					},
				],
				default: 'createContact',
			},

			// ─── DEAL OPERATIONS ─────────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['deal'] } },
				options: [
					{
						name: 'Create a Deal',
						value: 'createDeal',
						description: 'Create a new deal in your Apollo account',
						action: 'Create a deal',
					},
					{
						name: 'List All Deals',
						value: 'listDeals',
						description: 'Retrieve all deals in your Apollo account',
						action: 'List all deals',
					},
					{
						name: 'List Deal Stages',
						value: 'listDealStages',
						description: 'Retrieve all available deal stages',
						action: 'List deal stages',
					},
					{
						name: 'Update a Deal',
						value: 'updateDeal',
						description: 'Update an existing deal record',
						action: 'Update a deal',
					},
					{
						name: 'View a Deal',
						value: 'viewDeal',
						description: 'Retrieve a single deal by its ID',
						action: 'View a deal',
					},
				],
				default: 'createDeal',
			},

			// ─── ENRICHMENT OPERATIONS ───────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['enrichment'] } },
				options: [
					{
						name: 'Bulk Enrich Organizations',
						value: 'bulkEnrichOrganizations',
						description: 'Enrich data for up to 10 companies in a single API call',
						action: 'Bulk enrich organizations',
					},
					{
						name: 'Bulk Enrich People',
						value: 'bulkEnrichPeople',
						description: 'Enrich data for up to 10 people in a single API call',
						action: 'Bulk enrich people',
					},
					{
						name: 'Enrich an Organization',
						value: 'enrichOrganization',
						description: 'Enrich data for a single company using its domain',
						action: 'Enrich an organization',
					},
					{
						name: 'Enrich a Person',
						value: 'enrichPerson',
						description: 'Enrich data for a single person using email, name, or LinkedIn URL',
						action: 'Enrich a person',
					},
				],
				default: 'enrichPerson',
			},

			// ─── MISCELLANEOUS OPERATIONS ────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['misc'] } },
				options: [
					{
						name: 'Create a Custom Field',
						value: 'createCustomField',
						description: 'Create a new custom field for contacts or accounts',
						action: 'Create a custom field',
					},
					{
						name: 'Get API Usage Stats',
						value: 'getApiUsage',
						description: 'View API usage statistics and current rate limit information',
						action: 'Get API usage stats',
					},
					{
						name: 'List All Lists',
						value: 'listAllLists',
						description: 'Retrieve all contact lists in your Apollo account',
						action: 'List all lists',
					},
					{
						name: 'List Custom Fields',
						value: 'listCustomFields',
						description: 'Retrieve all custom field definitions in your account',
						action: 'List custom fields',
					},
					{
						name: 'List Email Accounts',
						value: 'listEmailAccounts',
						description: 'Retrieve all connected email accounts in your team',
						action: 'List email accounts',
					},
					{
						name: 'List Users',
						value: 'listUsers',
						description: 'Retrieve all users in your Apollo team',
						action: 'List users',
					},
				],
				default: 'getApiUsage',
			},

			// ─── PEOPLE (PROSPECTING) OPERATIONS ────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['people'] } },
				options: [
					{
						name: 'Get Complete Organization Info',
						value: 'getOrgInfo',
						description:
							'Get full company profile including funding, headcount, and technology stack',
						action: 'Get complete organization info',
					},
					{
						name: 'Get Organization Job Postings',
						value: 'getOrgJobPostings',
						description: 'Retrieve active job postings for a specific organization',
						action: 'Get organization job postings',
					},
					{
						name: 'Search News Articles',
						value: 'searchNews',
						description: 'Search for news articles about people or companies',
						action: 'Search news articles',
					},
					{
						name: 'Search Organizations',
						value: 'searchOrganizations',
						description: "Search Apollo's database for companies using filters",
						action: 'Search organizations',
					},
					{
						name: 'Search People',
						value: 'searchPeople',
						description:
							"Search Apollo's database for prospects using job title, location, seniority, and more",
						action: 'Search people',
					},
				],
				default: 'searchPeople',
			},

			// ─── SEQUENCE OPERATIONS ─────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['sequence'] } },
				options: [
					{
						name: 'Add Contacts to a Sequence',
						value: 'addContactsToSequence',
						description: 'Enroll one or more contacts into an outreach sequence',
						action: 'Add contacts to a sequence',
					},
					{
						name: 'Check Email Stats',
						value: 'checkEmailStats',
						description: 'Retrieve open, click, and reply statistics for outreach emails',
						action: 'Check email stats',
					},
					{
						name: 'Search for Sequences',
						value: 'searchSequences',
						description: 'Search and list sequences in your Apollo account',
						action: 'Search for sequences',
					},
					{
						name: 'Search Outreach Emails',
						value: 'searchOutreachEmails',
						description: 'Search emails sent through Apollo sequences',
						action: 'Search outreach emails',
					},
					{
						name: 'Update Contact Status in Sequence',
						value: 'updateContactStatusInSequence',
						description: 'Pause, resume, or stop a contact within a sequence',
						action: 'Update contact status in sequence',
					},
				],
				default: 'searchSequences',
			},

			// ─── TASK OPERATIONS ─────────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['task'] } },
				options: [
					{
						name: 'Create a Task',
						value: 'createTask',
						description: 'Create a call, email, LinkedIn, or action task',
						action: 'Create a task',
					},
					{
						name: 'Search for Tasks',
						value: 'searchTasks',
						description: 'Search and filter tasks in your Apollo account',
						action: 'Search for tasks',
					},
				],
				default: 'createTask',
			},

			// SHARED FIELDS
			// =================================================================

			// Page / PerPage (reused across search operations)
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number to return. Max 500 pages, 100 records per page.',
				displayOptions: {
					show: {
						operation: [
							'searchPeople',
							'searchOrganizations',
							'searchContacts',
							'searchAccounts',
							'searchSequences',
							'listDeals',
						],
					},
				},
			},
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				default: 25,
				typeOptions: { maxValue: 100, minValue: 1 },
				description: 'Number of results per page (max 100)',
				displayOptions: {
					show: {
						operation: ['searchPeople', 'searchOrganizations'],
					},
				},
			},

			// PEOPLE - SEARCH PEOPLE filters
			// =================================================================
			{
				displayName: 'Filters',
				name: 'peopleFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['people'], operation: ['searchPeople'] } },
				options: [
					{
						displayName: 'Job Titles',
						name: 'personTitles',
						type: 'string',
						default: '',
						placeholder: 'CEO, CTO, Founder',
						description: 'Comma-separated job titles to filter by',
					},
					{
						displayName: 'Seniority',
						name: 'personSeniorities',
						type: 'multiOptions',
						options: [
							{ name: 'C-Suite', value: 'c_suite' },
							{ name: 'Director', value: 'director' },
							{ name: 'Entry', value: 'entry' },
							{ name: 'Founder', value: 'founder' },
							{ name: 'Intern', value: 'intern' },
							{ name: 'Manager', value: 'manager' },
							{ name: 'Owner', value: 'owner' },
							{ name: 'Partner', value: 'partner' },
							{ name: 'Senior', value: 'senior' },
							{ name: 'VP', value: 'vp' },
						],
						default: [],
						description: 'Seniority levels to include in results',
					},
					{
						displayName: 'Company Domains',
						name: 'qOrganizationDomains',
						type: 'string',
						default: '',
						placeholder: 'apollo.io, salesforce.com',
						description: 'Comma-separated company domains',
					},
					{
						displayName: 'Locations',
						name: 'personLocations',
						type: 'string',
						default: '',
						placeholder: 'San Francisco, CA, USA',
						description: 'Comma-separated locations',
					},
					{
						displayName: 'Keywords',
						name: 'qKeywords',
						type: 'string',
						default: '',
						description: 'Free-text keyword search across all fields',
					},
					{
						displayName: 'Min Employees',
						name: 'employeesMin',
						type: 'number',
						default: 0,
						description: 'Minimum number of company employees',
					},
					{
						displayName: 'Max Employees',
						name: 'employeesMax',
						type: 'number',
						default: 0,
						description: 'Maximum number of company employees (0 = no limit)',
					},
					{
						displayName: 'Has Email',
						name: 'hasEmail',
						type: 'boolean',
						default: false,
						description: 'Whether to only return people with a verified email address',
					},
					{
						displayName: 'Has Phone',
						name: 'hasPhone',
						type: 'boolean',
						default: false,
						description: 'Whether to only return people with a phone number',
					},
				],
			},

			// PEOPLE - GET ORG INFO / JOB POSTINGS
			// =================================================================
			{
				displayName: 'Organization ID',
				name: 'orgId',
				type: 'string',
				default: '',
				required: true,
				description: 'Apollo organization ID',
				displayOptions: {
					show: {
						resource: ['people'],
						operation: ['getOrgInfo', 'getOrgJobPostings'],
					},
				},
			},

			// ENRICHMENT - PERSON
			// =================================================================
			{
				displayName: 'Email',
				name: 'enrichEmail',
				type: 'string',
				placeholder: 'name@company.com',
				default: '',
				description:
					'Email address of the person to enrich. The most reliable identifier - provide at minimum this or first name + last name + domain.',
				displayOptions: { show: { resource: ['enrichment'], operation: ['enrichPerson'] } },
			},
			{
				displayName: 'Additional Options',
				name: 'enrichPersonOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { resource: ['enrichment'], operation: ['enrichPerson'] } },
				options: [
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Company Domain',
						name: 'domain',
						type: 'string',
						default: '',
						placeholder: 'apollo.io',
					},
					{
						displayName: 'LinkedIn URL',
						name: 'linkedinUrl',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Reveal Personal Emails',
						name: 'revealPersonalEmails',
						type: 'boolean',
						default: false,
						description: 'Whether to return personal (Gmail/Yahoo) emails. Consumes credits.',
					},
					{
						displayName: 'Reveal Phone Numbers',
						name: 'revealPhoneNumber',
						type: 'boolean',
						default: false,
						description: 'Whether to return phone numbers. Consumes credits.',
					},
					{
						displayName: 'Waterfall Email Enrichment',
						name: 'runWaterfallEmail',
						type: 'boolean',
						default: false,
						description:
							'Whether to check third-party data providers if Apollo has no email. Consumes credits.',
					},
					{
						displayName: 'Waterfall Phone Enrichment',
						name: 'runWaterfallPhone',
						type: 'boolean',
						default: false,
						description:
							'Whether to check third-party data providers if Apollo has no phone. Consumes credits.',
					},
				],
			},

			// ENRICHMENT - ORGANIZATION
			// =================================================================
			{
				displayName: 'Organization Domain',
				name: 'enrichOrgDomain',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'apollo.io',
				description: 'Company domain to enrich (e.g. apollo.io)',
				displayOptions: {
					show: { resource: ['enrichment'], operation: ['enrichOrganization'] },
				},
			},

			// CONTACT - CREATE / UPDATE FIELDS
			// =================================================================
			{
				displayName: 'First Name',
				name: 'contactFirstName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['contact'], operation: ['createContact'] } },
			},
			{
				displayName: 'Last Name',
				name: 'contactLastName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['contact'], operation: ['createContact'] } },
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				required: true,
				description: 'The ID of the contact to update or retrieve',
				displayOptions: {
					show: { resource: ['contact'], operation: ['updateContact', 'viewContact'] },
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'contactFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: { resource: ['contact'], operation: ['createContact', 'updateContact'] },
				},
				options: [
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@company.com',
						default: '',
					},
					{
						displayName: 'Label Names',
						name: 'labelNames',
						type: 'string',
						default: '',
						placeholder: 'Lead, Hot, Q1',
						description: 'Comma-separated list labels to apply',
					},
					{
						displayName: 'LinkedIn URL',
						name: 'linkedinUrl',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Organization Name',
						name: 'organizationName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Phone',
						name: 'directPhone',
						type: 'string',
						default: '',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Website URL',
						name: 'websiteUrl',
						type: 'string',
						default: '',
					},
				],
			},

			// ACCOUNT - CREATE / UPDATE FIELDS
			// =================================================================
			{
				displayName: 'Account Name',
				name: 'accountName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['account'], operation: ['createAccount'] } },
			},
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				required: true,
				description: 'The ID of the account to update or retrieve',
				displayOptions: {
					show: { resource: ['account'], operation: ['updateAccount', 'viewAccount'] },
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'accountFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: { resource: ['account'], operation: ['createAccount', 'updateAccount'] },
				},
				options: [
					{
						displayName: 'Annual Revenue',
						name: 'annualRevenue',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: '',
						placeholder: 'apollo.io',
					},
					{
						displayName: 'Industry',
						name: 'industry',
						type: 'string',
						default: '',
					},
					{
						displayName: 'LinkedIn URL',
						name: 'linkedinUrl',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Number of Employees',
						name: 'employeesCount',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Phone',
						name: 'phoneNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Website URL',
						name: 'websiteUrl',
						type: 'string',
						default: '',
					},
				],
			},

			// DEAL FIELDS
			// =================================================================
			{
				displayName: 'Deal Name',
				name: 'dealName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['deal'], operation: ['createDeal'] } },
			},
			{
				displayName: 'Deal ID',
				name: 'dealId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['deal'], operation: ['updateDeal', 'viewDeal'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'dealFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: { resource: ['deal'], operation: ['createDeal', 'updateDeal'] },
				},
				options: [
					{
						displayName: 'Account ID',
						name: 'accountId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Amount (USD)',
						name: 'amount',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Close Date',
						name: 'closedDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Deal Stage ID',
						name: 'dealStageId',
						type: 'string',
						default: '',
						description: 'Get stage IDs with "List Deal Stages"',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Owner ID',
						name: 'ownerTeamMemberId',
						type: 'string',
						default: '',
						description: 'Get user IDs with Miscellaneous → List Users',
					},
				],
			},

			// SEQUENCE FIELDS
			// =================================================================
			{
				displayName: 'Sequence ID',
				name: 'sequenceId',
				type: 'string',
				default: '',
				required: true,
				description: 'Apollo sequence ID. Get IDs using "Search for Sequences".',
				displayOptions: {
					show: {
						resource: ['sequence'],
						operation: ['addContactsToSequence', 'updateContactStatusInSequence'],
					},
				},
			},
			{
				displayName: 'Contact IDs',
				name: 'sequenceContactIds',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'id1, id2, id3',
				description: 'Comma-separated list of contact IDs to enroll in the sequence',
				displayOptions: {
					show: { resource: ['sequence'], operation: ['addContactsToSequence'] },
				},
			},
			{
				displayName: 'Email Account ID',
				name: 'emailAccountId',
				type: 'string',
				default: '',
				description:
					'ID of the sender email account. Get IDs using Miscellaneous → List Email Accounts.',
				displayOptions: {
					show: { resource: ['sequence'], operation: ['addContactsToSequence'] },
				},
			},
			{
				displayName: 'Contact ID',
				name: 'seqContactId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { resource: ['sequence'], operation: ['updateContactStatusInSequence'] },
				},
			},
			{
				displayName: 'New Status',
				name: 'contactSequenceStatus',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Bounced', value: 'bounced' },
					{ name: 'Finished', value: 'finished' },
					{ name: 'Paused', value: 'paused' },
					{ name: 'Stopped', value: 'stopped' },
				],
				default: 'paused',
				displayOptions: {
					show: { resource: ['sequence'], operation: ['updateContactStatusInSequence'] },
				},
			},

			// TASK FIELDS
			// =================================================================
			{
				displayName: 'Task Type',
				name: 'taskType',
				type: 'options',
				options: [
					{ name: 'Action Item', value: 'action_item' },
					{ name: 'Call', value: 'call' },
					{ name: 'Email', value: 'email' },
					{ name: 'LinkedIn Message', value: 'linkedin' },
				],
				default: 'call',
				required: true,
				displayOptions: { show: { resource: ['task'], operation: ['createTask'] } },
			},
			{
				displayName: 'Priority',
				name: 'taskPriority',
				type: 'options',
				options: [
					{ name: 'High', value: 'high' },
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
				],
				default: 'medium',
				displayOptions: { show: { resource: ['task'], operation: ['createTask'] } },
			},
			{
				displayName: 'Due Date',
				name: 'taskDueAt',
				type: 'dateTime',
				default: '',
				displayOptions: { show: { resource: ['task'], operation: ['createTask'] } },
			},
			{
				displayName: 'Contact IDs',
				name: 'taskContactIds',
				type: 'string',
				default: '',
				placeholder: 'id1, id2',
				description: 'Comma-separated contact IDs this task is assigned to',
				displayOptions: { show: { resource: ['task'], operation: ['createTask'] } },
			},

			// CALL FIELDS
			// =================================================================
			{
				displayName: 'Contact ID',
				name: 'callContactId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['call'], operation: ['createCallRecords'] } },
			},
			{
				displayName: 'Direction',
				name: 'callDirection',
				type: 'options',
				options: [
					{ name: 'Inbound', value: 'inbound' },
					{ name: 'Outbound', value: 'outbound' },
				],
				default: 'outbound',
				displayOptions: { show: { resource: ['call'], operation: ['createCallRecords'] } },
			},
			{
				displayName: 'Outcome',
				name: 'callDisposition',
				type: 'options',
				options: [
					{ name: 'Connected', value: 'connected' },
					{ name: 'Demo Scheduled', value: 'demo_scheduled' },
					{ name: 'Left Voicemail', value: 'left_voicemail' },
					{ name: 'No Answer', value: 'no_answer' },
					{ name: 'Not Interested', value: 'not_interested' },
					{ name: 'Wrong Number', value: 'wrong_number' },
				],
				default: 'connected',
				displayOptions: { show: { resource: ['call'], operation: ['createCallRecords'] } },
			},
			{
				displayName: 'Duration (Seconds)',
				name: 'callDuration',
				type: 'number',
				default: 0,
				displayOptions: { show: { resource: ['call'], operation: ['createCallRecords'] } },
			},
			{
				displayName: 'Notes',
				name: 'callNote',
				type: 'string',
				default: '',
				typeOptions: { rows: 3 },
				displayOptions: { show: { resource: ['call'], operation: ['createCallRecords'] } },
			},

			// MISCELLANEOUS - CUSTOM FIELD
			// =================================================================
			{
				displayName: 'Field Name',
				name: 'customFieldName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['misc'], operation: ['createCustomField'] } },
			},
			{
				displayName: 'Field Type',
				name: 'customFieldType',
				type: 'options',
				options: [
					{ name: 'Checkbox', value: 'checkbox' },
					{ name: 'Date', value: 'date' },
					{ name: 'Dropdown', value: 'picklist' },
					{ name: 'Number', value: 'number' },
					{ name: 'Text', value: 'text' },
				],
				default: 'text',
				displayOptions: { show: { resource: ['misc'], operation: ['createCustomField'] } },
			},
			{
				displayName: 'Apply To',
				name: 'customFieldEntity',
				type: 'options',
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Contact', value: 'contact' },
				],
				default: 'contact',
				displayOptions: { show: { resource: ['misc'], operation: ['createCustomField'] } },
			},
		],
	};

	// EXECUTE
	// =========================================================================
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('apolloApi');
		const apiKey = credentials.apiKey as string;

		const BASE = 'https://api.apollo.io';
		const headers: IDataObject = {
			'X-Api-Key': apiKey,
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
		};

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			let method: 'GET' | 'POST' | 'PATCH' | 'PUT' = 'GET';
			let url = '';
			let body: IDataObject = {};
			let qs: IDataObject = {};

			try {
				// ── PEOPLE ──────────────────────────────────────────────────
				if (resource === 'people') {
					if (operation === 'searchPeople') {
						method = 'POST';
						url = '/api/v1/mixed_people/search';
						const page = this.getNodeParameter('page', i, 1) as number;
						const perPage = this.getNodeParameter('perPage', i, 25) as number;
						const f = this.getNodeParameter('peopleFilters', i, {}) as IDataObject;
						body = { page, per_page: perPage };
						if (f.personTitles) {
							body.person_titles = (f.personTitles as string).split(',').map((t) => t.trim());
						}
						if ((f.personSeniorities as string[])?.length) {
							body.person_seniorities = f.personSeniorities;
						}
						if (f.qOrganizationDomains) {
							body.q_organization_domains = (f.qOrganizationDomains as string)
								.split(',')
								.map((d) => d.trim());
						}
						if (f.personLocations) {
							body.person_locations = (f.personLocations as string).split(',').map((l) => l.trim());
						}
						if (f.qKeywords) body.q_keywords = f.qKeywords;
						if (f.hasEmail) body.has_email = true;
						if (f.hasPhone) body.has_phone = true;
						const min = (f.employeesMin as number) || 0;
						const max = (f.employeesMax as number) || 0;
						if (min > 0 || max > 0) {
							body.organization_num_employees_ranges = [`${min || 1},${max || 1000000}`];
						}
					} else if (operation === 'searchOrganizations') {
						method = 'POST';
						url = '/api/v1/mixed_companies/search';
						body = {
							page: this.getNodeParameter('page', i, 1),
							per_page: this.getNodeParameter('perPage', i, 25),
						};
					} else if (operation === 'getOrgJobPostings') {
						method = 'GET';
						url = '/api/v1/organizations/job_postings';
						qs = { organization_id: this.getNodeParameter('orgId', i) as string };
					} else if (operation === 'getOrgInfo') {
						method = 'GET';
						url = `/api/v1/organizations/${this.getNodeParameter('orgId', i) as string}`;
					} else if (operation === 'searchNews') {
						method = 'POST';
						url = '/api/v1/news_articles/search';
						body = {};
					}

					// ── ENRICHMENT ───────────────────────────────────────────────
				} else if (resource === 'enrichment') {
					if (operation === 'enrichPerson') {
						method = 'POST';
						url = '/api/v1/people/match';
						const email = this.getNodeParameter('enrichEmail', i, '') as string;
						const opts = this.getNodeParameter('enrichPersonOptions', i, {}) as IDataObject;
						if (email) body.email = email;
						if (opts.firstName) body.first_name = opts.firstName;
						if (opts.lastName) body.last_name = opts.lastName;
						if (opts.domain) body.domain = opts.domain;
						if (opts.linkedinUrl) body.linkedin_url = opts.linkedinUrl;
						body.reveal_personal_emails = opts.revealPersonalEmails ?? false;
						body.reveal_phone_number = opts.revealPhoneNumber ?? false;
						body.run_waterfall_email = opts.runWaterfallEmail ?? false;
						body.run_waterfall_phone = opts.runWaterfallPhone ?? false;
					} else if (operation === 'bulkEnrichPeople') {
						method = 'POST';
						url = '/api/v1/people/bulk_match';
						body = {
							details: items.map((item) => item.json),
							reveal_personal_emails: false,
							reveal_phone_number: false,
						};
					} else if (operation === 'enrichOrganization') {
						method = 'GET';
						url = '/api/v1/organizations/enrich';
						qs = { domain: this.getNodeParameter('enrichOrgDomain', i) as string };
					} else if (operation === 'bulkEnrichOrganizations') {
						method = 'POST';
						url = '/api/v1/organizations/bulk_enrich';
						body = { domains: items.map((item) => ({ domain: item.json.domain })) };
					}

					// ── CONTACT ──────────────────────────────────────────────────
				} else if (resource === 'contact') {
					if (operation === 'createContact') {
						method = 'POST';
						url = '/api/v1/contacts';
						const extra = this.getNodeParameter('contactFields', i, {}) as IDataObject;
						body = {
							first_name: this.getNodeParameter('contactFirstName', i) as string,
							last_name: this.getNodeParameter('contactLastName', i) as string,
							...buildContactBody(extra),
						};
					} else if (operation === 'updateContact') {
						method = 'PATCH';
						url = `/api/v1/contacts/${this.getNodeParameter('contactId', i) as string}`;
						body = buildContactBody(this.getNodeParameter('contactFields', i, {}) as IDataObject);
					} else if (operation === 'viewContact') {
						method = 'GET';
						url = `/api/v1/contacts/${this.getNodeParameter('contactId', i) as string}`;
					} else if (operation === 'searchContacts') {
						method = 'POST';
						url = '/api/v1/contacts/search';
						body = { page: this.getNodeParameter('page', i, 1), per_page: 25 };
					} else if (operation === 'bulkCreateContacts') {
						method = 'POST';
						url = '/api/v1/contacts/bulk_create';
						body = { contacts: items.map((item) => item.json) };
					} else if (operation === 'bulkUpdateContacts') {
						method = 'POST';
						url = '/api/v1/contacts/bulk_update';
						body = { contacts: items.map((item) => item.json) };
					} else if (operation === 'updateContactStage') {
						method = 'POST';
						url = '/api/v1/contacts/update_stages';
						body = { contact_ids: [], contact_stage_id: '' };
					} else if (operation === 'updateContactOwner') {
						method = 'POST';
						url = '/api/v1/contacts/update_owners';
						body = { contact_ids: [], owner_id: '' };
					} else if (operation === 'listContactStages') {
						method = 'GET';
						url = '/api/v1/contact_stages';
					}

					// ── ACCOUNT ──────────────────────────────────────────────────
				} else if (resource === 'account') {
					if (operation === 'createAccount') {
						method = 'POST';
						url = '/api/v1/accounts';
						const extra = this.getNodeParameter('accountFields', i, {}) as IDataObject;
						body = {
							name: this.getNodeParameter('accountName', i) as string,
							...buildAccountBody(extra),
						};
					} else if (operation === 'updateAccount') {
						method = 'PATCH';
						url = `/api/v1/accounts/${this.getNodeParameter('accountId', i) as string}`;
						body = buildAccountBody(this.getNodeParameter('accountFields', i, {}) as IDataObject);
					} else if (operation === 'viewAccount') {
						method = 'GET';
						url = `/api/v1/accounts/${this.getNodeParameter('accountId', i) as string}`;
					} else if (operation === 'searchAccounts') {
						method = 'POST';
						url = '/api/v1/accounts/search';
						body = { page: this.getNodeParameter('page', i, 1), per_page: 25 };
					} else if (operation === 'bulkCreateAccounts') {
						method = 'POST';
						url = '/api/v1/accounts/bulk_create';
						body = { accounts: items.map((item) => item.json) };
					} else if (operation === 'bulkUpdateAccounts') {
						method = 'POST';
						url = '/api/v1/accounts/bulk_update';
						body = { accounts: items.map((item) => item.json) };
					} else if (operation === 'updateAccountStage') {
						method = 'POST';
						url = '/api/v1/accounts/update_stages';
						body = { account_ids: [], account_stage_id: '' };
					} else if (operation === 'updateAccountOwner') {
						method = 'POST';
						url = '/api/v1/accounts/update_owners';
						body = { account_ids: [], owner_id: '' };
					} else if (operation === 'listAccountStages') {
						method = 'GET';
						url = '/api/v1/account_stages';
					}

					// ── DEAL ─────────────────────────────────────────────────────
				} else if (resource === 'deal') {
					if (operation === 'createDeal') {
						method = 'POST';
						url = '/api/v1/opportunities';
						const extra = this.getNodeParameter('dealFields', i, {}) as IDataObject;
						body = { name: this.getNodeParameter('dealName', i) as string, ...extra };
					} else if (operation === 'updateDeal') {
						method = 'PATCH';
						url = `/api/v1/opportunities/${this.getNodeParameter('dealId', i) as string}`;
						body = this.getNodeParameter('dealFields', i, {}) as IDataObject;
					} else if (operation === 'viewDeal') {
						method = 'GET';
						url = `/api/v1/opportunities/${this.getNodeParameter('dealId', i) as string}`;
					} else if (operation === 'listDeals') {
						method = 'GET';
						url = '/api/v1/opportunities';
						qs = { page: this.getNodeParameter('page', i, 1) };
					} else if (operation === 'listDealStages') {
						method = 'GET';
						url = '/api/v1/deal_stages';
					}

					// ── SEQUENCE ─────────────────────────────────────────────────
				} else if (resource === 'sequence') {
					if (operation === 'searchSequences') {
						method = 'POST';
						url = '/api/v1/emailer_campaigns/search';
						body = {};
					} else if (operation === 'addContactsToSequence') {
						method = 'POST';
						url = '/api/v1/emailer_campaigns/add_contact_ids';
						const rawIds = this.getNodeParameter('sequenceContactIds', i) as string;
						const contactIds = rawIds
							.split(',')
							.map((id) => id.trim())
							.filter(Boolean);
						const emailAccId = this.getNodeParameter('emailAccountId', i, '') as string;
						body = {
							emailer_campaign_id: this.getNodeParameter('sequenceId', i) as string,
							contact_ids: contactIds,
						};
						if (emailAccId) body.send_email_from_email_account_id = emailAccId;
					} else if (operation === 'updateContactStatusInSequence') {
						method = 'POST';
						url = '/api/v1/emailer_campaigns/update_contact_status';
						body = {
							emailer_campaign_id: this.getNodeParameter('sequenceId', i) as string,
							contact_id: this.getNodeParameter('seqContactId', i) as string,
							status: this.getNodeParameter('contactSequenceStatus', i) as string,
						};
					} else if (operation === 'searchOutreachEmails') {
						method = 'GET';
						url = '/api/v1/emailer_messages/search';
					} else if (operation === 'checkEmailStats') {
						method = 'GET';
						url = '/api/v1/emailer_messages/email_stats';
					}

					// ── TASK ─────────────────────────────────────────────────────
				} else if (resource === 'task') {
					if (operation === 'createTask') {
						method = 'POST';
						url = '/api/v1/tasks';
						const rawIds = this.getNodeParameter('taskContactIds', i, '') as string;
						const contactIds = rawIds
							.split(',')
							.map((id) => id.trim())
							.filter(Boolean);
						body = {
							type: this.getNodeParameter('taskType', i) as string,
							priority: this.getNodeParameter('taskPriority', i) as string,
							due_at: this.getNodeParameter('taskDueAt', i, '') as string,
							contact_ids: contactIds,
						};
					} else if (operation === 'searchTasks') {
						method = 'POST';
						url = '/api/v1/tasks/search';
						body = {};
					}

					// ── CALL ─────────────────────────────────────────────────────
				} else if (resource === 'call') {
					if (operation === 'createCallRecords') {
						method = 'POST';
						url = '/api/v1/calls';
						body = {
							contact_id: this.getNodeParameter('callContactId', i) as string,
							direction: this.getNodeParameter('callDirection', i) as string,
							disposition: this.getNodeParameter('callDisposition', i) as string,
							duration_in_seconds: this.getNodeParameter('callDuration', i, 0) as number,
							note: this.getNodeParameter('callNote', i, '') as string,
						};
					} else if (operation === 'searchCalls') {
						method = 'GET';
						url = '/api/v1/calls';
					} else if (operation === 'updateCallRecords') {
						method = 'PUT';
						url = '/api/v1/calls';
						body = {};
					}

					// ── MISCELLANEOUS ─────────────────────────────────────────────
				} else if (resource === 'misc') {
					if (operation === 'getApiUsage') {
						method = 'POST';
						url = '/api/v1/rate_limits';
						body = {};
					} else if (operation === 'listUsers') {
						method = 'GET';
						url = '/api/v1/users/search';
					} else if (operation === 'listEmailAccounts') {
						method = 'GET';
						url = '/api/v1/email_accounts';
					} else if (operation === 'listAllLists') {
						method = 'GET';
						url = '/api/v1/labels';
					} else if (operation === 'listCustomFields') {
						method = 'GET';
						url = '/api/v1/typed_custom_fields';
					} else if (operation === 'createCustomField') {
						method = 'POST';
						url = '/api/v1/typed_custom_fields';
						body = {
							name: this.getNodeParameter('customFieldName', i) as string,
							type: this.getNodeParameter('customFieldType', i) as string,
							modality: this.getNodeParameter('customFieldEntity', i) as string,
						};
					}
				}

				// ── HTTP REQUEST ──────────────────────────────────────────────
				const options: {
					method: typeof method;
					url: string;
					baseURL: string;
					headers: IDataObject;
					body?: IDataObject;
					qs?: IDataObject;
					json?: boolean;
				} = { method, url, baseURL: BASE, headers, json: true };

				if (Object.keys(body).length) options.body = body;
				if (Object.keys(qs).length) options.qs = qs;

				const response = await this.helpers.httpRequest(options);

				returnData.push({
					json: response as IDataObject,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as { message: string });
			}
		}

		return [returnData];
	}
}

// ─── Field helpers ────────────────────────────────────────────────────────────

function buildContactBody(f: IDataObject): IDataObject {
	const b: IDataObject = {};
	if (f.email) b.email = f.email;
	if (f.title) b.title = f.title;
	if (f.organizationName) b.organization_name = f.organizationName;
	if (f.websiteUrl) b.website_url = f.websiteUrl;
	if (f.linkedinUrl) b.linkedin_url = f.linkedinUrl;
	if (f.directPhone) b.direct_phone = f.directPhone;
	if (f.labelNames) {
		b.label_names = (f.labelNames as string).split(',').map((l) => l.trim());
	}
	const addr = [f.city, f.state, f.country].filter(Boolean).join(', ');
	if (addr) b.present_raw_address = addr;
	return b;
}

function buildAccountBody(f: IDataObject): IDataObject {
	const b: IDataObject = {};
	if (f.domain) b.domain = f.domain;
	if (f.phoneNumber) b.phone_number = f.phoneNumber;
	if (f.linkedinUrl) b.linkedin_url = f.linkedinUrl;
	if (f.websiteUrl) b.website_url = f.websiteUrl;
	if (f.employeesCount) b.estimated_num_employees = f.employeesCount;
	if (f.annualRevenue) b.annual_revenue = f.annualRevenue;
	if (f.industry) b.industry = f.industry;
	if (f.description) b.description = f.description;
	return b;
}
