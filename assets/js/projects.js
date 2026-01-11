const projectsData = {
    spider: {
        title: "Cass Bay",
        category: "drilling, rope access",
        year: "2025",
        location: "Christchurch, Canterbury",
        client: "Rock Control",
        visible: true,
        description:
            "Utilising our 9t Euromach spider digger with our custom made attachment to support a Marini pneumatic rock drill; we installed 15xRB25 rock anchors into 90mm diameter holes, 6m lengths. 10m height slope, very restricted access (1 carpark). Zero traffic disruption during the operation.",
        images: [
            "static/img/projects/Cass Bay/cassbay_drilling.webp",
            "static/img/projects/Cass Bay/cassbay_driller.webp",
            "static/img/projects/Cass Bay/cassbay_lateral.webp",
            "static/img/projects/Cass Bay/drilling_detailed.webp",
            "static/img/projects/Cass Bay/Cass_bay_drilling_back.webp",
            "static/img/projects/Cass Bay/Cass_bay_drilling_low.webp",
        ],
    },
    slope: {
        title: "Alderson Valley",
        category: "excavation, extreme",
        year: "2024",
        location: "Port Hills, Canterbury",
        client: "Harvey Harmstrong",
        visible: true,
        description:
            "A fallen tree located on a 35‑degree slope was safely removed, followed by the creation of a controlled access route to reach and process a second tree further upslope.\nA 6,000‑litre repurposed train tank was subsequently installed below ground level to provide dedicated emergency water storage for fire protection.\nAll activities were carried out with minimal ground disturbance, without the need for road construction or benching, made possible by the spider excavator’s independently articulated legs.",
        images: [
            "static/img/projects/Alderson Valley/big_tree_L.webp",
            "static/img/projects/Alderson Valley/P_20241019_155713.webp",
            "static/img/projects/Alderson Valley/FallenTree_side.jpg",
            "static/img/projects/Alderson Valley/uneven_road.webp",
            "static/img/projects/Alderson Valley/spider_Behind_tank.jpg",
            "static/img/projects/Alderson Valley/P_20240901_153100.webp",
            "static/img/projects/Alderson Valley/P_20241005_164046.webp",
            "static/img/projects/Alderson Valley/PXL_20260109_031550040.webp",
        ],
    },
    drilling: {
        title: "Riordan Creek",
        category: "drilling, rope access",
        year: "2025",
        location: "Lewis Pass, Canterbury",
        client: "Rock Control",
        visible: true,
        description:
            "Production drilling with slope-safe positioning and spoil control.",
        images: [
            "static/img/projects/Riordan creek/Val_rope.webp",
        ],
    },
    trenching: {
        title: "Trenching Work",
        category: "excavation, extreme",
        year: "2023",
        location: "Canterbury",
        client: "Completed",
        visible: false,
        description:
            "Service trenching on uneven terrain with erosion protection measures.",
        images: [
            "static/img/projects/Alderson Valley/big_tree_L.webp",
            "static/img/projects/Alderson Valley/uneven_road.webp",
            "static/img/projects/Alderson Valley/belmat_sfondo.webp",
        ],
    },
    landscaping1: {
        title: "Landscaping Project",
        category: "extreme, landscaping",
        year: "2023",
        location: "Christchurch",
        client: "Completed",
        visible: false,
        description:
            "Sculpting, planting prep, and access shaping for premium residential terrain.",
        images: [
            "static/img/HD/front_artistic.webp",
            "static/img/HD/fairysgrove.webp",
            "static/img/projects/Alderson Valley/belmat_sfondo.webp",
        ],
    },
    landscaping2: {
        title: "Landscaping Work",
        category: "extreme, landscaping",
        year: "2024",
        location: "Canterbury",
        client: "In Progress",
        visible: false,
        description:
            "Grading, shaping, and planting berms with low-impact machinery.",
        images: [
            "static/img/HD/little_quarry_us.webp",
        ],
    },
    services: {
        title: "Drilling Services",
        category: "drilling, rope access",
        year: "2025",
        location: "Kaikoura Region",
        client: "Planned",
        visible: false,
        description:
            "Rope-assisted drilling for remote slopes with minimal footprint.",
        images: [
            "static/img/HD/kaikoura_rope_access.webp",
            "static/img/HD/prequarry_climb.webp",
            "static/img/HD/Bauma.webp",
        ],
    },
    technology: {
        title: "Spider Digger Technology",
        category: "drilling",
        year: "2025",
        location: "Canterbury",
        client: "Completed",
        visible: false,
        description:
            "Showcase of spider digger versatility on technical hillside work.",
        images: [
            "static/img/HD/show_us.webp",
            "static/img/HD/Val_face.webp",
            "static/img/HD/Droneview_L.webp",
        ],
    },
};

// Function to apply project visibility based on the visible property
// Function to update project card tags based on category
function updateProjectTags() {
    Object.keys(projectsData).forEach((key) => {
        const project = projectsData[key];
        const projectCard = document.querySelector(
            `.project-card-custom[data-project="${key}"]`
        );
        if (projectCard) {
            const projectItem = projectCard.closest('.project-item');
            if (projectItem) {
                projectItem.setAttribute('data-category', project.category);
            }
            const overlayBottom = projectCard.querySelector('.project-overlay-bottom');
            if (overlayBottom) {
                // Remove all existing badges
                overlayBottom.innerHTML = '';
                // Add a badge for each category
                (project.category || '').split(',').map(t => t.trim()).filter(Boolean).forEach(cat => {
                    const span = document.createElement('span');
                    span.className = 'badge brand-green-bg';
                    span.textContent = cat.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    overlayBottom.appendChild(span);
                });
            }
        }
    });
}

