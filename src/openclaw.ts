import { z } from "zod";

import { CursorPagination, PaginationInput } from "./common";

export const OpenClawAuthorizeInput = z.object({
	state: z.string().min(1).max(256).optional(),
});

export const OpenClawAuthorizeOutput = z.object({
	enabled: z.boolean(),
	redirectUrl: z.string().url().nullable(),
	state: z.string().nullable(),
});

export const OpenClawCallbackInput = z.object({
	code: z.string().min(1).optional(),
	state: z.string().min(1).optional(),
	error: z.string().min(1).optional(),
});

export const OpenClawProfileOutput = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string(),
	handle: z.string().optional(),
	avatarUrl: z.string().url().optional(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

export const OpenClawTokensOutput = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
	expiresAt: z.string().datetime(),
});

export const OpenClawCallbackOutput = z.object({
	enabled: z.boolean(),
	state: z.string().nullable(),
	agent: OpenClawProfileOutput.nullable(),
	tokens: OpenClawTokensOutput.nullable(),
});

export const OpenClawSelfSignupInput = z.object({
	openclawAgentId: z.string().min(1),
	organizationName: z.string().min(2).max(120),
	organizationSlug: z
		.string()
		.min(2)
		.max(64)
		.regex(/^[a-z0-9-]+$/),
	agentName: z.string().min(2).max(100),
	agentSlug: z
		.string()
		.min(2)
		.max(64)
		.regex(/^[a-z0-9-]+$/),
	email: z.string().email(),
	phoneNumber: z.string().min(7).max(20),
	phoneProvider: z.enum(["TELNYX", "TWILIO"]).default("TELNYX").optional(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

export const OpenClawSelfSignupOutput = z.object({
	organization: z.object({
		id: z.string().cuid(),
		name: z.string(),
		slug: z.string(),
		tier: z.enum(["FREE", "DEVELOPER", "GROWTH", "SCALE", "ENTERPRISE"]),
		createdAt: z.string().datetime(),
	}),
	agent: z.object({
		id: z.string().cuid(),
		orgId: z.string().cuid(),
		name: z.string(),
		slug: z.string(),
		email: z.string().email(),
		phoneNumber: z.string(),
		apiKeyPrefix: z.string(),
		createdAt: z.string().datetime(),
	}),
	credentials: z.object({
		apiKey: z.string(),
		apiKeyPrefix: z.string(),
	}),
});

export const OpenClawListRegisteredInput = PaginationInput.extend({
	query: z.string().min(1).max(120).optional(),
});

export const OpenClawRegisteredAgentOutput = z.object({
	id: z.string().cuid(),
	orgId: z.string().cuid(),
	openclawAgentId: z.string(),
	name: z.string(),
	slug: z.string(),
	email: z.string().email(),
	phoneNumber: z.string().nullable(),
	createdAt: z.string().datetime(),
});

export const OpenClawListRegisteredOutput = z.object({
	items: z.array(OpenClawRegisteredAgentOutput),
	pagination: CursorPagination,
});
