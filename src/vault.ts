import { z } from "zod";

const AgentIdSchema = z.string().cuid2().or(z.string().cuid());

export const CredentialTypeSchema = z.enum(["login", "secure_note", "card", "identity"]);

export const CredentialUriSchema = z.object({
	uri: z.string(),
	match: z.enum(["domain", "host", "starts_with", "regex", "never"]).optional(),
});

export const LoginCredentialSchema = z.object({
	username: z.string().optional(),
	password: z.string().optional(),
	uris: z.array(CredentialUriSchema).optional(),
	totp: z.string().optional(),
});

export const CardCredentialSchema = z.object({
	cardholderName: z.string().optional(),
	brand: z.string().optional(),
	number: z.string().optional(),
	expMonth: z.string().optional(),
	expYear: z.string().optional(),
	code: z.string().optional(),
});

export const IdentityCredentialSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	address1: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	postalCode: z.string().optional(),
	country: z.string().optional(),
	company: z.string().optional(),
	ssn: z.string().optional(),
});

export const CustomFieldSchema = z.object({
	name: z.string(),
	value: z.string(),
	type: z.enum(["text", "hidden", "boolean"]),
});

export const CredentialOutputSchema = z.object({
	id: z.string(),
	type: CredentialTypeSchema,
	name: z.string(),
	notes: z.string().optional(),
	login: LoginCredentialSchema.optional(),
	card: CardCredentialSchema.optional(),
	identity: IdentityCredentialSchema.optional(),
	fields: z.array(CustomFieldSchema).optional(),
	favorite: z.boolean(),
	folderId: z.string().optional(),
	organizationId: z.string().optional(),
	collectionIds: z.array(z.string()).optional(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const CreateCredentialInput = z.object({
	agentId: AgentIdSchema,
	type: CredentialTypeSchema,
	name: z.string().min(1),
	notes: z.string().optional(),
	login: LoginCredentialSchema.optional(),
	card: CardCredentialSchema.optional(),
	identity: IdentityCredentialSchema.optional(),
	fields: z.array(CustomFieldSchema).optional(),
	favorite: z.boolean().default(false).optional(),
	folderId: z.string().optional(),
	organizationId: z.string().optional(),
	collectionIds: z.array(z.string()).optional(),
});

export const UpdateCredentialInput = z.object({
	agentId: AgentIdSchema,
	name: z.string().min(1).optional(),
	notes: z.string().optional(),
	login: LoginCredentialSchema.optional(),
	card: CardCredentialSchema.optional(),
	identity: IdentityCredentialSchema.optional(),
	fields: z.array(CustomFieldSchema).optional(),
	favorite: z.boolean().optional(),
});

export const SearchCredentialsInput = z.object({
	agentId: AgentIdSchema,
	search: z.string().optional(),
	type: CredentialTypeSchema.optional(),
});

export const ListCredentialsOutput = z.object({
	items: z.array(CredentialOutputSchema),
});

export const ProvisionVaultInput = z.object({
	agentId: AgentIdSchema,
});

export const ProvisionVaultOutput = z.object({
	id: z.string(),
	agentId: z.string(),
	orgId: z.string(),
	vaultUserId: z.string().nullable(),
	vaultOrgId: z.string().nullable(),
	collectionId: z.string().nullable(),
	status: z.enum(["ACTIVE", "LOCKED", "ERROR"]),
	credentialCount: z.number().int().nonnegative(),
	lastSyncAt: z.string().datetime().nullable(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const VaultStatusOutput = z.object({
	serverUrl: z.string(),
	lastSync: z.string().datetime().nullable(),
	status: z.enum(["unlocked", "locked", "unauthenticated"]),
});

export const GeneratePasswordInput = z.object({
	agentId: AgentIdSchema,
	length: z.number().int().min(4).max(128).optional(),
	uppercase: z.boolean().optional(),
	lowercase: z.boolean().optional(),
	number: z.boolean().optional(),
	special: z.boolean().optional(),
});

export const GeneratePasswordOutput = z.object({
	password: z.string(),
});

export const TotpOutput = z.object({
	code: z.string(),
	period: z.number().int().positive(),
});

export const VaultCredentialIdInput = z.object({
	agentId: AgentIdSchema,
	id: z.string(),
});
