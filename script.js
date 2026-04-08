const heroImagePath = "images/Frame 2147223897.png";
const galleryImages = Array(6).fill(heroImagePath);

const mainImage = document.getElementById("mainImage");
const thumbRow = document.getElementById("thumbRow");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");
let activeIndex = 0;

function renderThumbs() {
  thumbRow.innerHTML = "";
  galleryImages.forEach((_, index) => {
    const thumbButton = document.createElement("button");
    thumbButton.type = "button";
    thumbButton.className = `thumb ${index === activeIndex ? "active" : ""}`;
    thumbButton.setAttribute("aria-label", `View image ${index + 1}`);

    thumbButton.addEventListener("click", () => {
      activeIndex = index;
      updateGallery();
    });
    thumbRow.appendChild(thumbButton);
  });
}

function updateGallery() {
  if (!mainImage) return;
  mainImage.src = galleryImages[activeIndex];
  renderThumbs();
}

if (prevImage && nextImage) {
  prevImage.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
  });

  nextImage.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % galleryImages.length;
    updateGallery();
  });

  updateGallery();
}

const faqItems = Array.from(document.querySelectorAll(".faq-item"));
faqItems.forEach((item) => {
  const trigger = item.querySelector(".faq-q");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
      }
    });
    item.classList.toggle("open");
  });
});

const appsTrack = document.getElementById("appsTrack");
const appsPrev = document.getElementById("appsPrev");
const appsNext = document.getElementById("appsNext");

if (appsTrack && appsPrev && appsNext) {
  const scrollAmount = 300;
  appsPrev.addEventListener("click", () => {
    appsTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  appsNext.addEventListener("click", () => {
    appsTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

const processSteps = [
  {
    tab: "Raw Material",
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    points: ["PE100 grade material", "Optimal molecular weight distribution"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=80"
  },
  {
    tab: "Extrusion",
    title: "Precision Extrusion Control",
    desc: "Computer-controlled extrusion systems maintain wall consistency across continuous production runs.",
    points: ["Automated melt pressure monitoring", "Uniform thickness across length"],
    image: "https://images.unsplash.com/photo-1561131989-b8112bafbd43?auto=format&fit=crop&w=1100&q=80"
  },
  {
    tab: "Cooling",
    title: "Calibrated Cooling Sequence",
    desc: "Multi-stage cooling locks dimensions and reduces stress before downstream handling.",
    points: ["Controlled water temperature", "Improved dimensional stability"],
    image: "https://images.unsplash.com/photo-1581092580502-feeb42f0d4f1?auto=format&fit=crop&w=1100&q=80"
  },
  {
    tab: "Sizing",
    title: "High-Accuracy Pipe Sizing",
    desc: "Online diameter checks ensure standards compliance and seamless fitting compatibility.",
    points: ["Real-time OD validation", "Reduced tolerance variation"],
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1100&q=80"
  },
  {
    tab: "Quality Control",
    title: "Comprehensive Quality Validation",
    desc: "Every batch is tested for pressure resistance, dimensional integrity, and long-term durability.",
    points: ["Hydrostatic pressure tests", "Traceable QA documentation"],
    image: "https://images.unsplash.com/photo-1464047736619-54df26f5b35f?auto=format&fit=crop&w=1100&q=80"
  },
  {
    tab: "Marking",
    title: "Clear Product Identification",
    desc: "Automated marking applies standard-compliant identifiers for traceability and field operations.",
    points: ["Batch and grade coding", "UV-stable printed markings"],
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1100&q=80"
  },
  {
    tab: "Cutting",
    title: "Precision Length Cutting",
    desc: "Servo-guided cutting delivers clean edges and exact lengths for efficient installation.",
    points: ["Programmable cut lengths", "Burr-minimized edge quality"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80"
  },
  {
    tab: "Packaging",
    title: "Secure Packaging and Dispatch",
    desc: "Final products are packed and protected for safe transportation and rapid site deployment.",
    points: ["Moisture-protected wraps", "Labelled dispatch bundles"],
    image: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1100&q=80"
  }
];

const tabsWrap = document.getElementById("processTabs");
const processTitle = document.getElementById("processTitle");
const processDesc = document.getElementById("processDesc");
const processPoints = document.getElementById("processPoints");
const processImage = document.getElementById("processImage");
const processPrev = document.getElementById("processPrev");
let stepIndex = 0;

function renderProcess() {
  if (!tabsWrap) return;
  tabsWrap.innerHTML = "";

  processSteps.forEach((step, index) => {
    const tabButton = document.createElement("button");
    tabButton.type = "button";
    tabButton.textContent = step.tab;
    tabButton.className = index === stepIndex ? "active" : "";
    tabButton.addEventListener("click", () => {
      stepIndex = index;
      updateProcess();
    });
    tabsWrap.appendChild(tabButton);
  });
}

function updateProcess() {
  const step = processSteps[stepIndex];
  if (!step) return;

  if (processTitle) processTitle.textContent = step.title;
  if (processDesc) processDesc.textContent = step.desc;
  if (processImage) processImage.src = step.image;

  if (processPoints) {
    processPoints.innerHTML = "";
    step.points.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      processPoints.appendChild(li);
    });
  }

  renderProcess();
}

if (tabsWrap) {
  updateProcess();
}

if (processPrev) {
  processPrev.addEventListener("click", () => {
    stepIndex = (stepIndex - 1 + processSteps.length) % processSteps.length;
    updateProcess();
  });
}
