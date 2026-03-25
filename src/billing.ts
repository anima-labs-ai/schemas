import { z } from "zod";

export const BillingTierSchema = z.enum(["free", "starter", "growth", "enterprise"]);

export const BillingUsageOutput = z.object({
	period: z.string().regex(/^\d{4}-\d{2}$/),
	usage: z.object({
		message_sent: z.number().int().nonnegative(),
		message_received: z.number().int().nonnegative(),
		sms_sent: z.number().int().nonnegative(),
		sms_received: z.number().int().nonnegative(),
		call_minute: z.number().int().nonnegative(),
		embedding_generated: z.number().int().nonnegative(),
	}),
});

export const BillingTierOutput = z.object({
	tier: BillingTierSchema,
	name: z.string(),
	price: z.number().int().nullable(),
	limits: z.object({
		messages: z.number().int().nullable(),
		agents: z.number().int().nullable(),
		domains: z.number().int().nullable(),
	}),
	renewalDate: z.string().datetime().nullable(),
});

export const BillingCheckoutInput = z.object({
	tier: z.enum(["starter", "growth", "enterprise"]),
	successUrl: z.string().url().optional(),
	cancelUrl: z.string().url().optional(),
});

export const BillingPortalInput = z.object({
	returnUrl: z.string().url().optional(),
});

export const BillingSessionOutput = z.object({
	url: z.string().url().nullable(),
});
