import {
  activityCategories,
  contactInfo,
  courses,
  hskInfo,
  newsItems,
  schoolOverview,
  teachers,
} from "@/lib/site-content";
import { getPreviewRecord, getPreviewSectionRecords } from "@/lib/admin-preview-store";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminSectionKey =
  | "dashboard"
  | "news"
  | "teachers"
  | "courses"
  | "student-works"
  | "hsk"
  | "media"
  | "settings";

export type EditableAdminSectionKey = Exclude<AdminSectionKey, "dashboard">;

export type AdminSection = {
  key: AdminSectionKey;
  label: string;
  description: string;
  cta: string;
};

export type AdminField =
  | { key: string; label: string; type: "text" | "textarea" | "date" | "email" | "image" | "file" }
  | { key: string; label: string; type: "list"; items: string[] };

export type AdminRecord = {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
  updatedAt?: string;
  fields: AdminField[];
  values?: Record<string, string | string[]>;
};

export const adminSections: AdminSection[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    description: "Publishing status for the school CMS and the content areas staff update most often.",
    cta: "Review status",
  },
  {
    key: "news",
    label: "News",
    description: "Publish school news with SEO-friendly URLs, dates, cover images, summaries, and article body copy.",
    cta: "Create news",
  },
  {
    key: "teachers",
    label: "Teachers",
    description: "Manage teacher photos, names, positions, biographies, and teaching focus.",
    cta: "Add teacher",
  },
  {
    key: "courses",
    label: "Courses",
    description: "Edit course descriptions, age groups, learning objectives, and textbook notes.",
    cta: "Add course",
  },
  {
    key: "student-works",
    label: "Student Works",
    description: "Manage recitation, calligraphy, and extracurricular activity content without creating extra public columns.",
    cta: "Add student work",
  },
  {
    key: "hsk",
    label: "HSK Information",
    description: "Update exam dates, registration guidance, scholarship references, and study-tour notices in one HSK area.",
    cta: "Add HSK notice",
  },
  {
    key: "media",
    label: "Media Library",
    description: "Track reusable images, cover assets, and gallery files used across the website.",
    cta: "Add media",
  },
  {
    key: "settings",
    label: "Site Settings",
    description: "Maintain hero copy, contact details, and shared school profile information.",
    cta: "Update settings",
  },
];

export type AdminDataset = {
  section: AdminSection;
  records: AdminRecord[];
};

function toNewsRecords(): AdminRecord[] {
  return newsItems.map((item) => ({
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
    fields: [
      { key: "slug", label: "SEO URL slug", type: "text" },
      { key: "title_zh", label: "Title (ZH)", type: "text" },
      { key: "title_sv", label: "Title (SV)", type: "text" },
      { key: "excerpt_zh", label: "Excerpt (ZH)", type: "textarea" },
      { key: "excerpt_sv", label: "Excerpt (SV)", type: "textarea" },
      { key: "body_zh", label: "Body (ZH)", type: "textarea" },
      { key: "body_sv", label: "Body (SV)", type: "textarea" },
      { key: "image", label: "Cover image path", type: "image" },
      { key: "date", label: "Publish date", type: "date" },
    ],
  }));
}

function toTeacherRecords(): AdminRecord[] {
  return teachers.map((teacher) => ({
    id: teacher.name,
    title: teacher.name,
    subtitle: teacher.role.zh,
    status: "Active",
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
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "position_zh", label: "Position (ZH)", type: "text" },
      { key: "position_sv", label: "Position (SV)", type: "text" },
      { key: "bio_zh", label: "Biography (ZH)", type: "textarea" },
      { key: "bio_sv", label: "Biography (SV)", type: "textarea" },
      { key: "focus_zh", label: "Teaching focus (ZH)", type: "text" },
      { key: "focus_sv", label: "Teaching focus (SV)", type: "text" },
      { key: "photo", label: "Photo path", type: "image" },
    ],
  }));
}

