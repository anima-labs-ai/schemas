import { z } from "zod";

import { CursorPagination, DateRange, PaginationInput } from "./common";

export const MessageChannelSchema = z.enum(["EMAIL", "SMS", "MMS", "VOICE"]);
export const MessageDirectionSchema = z.enum(["INBOUND", "OUTBOUND"]);
export const MessageStatusSchema = z.enum([
	"QUEUED",
	"SENT",
	"DELIVERED",
	"FAILED",
	"BOUNCED",
	"BLOCKED",
	"PENDING_APPROVAL",
]);

export const SendEmailInput = z.object({
	agentId: z.string().cuid(),
	to: z.array(z.string().email()).min(1),
	cc: z.array(z.string().email()).default([]).optional(),
	bcc: z.array(z.string().email()).default([]).optional(),
	subject: z.string().min(1).max(998),
	body: z.string().min(1),
	bodyHtml: z.string().optional(),
	headers: z.record(z.string(), z.string()).default({}).optional(),
	metadata: z.record(z.string(), z.unknown()).default({}).optional(),
});

export const SendSmsInput = z.object({
	agentId: z.string().cuid(),
	to: z.string().min(7).max(20),
	body: z.string().min(1).max(1600),
	mediaUrls: z.array(z.string().url()).max(10).default([]).optional(),
	metadata: z.record(z.string(), z.unknown()).default({}).optional(),
});

export const AttachmentOutput = z.object({
	id: z.string().cuid(),
	filename: z.string(),
	mimeType: z.string(),
	sizeBytes: z.number().int().nonnegative(),
	storageKey: z.string(),
	url: z.string().url().nullable(),
	createdAt: z.string().datetime(),
});

export const MessageOutput = z.object({
	id: z.string().cuid(),
	agentId: z.string().cuid(),
	channel: MessageChannelSchema,
	direction: MessageDirectionSchema,
	status: MessageStatusSchema,
	fromAddress: z.string(),
	toAddress: z.string(),
	subject: z.string().nullable(),
	body: z.string(),
	bodyHtml: z.string().nullable(),
	headers: z.record(z.string(), z.unknown()).nullable(),
	metadata: z.record(z.string(), z.unknown()).nullable(),
	threadId: z.string().nullable(),
	inReplyTo: z.string().nullable(),
	externalId: z.string().nullable(),
	sentAt: z.string().datetime().nullable(),
	receivedAt: z.string().datetime().nullable(),
	attachments: z.array(AttachmentOutput),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const MessageListInput = PaginationInput.extend({
	agentId: z.string().cuid().optional(),
	threadId: z.string().cuid2().optional(),
	channel: MessageChannelSchema.optional(),
	direction: MessageDirectionSchema.optional(),
	dateRange: DateRange.optional(),
});

export const UploadAttachmentInput = z.object({
	messageId: z.string().cuid2().or(z.string().cuid()),
	filename: z.string().min(1).max(255),
	mimeType: z.string().min(1),
	sizeBytes: z.number().int().positive(),
});

export const AttachmentDownloadOutput = z.object({
	url: z.string().url(),
	expiresAt: z.string().datetime(),
});

export const MessageSearchInput = z.object({
	query: z.string().min(1),
	filters: z
		.object({
			agentId: z.string().cuid().optional(),
			channel: MessageChannelSchema.optional(),
			direction: MessageDirectionSchema.optional(),
			status: MessageStatusSchema.optional(),
			dateRange: DateRange.optional(),
		})
		.default({})
		.optional(),
	pagination: PaginationInput.default({ limit: 20 }),
});

export const MessageListOutput = z.object({
	items: z.array(MessageOutput),
	pagination: CursorPagination,
});
