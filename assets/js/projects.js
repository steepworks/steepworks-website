const projectsData = {
    spider: {
        title: "Cass Bay",
        category: "drilling, extreme",
        year: "2025",
        location: "Christchurch, Canterbury",
        status: "Completed",
        visible: true,
        description:
            "Specialized spider digger work on challenging terrain with tight access needs.",
        images: [
            "static/img/projects/Cass Bay/cassbay_drilling.jpg",
            "static/img/projects/Cass Bay/cassbay_driller.jpg",
            "static/img/projects/Cass Bay/cassbay_lateral.jpg",
        ],
    },
    slope: {
        title: "Alderson Valley",
        category: "excavation",
        year: "2024",
        location: "Banks Peninsula",
        status: "Completed",
        visible: true,
        description:
            "Cutting and benching on steep ground with stability controls in place.",
        images: [
            "static/img/projects/Alderson Valley/big_tree_L.JPG",
            "static/img/projects/Alderson Valley/Harvey_farm_steep_HQ.jpg",
            "static/img/projects/Alderson Valley/uneven_road.jpg",
            "static/img/projects/Alderson Valley/belmat_sfondo.jpg",
        ],
    },
    drilling: {
        title: "Riordan Creek",
        category: "drilling",
        year: "2024",
        location: "Canterbury",
        status: "In Progress",
        visible: true,
        description:
            "Production drilling with slope-safe positioning and spoil control.",
        images: [
            "static/img/projects/Cass Bay/cassbay_driller.jpg",
            "static/img/projects/Cass Bay/cassbay_lateral.jpg",
            "static/img/projects/Cass Bay/Harvey_farm_steep_HQ.jpg",
        ],
    },
    trenching: {
        title: "Trenching Work",
        category: "excavation, extreme",
        year: "2023",
        location: "Canterbury",
        status: "Completed",
        visible: false,
        description:
            "Service trenching on uneven terrain with erosion protection measures.",
        images: [
            "static/img/HQ/littlequarry_climb.jpg",
            "static/img/HQ/Gorse_climb_L.jpg",
            "static/img/HQ/prequarry_L.jpg",
        ],
    },
    landscaping1: {
        title: "Landscaping Project",
        category: "extreme, landscaping",
        year: "2023",
        location: "Christchurch",
        status: "Completed",
        visible: false,
        description:
            "Sculpting, planting prep, and access shaping for premium residential terrain.",
        images: [
            "static/img/HQ/front_artistic.jpg",
            "static/img/HQ/fairysgrove.jpg",
            "static/img/HQ/belmat_sfondo.jpg",
        ],
    },
    landscaping2: {
        title: "Landscaping Work",
        category: "extreme, landscaping",
        year: "2024",
        location: "Canterbury",
        status: "In Progress",
        visible: false,
        description:
            "Grading, shaping, and planting berms with low-impact machinery.",
        images: [
            "static/img/HQ/little_quarry_us.JPG",
            "static/img/HQ/pexels2.jpg",
            "static/img/HQ/pexels3.jpg",
        ],
    },
    services: {
        title: "Drilling Services",
        category: "drilling, services",
        year: "2025",
        location: "Kaikoura Region",
        status: "Planned",
        visible: false,
        description:
            "Rope-assisted drilling for remote slopes with minimal footprint.",
        images: [
            "static/img/HQ/kaikoura_rope_access.jpg",
            "static/img/HQ/prequarry_climb.jpg",
            "static/img/HQ/Bauma.jpg",
        ],
    },
    technology: {
        title: "Spider Digger Technology",
        category: "drilling, technology",
        year: "2025",
        location: "Canterbury",
        status: "Completed",
        visible: false,
        description:
            "Showcase of spider digger versatility on technical hillside work.",
        images: [
            "static/img/HQ/show_us.jpg",
            "static/img/HQ/Val_face.JPG",
            "static/img/HQ/Droneview_L.JPG",
        ],
    },
};

// Function to apply project visibility based on the visible property
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
        <h6>Project Details</h6>
        <ul>
            <li><strong>Location:</strong> ${data.location}</li>
            <li><strong>Category:</strong> ${catList}</li>
            <li><strong>Status:</strong> ${data.status}</li>
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
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1));
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
