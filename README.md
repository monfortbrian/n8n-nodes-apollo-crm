# n8n-nodes-apollo

[![npm version](https://badge.fury.io/js/n8n-nodes-apollo.svg)](https://www.npmjs.com/package/n8n-nodes-apollo)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-apollo.svg)](https://www.npmjs.com/package/n8n-nodes-apollo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

Community node for n8n providing full **Apollo.io** integration - sales intelligence, prospect search, data enrichment, CRM, outreach sequences, deals, tasks, and call logging.

Apollo.io is trusted by 500,000+ companies including Autodesk and DocuSign. It provides a database of 265M+ contacts and 60M+ companies with AI-powered prospecting and engagement tools.

---

## Resources & Operations

### Account Actions

| Operation            | Description                                     |
| -------------------- | ----------------------------------------------- |
| Bulk Create Accounts | Create multiple company accounts in one request |
| Bulk Update Accounts | Update multiple company accounts in one request |
| Create an Account    | Add a company to your Apollo CRM                |
| List Account Stages  | Retrieve all available account stages           |
| Search for Accounts  | Search company accounts in your CRM             |
| Update an Account    | Update an existing company account              |
| Update Account Owner | Reassign accounts to a new owner                |
| Update Account Stage | Move accounts between pipeline stages           |
| View an Account      | Retrieve a single account by ID                 |

### Call Actions

| Operation           | Description                                          |
| ------------------- | ---------------------------------------------------- |
| Create Call Records | Log calls against contacts with outcome and duration |
| Search for Calls    | Search and filter call records                       |
| Update Call Records | Update existing call log details                     |

### Contact Actions

| Operation            | Description                              |
| -------------------- | ---------------------------------------- |
| Bulk Create Contacts | Create multiple contacts in one request  |
| Bulk Update Contacts | Update multiple contacts in one request  |
| Create a Contact     | Add a new contact to your Apollo account |
| List Contact Stages  | Retrieve all available contact stages    |
| Search for Contacts  | Search contacts in your account          |
| Update a Contact     | Update an existing contact record        |
| Update Contact Owner | Reassign contacts to a new owner         |
| Update Contact Stage | Move contacts between pipeline stages    |
| View a Contact       | Retrieve a single contact by ID          |

### Deal Actions

| Operation        | Description                        |
| ---------------- | ---------------------------------- |
| Create a Deal    | Create a new deal                  |
| List All Deals   | Retrieve all deals in your account |
| List Deal Stages | Retrieve all available deal stages |
| Update a Deal    | Update an existing deal record     |
| View a Deal      | Retrieve a single deal by ID       |

### Enrichment Actions

| Operation                 | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| Bulk Enrich Organizations | Enrich up to 10 companies in a single call                  |
| Bulk Enrich People        | Enrich up to 10 people in a single call                     |
| Enrich an Organization    | Enrich a single company using its domain                    |
| Enrich a Person           | Enrich a person using email, name + domain, or LinkedIn URL |

> **Note on credits:** Enrichment operations consume credits from your Apollo plan.
> Revealing personal emails, phone numbers, and waterfall enrichment each consume additional credits.
> Prospecting search (People / Organization search) does **not** consume credits.

### Miscellaneous Actions

| Operation             | Description                                        |
| --------------------- | -------------------------------------------------- |
| Create a Custom Field | Create a new custom field for contacts or accounts |
| Get API Usage Stats   | View API usage and rate limit information          |
| List All Lists        | Retrieve all contact lists in your account         |
| List Custom Fields    | Retrieve all custom field definitions              |
| List Email Accounts   | Retrieve all connected email accounts              |
| List Users            | Retrieve all users in your Apollo team             |

### People (Prospecting) Actions

| Operation                      | Description                                                                 |
| ------------------------------ | --------------------------------------------------------------------------- |
| Get Complete Organization Info | Full company profile: funding, headcount, tech stack                        |
| Get Organization Job Postings  | Retrieve active job postings for a company                                  |
| Search News Articles           | Search news about people or companies                                       |
| Search Organizations           | Search Apollo's database for companies                                      |
| Search People                  | Search 265M+ contacts by title, location, seniority, company size, and more |

### Sequence Actions

| Operation                         | Description                                    |
| --------------------------------- | ---------------------------------------------- |
| Add Contacts to a Sequence        | Enroll contacts into an outreach sequence      |
| Check Email Stats                 | Get open, click, and reply statistics          |
| Search for Sequences              | List sequences in your account                 |
| Search Outreach Emails            | Search emails sent via sequences               |
| Update Contact Status in Sequence | Pause, resume, or stop a contact in a sequence |

### Task Actions

| Operation        | Description                                    |
| ---------------- | ---------------------------------------------- |
| Create a Task    | Create a call, email, LinkedIn, or action task |
| Search for Tasks | Search and filter tasks                        |

---

## Installation

### Via n8n Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings → Community Nodes**
3. Click **Install a community node**
4. Enter: `n8n-nodes-apollo`
5. Click **Install**

### Via npm

```bash
npm install n8n-nodes-apollo
```

### Via verified node

```
coming soon
```

---

## Credentials Setup

1. Log in to [Apollo.io](https://www.apollo.io)
2. Go to **Settings → Integrations → API → Connect**
3. Create a **Master API Key**
   - Master key is required for sequences, enrichment, and writing data
   - Standard key works for read-only operations
4. In n8n, go to **Credentials → New → Apollo API**
5. Paste your API key and click **Test & Save**

---

## Quick Start

### Search for Prospects

```
Add Node → Apollo
├─ Resource: People (Prospecting)
├─ Operation: Search People
└─ Filters:
   ├─ Job Titles: VP of Sales, Head of Sales
   ├─ Seniority: VP, Director
   └─ Company Domains: apollo.io, salesforce.com
```

### Enrich a Contact from Email

```
Add Node → Apollo
├─ Resource: Enrichment
├─ Operation: Enrich a Person
├─ Email: contact@company.com
└─ Additional Options:
   └─ Reveal Phone Numbers: true
```

### Add Prospect to Outreach Sequence

```
Add Node → Apollo  (step 1: get sequences)
├─ Resource: Sequence
└─ Operation: Search for Sequences

Add Node → Apollo  (step 2: enroll contact)
├─ Resource: Sequence
├─ Operation: Add Contacts to a Sequence
├─ Sequence ID: {{$json.id}}
└─ Contact IDs: contact_id_1, contact_id_2
```

---

## Example Workflows

### Lead Enrichment Pipeline

```
Webhook (new form submission)
→ Apollo: Enrich a Person (by email)
→ Apollo: Create a Contact
→ Apollo: Add Contacts to a Sequence
→ Slack: Notify sales team
```

### Prospect Research

```
Apollo: Search People
  (VP Sales + SaaS + 50–500 employees)
→ Apollo: Enrich a Person (get phone)
→ Google Sheets: Append to prospect list
→ Apollo: Create a Task (call)
```

### CRM Sync

```
HubSpot Trigger: New contact created
→ Apollo: Create a Contact
→ Apollo: Search for Accounts (by domain)
→ Apollo: Create an Account (if not found)
→ Apollo: Create a Deal
```

---

## API Reference

### Authentication

Apollo uses API key authentication via the `X-Api-Key` request header.

**API key types:**

- **Master API Key** - full access to all endpoints including write operations, sequences, enrichment
- **Standard API Key** - limited to read operations; some endpoints require master key

### Rate Limits

Rate limits vary by Apollo pricing plan. Use **Miscellaneous → Get API Usage Stats** to check your current limits and usage.

### Credit Consumption

The following operations consume Apollo credits:

- Enrich a Person / Bulk Enrich People
- Enrich an Organization / Bulk Enrich Organizations
- Reveal personal emails (`revealPersonalEmails: true`)
- Reveal phone numbers (`revealPhoneNumber: true`)
- Waterfall enrichment (`runWaterfallEmail`, `runWaterfallPhone`)

People Search and Organization Search do **not** consume credits.

---

## Compatibility

| Component | Version                          |
| --------- | -------------------------------- |
| n8n       | 0.187.0 or higher                |
| Node.js   | 18.0.0 or higher                 |
| Apollo.io | Any plan (features vary by plan) |

---

## Troubleshooting

### Node doesn't appear in n8n

```bash
# Verify installation
npm list -g n8n-nodes-apollo

# Clear n8n cache and restart
rm -rf ~/.n8n/cache
n8n start
```

### Authentication fails (403)

- Verify your API key is correct in Apollo → Settings → Integrations → API
- For sequence and enrichment operations, ensure you are using a **Master API Key**
- Check that your Apollo plan includes API access

### Enrichment returns empty results

- Provide more identifying information (email + domain + name)
- Email alone is the most reliable identifier
- Check that the person exists in Apollo's database

### Sequence enrollment fails

- Only existing contacts can be added to sequences - create the contact first
- Verify the sequence ID is correct using Search for Sequences
- Ensure your API key is a Master API Key

---

### Publishing

Releases are automated via GitHub Actions. When you push a version tag, the workflow builds and publishes to npm automatically.

```bash
npm run release    # interactive: bumps version, updates changelog, tags, pushes
```

---

## Contributing

Contributions welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and write tests if applicable
4. Run `npm run lint` and ensure it passes
5. Commit: `git commit -m 'feat: add my feature'`
6. Push: `git push origin feature/my-feature`
7. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## License

[MIT](LICENSE.md) - Copyright © 2026 Monfort Brian N.

---

## Support

- **Issues:** [GitHub Issues](https://github.com/monfortbrian/n8n-nodes-apollo/issues)
- **Discussions:** [GitHub Discussions](https://github.com/monfortbrian/n8n-nodes-apollo/discussions)
- **n8n Community:** [community.n8n.io](https://community.n8n.io)

---

_Built by [Monfort Brian N.](https://github.com/monfortbrian) - creator of n8n nodes for OpenMRS, DHIS2, RapidPro, Africa's Talking,...._
