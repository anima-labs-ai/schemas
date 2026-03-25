import { z } from "zod";

import { CursorPagination, PaginationInput } from "./common";

export const AgentStatusSchema = z.enum(["ACTIVE", "SUSPENDED", "DELETED"]);
export const PhoneProviderSchema = z.enum(["TELNYX", "TWILIO"]);
export const TenDlcStatusSchema = z.enum(["PENDING", "REGISTERED", "REJECTED", "NOT_REQUIRED"]);

export const CreateAgentInput = z.object({
	orgId: z.string().cuid(),
	name: z.string().min(2).max(100),
	slug: z
		.string()
		.min(2)
		.max(64)
		.regex(/^[a-z0-9-]+$/),
	email: z.string().email().optional(),
	provisionPhone: z.boolean().default(false).optional(),
	metadata: z.record(z.string(), z.unknown()).default({}),
});

export const UpdateAgentInput = z.object({
	id: z.string().cuid(),
	name: z.string().min(2).max(100).optional(),
	slug: z
		.string()
		.min(2)
		.max(64)
		.regex(/^[a-z0-9-]+$/)
		.optional(),
	status: AgentStatusSchema.optional(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

export const EmailIdentityOutput = z.object({
	id: z.string().cuid(),
	email: z.string().email(),
	domain: z.string(),
	localPart: z.string(),
	isPrimary: z.boolean(),
	verified: z.boolean(),
	createdAt: z.string().datetime(),
});

export const PhoneIdentityOutput = z.object({
	id: z.string().cuid(),
	phoneNumber: z.string(),
	provider: PhoneProviderSchema,
	providerId: z.string().nullable(),
	capabilities: z.object({
		sms: z.boolean().default(false),
		mms: z.boolean().default(false),
		voice: z.boolean().default(false),
	}),
	tenDlcStatus: TenDlcStatusSchema,
	isPrimary: z.boolean(),
	createdAt: z.string().datetime(),
});

export const AgentOutput = z.object({
	id: z.string().cuid(),
	orgId: z.string().cuid(),
	name: z.string(),
	slug: z.string(),
	status: AgentStatusSchema,
	apiKeyPrefix: z.string().nullable(),
	metadata: z.record(z.string(), z.unknown()),
	emailIdentities: z.array(EmailIdentityOutput),
	phoneIdentities: z.array(PhoneIdentityOutput),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const AgentListInput = PaginationInput.extend({
	orgId: z.string().cuid().optional(),
	status: AgentStatusSchema.optional(),
	query: z.string().min(1).max(120).optional(),
});

export const AgentListOutput = z.object({
	items: z.array(AgentOutput),
	pagination: CursorPagination,
});
