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
	stripeAccountId: z.string().nullable(),
	businessType: z.enum(["individual", "company"]).nullable(),
	kybStatus: z.enum(["not_started", "pending", "action_required", "in_review", "approved", "rejected"]),
	kybStatusReason: z.string().nullable(),
	kybSubmittedAt: z.string().datetime().nullable(),
	kybApprovedAt: z.string().datetime().nullable(),
	cardIssuingEnabled: z.boolean(),
	settings: z.record(z.string(), z.unknown()),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const StartOnboardingInput = z.object({
	id: z.string(),
	businessType: z.enum(["individual", "company"]),
	refreshUrl: z.string().url(),
	returnUrl: z.string().url(),
});

export const StartOnboardingOutput = z.object({
	url: z.string().url(),
	expiresAt: z.number(),
	stripeAccountId: z.string(),
});

export const OnboardingStatusOutput = z.object({
	kybStatus: z.enum(["not_started", "pending", "action_required", "in_review", "approved", "rejected"]),
	kybStatusReason: z.string().nullable(),
	cardIssuingEnabled: z.boolean(),
	businessType: z.enum(["individual", "company"]).nullable().optional(),
	stripeAccountId: z.string().nullable().optional(),
	kybSubmittedAt: z.string().datetime().nullable().optional(),
	kybApprovedAt: z.string().datetime().nullable().optional(),
	requirements: z
		.object({
			currentlyDue: z.array(z.string()),
			pastDue: z.array(z.string()),
			errors: z.array(
				z.object({
					requirement: z.string(),
					code: z.string(),
					reason: z.string(),
				}),
			),
		})
		.optional(),
});

export const OrgListInput = PaginationInput.extend({
	query: z.string().min(1).max(120).optional(),
});

export const OrgListOutput = z.object({
	items: z.array(OrgOutput),
	pagination: CursorPagination,
});