function toCourseRecords(): AdminRecord[] {
  return courses.map((course, index) => ({
    id: `course-${index + 1}`,
    title: course.name.zh,
    subtitle: course.ageGroup.zh,
    status: "Published",
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
    fields: [
      { key: "name_zh", label: "Course name (ZH)", type: "text" },
      { key: "name_sv", label: "Course name (SV)", type: "text" },
      { key: "description_zh", label: "Description (ZH)", type: "textarea" },
      { key: "description_sv", label: "Description (SV)", type: "textarea" },
      { key: "age_group_zh", label: "Age group (ZH)", type: "text" },
      { key: "age_group_sv", label: "Age group (SV)", type: "text" },
      { key: "objective_zh", label: "Learning objective (ZH)", type: "textarea" },
      { key: "objective_sv", label: "Learning objective (SV)", type: "textarea" },
      { key: "textbook_zh", label: "Textbook (ZH)", type: "text" },
      { key: "textbook_sv", label: "Textbook (SV)", type: "text" },
    ],
  }));
}

function toStudentWorkRecords(): AdminRecord[] {
  return activityCategories.map((category) => ({
    id: category.key,
    title: category.title.zh,
    subtitle: category.title.sv,
    status: "Published",
    values: {
      slug: category.key,
      category: category.key,
      title_zh: category.title.zh,
      title_sv: category.title.sv,
      summary_zh: category.summary.zh,
      summary_sv: category.summary.sv,
      body_zh: category.summary.zh,
      body_sv: category.summary.sv,
      image: category.image,
      event_date: "",
      highlights: category.highlights.map((item) => item.zh),
    },
    fields: [
      { key: "slug", label: "SEO URL slug", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "title_zh", label: "Title (ZH)", type: "text" },
      { key: "title_sv", label: "Title (SV)", type: "text" },
      { key: "summary_zh", label: "Summary (ZH)", type: "textarea" },
      { key: "summary_sv", label: "Summary (SV)", type: "textarea" },
      { key: "body_zh", label: "Body (ZH)", type: "textarea" },
      { key: "body_sv", label: "Body (SV)", type: "textarea" },
      { key: "image", label: "Cover image path", type: "image" },
      { key: "event_date", label: "Event date", type: "date" },
      { key: "highlights", label: "Highlights (ZH)", type: "list", items: category.highlights.map((item) => item.zh) },
    ],
  }));
}

function toHskRecords(): AdminRecord[] {
  return hskInfo.notices.map((notice, index) => ({
    id: `hsk-${index + 1}`,
    title: notice.title.zh,
    subtitle: notice.title.sv,
    status: "Notice",
    values: {
      title_zh: notice.title.zh,
      title_sv: notice.title.sv,
      summary_zh: notice.summary.zh,
      summary_sv: notice.summary.sv,
      date: "",
      registration_url: "",
    },
    fields: [
      { key: "title_zh", label: "Title (ZH)", type: "text" },
      { key: "title_sv", label: "Title (SV)", type: "text" },
      { key: "summary_zh", label: "Summary (ZH)", type: "textarea" },
      { key: "summary_sv", label: "Summary (SV)", type: "textarea" },
      { key: "date", label: "Exam date", type: "date" },
      { key: "registration_url", label: "Registration URL", type: "text" },
    ],
  }));
}

function toMediaRecords(): AdminRecord[] {
  return [
    {
      id: "campus",
      title: "campus.jpg",
      subtitle: "Homepage / about",
      status: "Reusable",
      values: {
        file_name: "campus.jpg",
        file_path: "/campus.jpg",
        alt_zh: "学校校园图片",
        alt_sv: "Skolbild",
      },
      fields: getMediaFields(),
    },
    {
      id: "ambassador",
      title: "news-ambassador.jpg",
      subtitle: "News / student works",
      status: "Reusable",
      values: {
        file_name: "news-ambassador.jpg",
        file_path: "/news-ambassador.jpg",
        alt_zh: "学生朗诵活动图片",
        alt_sv: "Recitationsaktivitet",
      },
      fields: getMediaFields(),
    },
    {
      id: "finland",
      title: "trip-finland.png",
      subtitle: "Student works",
      status: "Reusable",
      values: {
        file_name: "trip-finland.png",
        file_path: "/trip-finland.png",
        alt_zh: "学生游学活动图片",
        alt_sv: "Studieresa",
      },
      fields: getMediaFields(),
    },
  ];
}

