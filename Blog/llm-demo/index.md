---
layout: page/blog/blog
title: "Gemini 聊天 Demo"
date: 2026-07-22
---

> 這是一個純前端的小工具：你的 Google AI API Key 只會存在**你自己瀏覽器的 localStorage**、只從瀏覽器直接打去 Google 的 Gemini API，不會經過本站任何伺服器（本站是純靜態網站，本來就沒有後端可以經手）。換瀏覽器、換裝置要重新貼一次 Key。

<div id="llm-demo" style="display:flex;flex-wrap:wrap;gap:16px;border:1px solid #e5d6e0;border-radius:16px;padding:16px;background:#fff;color:#333;">

  <!-- 左側：API Key -->
  <div style="flex:1 1 220px;max-width:260px;display:flex;flex-direction:column;gap:8px;">
    <label for="llm-api-key" style="font-weight:700;">Google AI API Key</label>
    <input id="llm-api-key" type="password" placeholder="貼上你的 API Key"
      style="padding:8px 10px;border:1px solid #e5d6e0;border-radius:8px;font-size:14px;">
    <div style="font-size:13px;color:#999;">
      去 <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a> 免費申請一組。<br>
      Key 只存在你的瀏覽器（localStorage），不會送到本站伺服器。
    </div>
    <label for="llm-model" style="font-weight:700;margin-top:8px;">模型</label>
    <select id="llm-model" style="padding:8px 10px;border:1px solid #e5d6e0;border-radius:8px;font-size:14px;">
      <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite（免費額度）</option>
      <option value="gemini-2.0-flash">gemini-2.0-flash</option>
      <option value="gemini-2.5-flash">gemini-2.5-flash</option>
      <option value="gemini-2.5-pro">gemini-2.5-pro（較強、較慢）</option>
    </select>
    <button id="llm-clear" type="button"
      style="cursor:pointer;border:none;border-radius:999px;padding:8px 16px;margin-top:8px;
             background:#cbb8c9;color:#fff;font-weight:700;">
      清空對話
    </button>
  </div>

  <!-- 右側：聊天區 -->
  <div style="flex:3 1 360px;display:flex;flex-direction:column;gap:10px;min-width:280px;">
    <!-- 右上：AI 回覆／對話紀錄 -->
    <div id="llm-log" style="flex:1;min-height:360px;max-height:480px;overflow-y:auto;
         border:1px solid #e5d6e0;border-radius:12px;padding:12px;background:#faf7f9;">
      <div style="color:#999;font-size:14px;">對話會顯示在這裡，包含之前問過的內容（history 會一起帶給 AI）。</div>
    </div>

    <!-- 右下：Prompt 輸入 -->
    <div style="display:flex;gap:8px;align-items:flex-end;">
      <textarea id="llm-input" rows="3" placeholder="輸入你的訊息…（Enter 送出，Shift+Enter 換行）"
        style="flex:1;padding:10px;border:1px solid #e5d6e0;border-radius:10px;font-size:14px;resize:vertical;font-family:inherit;"></textarea>
      <button id="llm-send" type="button"
        style="cursor:pointer;border:none;border-radius:999px;padding:10px 20px;
               background:#7ecfd6;color:#fff;font-weight:700;white-space:nowrap;">
        送出
      </button>
    </div>
  </div>

</div>

<script>
(function () {
  var STORAGE_KEY = "llmDemoApiKey";
  var keyInput   = document.getElementById("llm-api-key");
  var modelSelect = document.getElementById("llm-model");
  var log        = document.getElementById("llm-log");
  var input      = document.getElementById("llm-input");
  var sendBtn    = document.getElementById("llm-send");
  var clearBtn   = document.getElementById("llm-clear");

  var history = []; // { role: "user" | "model", parts: [{ text }] }

  // 還原上次存的 API Key
  var savedKey = localStorage.getItem(STORAGE_KEY);
  if (savedKey) keyInput.value = savedKey;
  keyInput.addEventListener("input", function () {
    localStorage.setItem(STORAGE_KEY, keyInput.value.trim());
  });

  function addBubble(role, text) {
    var wrap = document.createElement("div");
    wrap.style.marginBottom = "10px";
    wrap.style.textAlign = role === "user" ? "right" : "left";

    var bubble = document.createElement("span");
    bubble.style.display = "inline-block";
    bubble.style.maxWidth = "85%";
    bubble.style.padding = "8px 12px";
    bubble.style.borderRadius = "12px";
    bubble.style.fontSize = "14px";
    bubble.style.whiteSpace = "pre-wrap";
    bubble.style.textAlign = "left";
    if (role === "user") {
      bubble.style.background = "#7ecfd6";
      bubble.style.color = "#fff";
    } else if (role === "error") {
      bubble.style.background = "#f7d6d6";
      bubble.style.color = "#8a2b2b";
    } else {
      bubble.style.background = "#eee2ea";
      bubble.style.color = "#333";
    }
    bubble.textContent = text;
    wrap.appendChild(bubble);
    log.appendChild(wrap);
    log.scrollTop = log.scrollHeight;
    return bubble;
  }

  function setSending(isSending) {
    sendBtn.disabled = isSending;
    input.disabled = isSending;
    sendBtn.textContent = isSending ? "…" : "送出";
  }

  async function sendMessage() {
    var text = input.value.trim();
    if (!text) return;

    var apiKey = keyInput.value.trim();
    if (!apiKey) {
      addBubble("error", "請先在左邊貼上你的 Google AI API Key。");
      return;
    }

    addBubble("user", text);
    history.push({ role: "user", parts: [{ text: text }] });
    input.value = "";

    var thinkingBubble = addBubble("model", "思考中…");
    setSending(true);

    var model = modelSelect.value;
    var url = "https://generativelanguage.googleapis.com/v1beta/models/" +
              model + ":generateContent?key=" + encodeURIComponent(apiKey);

    try {
      var res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history }),
      });
      var data = await res.json();

      if (!res.ok) {
        var msg = (data && data.error && data.error.message) || ("HTTP " + res.status);
        thinkingBubble.parentElement.remove();
        addBubble("error", "發生錯誤：" + msg);
        return;
      }

      var replyText = "";
      try {
        replyText = data.candidates[0].content.parts.map(function (p) { return p.text || ""; }).join("");
      } catch (e) {
        replyText = "";
      }
      if (!replyText) {
        thinkingBubble.parentElement.remove();
        addBubble("error", "沒有收到回覆內容，可能被安全過濾擋下，換個問法試試。");
        return;
      }

      thinkingBubble.textContent = replyText;
      history.push({ role: "model", parts: [{ text: replyText }] });
    } catch (err) {
      thinkingBubble.parentElement.remove();
      addBubble("error", "連線失敗：" + err.message);
    } finally {
      setSending(false);
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  clearBtn.addEventListener("click", function () {
    history = [];
    log.innerHTML = '<div style="color:#999;font-size:14px;">對話已清空。</div>';
  });
})();
</script>
