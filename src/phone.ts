import { z } from "zod";

import { PhoneIdentityOutput } from "./agent";
import { MessageOutput, SendSmsInput } from "./message";

const AgentIdSchema = z.string().cuid2().or(z.string().cuid());

export const ProvisionPhoneInput = z.object({
	agentId: AgentIdSchema,
	countryCode: z.string().length(2).default("US"),
	areaCode: z.string().optional(),
	capabilities: z.array(z.enum(["sms", "mms", "voice"])).optional(),
});

export const ReleasePhoneInput = z.object({
	agentId: AgentIdSchema,
	phoneNumber: z.string(),
});

export const SearchNumbersInput = z.object({
	countryCode: z.string().length(2).default("US"),
	areaCode: z.string().optional(),
	capabilities: z.array(z.enum(["sms", "mms", "voice"])).optional(),
	limit: z.number().int().min(1).max(50).default(10),
});

export const AvailableNumberOutput = z.object({
	phoneNumber: z.string(),
	region: z.string().optional(),
	capabilities: z.object({
		sms: z.boolean(),
		mms: z.boolean(),
		voice: z.boolean(),
	}),
	monthlyCost: z.number().optional(),
});

export const SearchNumbersOutput = z.object({
	items: z.array(AvailableNumberOutput),
});

export const PhoneProvisionOutput = z.object({
	id: z.string(),
	phoneNumber: z.string(),
	provider: z.enum(["TELNYX", "TWILIO"]),
	providerId: z.string().nullable(),
	capabilities: z.object({
		sms: z.boolean(),
		mms: z.boolean(),
		voice: z.boolean(),
	}),
	tenDlcStatus: z.enum(["PENDING", "REGISTERED", "REJECTED", "NOT_REQUIRED"]),
	isPrimary: z.boolean(),
	createdAt: z.string().datetime(),
});

export const ListPhonesInput = z.object({
	agentId: AgentIdSchema,
});

export const ListPhonesOutput = z.object({
	items: z.array(PhoneIdentityOutput),
});

export { MessageOutput, SendSmsInput };
