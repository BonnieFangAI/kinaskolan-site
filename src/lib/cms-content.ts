import {
  activityCategories,
  contactInfo,
  courses,
  hskInfo,
  newsItems,
  teachers,
  ui,
  type ActivityCategory,
  type CourseItem,
  type LocalizedText,
  type NewsItem,
  type TeacherProfile,
} from "@/lib/site-content";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Row = Record<string, unknown>;

export type SiteSettingsContent = {
  hero: {
    title: LocalizedText;
    subtitle: LocalizedText;
  };
  aboutSummary: LocalizedText;
  contact: {
    address: string;
    email: string;
    phone: string;
  };
};

function text(row: Row, key: string, fallback = "") {
  return String(row[key] ?? fallback);
}

function bodyParagraphs(value: unknown) {
  return String(value ?? "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function selectRows(table: string, orderColumn?: string, ascending = false) {
  if (!hasSupabaseEnv()) {
    return null;
  }

  try {
    const supabase = await createSupabaseServerClient();
    let query = supabase.from(table).select("*");

    if (orderColumn) {
      query = query.order(orderColumn, { ascending, nullsFirst: false });
    }

    const { data, error } = await query;
    if (error) {
      return null;
    }

    return data as Row[];
  } catch {
    return null;
  }
}

export async function getSiteSettingsContent(): Promise<SiteSettingsContent> {
  const rows = await selectRows("site_settings");
  const zh = rows?.find((row) => row.locale === "zh");
  const sv = rows?.find((row) => row.locale === "sv");

  return {
    hero: {
      title: {
        zh: text(zh ?? {}, "hero_title", ui.hero.title.zh),
        sv: text(sv ?? {}, "hero_title", ui.hero.title.sv),
      },
      subtitle: {
        zh: text(zh ?? {}, "hero_subtitle", ui.hero.subtitle.zh),
        sv: text(sv ?? {}, "hero_subtitle", ui.hero.subtitle.sv),
      },
    },
    aboutSummary: {
      zh: text(zh ?? {}, "about_summary", ""),
      sv: text(sv ?? {}, "about_summary", ""),
    },
    contact: {
      address: text(zh ?? sv ?? {}, "contact_address", contactInfo.address),
      email: text(zh ?? sv ?? {}, "contact_email", contactInfo.email),
      phone: text(zh ?? sv ?? {}, "contact_phone", contactInfo.phone),
    },
  };
}

export async function getNewsContent(): Promise<NewsItem[]> {
  const rows = await selectRows("news_posts", "published_at");
  if (!rows) {
    return newsItems;
  }

  return rows.map((row) => ({
    slug: text(row, "slug"),
    date: text(row, "published_at").slice(0, 10),
    image: text(row, "cover_image_path", "/original/sodralatin.jpg"),
    featured: Boolean(row.is_featured),
    title: {
      zh: text(row, "title_zh"),
      sv: text(row, "title_sv"),
    },
    excerpt: {
      zh: text(row, "excerpt_zh"),
      sv: text(row, "excerpt_sv"),
    },
    body: {
      zh: bodyParagraphs(row.body_zh),
      sv: bodyParagraphs(row.body_sv),
    },
  }));
}

export async function getTeacherContent(): Promise<TeacherProfile[]> {
  const rows = await selectRows("teachers", "sort_order", true);
  if (!rows) {
    return teachers;
  }

  return rows.map((row) => ({
    name: text(row, "name"),
    role: {
      zh: text(row, "position_zh"),
      sv: text(row, "position_sv"),
    },
    bio: {
      zh: text(row, "biography_zh"),
      sv: text(row, "biography_sv"),
    },
    focus: {
      zh: text(row, "focus_zh"),
      sv: text(row, "focus_sv"),
    },
    image: text(row, "image_path", "/original/logo-ruiqing.png"),
  }));
}

export async function getCourseContent(): Promise<CourseItem[]> {
  const rows = await selectRows("courses", "sort_order", true);
  if (!rows) {
    return courses;
  }

  return rows.map((row) => ({
    name: {
      zh: text(row, "name_zh"),
      sv: text(row, "name_sv"),
    },
    ageGroup: {
      zh: text(row, "age_group_zh"),
      sv: text(row, "age_group_sv"),
    },
    objective: {
      zh: text(row, "learning_objective_zh", text(row, "description_zh")),
      sv: text(row, "learning_objective_sv", text(row, "description_sv")),
    },
    textbook: {
      zh: text(row, "textbook_zh"),
      sv: text(row, "textbook_sv"),
    },
  }));
}

export async function getStudentWorkContent(): Promise<ActivityCategory[]> {
  const rows = await selectRows("student_works", "event_date");
  if (!rows) {
    return activityCategories;
  }

  return rows.map((row) => ({
    key: text(row, "slug"),
    title: {
      zh: text(row, "title_zh"),
      sv: text(row, "title_sv"),
    },
    summary: {
      zh: text(row, "summary_zh"),
      sv: text(row, "summary_sv"),
    },
    highlights: Array.isArray(row.highlights_zh)
      ? (row.highlights_zh as string[]).map((item) => ({ zh: item, sv: item }))
      : [],
    image: text(row, "cover_image_path", "/original/ambassador-2026-stage.jpg"),
  }));
}

export async function getHskContent() {
  const rows = await selectRows("hsk_updates", "exam_date");
  if (!rows) {
    return hskInfo;
  }

  return {
    ...hskInfo,
    notices: rows.map((row) => ({
      title: {
        zh: text(row, "title_zh"),
        sv: text(row, "title_sv"),
      },
      summary: {
        zh: text(row, "summary_zh"),
        sv: text(row, "summary_sv"),
      },
    })),
  };
}
