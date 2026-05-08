import { z } from "zod";

import { CursorPagination, PaginationInput } from "./common";

export const TierSchema = z.enum(["FREE", "DEVELOPER", "GROWTH", "SCALE", "ENTERPRISE"]);

export const CreateOrgInput = z.object({
	name: z.string().min(2).max(120),
	slug: z
		.string()
		.min(2)
		.max(64)
		.regex(/^[a-z0-9-]+$/),
	clerkOrgId: z.string().min(1).max(128).optional(),
	tier: TierSchema.default("FREE"),
	settings: z.record(z.string(), z.unknown()).default({}),
});

export const UpdateOrgInput = z.object({
	id: z.string().cuid(),
	name: z.string().min(2).max(120).optional(),
	slug: z
		.string()
		.min(2)
		.max(64)
		.regex(/^[a-z0-9-]+$/)
		.optional(),
	clerkOrgId: z.string().min(1).max(128).nullable().optional(),
	tier: TierSchema.optional(),
	settings: z.record(z.string(), z.unknown()).optional(),
});

export const OrgOutput = z.object({
	id: z.string().cuid(),
	name: z.string(),
	slug: z.string(),
	clerkOrgId: z.string().nullable(),
	tier: TierSchema,
	masterKey: z.string(),
	settings: z.record(z.string(), z.unknown()),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const OrgListInput = PaginationInput.extend({
	query: z.string().min(1).max(120).optional(),
});

export const OrgListOutput = z.object({
	items: z.array(OrgOutput),
	pagination: CursorPagination,
});
