import { promises as fs } from "node:fs";
import path from "node:path";

import {
  activityCategories,
  contactInfo,
  courses,
  hskInfo,
  newsItems,
  scholarshipItems,
  schoolOverview,
  teachers,
} from "@/lib/site-content";
import type { AdminSectionKey } from "@/lib/admin-data";

type PreviewRecord = {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
  updatedAt?: string;
  values: Record<string, string | string[]>;
};

type PreviewStore = Record<
  Exclude<AdminSectionKey, "dashboard">,
  {
    records: PreviewRecord[];
  }
>;

const storePath = path.join(process.cwd(), "data", "admin-preview-store.json");

function nowDate() {
  return new Date().toISOString().slice(0, 10);
}

function initialStore(): PreviewStore {
  return {
    news: {
      records: newsItems.map((item) => ({
        id: item.slug,
        title: item.title.zh,
        subtitle: item.title.sv,
        status: item.featured ? "Featured" : "Published",
        updatedAt: item.date,
        values: {
          title_zh: item.title.zh,
          title_sv: item.title.sv,
          excerpt_zh: item.excerpt.zh,
          excerpt_sv: item.excerpt.sv,
          image: item.image,
          date: item.date,
        },
      })),
    },
    teachers: {
      records: teachers.map((teacher) => ({
        id: teacher.name,
        title: teacher.name,
        subtitle: teacher.role.zh,
        status: "Active",
        updatedAt: nowDate(),
        values: {
          name: teacher.name,
          position_zh: teacher.role.zh,
          position_sv: teacher.role.sv,
          bio_zh: teacher.bio.zh,
          bio_sv: teacher.bio.sv,
          focus_zh: teacher.focus.zh,
          focus_sv: teacher.focus.sv,
          photo: teacher.image,
        },
      })),
    },
    courses: {
      records: courses.map((course, index) => ({
        id: `course-${index + 1}`,
        title: course.name.zh,
        subtitle: course.ageGroup.zh,
        status: "Published",
        updatedAt: nowDate(),
        values: {
          name_zh: course.name.zh,
          name_sv: course.name.sv,
          description_zh: course.objective.zh,
          description_sv: course.objective.sv,
          age_group_zh: course.ageGroup.zh,
          age_group_sv: course.ageGroup.sv,
          objective_zh: course.objective.zh,
          objective_sv: course.objective.sv,
          textbook_zh: course.textbook.zh,
          textbook_sv: course.textbook.sv,
        },
      })),
    },
    activities: {
      records: activityCategories.map((item) => ({
        id: item.key,
        title: item.title.zh,
        subtitle: item.title.sv,
        status: "Category",
        updatedAt: nowDate(),
        values: {
          title_zh: item.title.zh,
          title_sv: item.title.sv,
          summary_zh: item.summary.zh,
          summary_sv: item.summary.sv,
          image: item.image,
          highlights: item.highlights.map((entry) => entry.zh),
        },
      })),
    },
    hsk: {
      records: hskInfo.notices.map((notice, index) => ({
        id: `hsk-${index + 1}`,
        title: notice.title.zh,
        subtitle: notice.title.sv,
        status: "Notice",
        updatedAt: nowDate(),
        values: {
          title_zh: notice.title.zh,
          title_sv: notice.title.sv,
          summary_zh: notice.summary.zh,
          summary_sv: notice.summary.sv,
          date: "",
        },
      })),
    },
    scholarships: {
      records: scholarshipItems.map((item, index) => ({
        id: `scholarship-${index + 1}`,
        title: item.title.zh,
        subtitle: item.title.sv,
        status: "Published",
        updatedAt: item.date,
        values: {
          title_zh: item.title.zh,
          title_sv: item.title.sv,
          summary_zh: item.summary.zh,
          summary_sv: item.summary.sv,
          published_at: item.date,
          image: "",
        },
      })),
    },
    media: {
      records: [
        {
          id: "campus",
          title: "campus.jpg",
          subtitle: "Homepage / about",
          status: "Reusable",
          updatedAt: nowDate(),
          values: { file: "/campus.jpg" },
        },
        {
          id: "ambassador",
          title: "news-ambassador.jpg",
          subtitle: "News / activities",
          status: "Reusable",
          updatedAt: nowDate(),
          values: { file: "/news-ambassador.jpg" },
        },
        {
          id: "finland",
          title: "trip-finland.png",
          subtitle: "Study tours",
          status: "Reusable",
          updatedAt: nowDate(),
          values: { file: "/trip-finland.png" },
        },
      ],
    },
    settings: {
      records: [
        {
          id: "site-settings",
          title: "Global school settings",
          subtitle: "Hero copy, contact information, and core school description",
          status: "Preview mode",
          updatedAt: nowDate(),
          values: {
            hero_title_zh: "瑞典的中文语言与文化教育",
            hero_title_sv: "Kinesisk språk- och kulturutbildning i Sverige",
            hero_subtitle_zh: "帮助年轻一代与语言、文化和社区建立真实而长期的连接。",
            hero_subtitle_sv: "Vi hjälper yngre generationer att bygga en levande relation till språk, kultur och gemenskap.",
            about_summary_zh: schoolOverview.intro.zh,
            about_summary_sv: schoolOverview.intro.sv,
            contact_email: contactInfo.email,
            contact_phone: contactInfo.phone,
            contact_address: contactInfo.address,
          },
        },
      ],
    },
  };
}

