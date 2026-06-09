# Kinaskolan Preview

This folder contains the first preview build for the `kinaskolan.se` redesign.

Current scope:

- Homepage preview
- News page
- About page
- Student showcase page
- HSK page
- CMS-ready news data model for homepage and news listing

Notes:

- Built as a standalone static preview so the live site remains untouched
- Intended to move into a GitHub-based preview workflow first
- The first CMS-ready layer now lives in `data/news.json`
- Pages CMS config lives in `.pages.yml`
- Homepage latest news and `news.html` now read from the shared news data file