function getMediaFields(): AdminField[] {
  return [
    { key: "upload", label: "Upload image", type: "file" },
    { key: "file_name", label: "File name", type: "text" },
    { key: "file_path", label: "File path or URL", type: "image" },
    { key: "alt_zh", label: "Alt text (ZH)", type: "text" },
    { key: "alt_sv", label: "Alt text (SV)", type: "text" },
  ];
}

function toSettingsRecords(): AdminRecord[] {
  return [
    {
      id: "site-settings",
      title: "Basic site settings",
      subtitle: "Hero copy, contact information, and core school description",
      status: hasSupabaseEnv() ? "Connected" : "Preview mode",
      values: getSettingsSeedValues(),
      fields: [
        { key: "hero_title_zh", label: "Hero title (ZH)", type: "text" },
        { key: "hero_title_sv", label: "Hero title (SV)", type: "text" },
        { key: "hero_subtitle_zh", label: "Hero subtitle (ZH)", type: "textarea" },
        { key: "hero_subtitle_sv", label: "Hero subtitle (SV)", type: "textarea" },
        { key: "about_summary_zh", label: "School summary (ZH)", type: "textarea" },
        { key: "about_summary_sv", label: "School summary (SV)", type: "textarea" },
        { key: "contact_email", label: "Contact email", type: "email" },
        { key: "contact_phone", label: "Phone", type: "text" },
        { key: "contact_address", label: "Address", type: "text" },
      ],
    },
  ];
}

function getSeedRecordsBySection(): Record<EditableAdminSectionKey, AdminRecord[]> {
  return {
    news: toNewsRecords(),
    teachers: toTeacherRecords(),
    courses: toCourseRecords(),
    "student-works": toStudentWorkRecords(),
    hsk: toHskRecords(),
    media: toMediaRecords(),
    settings: toSettingsRecords(),
  };
}

export function getAdminFieldsForSection(sectionKey: EditableAdminSectionKey): AdminField[] {
  return getSeedRecordsBySection()[sectionKey][0]?.fields ?? [];
}

export function getAdminDataset(sectionKey: AdminSectionKey): AdminDataset {
  const section = adminSections.find((entry) => entry.key === sectionKey);
  if (!section) {
    throw new Error(`Unknown admin section: ${sectionKey}`);
  }

  return {
    section,
    records: sectionKey === "dashboard" ? [] : getSeedRecordsBySection()[sectionKey],
  };
}

function mapSettingsRowsToRecord(rows: Record<string, unknown>[]): AdminRecord[] {
  const seedValues = getSettingsSeedValues();
  const zh = rows.find((row) => row.locale === "zh");
  const sv = rows.find((row) => row.locale === "sv");

  return [
    {
      id: "site-settings",
      title: "Basic site settings",
      subtitle: String(zh?.contact_email ?? sv?.contact_email ?? seedValues.contact_email),
      status: "Connected",
      updatedAt: String(zh?.updated_at ?? sv?.updated_at ?? ""),
      values: {
        hero_title_zh: String(zh?.hero_title ?? seedValues.hero_title_zh),
        hero_title_sv: String(sv?.hero_title ?? seedValues.hero_title_sv),
        hero_subtitle_zh: String(zh?.hero_subtitle ?? seedValues.hero_subtitle_zh),
        hero_subtitle_sv: String(sv?.hero_subtitle ?? seedValues.hero_subtitle_sv),
        about_summary_zh: String(zh?.about_summary ?? seedValues.about_summary_zh),
        about_summary_sv: String(sv?.about_summary ?? seedValues.about_summary_sv),
        contact_email: String(zh?.contact_email ?? sv?.contact_email ?? seedValues.contact_email),
        contact_phone: String(zh?.contact_phone ?? sv?.contact_phone ?? seedValues.contact_phone),
        contact_address: String(zh?.contact_address ?? sv?.contact_address ?? seedValues.contact_address),
      },
      fields: getAdminFieldsForSection("settings"),
    },
  ];
}