// Call this after DOM is loaded and after cards are rendered
document.addEventListener('DOMContentLoaded', () => {
    updateProjectTags();
    applyProjectVisibility();
});
function applyProjectVisibility() {
    Object.keys(projectsData).forEach((key) => {
        const project = projectsData[key];
        const projectCard = document.querySelector(
            `.project-card-custom[data-project="${key}"]`
        );
        if (projectCard) {
            const projectItem = projectCard.closest(".project-item");
            if (projectItem) {
                if (project.visible === false) {
                    projectItem.style.display = "none";
                } else {
                    projectItem.style.display = "";
                }
            }
        }
    });
}

let currentProjectKey = null;
let currentImageIndex = 0;
let fadeOutTimeout = null;
let fadeInTimeout = null;

function renderDetails(data) {
    const details = document.getElementById("projectDetails");
    if (!details || !data) return;
    const catList = (data.category || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
        .join(", ");
    details.innerHTML = `
        <ul>
            <li><strong>Client:</strong> ${data.client}</li>
            <li><strong>Location:</strong> ${data.location}</li>
            <li><strong>Category:</strong> ${catList}</li>
            <li><strong>Year:</strong> ${data.year}</li>
        </ul>
        <h6>Description</h6>
        <p>${data.description}</p>
    `;
}

function renderThumbnails(data) {
    const container = document.getElementById("projectThumbnails");
    if (!container || !data) return;
    container.innerHTML = "";
    data.images.forEach((src, idx) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `${data.title} ${idx + 1}`;
        img.className = "thumbnail" + (idx === 0 ? " active" : "");
        img.dataset.index = idx;
        img.addEventListener("click", () => changeModalImage(idx));
        container.appendChild(img);
    });
}

function renderModalImage(index) {
    const data = projectsData[currentProjectKey];
    if (!data) return;
    currentImageIndex = index;
    const mainImg = document.getElementById("modalMainImage");
    const image = data.images[index];
    if (!mainImg || !image) return;

    if (fadeOutTimeout) clearTimeout(fadeOutTimeout);
    if (fadeInTimeout) clearTimeout(fadeInTimeout);
    mainImg.classList.remove("fade-out", "fade-in");

    mainImg.classList.add("fade-out");

    fadeOutTimeout = setTimeout(() => {
        mainImg.src = image;
        mainImg.alt = `${data.title} ${index + 1}`;
        mainImg.classList.remove("fade-out");
        mainImg.classList.add("fade-in");

        fadeInTimeout = setTimeout(() => {
            mainImg.classList.remove("fade-in");
        }, 300);
    }, 150);

    document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
    });
}

function changeModalImage(idx) {
    const data = projectsData[currentProjectKey];
    if (!data) return;
    const nextIndex = typeof idx === "number" ? idx : 0;
    renderModalImage(nextIndex);
}

function showPrevImage(evt) {
    if (evt) evt.stopPropagation();
    const data = projectsData[currentProjectKey];
    if (!data) return;
    const nextIndex =
        (currentImageIndex - 1 + data.images.length) % data.images.length;
    renderModalImage(nextIndex);
}

function showNextImage(evt) {
    if (evt) evt.stopPropagation();
    const data = projectsData[currentProjectKey];
    if (!data) return;
    const nextIndex = (currentImageIndex + 1) % data.images.length;
    renderModalImage(nextIndex);
}

function openProject(projectKey) {
    const data = projectsData[projectKey];
    if (!data) return;
    currentProjectKey = projectKey;
    currentImageIndex = 0;
    const titleEl = document.getElementById("projectModalLabel");
    if (titleEl) titleEl.textContent = data.title;
    renderThumbnails(data);
    renderDetails(data);
    renderModalImage(0);
    const modalEl = document.getElementById("projectModal");
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
}

function setBadgesFromCategory() {
    document.querySelectorAll(".project-card-custom").forEach((card) => {
        const item = card.closest(".project-item");
        const cats = (item?.getAttribute("data-category") || "")
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
            .map((c) => c.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
        const badgeWrap = card.querySelector(".project-overlay-bottom");
        if (badgeWrap && cats.length) {
            badgeWrap.innerHTML = cats
                .map((c) => `<span class="badge brand-green-bg">${c}</span>`)
                .join("");
        }
    });
}

document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("projectModal");
    if (!modal || !modal.classList.contains("show")) return;
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrevImage();
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNextImage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectItems = document.querySelectorAll('.project-item');

    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter').toLowerCase();

            projectItems.forEach(item => {
                const projectCard = item.querySelector('.project-card-custom');
                const projectKey = projectCard ? projectCard.getAttribute('data-project') : null;
                const projectData = projectKey ? projectsData[projectKey] : null;
                
                // Check if project is visible in data
                if (projectData && projectData.visible === false) {
                    item.style.display = 'none';
                    return;
                }
                
                const categories = (item.getAttribute('data-category') || '')
                    .toLowerCase()
                    .split(',')
                    .map(t => t.trim())
                    .filter(Boolean);
                const matches = filterValue === 'all' || categories.includes(filterValue);
                item.style.display = matches ? '' : 'none';
            });

            // Immediately reveal any newly shown items without requiring scroll
            animateOnScroll();
        });
    });

    // Set initial styles for animation
    document.querySelectorAll('.project-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Apply project visibility based on visible property
    applyProjectVisibility();

    // Apply initial filter state on load (respects any preset active button) and reveal immediately
    const initialFilter = document.querySelector('[data-filter].active') || filterButtons[0];
    if (initialFilter) initialFilter.click();
    animateOnScroll();

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    document.querySelectorAll(".project-card-custom").forEach((card) => {
        card.addEventListener("click", () => {
            openProject(card.dataset.project);
        });
    });
    setBadgesFromCategory();
});