export async function ensurePreviewStore() {
  try {
    await fs.access(storePath);
  } catch {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, JSON.stringify(initialStore(), null, 2), "utf8");
  }
}

export async function readPreviewStore(): Promise<PreviewStore> {
  await ensurePreviewStore();
  const raw = await fs.readFile(storePath, "utf8");
  return JSON.parse(raw) as PreviewStore;
}

export async function writePreviewStore(store: PreviewStore) {
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function getPreviewSectionRecords(section: Exclude<AdminSectionKey, "dashboard">) {
  const store = await readPreviewStore();
  return store[section].records;
}

export async function getPreviewRecord(
  section: Exclude<AdminSectionKey, "dashboard">,
  recordId: string
) {
  const records = await getPreviewSectionRecords(section);
  return records.find((record) => record.id === recordId);
}

function computeTitle(section: Exclude<AdminSectionKey, "dashboard">, values: Record<string, string | string[]>) {
  switch (section) {
    case "news":
    case "activities":
    case "hsk":
    case "scholarships":
      return String(values.title_zh || "Untitled");
    case "teachers":
      return String(values.name || "Teacher");
    case "courses":
      return String(values.name_zh || "Course");
    case "media":
      return String(values.file || "Media file");
    case "settings":
      return "Global school settings";
  }
}

function computeSubtitle(section: Exclude<AdminSectionKey, "dashboard">, values: Record<string, string | string[]>) {
  switch (section) {
    case "news":
    case "activities":
    case "hsk":
    case "scholarships":
      return String(values.title_sv || "");
    case "teachers":
      return String(values.position_zh || "");
    case "courses":
      return String(values.age_group_zh || "");
    case "media":
      return "Preview asset";
    case "settings":
      return String(values.contact_email || "");
  }
}

export async function upsertPreviewRecord(
  section: Exclude<AdminSectionKey, "dashboard">,
  recordId: string | null,
  values: Record<string, string | string[]>
) {
  const store = await readPreviewStore();
  const nextId = recordId && recordId !== "new" ? recordId : `${section}-${Date.now()}`;
  const records = store[section].records;
  const existingIndex = records.findIndex((record) => record.id === nextId);
  const nextRecord: PreviewRecord = {
    id: nextId,
    title: computeTitle(section, values),
    subtitle: computeSubtitle(section, values),
    status: section === "settings" ? "Preview mode" : "Saved",
    updatedAt: nowDate(),
    values,
  };

  if (existingIndex >= 0) {
    records[existingIndex] = nextRecord;
  } else {
    records.unshift(nextRecord);
  }

  await writePreviewStore(store);
  return nextId;
}
