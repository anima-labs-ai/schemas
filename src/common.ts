import { z } from "zod";

export const SortOrder = z.enum(["asc", "desc"]);

export const PaginationInput = z.object({
	cursor: z.string().cuid().optional(),
	limit: z.number().int().min(1).max(100).default(20),
});

export const DateRange = z.object({
	from: z.string().datetime().optional(),
	to: z.string().datetime().optional(),
});

export const CursorPagination = z.object({
	nextCursor: z.string().cuid().nullable(),
	hasMore: z.boolean(),
});