function mapSupabaseRowsToRecords(sectionKey: AdminSectionKey, rows: Record<string, unknown>[]): AdminRecord[] {
  switch (sectionKey) {
    case "news":
      return rows.map((row) => ({
        id: String(row.slug ?? row.id),
        title: String(row.title_zh ?? row.slug ?? "Untitled"),
        subtitle: String(row.title_sv ?? ""),
        status: row.is_featured ? "Featured" : "Published",
        updatedAt: String(row.published_at ?? ""),
        values: {
          slug: String(row.slug ?? ""),
          title_zh: String(row.title_zh ?? ""),
          title_sv: String(row.title_sv ?? ""),
          excerpt_zh: String(row.excerpt_zh ?? ""),
          excerpt_sv: String(row.excerpt_sv ?? ""),
          body_zh: String(row.body_zh ?? ""),
          body_sv: String(row.body_sv ?? ""),
          image: String(row.cover_image_path ?? row.cover_media_id ?? ""),
          date: String(row.published_at ?? "").slice(0, 10),
        },
        fields: getAdminFieldsForSection("news"),
      }));
    case "teachers":
      return rows.map((row) => ({
        id: String(row.id),
        title: String(row.name ?? "Teacher"),
        subtitle: String(row.position_zh ?? ""),
        status: "Active",
        updatedAt: String(row.updated_at ?? ""),
        values: {
          name: String(row.name ?? ""),
          position_zh: String(row.position_zh ?? ""),
          position_sv: String(row.position_sv ?? ""),
          bio_zh: String(row.biography_zh ?? ""),
          bio_sv: String(row.biography_sv ?? ""),
          focus_zh: String(row.focus_zh ?? ""),
          focus_sv: String(row.focus_sv ?? ""),
          photo: String(row.image_path ?? row.media_id ?? ""),
        },
        fields: getAdminFieldsForSection("teachers"),
      }));
    case "courses":
      return rows.map((row) => ({
        id: String(row.id),
        title: String(row.name_zh ?? "Course"),
        subtitle: String(row.age_group_zh ?? ""),
        status: "Published",
        updatedAt: String(row.updated_at ?? ""),
        values: {
          name_zh: String(row.name_zh ?? ""),
          name_sv: String(row.name_sv ?? ""),
          description_zh: String(row.description_zh ?? ""),
          description_sv: String(row.description_sv ?? ""),
          age_group_zh: String(row.age_group_zh ?? ""),
          age_group_sv: String(row.age_group_sv ?? ""),
          objective_zh: String(row.learning_objective_zh ?? ""),
          objective_sv: String(row.learning_objective_sv ?? ""),
          textbook_zh: String(row.textbook_zh ?? ""),
          textbook_sv: String(row.textbook_sv ?? ""),
        },
        fields: getAdminFieldsForSection("courses"),
      }));
    case "student-works":
      return rows.map((row) => ({
        id: String(row.slug ?? row.id),
        title: String(row.title_zh ?? "Student work"),
        subtitle: String(row.title_sv ?? row.category ?? ""),
        status: String(row.category ?? "Published"),
        updatedAt: String(row.updated_at ?? row.event_date ?? ""),
        values: {
          slug: String(row.slug ?? ""),
          category: String(row.category ?? ""),
          title_zh: String(row.title_zh ?? ""),
          title_sv: String(row.title_sv ?? ""),
          summary_zh: String(row.summary_zh ?? ""),
          summary_sv: String(row.summary_sv ?? ""),
          body_zh: String(row.body_zh ?? ""),
          body_sv: String(row.body_sv ?? ""),
          image: String(row.cover_image_path ?? row.cover_media_id ?? ""),
          event_date: String(row.event_date ?? ""),
          highlights: Array.isArray(row.highlights_zh) ? (row.highlights_zh as string[]) : [],
        },
        fields: getAdminFieldsForSection("student-works"),
      }));
    case "hsk":
      return rows.map((row) => ({
        id: String(row.id),
        title: String(row.title_zh ?? "HSK notice"),
        subtitle: String(row.title_sv ?? ""),
        status: "Notice",
        updatedAt: String(row.updated_at ?? row.exam_date ?? ""),
        values: {
          title_zh: String(row.title_zh ?? ""),
          title_sv: String(row.title_sv ?? ""),
          summary_zh: String(row.summary_zh ?? ""),
          summary_sv: String(row.summary_sv ?? ""),
          date: String(row.exam_date ?? ""),
          registration_url: String(row.registration_url ?? ""),
        },
        fields: getAdminFieldsForSection("hsk"),
      }));
    case "media":
      return rows.map((row) => ({
        id: String(row.id),
        title: String(row.file_name ?? "Media file"),
        subtitle: String(row.file_path ?? ""),
        status: "Stored",
        updatedAt: String(row.created_at ?? ""),
        values: {
          file_name: String(row.file_name ?? ""),
          file_path: String(row.file_path ?? ""),
          alt_zh: String(row.alt_zh ?? ""),
          alt_sv: String(row.alt_sv ?? ""),
        },
        fields: getAdminFieldsForSection("media"),
      }));
    case "settings":
      return mapSettingsRowsToRecord(rows);
    case "dashboard":
      return [];
  }
}

