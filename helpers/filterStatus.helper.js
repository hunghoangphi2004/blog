module.exports = (query) => {
    filterStatus = [
          {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Nháp",
            status: "draft",
            class: ""
        },
        {
            name: "Đã duyệt",
            status: "published",
            class: ""
        },
    ]

    if (query.status) {
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    return filterStatus;
}