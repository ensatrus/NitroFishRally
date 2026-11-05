    const tabs = document.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    const activarPestana = (tab) => {
      tabs.forEach((item) => {
        item.setAttribute("aria-selected", String(item === tab));
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.dataset.seccion;
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activarPestana(tab));
    });