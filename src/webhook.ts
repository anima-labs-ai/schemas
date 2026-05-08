import { z } from "zod";

import { CursorPagination, PaginationInput } from "./common";

export const WebhookEventSchema = z.enum([
	"message.received",
	"message.sent",
	"message.failed",
	"message.bounced",
	"agent.created",
	"agent.updated",
	"agent.deleted",
	"phone.provisioned",
	"phone.released",
]);

export const CreateWebhookInput = z.object({
	url: z.string().url(),
	events: z.array(WebhookEventSchema),
	description: z.string().optional(),
	active: z.boolean().default(true).optional(),
});

export const UpdateWebhookInput = z.object({
	id: z.string().cuid2(),
	url: z.string().url().optional(),
	events: z.array(WebhookEventSchema).optional(),
	description: z.string().optional(),
	active: z.boolean().optional(),
});

export const WebhookOutput = z.object({
	id: z.string().cuid2(),
	orgId: z.string().cuid2(),
	url: z.string().url(),
	events: z.array(WebhookEventSchema),
	active: z.boolean(),
	description: z.string().nullable(),
	consecutiveFailures: z.number().int().nonnegative(),
	disabledReason: z.string().nullable(),
	disabledAt: z.string().datetime().nullable(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const WebhookListInput = PaginationInput.extend({});

export const WebhookListOutput = z.object({
	items: z.array(WebhookOutput),
	pagination: CursorPagination,
});

export const TestWebhookInput = z.object({
	id: z.string().cuid2(),
	event: WebhookEventSchema.default("message.received").optional(),
});

export const WebhookDeliveryOutput = z.object({
	id: z.string().cuid2(),
	webhookId: z.string().cuid2(),
	messageId: z.string().cuid2().nullable(),
	event: WebhookEventSchema,
	payload: z.record(z.string(), z.unknown()),
	statusCode: z.number().int().nullable(),
	responseBody: z.string().nullable(),
	attempts: z.number().int().nonnegative(),
	maxAttempts: z.number().int().positive(),
	nextAttemptAt: z.string().datetime().nullable(),
	completedAt: z.string().datetime().nullable(),
	createdAt: z.string().datetime(),
});

export const WebhookDeliveryListInput = PaginationInput.extend({
	webhookId: z.string().cuid2(),
});

export const WebhookDeliveryListOutput = z.object({
	items: z.array(WebhookDeliveryOutput),
	pagination: CursorPagination,
});

export const ReenableWebhookInput = z.object({
	id: z.string().cuid2(),
});

export const WebhookStatsInput = z.object({
	id: z.string().cuid2(),
});

export const WebhookStatsOutput = z.object({
	totalDeliveries: z.number().int().nonnegative(),
	succeeded: z.number().int().nonnegative(),
	failed: z.number().int().nonnegative(),
	pending: z.number().int().nonnegative(),
	successRate: z.number().min(0).max(100),
});
