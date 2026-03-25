import { z } from "zod";

import { CursorPagination, PaginationInput } from "./common";

export const CreateInboxInput = z.object({
	username: z
		.string()
		.min(1)
		.max(64)
		.regex(/^[a-zA-Z0-9._-]+$/, {
			message: "Username can only contain letters, numbers, dots, hyphens, and underscores",
		})
		.optional(),
	domain: z.string().optional(),
	displayName: z.string().max(128).optional(),
	agentId: z.string().cuid().optional(),
});

export const InboxOutput = z.object({
	id: z.string().cuid(),
	email: z.string().email(),
	domain: z.string(),
	localPart: z.string(),
	displayName: z.string().nullable(),
	agentId: z.string().cuid().nullable(),
	createdAt: z.string().datetime(),
});

export const InboxListInput = PaginationInput.extend({
	query: z.string().optional(),
});

export const InboxListOutput = z.object({
	items: z.array(InboxOutput),
	pagination: CursorPagination,
});
