import { collection, type WithMeta } from "./db";

export type EarlyAccess = WithMeta & {
  email: string;
  country: string;
  role: string;
  interest: string;
};

export type PilotRequest = WithMeta & {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone?: string;
  country: string;
  organizationType: string;
  potentialUsers: string;
  connectivity: string;
  useCase: string;
  deploymentType: string;
  message?: string;
  contactMethod: string;
  status: "new" | "contacted" | "in-review" | "accepted" | "declined";
};

export type DemoRequest = WithMeta & {
  fullName: string;
  email: string;
  organization?: string;
  demoType: string;
  message?: string;
  status: "new" | "scheduled" | "completed" | "declined";
};

export type ContactRequest = WithMeta & {
  name: string;
  email: string;
  category: string;
  message: string;
  status: "new" | "resolved";
};

export type Review = WithMeta & {
  name: string;
  email: string;
  country: string;
  role: string;
  rating: number;
  review: string;
  wants: string;
  wouldPilot: boolean;
  status: "pending" | "approved" | "rejected";
};

export type DeveloperProfile = WithMeta & {
  name: string;
  username: string;
  email: string;
  country: string;
  organization?: string;
  github?: string;
  portfolio?: string;
  skills: string;
  bio?: string;
  avatarUrl?: string;
  projects?: string;
  contributionAreas?: string;
  showEmail: boolean;
  status: "pending" | "approved" | "rejected";
};

export type DeveloperProject = WithMeta & {
  projectName: string;
  description: string;
  repoUrl: string;
  website?: string;
  technologies: string;
  integration: string;
  license?: string;
  developerName: string;
  email: string;
  status: "prototype" | "experimental" | "in-development" | "beta" | "released";
  moderation: "pending" | "approved" | "rejected";
};

export type NewsletterSubscriber = WithMeta & { email: string };

export type AdminUser = WithMeta & {
  email: string;
  passwordHash: string;
  role: "super-admin" | "content-admin" | "moderator" | "developer-relations";
};

export type Comment = WithMeta & {
  targetType: string;
  targetId: string;
  author: string;
  email: string;
  body: string;
  status: "pending" | "approved" | "rejected";
};

export type ContentItem = WithMeta & {
  kind: "roadmap" | "faq" | "update" | "testimonial";
  slug?: string;
  title: string;
  category?: string;
  body: string;
  author?: string;
  tags?: string[];
  published: boolean;
  order?: number;
};

export const db = {
  earlyAccess: collection<EarlyAccess>("early_access"),
  pilotRequests: collection<PilotRequest>("pilot_requests"),
  demoRequests: collection<DemoRequest>("demo_requests"),
  contactRequests: collection<ContactRequest>("contact_requests"),
  reviews: collection<Review>("reviews"),
  developers: collection<DeveloperProfile>("developers"),
  developerProjects: collection<DeveloperProject>("developer_projects"),
  newsletter: collection<NewsletterSubscriber>("newsletter_subscribers"),
  admins: collection<AdminUser>("admin_users"),
  comments: collection<Comment>("comments"),
  content: collection<ContentItem>("content_items"),
  audit: collection<WithMeta & { actor: string; action: string; detail: string }>("audit_logs"),
};
