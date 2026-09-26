import { z } from "zod";

const email = z.string().trim().email("Enter a valid email address").max(200);
const short = z.string().trim().max(120);
const medium = z.string().trim().max(2000);
const name = z.string().trim().min(2, "Required").max(120);

/** Shared consent for stored personal data. */
const consent = z.literal(true, {
  errorMap: () => ({ message: "You must accept the privacy notice." }),
});

export const earlyAccessSchema = z.object({
  email,
  country: short,
  role: short,
  interest: z.enum([
    "use",
    "test",
    "developer",
    "invest",
    "organization",
    "contribute",
    "updates",
  ]),
  consent,
});

export const pilotRequestSchema = z.object({
  fullName: name,
  organization: short,
  role: short,
  email,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: short,
  organizationType: z.enum([
    "school",
    "university",
    "business",
    "hotel",
    "event",
    "ngo",
    "developer",
    "community",
    "other",
  ]),
  potentialUsers: z.string().trim().max(40),
  connectivity: medium,
  useCase: medium,
  deploymentType: z.enum(["local-only", "local-cloud", "undecided"]),
  message: medium.optional().or(z.literal("")),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
  consent,
});

export const demoRequestSchema = z.object({
  fullName: name,
  email,
  organization: short.optional().or(z.literal("")),
  demoType: z.enum(["virtual", "technical", "organization-pilot", "developer"]),
  message: medium.optional().or(z.literal("")),
  consent,
});

export const contactSchema = z.object({
  name,
  email,
  category: z.enum(["general", "partnership", "developer", "pilot", "investment", "media"]),
  message: z.string().trim().min(10, "Tell us a little more").max(4000),
  consent,
});

export const reviewSchema = z.object({
  name,
  email,
  country: short,
  role: short,
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(10, "Tell us a little more").max(2000),
  wants: medium,
  wouldPilot: z.boolean(),
  consent,
});

export const developerProfileSchema = z.object({
  name,
  username: z
    .string()
    .trim()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z0-9_-]+$/, "Letters, numbers, dashes and underscores only"),
  email,
  country: short,
  organization: z.string().trim().max(120).optional().or(z.literal("")),
  github: z.string().trim().max(60).optional().or(z.literal("")),
  portfolio: z.string().trim().url("Must be a valid URL").max(200).optional().or(z.literal("")),
  skills: z.string().trim().min(2).max(300),
  bio: z.string().trim().max(1000).optional().or(z.literal("")),
  avatarUrl: z.string().trim().url().max(300).optional().or(z.literal("")),
  projects: z.string().trim().max(600).optional().or(z.literal("")),
  contributionAreas: z.string().trim().max(300).optional().or(z.literal("")),
  showEmail: z.boolean().default(false),
  consent,
});

export const developerProjectSchema = z.object({
  projectName: z.string().trim().min(2).max(120),
  description: z.string().trim().min(20).max(3000),
  repoUrl: z.string().trim().url().max(200),
  website: z.string().trim().url().max(200).optional().or(z.literal("")),
  technologies: z.string().trim().min(2).max(300),
  integration: z.string().trim().max(600),
  license: z.string().trim().max(60).optional().or(z.literal("")),
  developerName: name,
  email,
  status: z.enum(["prototype", "experimental", "in-development", "beta", "released"]),
  consent,
});

export const newsletterSchema = z.object({
  email,
});

export type EarlyAccessInput = z.infer<typeof earlyAccessSchema>;
export type PilotRequestInput = z.infer<typeof pilotRequestSchema>;
export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type DeveloperProfileInput = z.infer<typeof developerProfileSchema>;
export type DeveloperProjectInput = z.infer<typeof developerProjectSchema>;
