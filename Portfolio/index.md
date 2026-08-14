---
layout: base
title: Portfolio
description: 蔡承芳的繪畫作品集，收錄完整作品、細節與創作記錄。
---

<link rel="stylesheet" href="{{ '/Portfolio/assets/portfolio.css' | relative_url }}">

<div class="portfolio-index">
  <header class="portfolio-index__header">
    <p>Selected Works</p>
    <h1>Portfolio</h1>
    <p>繪畫作品、細節與創作記錄。</p>
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
        {%- if artwork.title_en -%}<p>{{ artwork.title_en | escape }}</p>{%- endif -%}
        <dl class="portfolio-work__meta">
          <div><dt>作者</dt><dd>{{ artwork.artist | default: 'Fung 蔡承芳' | escape }}</dd></div>
          <div><dt>作品編號</dt><dd>{{ artwork.artwork_id | escape }}</dd></div>
          <div><dt>年份</dt><dd>{{ artwork.year }}</dd></div>
          <div><dt>媒材</dt><dd>{{ artwork.medium | join: '、' }}</dd></div>
          <div><dt>尺寸</dt><dd>{{ artwork.dimensions.width_cm }} × {{ artwork.dimensions.height_cm }} cm</dd></div>
          {%- if artwork.availability_label -%}<div><dt>狀態</dt><dd>{{ artwork.availability_label | escape }}</dd></div>{%- endif -%}
        </dl>
        <a class="portfolio-work__more" href="{{ artwork.url | relative_url }}">查看完整作品資料 →</a>
      </div>
    </article>
    {%- endfor -%}
  </div>
  {%- else -%}
  <p>作品整理中。</p>
  {%- endif -%}
</div>
