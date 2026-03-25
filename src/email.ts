import { z } from "zod";

import { CursorPagination, PaginationInput } from "./common";
import { SendEmailInput as BaseSendEmailInput, MessageOutput } from "./message";

const domainRegex =
	/^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

export const EmailSendEmailInput = BaseSendEmailInput.extend({
	inReplyTo: z.string().optional(),
	references: z.array(z.string()).default([]).optional(),
});

export const EmailIdentityDetailsOutput = z.object({
	id: z.string().cuid(),
	email: z.string().email(),
	domain: z.string(),
	localPart: z.string(),
	isPrimary: z.boolean(),
	verified: z.boolean(),
	stalwartPrincipal: z.string(),
	createdAt: z.string().datetime(),
});

export const DomainStatusEnum = z.enum([
	"NOT_STARTED",
	"PENDING",
	"VERIFYING",
	"VERIFIED",
	"INVALID",
	"FAILED",
]);

export const DomainRecordStatus = z.enum(["MISSING", "INVALID", "VALID"]);

export const DomainDnsRecord = z.object({
	type: z.enum(["TXT", "CNAME", "MX"]),
	name: z.string(),
	value: z.string(),
	priority: z.number().int().optional(),
	status: DomainRecordStatus,
});

export const AddDomainInput = z.object({
	domain: z
		.string()
		.toLowerCase()
		.refine((value) => domainRegex.test(value), {
			message: "Invalid domain format",
		}),
});

export const UpdateDomainInput = z.object({
	feedbackEnabled: z.boolean().optional(),
});

export const DomainOutput = z.object({
	id: z.string().cuid(),
	domain: z.string(),
	status: DomainStatusEnum,
	verified: z.boolean(),
	verificationCooldownUntil: z.string().datetime().nullable(),
	verificationToken: z.string(),
	verificationMethod: z.enum(["DNS_TXT", "DNS_CNAME"]),
	dkimSelector: z.string().nullable(),
	dkimPublicKey: z.string().nullable(),
	spfConfigured: z.boolean(),
	dmarcConfigured: z.boolean(),
	mxConfigured: z.boolean(),
	feedbackEnabled: z.boolean(),
	records: z.array(DomainDnsRecord).nullable(),
	createdAt: z.string().datetime(),
});

export const DomainZoneFileOutput = z.object({
	zoneFile: z.string(),
});

export const VerifyDomainInput = z.object({
	domainId: z.string().cuid(),
});

export const DomainDnsRecordsOutput = z.object({
	txt: z.object({
		name: z.string(),
		value: z.string(),
	}),
	mailFrom: z.object({
		name: z.string(),
		mx: z.object({
			value: z.string(),
			priority: z.number().int(),
		}),
		spf: z.string(),
	}),
	dkim: z.array(
		z.object({
			name: z.string(),
			value: z.string(),
		}),
	),
	mx: z.object({
		name: z.string(),
		value: z.string(),
		priority: z.number().int(),
	}),
	spf: z.string(),
	dmarc: z.string(),
});

export const DeliverabilityStatsOutput = z.object({
	domain: z.string(),
	sent: z.number().int().nonnegative(),
	delivered: z.number().int().nonnegative(),
	bounced: z.number().int().nonnegative(),
	complained: z.number().int().nonnegative(),
	bounceRate: z.number().nonnegative(),
	complaintRate: z.number().nonnegative(),
	isHealthy: z.boolean(),
});

export const EmailListInput = PaginationInput.extend({
	agentId: z.string().cuid().optional(),
});

export const EmailListOutput = z.object({
	items: z.array(MessageOutput),
	pagination: CursorPagination,
});
