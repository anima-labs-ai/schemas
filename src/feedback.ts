import { z } from "zod";

export const FeedbackInput = z.object({
	type: z.enum(["bug", "feature", "general"]),
	message: z.string().min(1).max(5_000),
	email: z.string().email().optional(),
	metadata: z.record(z.string(), z.string()).optional(),
});

export const FeedbackOutput = z.object({
	id: z.string(),
	createdAt: z.string().datetime(),
});

export const FeedbackListInput = z.object({
	cursor: z.string().optional(),
	limit: z.number().int().min(1).max(100).default(20),
});

export const FeedbackEntryOutput = FeedbackInput.extend({
	id: z.string(),
	createdAt: z.string().datetime(),
});

export const FeedbackListOutput = z.object({
	items: z.array(FeedbackEntryOutput),
	pagination: z.object({
		nextCursor: z.string().nullable(),
		hasMore: z.boolean(),
	}),
});
