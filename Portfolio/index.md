---
layout: base
title: Portfolio
description: 蔡承芳的繪畫作品集，收錄完整作品、細節與創作記錄。
---

<link rel="stylesheet" href="{{ '/Portfolio/assets/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/section-pages.css' | relative_url }}">

<div class="portfolio-index">
  <header class="section-page-header">
    <h1 class="section-page-title">Portfolio</h1>
    <p class="section-page-description">繪畫作品、細節與創作記錄。</p>
  </header>

  {%- assign artworks = site.pages | where: "type", "artwork" | where: "published", true | sort: "year" | reverse -%}
  {%- if artworks.size > 0 -%}
  <div class="portfolio-grid">
    {%- for artwork in artworks -%}
    <article class="portfolio-work">
      <a href="{{ artwork.url | relative_url }}" class="portfolio-work__image">
        {%- if artwork.cover_ready and artwork.cover -%}
        <img src="{{ artwork.thumbnail | default: artwork.cover | relative_url }}" alt="{{ artwork.cover_alt | default: artwork.title | escape }}" loading="lazy">
        {%- endif -%}
      </a>
      <div class="portfolio-work__text">
        <h2><a href="{{ artwork.url | relative_url }}">〈{{ artwork.title | escape }}〉</a></h2>
        <p>{{ artwork.year }}{% if artwork.availability_label %} · {{ artwork.availability_label }}{% endif %}</p>
      </div>
    </article>
    {%- endfor -%}
  </div>
  {%- else -%}
  <p>作品整理中。</p>
  {%- endif -%}
</div>
