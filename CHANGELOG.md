# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-03-15

### Added

- **People (Prospecting)** resource with 5 operations:
  - Search People - filter by title, seniority, location, company size, keywords
  - Search Organizations
  - Get Organization Job Postings
  - Get Complete Organization Info
  - Search News Articles
- **Enrichment** resource with 4 operations:
  - Enrich a Person (single, with waterfall support)
  - Bulk Enrich People (up to 10 per call)
  - Enrich an Organization (single)
  - Bulk Enrich Organizations (up to 10 per call)
- **Contact** resource with 9 operations:
  - Create, Update, View, Search
  - Bulk Create, Bulk Update
  - Update Stage, Update Owner, List Stages
- **Account** resource with 9 operations:
  - Create, Update, View, Search
  - Bulk Create, Bulk Update
  - Update Stage, Update Owner, List Stages
- **Deal** resource with 5 operations:
  - Create, Update, View, List All, List Stages
- **Sequence** resource with 5 operations:
  - Search Sequences
  - Add Contacts to a Sequence
  - Update Contact Status in Sequence
  - Search Outreach Emails
  - Check Email Stats
- **Task** resource with 2 operations:
  - Create a Task (call, email, LinkedIn, action item)
  - Search for Tasks
- **Call** resource with 3 operations:
  - Create Call Records
  - Search for Calls
  - Update Call Records
- **Miscellaneous** resource with 6 operations:
  - Get API Usage Stats
  - List Users
  - List Email Accounts
  - List All Lists
  - List Custom Fields
  - Create a Custom Field
- API key credential with built-in health check test
- GitHub Actions workflow for automated npm publishing on version tag

[Unreleased]: https://github.com/monfortbrian/n8n-nodes-apollo-crm/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/monfortbrian/n8n-nodes-apollo-crm/releases/tag/v1.0.0
