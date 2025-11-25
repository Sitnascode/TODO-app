// Simple vanilla JS ToDo app
(function () {
  const STORAGE_KEY = "todo.tasks.v1";
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const listEl = document.getElementById("task-list");
  const remainingEl = document.getElementById("remaining");
  const filters = document.querySelectorAll(".filter");
  const clearBtn = document.getElementById("clear-btn");

  let tasks = loadTasks();
  let filter = "all";

  // initial render
  if (tasks.length === 0) {
    // friendly starter
    tasks = [
      {
        id: id(),
        text: "Welcome — add your first task!",
        done: false,
        created: Date.now(),
      },
    ];
    saveTasks();
  }
  render();

  addBtn.addEventListener("click", onAdd);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      onAdd();
    }
  });
  listEl.addEventListener("click", onListClick);
  listEl.addEventListener("dblclick", onListDblClick);
  filters.forEach((b) => b.addEventListener("click", onFilterClick));
  if (clearBtn) clearBtn.addEventListener("click", onClearCompleted);

  function onAdd() {
    const v = taskInput.value.trim();
    if (!v) return animateEmpty();
    tasks.unshift({ id: id(), text: v, done: false, created: Date.now() });
    taskInput.value = "";
    // small add-button animation to give feedback
    addBtn.classList.add("pop");
    setTimeout(() => addBtn.classList.remove("pop"), 160);
    // little logo nudge for delight
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.classList.add("new-pulse");
      setTimeout(() => logo.classList.remove("new-pulse"), 350);
    }
    saveTasks();
    render();
  }

  function animateEmpty() {
    taskInput.animate(
      [
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 220, iterations: 1 }
    );
  }

  function onListClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const idv = btn.closest(".task-item").dataset.id;
    if (action === "toggle") toggleTask(idv);
    if (action === "delete") deleteTask(idv);
  }

  // allow clicking the row (outside actions) to toggle completion
  listEl.addEventListener("click", function (e) {
    // if the click was handled by a data-action button, ignore here
    if (e.target.closest("[data-action]")) return;
    const li = e.target.closest(".task-item");
    if (!li) return;
    // don't toggle if click was on the edit input
    if (e.target.closest(".edit-input")) return;
    // don't toggle if click was inside task-actions area
    if (e.target.closest(".task-actions")) return;
    toggleTask(li.dataset.id);
  });

  function onListDblClick(e) {
    const li = e.target.closest(".task-item");
    if (!li) return;
    const idv = li.dataset.id;
    const txtEl = li.querySelector(".text");
    const old = txtEl.textContent;
    const input = document.createElement("input");
    input.value = old;
    input.className = "edit-input";
    txtEl.replaceWith(input);
    input.focus();
    input.select();
    input.addEventListener("blur", () => finishEdit(input, idv));
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        input.blur();
      }
    });
  }

  function finishEdit(input, idv) {
    const nv = input.value.trim();
    const idx = tasks.findIndex((t) => t.id === idv);
    if (idx > -1) {
      if (nv) tasks[idx].text = nv;
      else tasks.splice(idx, 1);
      saveTasks();
      render();
    }
  }

  function onFilterClick(e) {
    filters.forEach((f) => f.classList.remove("active"));
    e.currentTarget.classList.add("active");
    filter = e.currentTarget.dataset.filter;
    render();
  }

  function toggleTask(idv) {
    const t = tasks.find((t) => t.id === idv);
    if (!t) return;
    t.done = !t.done;
    saveTasks();
    render();
  }

  function deleteTask(idv) {
    tasks = tasks.filter((t) => t.id !== idv);
    saveTasks();
    render();
  }

  function onClearCompleted() {
    const doneCount = tasks.filter((t) => t.done).length;
    if (!doneCount) {
      // subtle shake on filters to indicate nothing to clear
      const el = document.querySelector(".filters");
      if (el)
        el.animate(
          [
            { transform: "translateX(-4px)" },
            { transform: "translateX(4px)" },
            { transform: "translateX(0)" },
          ],
          { duration: 260 }
        );
      return;
    }
    if (
      !confirm(`Clear ${doneCount} completed task${doneCount > 1 ? "s" : ""}?`)
    )
      return;
    tasks = tasks.filter((t) => !t.done);
    saveTasks();
    render();
  }

  function render() {
    listEl.innerHTML = "";

    // counts
    const total = tasks.length;
    const doneCount = tasks.filter((t) => t.done).length;
    const activeCount = total - doneCount;

    // update filter buttons to show counts
    filters.forEach((btn) => {
      const f = btn.dataset.filter;
      if (f === "all")
        btn.innerHTML = `All <span class="count">(${total})</span>`;
      if (f === "active")
        btn.innerHTML = `Active <span class="count">(${activeCount})</span>`;
      if (f === "done")
        btn.innerHTML = `Done <span class="count">(${doneCount})</span>`;
    });

    const filtered = tasks.filter((t) =>
      filter === "all" ? true : filter === "done" ? t.done : !t.done
    );

    filtered.forEach((t) => {
      const li = document.createElement("li");
      li.className = "task-item" + (t.done ? " done" : "");
      li.dataset.id = t.id;
      li.innerHTML = `
        <button class="icon-btn" data-action="toggle" title="toggle">
          <span class="check">${t.done ? "✓" : ""}</span>
        </button>
        <div class="text">${escapeHtml(t.text)}</div>
        <div class="task-actions">
          <button class="icon-btn delete" data-action="delete" title="delete" aria-label="Delete">
            <svg viewBox="0 0 24 24" width="18" height="18" focusable="false" aria-hidden="true">
              <path fill="currentColor" d="M6 7h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zm3 3v7h2v-7H9zm4 0v7h2v-7h-2zM9 4h6l1 2H8l1-2z"/>
            </svg>
          </button>
        </div>
      `;
      li.classList.add("new-pulse");
      listEl.appendChild(li);
    });

    // update remaining count (active tasks)
    remainingEl.textContent = activeCount;
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      /* ignore */
    }
  }

  function loadTasks() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v ? JSON.parse(v) : [];
    } catch (e) {
      return [];
    }
  }

  function id() {
    return Math.random().toString(36).slice(2, 9);
  }

  function escapeHtml(s) {
    return s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }
})();
