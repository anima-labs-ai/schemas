# @anima-labs/schemas

Shared [Zod](https://zod.dev) schemas for the Anima platform.

## Installation

```bash
npm install @anima-labs/schemas
# or
bun add @anima-labs/schemas
```

## Usage

```typescript
import { AgentSchema, InboxSchema, EmailSchema } from "@anima-labs/schemas";

// Validate agent data
const agent = AgentSchema.parse(data);

// Use in API contracts
const inbox = InboxSchema.parse(response);
```

## Included Schemas

| Module | Description |
|--------|-------------|
| `agent` | Agent identity and configuration |
| `api-keys` | API key types and validation |
| `billing` | Plans, usage, invoices |
| `common` | Pagination, date ranges, sort |
| `email` | Email message structures |
| `feedback` | User feedback schemas |
| `inbox` | Inbox and folder structures |
| `invoice` | Invoice line items |
| `message` | Unified messaging schemas |
| `openclaw` | OpenClaw contract schemas |
| `organization` | Organization structures |
| `phone` | Phone number and SMS schemas |
| `security` | Security policies and events |
| `vault` | Credential vault schemas |
| `webhook` | Webhook configuration |

## License

MIT
