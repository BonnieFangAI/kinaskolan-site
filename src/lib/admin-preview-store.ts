import { promises as fs } from "node:fs";
import path from "node:path";

import {
  activityCategories,
  contactInfo,
  courses,
  hskInfo,
  newsItems,
  schoolOverview,
  teachers,
} from "@/lib/site-content";
import type { EditableAdminSectionKey } from "@/lib/admin-data";

type PreviewRecord = {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
  updatedAt?: string;
  values: Record<string, string | string[]>;
};

type PreviewStore = Record<
  EditableAdminSectionKey,
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
          slug: item.slug,
          title_zh: item.title.zh,
          title_sv: item.title.sv,
          excerpt_zh: item.excerpt.zh,
          excerpt_sv: item.excerpt.sv,
          body_zh: item.body.zh.join("\n\n"),
          body_sv: item.body.sv.join("\n\n"),
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
    "student-works": {
      records: activityCategories.map((item) => ({
        id: item.key,
        title: item.title.zh,
        subtitle: item.title.sv,
        status: "Published",
        updatedAt: nowDate(),
        values: {
          slug: item.key,
          category: item.key,
          title_zh: item.title.zh,
          title_sv: item.title.sv,
          summary_zh: item.summary.zh,
          summary_sv: item.summary.sv,
          body_zh: item.summary.zh,
          body_sv: item.summary.sv,
          image: item.image,
          event_date: "",
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
          registration_url: "",
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
          values: {
            file_name: "campus.jpg",
            file_path: "/campus.jpg",
            alt_zh: "学校校园图片",
            alt_sv: "Skolbild",
          },
        },
        {
          id: "ambassador",
          title: "news-ambassador.jpg",
          subtitle: "News / student works",
          status: "Reusable",
          updatedAt: nowDate(),
          values: {
            file_name: "news-ambassador.jpg",
            file_path: "/news-ambassador.jpg",
            alt_zh: "学生朗诵活动图片",
            alt_sv: "Recitationsaktivitet",
          },
        },
        {
          id: "finland",
          title: "trip-finland.png",
          subtitle: "Student works",
          status: "Reusable",
          updatedAt: nowDate(),
          values: {
            file_name: "trip-finland.png",
            file_path: "/trip-finland.png",
            alt_zh: "学生游学活动图片",
            alt_sv: "Studieresa",
          },
        },
      ],
    },
    settings: {
      records: [
        {
          id: "site-settings",
          title: "Basic site settings",
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

function normalizeStore(raw: Partial<PreviewStore> & { activities?: { records: PreviewRecord[] } }): PreviewStore {
  const seed = initialStore();

  return {
    news: raw.news ?? seed.news,
    teachers: raw.teachers ?? seed.teachers,
    courses: raw.courses ?? seed.courses,
    "student-works": raw["student-works"] ?? raw.activities ?? seed["student-works"],
    hsk: raw.hsk ?? seed.hsk,
    media: raw.media ?? seed.media,
    settings: raw.settings ?? seed.settings,
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
  return normalizeStore(JSON.parse(raw));
}

export async function writePreviewStore(store: PreviewStore) {
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function getPreviewSectionRecords(section: EditableAdminSectionKey) {
  const store = await readPreviewStore();
  return store[section].records;
}

export async function getPreviewRecord(section: EditableAdminSectionKey, recordId: string) {
  const records = await getPreviewSectionRecords(section);
  return records.find((record) => record.id === recordId);
}

function computeTitle(section: EditableAdminSectionKey, values: Record<string, string | string[]>) {
  switch (section) {
    case "news":
    case "student-works":
    case "hsk":
      return String(values.title_zh || "Untitled");
    case "teachers":
      return String(values.name || "Teacher");
    case "courses":
      return String(values.name_zh || "Course");
    case "media":
      return String(values.file_name || values.file_path || "Media file");
    case "settings":
      return "Basic site settings";
  }
}

function computeSubtitle(section: EditableAdminSectionKey, values: Record<string, string | string[]>) {
  switch (section) {
    case "news":
    case "student-works":
    case "hsk":
      return String(values.title_sv || "");
    case "teachers":
      return String(values.position_zh || "");
    case "courses":
      return String(values.age_group_zh || "");
    case "media":
      return String(values.file_path || "");
    case "settings":
      return String(values.contact_email || "");
  }
}

export async function upsertPreviewRecord(
  section: EditableAdminSectionKey,
  recordId: string | null,
  values: Record<string, string | string[]>
) {
  const store = await readPreviewStore();
  const nextId =
    recordId && recordId !== "new"
      ? recordId
      : String(values.slug || values.file_name || `${section}-${Date.now()}`);
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

export async function deletePreviewRecord(section: EditableAdminSectionKey, recordId: string) {
  const store = await readPreviewStore();
  store[section].records = store[section].records.filter((record) => record.id !== recordId);
  await writePreviewStore(store);
}
