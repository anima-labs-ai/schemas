import { z } from "zod";

export const InvoiceStatusSchema = z.enum([
	"detected",
	"confirmed",
	"rejected",
	"paid",
	"reconciled",
]);

export const InvoiceOutput = z.object({
	id: z.string(),
	orgId: z.string(),
	agentId: z.string().nullable(),
	messageId: z.string(),
	vendor: z.string().nullable(),
	invoiceNumber: z.string().nullable(),
	amountCents: z.number().int().nullable(),
	currency: z.string(),
	dueDate: z.string().datetime().nullable(),
	paymentLink: z.string().nullable(),
	confidence: z.number(),
	evidence: z.record(z.unknown()),
	status: InvoiceStatusSchema,
	metadata: z.record(z.unknown()),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const InvoiceListInput = z.object({
	status: InvoiceStatusSchema.optional(),
	agentId: z.string().optional(),
	limit: z.number().int().min(1).max(100).default(20),
	cursor: z.string().optional(),
});

export const InvoiceUpdateInput = z.object({
	invoiceId: z.string(),
	status: InvoiceStatusSchema.optional(),
	metadata: z.record(z.unknown()).optional(),
});
