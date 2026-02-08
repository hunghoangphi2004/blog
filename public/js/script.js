console.log("OK")

const toggle = document.querySelector(".toggle-dark-light");
const body = document.body;

toggle.addEventListener("click", () => {
    body.classList.toggle("theme-dark");
    body.classList.toggle("theme-light");
});

const menuHeader = document.querySelectorAll(".header .blog-menu .inner-menu-item");
menuHeader.forEach((menuItem)=>{
    menuItem.addEventListener("click", ()=>{
        menuHeader.forEach((item)=>item.classList.remove("active"))
        menuItem.classList.add("active");
    })
})

const navMobile = document.querySelector("#icon-mobile");
const blogMenu = document.querySelector(".header .inner-wrap .blog-menu");
if (navMobile) {
    navMobile.addEventListener("click", () => {
        if (blogMenu) {
            blogMenu.classList.add("active");
        }
    })
}

const closeToggle = document.querySelector(".header .inner-wrap .blog-menu .inner-menu .close-toggle");
if (closeToggle) {
    closeToggle.addEventListener("click", () => {
        if (blogMenu) {
            blogMenu.classList.remove("active");
        }
    })
}
function applyTagColor() {
    document.querySelectorAll(".tag-list .tag").forEach(tag => {
        tag.style.setProperty("--bg", tag.dataset.bg);
        tag.style.setProperty('--text', tag.dataset.text);
    });
}

applyTagColor();


// cach 1: query binh thuong
// const paginationButtons = document.querySelectorAll(".pagination .inner-wrap .pagination-item");
// if(paginationButtons){
//     paginationButtons.forEach((button) => {
//         let url = new URL(window.location.href)
//         button.addEventListener("click", ()=>{
//             const page = button.getAttribute("data-page");
//             url.searchParams.set("page", page);
//             window.location.href = url.href;
//         })
//     })
// }

// cach 2: ajax
function renderAllPosts(posts) {
    const container = document.querySelector(".all-blog-posts .row");
    container.innerHTML = "";

    posts.forEach(postItem => {
        container.innerHTML += `
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div class="post-item">
                <a href="#" target="_blank" class="post-item-image d-block">
                    <img class="post-item-image" src="/images/2tp.jpg" alt="">
                </a>

                <small class="author-date-color">
                    ${postItem.formattedDate}
                </small>

                <div class="post-title-row">
                    <a href="#" target="_blank" class="title-color title-size mt-1 fs-2">
                        ${postItem.title}
                    </a>
                    <a href="#" class="title-color post-title-icon">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>

                <p class="text-color post-subtitle-post-item">
                    ${postItem.content}
                </p>

                <ul class="tag-list">
                    ${renderTags(postItem.tagsDetail)}
                </ul>
            </div>
        </div>
        `;
    });
}

function renderPagination(pagi) {
    const ul = document.querySelector(".pagination-list");
    ul.innerHTML = "";

    for (let i = 1; i <= pagi.totalPage; i++) {
        ul.innerHTML += `
      <li class="pagination-item ${i === pagi.currentPage ? 'active' : ''}"
          data-page="${i}">
          ${i}
      </li>
    `;
    }
}

function renderTags(tags) {
    return tags.map(item => `
        <li class="tag"
            data-name="${item.name}"
            data-bg="${item.color.bg}"
            data-text="${item.color.text}">
            ${item.name}
        </li>
    `).join("");
}

function updatePrevNext(pagi) {
    const prevBtn = document.querySelector(".prev-button");
    const nextBtn = document.querySelector(".next-button");

    // prev
    if (pagi.currentPage <= 1) {
        prevBtn.classList.add("disabled");
        prevBtn.dataset.page = 1;
    } else {
        prevBtn.classList.remove("disabled");
        prevBtn.dataset.page = pagi.currentPage - 1;
    }

    // next
    if (pagi.currentPage >= pagi.totalPage) {
        nextBtn.classList.add("disabled");
        nextBtn.dataset.page = pagi.totalPage;
    } else {
        nextBtn.classList.remove("disabled");
        nextBtn.dataset.page = pagi.currentPage + 1;
    }
}


document.addEventListener("click", function (e) {
    const btn = e.target.closest(".pagination-item");
    if (!btn) return;

    const page = btn.dataset.page;
    if (!page || page < 1) return;

    fetch(`/?page=${page}`, {
        headers: { "X-Requested-With": "XMLHttpRequest" }
    })
        .then(res => res.json())
        .then(data => {
            renderAllPosts(data.allPosts);
            renderPagination(data.objectPagination);
            updatePrevNext(data.objectPagination);
            applyTagColor();
        });
});

window.scrollTo({ top: 0, behavior: "smooth" });
