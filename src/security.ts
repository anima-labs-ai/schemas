import { z } from "zod";

export const SecurityPolicySchema = z.object({
	scanLevel: z.enum(["off", "basic", "strict"]).default("basic"),
	injectionScanEnabled: z.boolean().default(true),
	autoApproveBelow: z.enum(["medium", "high", "none"]).default("medium"),
	allowedDomains: z.array(z.string()).default([]),
	blockedPatterns: z.array(z.string()).default([]),
	rateLimitOverrides: z
		.object({
			emailsPerHour: z.number().int().positive().optional(),
			smsPerHour: z.number().int().positive().optional(),
		})
		.optional(),
});

export const ApprovalActionInput = z.object({
	orgId: z.string(),
	messageId: z.string(),
	action: z.enum(["approve", "reject"]),
	reason: z.string().optional(),
});

export const ApprovalActionOutput = z.object({
	messageId: z.string(),
	status: z.enum(["SENT", "REJECTED", "FAILED"]),
	message: z.string(),
});

export const SecurityEventListInput = z.object({
	orgId: z.string(),
	agentId: z.string().optional(),
	type: z
		.enum([
			"PII_DETECTED",
			"INJECTION_DETECTED",
			"RATE_LIMITED",
			"BLOCKED",
			"APPROVED",
			"REJECTED",
		])
		.optional(),
	severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
	cursor: z.string().optional(),
	limit: z.number().int().min(1).max(100).default(20),
});

export const SecurityEventOutput = z.object({
	id: z.string(),
	orgId: z.string(),
	agentId: z.string().nullable(),
	messageId: z.string().nullable(),
	type: z.string(),
	severity: z.string(),
	details: z.record(z.string(), z.unknown()),
	resolved: z.boolean(),
	resolvedBy: z.string().nullable(),
	resolvedAt: z.date().nullable(),
	createdAt: z.date(),
});

export const SecurityEventListOutput = z.object({
	items: z.array(SecurityEventOutput),
	pagination: z.object({
		nextCursor: z.string().nullable(),
		hasMore: z.boolean(),
	}),
});

export const UpdateSecurityPolicyInput = z.object({
	orgId: z.string(),
	agentId: z.string(),
	policy: SecurityPolicySchema,
});

export const UpdateSecurityPolicyOutput = z.object({
	agentId: z.string(),
	policy: SecurityPolicySchema,
});
