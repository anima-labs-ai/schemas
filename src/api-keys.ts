import { z } from "zod";
import { CursorPagination, PaginationInput } from "./common";

export const KeyModeSchema = z.enum(["LIVE", "TEST"]);

export const CreateApiKeyInput = z.object({
	name: z.string().min(1).max(100).optional(),
	mode: KeyModeSchema.default("LIVE"),
	agentId: z.string().cuid().optional(),
	scopes: z.array(z.string()).default([]),
	expiresAt: z.string().datetime().optional(),
});

export const ApiKeyOutput = z.object({
	id: z.string().cuid(),
	orgId: z.string().cuid(),
	agentId: z.string().cuid().nullable(),
	name: z.string().nullable(),
	prefix: z.string(),
	mode: KeyModeSchema,
	scopes: z.array(z.string()),
	revoked: z.boolean(),
	createdAt: z.string().datetime(),
	lastUsedAt: z.string().datetime().nullable(),
	expiresAt: z.string().datetime().nullable(),
	createdBy: z.string().nullable(),
});

export const ApiKeyWithSecretOutput = ApiKeyOutput.extend({
	key: z.string(),
});

export const ListApiKeysInput = PaginationInput.extend({
	mode: KeyModeSchema.optional(),
	agentId: z.string().cuid().optional(),
	includeRevoked: z.boolean().default(false),
});

export const ApiKeyListOutput = z.object({
	items: z.array(ApiKeyOutput),
	pagination: CursorPagination,
});

export const RevokeApiKeyInput = z.object({
	id: z.string().cuid(),
});

export const RotateApiKeyInput = z.object({
	id: z.string().cuid(),
});

export const schemas = {
	KeyModeSchema,
	CreateApiKeyInput,
	ApiKeyOutput,
	ApiKeyWithSecretOutput,
	ListApiKeysInput,
	ApiKeyListOutput,
	RevokeApiKeyInput,
	RotateApiKeyInput,
};
