---
layout: base
title: Blog
---

{%- assign categories = "tech|前端技術 × 筆記,painting|水墨膠彩 × 絹本,life|生活藝術 × 日常" | split: "," -%}

<h1 class="blog-page-title">Blog</h1>

<div class="blog-layout">
  <nav class="blog-sidebar" aria-label="文章分類">
    <ul>
      {%- for entry in categories -%}
        {%- assign parts = entry | split: "|" -%}
        {%- assign key = parts[0] -%}
        {%- assign label = parts[1] -%}
        {%- assign posts = site.pages | where_exp: "p", "p.section == key" | sort: "date" | reverse -%}
        {%- if posts.size > 0 -%}
      <li><a href="#{{ key }}">{{ label }}</a></li>
        {%- endif -%}
      {%- endfor -%}
    </ul>
  </nav>

  <div class="blog-main">
    {%- for entry in categories -%}
      {%- assign parts = entry | split: "|" -%}
      {%- assign key = parts[0] -%}
      {%- assign label = parts[1] -%}
      {%- assign posts = site.pages | where_exp: "p", "p.section == key" | sort: "date" | reverse -%}
      {%- if posts.size > 0 %}
    <section id="{{ key }}" class="blog-group">
      <h2>{{ label }}</h2>
      <ul class="blog-list">
        {%- for post in posts %}
        <li class="blog-item">
          <a href="{{ post.url | relative_url }}" class="blog-title">{{ post.title }}</a>
          {%- if post.image %}
          <a href="{{ post.url | relative_url }}" class="blog-thumb">
            <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}" loading="lazy">
          </a>
          {%- endif %}
        </li>
        {%- endfor %}
      </ul>
    </section>
      {%- endif -%}
    {%- endfor %}
  </div>
</div>

<style>
  .blog-layout {
    display: flex;
    align-items: flex-start;
    gap: 2.5rem;
  }
  .blog-sidebar {
    flex: 0 0 180px;
    position: sticky;
    top: 1.5rem;
  }
  .blog-sidebar ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .blog-sidebar li + li {
    margin-top: 0.5rem;
  }
  .blog-sidebar a {
    text-decoration: none;
  }
  .blog-main {
    flex: 1;
    min-width: 0;
  }
  .blog-group + .blog-group {
    margin-top: 2rem;
  }
  .blog-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .blog-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  .blog-thumb {
    flex: 0 0 auto;
    display: block;
  }
  .blog-thumb img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
  }
  .blog-title {
    flex: 1;
    min-width: 0;
    text-decoration: none;
  }
  .blog-page-title {
    text-align: center;
  }
  @media (max-width: 800px) {
    .blog-layout {
      display: block;
    }
    .blog-sidebar {
      position: static;
      margin-bottom: 1.5rem;
    }
  }
</style>