const supabaseTables: Partial<Record<AdminSectionKey, string>> = {
  news: "news_posts",
  teachers: "teachers",
  courses: "courses",
  "student-works": "student_works",
  hsk: "hsk_updates",
  media: "media_assets",
  settings: "site_settings",
};

export async function getAdminDatasetLive(sectionKey: AdminSectionKey): Promise<AdminDataset> {
  const fallback = getAdminDataset(sectionKey);
  const table = supabaseTables[sectionKey];

  if (!hasSupabaseEnv() || !table || sectionKey === "dashboard") {
    if (sectionKey === "dashboard") {
      return fallback;
    }

    const records = await getPreviewSectionRecords(sectionKey);
    return {
      section: fallback.section,
      records: records.map((record) => ({
        id: record.id,
        title: record.title,
        subtitle: record.subtitle,
        status: record.status,
        updatedAt: record.updatedAt,
        values: record.values,
        fields: getAdminFieldsForSection(sectionKey),
      })),
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    let query = supabase.from(table).select("*");

    if (sectionKey === "news") {
      query = query.order("published_at", { ascending: false });
    } else if (sectionKey === "teachers" || sectionKey === "courses") {
      query = query.order("sort_order", { ascending: true });
    } else if (sectionKey === "student-works") {
      query = query.order("event_date", { ascending: false, nullsFirst: false });
    } else if (sectionKey === "hsk") {
      query = query.order("exam_date", { ascending: false, nullsFirst: false });
    } else if (sectionKey === "settings") {
      query = query.order("locale", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (error || !data) {
      return fallback;
    }

    return {
      section: fallback.section,
      records: mapSupabaseRowsToRecords(sectionKey, data as Record<string, unknown>[]),
    };
  } catch {
    return fallback;
  }
}

export async function getAdminRecordLive(sectionKey: EditableAdminSectionKey, recordId: string) {
  if (!hasSupabaseEnv()) {
    return getPreviewRecord(sectionKey, recordId);
  }

  const dataset = await getAdminDatasetLive(sectionKey);
  return dataset.records.find((record) => record.id === recordId);
}

export function getDashboardStats() {
  return [
    { label: "News", value: String(newsItems.length), note: "School updates and notices" },
    { label: "Teachers", value: String(teachers.length), note: "Profiles visible inside About" },
    { label: "Courses", value: String(courses.length), note: "Age groups, objectives, and textbooks" },
    { label: "Student Works", value: String(activityCategories.length), note: "Recitation, calligraphy, and activities" },
  ];
}

export function getAdminOperationalNotes() {
  return [
    hasSupabaseEnv()
      ? "Supabase is configured. Admin reads and writes the Phase 1 CMS tables."
      : "Supabase is not configured yet, so the admin runs in preview mode with seeded local data.",
    "Phase 1 scope is limited to news, teachers, courses, student works, HSK information, media, and basic site settings.",
    "Scholarships and study tours stay inside HSK information for now; they are not a separate admin column in this phase.",
    `Core school contact information is prepared: ${contactInfo.email} / ${contactInfo.phone}.`,
  ];
}

export function getSettingsSeedValues() {
  return {
    hero_title_zh: "瑞典的中文语言与文化教育",
    hero_title_sv: "Kinesisk språk- och kulturutbildning i Sverige",
    hero_subtitle_zh: "帮助年轻一代与语言、文化和社区建立真实而长期的连接。",
    hero_subtitle_sv: "Vi hjälper yngre generationer att bygga en levande relation till språk, kultur och gemenskap.",
    about_summary_zh: schoolOverview.intro.zh,
    about_summary_sv: schoolOverview.intro.sv,
    contact_email: contactInfo.email,
    contact_phone: contactInfo.phone,
    contact_address: contactInfo.address,
  };
}
