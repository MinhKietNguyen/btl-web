let btn = document.querySelector("#btn");

let sidebar = document.querySelector(".sidebar");



btn.onclick = function() {

    console.time("Toggle Sidebar");

    sidebar.classList.toggle("active");



        console.timeEnd("Toggle Sidebar");

}


document.addEventListener("DOMContentLoaded", function () {
    let menuItems = document.querySelectorAll(".nav_list li a");
    let sections = {
        "Thông tin cá nhân": document.getElementById("infoManagement"),
        "Thống kê dữ liệu": document.getElementById("staticManagement"),
        "Quản lý bài viết": document.getElementById("postManagement"),
        "Quản lý danh mục": document.getElementById("categoryManagement"),
        "Quản lý người dùng": document.getElementById("userManagement"),
        "Quản lý bình luận": document.getElementById("commentManagement")
    };


    menuItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();


            // Lấy tên menu vừa click
            let menuName = this.querySelector(".links_name").innerText;


            // Ẩn tất cả các phần nội dung
            Object.values(sections).forEach(section => section.style.display = "none");


            // Hiển thị nội dung của menu vừa nhấn
            sections[menuName].style.display = "block";


            // Xóa 'active' khỏi tất cả menu
            menuItems.forEach(link => link.parentElement.classList.remove("active"));


            // Đánh dấu menu được chọn là 'active'
            this.parentElement.classList.add("active");
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let approveModal = document.getElementById("approveModal");
    let confirmApproveBtn = document.getElementById("confirmApprove");
    let cancelApproveBtn = document.getElementById("cancelApprove");
    let currentRow = null;

    //  Ẩn nút "Duyệt bài" nếu trạng thái là "Đã duyệt"
    document.querySelectorAll("tr").forEach(row => {
        let statusCell = row.querySelector(".status");
        let approveButton = row.querySelector(".Post-btn-approve");

        if (statusCell && approveButton) {
            if (statusCell.innerText.trim() === "Đã duyệt") {
                approveButton.style.display = "none"; // Ẩn nút duyệt bài
            }
        }

    });

    //  Mở modal khi nhấn "Duyệt bài"
    document.querySelectorAll(".Post-btn-approve").forEach(button => {
        button.addEventListener("click", function () {
            approveModal.style.display = "flex";
            currentRow = this.closest("tr");
        });
    });

    // //  Khi nhấn "Có" => Cập nhật trạng thái, ẩn nút "Duyệt bài"
    // confirmApproveBtn.addEventListener("click", function () {
    //     if (currentRow) {
    //         let statusCell = currentRow.querySelector(".status");
    //         statusCell.innerText = "Đã duyệt";

    //         let approveButton = currentRow.querySelector(".Post-btn-approve");
    //         if (approveButton) {
    //             approveButton.remove(); // Xóa nút "Duyệt bài"
    //         }
    //     }
    //     approveModal.style.display = "none"; // Đóng modal
    // });

    // //  Đóng modal khi nhấn "Không"
    // cancelApproveBtn.addEventListener("click", function () {
    //     approveModal.style.display = "none"; // Ẩn modal khi chọn "Không"
    // });

    //  Đóng modal khi nhấn bên ngoài nội dung modal
    window.addEventListener("click", function (event) {
        if (event.target === approveModal) {
            approveModal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.querySelector(".search-box");
    const searchInput = document.querySelector(".search-box-input");
    const searchButton = document.querySelector(".search-box-btn");

    // Toggle search box when search icon is clicked
    searchButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent event from bubbling
        searchBox.classList.toggle("open");
        
        if (searchBox.classList.contains("open")) {
            searchInput.focus();
        } else {
            searchInput.value = ''; // Clear input when closing
        }
    });

    // Close search box when clicking outside
    document.addEventListener("click", function(event) {
        if (!searchBox.contains(event.target) && searchBox.classList.contains("open")) {
            searchBox.classList.remove("open");
            searchInput.value = '';
        }
    });

    // Prevent closing when clicking inside search box
    searchBox.addEventListener("click", function(event) {
        event.stopPropagation();
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const addPostBtn = document.querySelector(".add-post-btn");
    const addPostModal = document.getElementById("addPostModal");
    const closeModalBtn = addPostModal.querySelector(".action-modal-close");
    const mainCategorySelect = document.getElementById('mainCategory');
    const subCategorySelect = document.getElementById('subCategory');

    const categoriesMap = {
        'society': ['Thời sự', 'Giao thông', 'Môi trường-Khí hậu'],
        'science': ['Tin tức công nghệ', 'Hoạt động công nghệ', 'Tạp chí'],
        'health': ['Dinh dưỡng', 'Làm đẹp', 'Y tế'],
        'sports': ['Bóng đá', 'Bóng rổ'],
        'entertainment': ['Âm nhạc', 'Thời trang', 'Điện ảnh-Truyền hình'],
        'education': ['Thi cử', 'Đào tạo', 'Học bổng-Du học']
    };

    mainCategorySelect.addEventListener('change', function() {
        const selectedMainCategory = this.value;
        subCategorySelect.innerHTML = '<option value="">Chọn danh mục phụ</option>';

        if (selectedMainCategory && categoriesMap[selectedMainCategory]) {
            categoriesMap[selectedMainCategory].forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                subCategorySelect.appendChild(option);
            });
        }
    });

    // Open modal
    addPostBtn.addEventListener("click", function() {
        addPostModal.style.display = "flex";
    });

    // Close modal when close button is clicked
    closeModalBtn.addEventListener("click", function() {
        addPostModal.style.display = "none";
    });

    // Close modal when clicking outside of modal content
    addPostModal.addEventListener("click", function(event) {
        if (event.target === addPostModal) {
            addPostModal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const editPostModal = document.getElementById("editPostModal");
    const closeModalBtn = editPostModal.querySelector(".action-modal-close");
    const btnUpdatePost = document.getElementById("btnUpdatePost");
    const editMainCategory = document.getElementById('editMainCategory');
    const editSubCategory = document.getElementById('editSubCategory');

    // Categories Mapping
    const categoriesMap = {
        'society': ['Thời sự', 'Giao thông', 'Môi trường-Khí hậu'],
        'science': ['Tin tức công nghệ', 'Hoạt động công nghệ', 'Tạp chí'],
        'health': ['Dinh dưỡng', 'Làm đẹp', 'Y tế'],
        'sports': ['Bóng đá', 'Bóng rổ'],
        'entertainment': ['Âm nhạc', 'Thời trang', 'Điện ảnh-Truyền hình'],
        'education': ['Thi cử', 'Đào tạo', 'Học bổng-Du học']
    };

    // Main to Sub Category Mapping Reverse
    const mainCategoryFromSubMap = {
        'Thời sự': 'society',
        'Giao thông': 'society',
        'Môi trường-Khí hậu': 'society',
        'Tin tức công nghệ': 'science',
        'Hoạt động công nghệ': 'science',
        'Tạp chí': 'science',
        'Dinh dưỡng': 'health',
        'Làm đẹp': 'health',
        'Y tế': 'health',
        'Bóng đá': 'sports',
        'Bóng rổ': 'sports',
        'Âm nhạc': 'entertainment',
        'Thời trang': 'entertainment',
        'Điện ảnh-Truyền hình': 'entertainment',
        'Thi cử': 'education',
        'Đào tạo': 'education',
        'Học bổng-Du học': 'education'
    };

    // Populate Sub Categories
    editMainCategory.addEventListener('change', function() {
        const selectedMainCategory = this.value;
        editSubCategory.innerHTML = '<option value="" disabled selected>Chọn danh mục phụ</option>';

        if (selectedMainCategory && categoriesMap[selectedMainCategory]) {
            categoriesMap[selectedMainCategory].forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                editSubCategory.appendChild(option);
            });
        }
    });

    // Close modal buttons
    closeModalBtn.addEventListener("click", function() {
        editPostModal.style.display = "none";
    });

    editPostModal.addEventListener("click", function(event) {
        if (event.target === editPostModal) {
            editPostModal.style.display = "none";
        }
    });

    // Edit buttons for each row
    const editButtons = document.querySelectorAll(".Post-btn-edit");
    editButtons.forEach(button => {
        button.addEventListener("click", function() {
            const row = this.closest("tr");
            populateEditModal(row);
            editPostModal.style.display = "flex";
        });
    });

    // Populate Edit Modal
    function populateEditModal(row) {
        const cells = row.getElementsByTagName('td');
        
        document.getElementById('editPostTitle').value = cells[1].textContent;
        document.getElementById('editPostAuthor').value = cells[2].textContent;
        document.getElementById('editPostSlug').value = cells[3].textContent;
        
        const subCategory = cells[5].textContent;
        const mainCategory = mainCategoryFromSubMap[subCategory];

        // Set main category
        editMainCategory.value = mainCategory;

        // Trigger change event to populate sub-categories
        const event = new Event('change');
        editMainCategory.dispatchEvent(event);

        // Set sub-category after a slight delay to ensure options are populated
        setTimeout(() => {
            editSubCategory.value = subCategory;
        }, 50);

        document.getElementById('editPostContent').value = cells[6].textContent;
    }

    // Update Post Function
    btnUpdatePost.addEventListener('click', function() {
        const row = document.querySelector("table tbody tr.editing-row");
        
        if (row) {
            const cells = row.getElementsByTagName('td');
            
            cells[1].textContent = document.getElementById('editPostTitle').value;
            cells[2].textContent = document.getElementById('editPostAuthor').value;
            cells[3].textContent = document.getElementById('editPostSlug').value;
            cells[4].textContent = editMainCategory.options[editMainCategory.selectedIndex].text;
            cells[5].textContent = editSubCategory.value;
            cells[6].textContent = document.getElementById('editPostContent').value;

            row.classList.remove('editing-row');
            editPostModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const deletePostModal = document.getElementById("deletePostModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");
    let currentRowToDelete = null;

    // Add event listeners to all delete buttons
    document.querySelectorAll(".Post-btn-delete").forEach(button => {
        button.addEventListener("click", function() {
            currentRowToDelete = this.closest("tr");
            deletePostModal.style.display = "flex";
        });
    });


    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === deletePostModal) {
            deletePostModal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const addCategoryBtn = document.querySelector(".add-category-btn");
    const addCategoryModal = document.getElementById("addCategoryModal");
    const closeModalBtn = addCategoryModal.querySelector(".action-modal-close");

    // Open modal
    addCategoryBtn.addEventListener("click", function() {
        addCategoryModal.style.display = "flex";
    });

    // Close modal when close button is clicked
    closeModalBtn.addEventListener("click", function() {
        addCategoryModal.style.display = "none";
    });

    // Close modal when clicking outside of modal content
    addCategoryModal.addEventListener("click", function(event) {
        if (event.target === addCategoryModal) {
            addCategoryModal.style.display = "none";
        }
    });
});
//Xử lí nút chặn người dùng
// Hàm tạo modal xác nhận
function createConfirmModal(message, isBlocking) {
    // Tạo overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // Tạo modal container
    const modal = document.createElement('div');
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.textAlign = 'center';
    modal.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    modal.style.width = '300px';

    // Nội dung modal
    modal.innerHTML = `
        <p>${message}</p>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <button id="confirmBtn" style="background-color: #B32A45; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Có</button>
            <button id="cancelBtn" style="background-color: #cccccc; color: black; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Không</button>
        </div>
    `;

    // Thêm modal vào overlay
    overlay.appendChild(modal);

    // Thêm overlay vào body
    document.body.appendChild(overlay);

    // Xử lý nút Có
    const confirmBtn = modal.querySelector('#confirmBtn');
    confirmBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        // Nếu đang chặn thì hiện modal chặn
        if (isBlocking) {
            createNotificationModal('Đã cho phép người dùng hoạt động');
            
        } 
        // Nếu đang mở khóa thì hiện modal cho phép
        else {
            createNotificationModal('Đã chặn người dùng hoạt động');
        }
    });

    // Xử lý nút Không
    const cancelBtn = modal.querySelector('#cancelBtn');
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        // Quay lại trạng thái ban đầu của toggle
        const relatedToggle = window.currentToggle;
        if (relatedToggle) {
            relatedToggle.checked = !relatedToggle.checked;
        }
    });
}

// Hàm tạo modal thông báo
function createNotificationModal(message) {
    // Tạo overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // Tạo modal container
    const modal = document.createElement('div');
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.textAlign = 'center';
    modal.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    modal.style.width = '300px';

    // Nội dung modal
    modal.innerHTML = `
        <p>${message}</p>
        <button id="okBtn" style="background-color: #B32A45; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">OK</button>
    `;

    // Thêm modal vào overlay
    overlay.appendChild(modal);

    // Thêm overlay vào body
    document.body.appendChild(overlay);

    // Xử lý nút OK
    const okBtn = modal.querySelector('#okBtn');
    okBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}

// Lấy tất cả các nút toggle input
const toggleInputs = document.querySelectorAll('.toggle-input');

// Lặp qua từng toggle input và thêm sự kiện
toggleInputs.forEach(toggleInput => {
    toggleInput.addEventListener('change', function() {
        // Lưu toggle hiện tại
        window.currentToggle = this;

        // Kiểm tra trạng thái toggle để xác định nội dung modal
        const isBlocking = this.checked;
        const message = isBlocking 
            ? 'Bạn có muốn cho phép người dùng này hoạt động ?' 
            : 'Bạn có muốn chặn người dùng này ?';

        // Hiển thị modal xác nhận
        createConfirmModal(message, isBlocking);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Chọn tất cả các nút phê duyệt
    const approveButtons = document.querySelectorAll('.btn-action.btn-approve');
    
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Tìm dòng cha
            const row = this.closest('tr');
            
            // Tạo modal xác nhận
            const modal = document.createElement('div');
            modal.classList.add('approval-modal');
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <h3>Xác nhận phê duyệt</h3>
                        <p>Bạn có chắc chắn muốn phê duyệt bình luận này không?</p>
                        <div class="modal-buttons">
                            <button class="btn-confirm-yes">Có</button>
                            <button class="btn-confirm-no">Không</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Thêm modal vào body
            document.body.appendChild(modal);
            
            // Xử lý nút Có
            modal.querySelector('.btn-confirm-yes').addEventListener('click', function() {
                // Tìm ô trạng thái và ô hành động
                const statusCell = row.querySelector('.comment-status');
                const actionCell = row.querySelector('.action-group');
                
                // Thay đổi trạng thái sang đã duyệt
                statusCell.textContent = 'Đã duyệt';
                statusCell.classList.remove('pending');
                statusCell.classList.add('approved');
                statusCell.style.backgroundColor = '#28a745';
                statusCell.style.color = 'white';
                statusCell.style.padding = '5px 10px';
                statusCell.style.borderRadius = '4px';
                statusCell.style.display = 'inline-block';
                
                // Xóa nút phê duyệt
                const approveButton = actionCell.querySelector('.btn-approve');
                if (approveButton) {
                    approveButton.remove();
                }
                
                // Xóa modal
                document.body.removeChild(modal);
            });
            
            // Xử lý nút Không
            modal.querySelector('.btn-confirm-no').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Đóng modal khi click ra ngoài
            modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
                if (e.target === this) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
});
// Xử lí nút xóa
// Tạo modal động
function createDeleteModal() {
    const modal = document.createElement('div');
    modal.id = 'deleteConfirmModal';
    document.body.appendChild(modal);

    return modal;
}

// Hàm xử lý xóa
function setupDeleteConfirmation() {
    const modal = createDeleteModal();
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalMessage = modal.querySelector('.modal-message');
    const confirmBtn = modal.querySelector('#confirmDelete');
    const cancelBtn = modal.querySelector('#cancelDelete');

    // Biến lưu trữ dòng sẽ xóa
    let rowToDelete = null;

    // Lắng nghe sự kiện nút xóa ở cả 2 bảng
    document.querySelectorAll('.user_management .User-btn-delete, .comment_management .Comment-btn-delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', function() {
            // Xác định loại xóa và thông điệp
            const isUserDelete = this.closest('.user_management') !== null;
            const row = this.closest('tr');
            rowToDelete = row;

            if (isUserDelete) {
                modalMessage.textContent = 'Bạn có chắc chắn muốn xóa người dùng này không?';
            } else {
                modalMessage.textContent = 'Bạn có chắc chắn muốn xóa bình luận này không?';
            }

            // Hiển thị modal
            modalOverlay.style.display = 'flex';
        });
    });

    // Xử lý nút Không
    cancelBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        rowToDelete = null;
    });

    // Xử lý nút Có
    confirmBtn.addEventListener('click', () => {
        if (rowToDelete) {
            // Xóa dòng khỏi bảng
            rowToDelete.remove();
            
            // Ẩn modal
            modalOverlay.style.display = 'none';
            rowToDelete = null;
        }
    });

    // Đóng modal khi click ngoài
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            rowToDelete = null;
        }
    });
}



// Chạy setup khi trang tải xong
document.addEventListener('DOMContentLoaded', setupDeleteConfirmation);
function showAddUserModal() {
    // Lấy modal container
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'block';

    // Lấy các phần tử trong modal
    const modalOverlay = modalContainer.querySelector('.modal-overlay');
    const closeButton = modalContainer.querySelector('.modal-close-btn');
    const form = modalContainer.querySelector('#addUserForm');

    // Xử lý đóng modal khi click nút x
    closeButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    // Xử lý đóng modal khi click ngoài
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalContainer.style.display = 'none';
        }
    });

    // Xử lý submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Xử lý logic thêm người dùng ở đây
        console.log('Form submitted');
    });
}

// Gắn sự kiện cho nút Thêm người dùng
document.querySelector('.btn-add-user').addEventListener('click', showAddUserModal);




document.addEventListener("DOMContentLoaded", function() {
    const deleteCategoryModal = document.getElementById("deleteCategoryModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");
    let currentRowToDelete = null;

    // Add event listeners to all delete buttons
    document.querySelectorAll(".Category-btn-delete").forEach(button => {
        button.addEventListener("click", function() {
            currentRowToDelete = this.closest("tr");
            deleteCategoryModal.style.display = "flex";
        });
    });

    // Confirm delete - remove the row
    confirmDeleteBtn.addEventListener("click", function() {
        if (currentRowToDelete) {
            currentRowToDelete.remove();
            deleteCategoryModal.style.display = "none";
        }
    });

    // Cancel delete - close the modal
    cancelDeleteBtn.addEventListener("click", function() {
        deleteCategoryModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === deleteCategoryModal) {
            deleteCategoryModal.style.display = "none";
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const editCategoryModal = document.getElementById("editCategoryModal");
    const closeModalBtn = editCategoryModal.querySelector(".action-modal-close");
    const btnUpdateCategory = document.getElementById("btnUpdateCategory");

    const editCategoryName = document.getElementById("editCategoryName");
    const editParentCategory = document.getElementById("editParentCategory");
    const editNumberPost = document.getElementById("editNumberPost");

    // Bắt sự kiện click để mở modal chỉnh sửa
    const editButtons = document.querySelectorAll(".Category-btn-edit");
    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            populateEditModal(row);
            editCategoryModal.style.display = "flex"; // Hiển thị modal
        });
    });

    // Đóng modal khi bấm vào nút đóng
    closeModalBtn.addEventListener("click", function () {
        editCategoryModal.style.display = "none";
    });

    // Đóng modal khi bấm ra ngoài
    editCategoryModal.addEventListener("click", function (event) {
        if (event.target === editCategoryModal) {
            editCategoryModal.style.display = "none";
        }
    });

    // Hàm điền dữ liệu vào modal chỉnh sửa
    function populateEditModal(row) {
        const cells = row.getElementsByTagName('td');

        editCategoryName.value = cells[1].textContent; // Tên danh mục
        editNumberPost.value = cells[3].textContent; // Số lượng bài báo

        // Lấy giá trị danh mục cha
        const parentCategoryText = cells[2].textContent.trim(); // Lấy text trong ô "Danh mục cha"
        
        // Kiểm tra nếu không có danh mục cha (hiển thị "Không"), chọn option "none"
        Array.from(editParentCategory.options).forEach(option => {
            if (option.textContent.trim() === parentCategoryText) {
                editParentCategory.value = option.value;
            }
        });
    }

    // Cập nhật dữ liệu sau khi nhấn nút "Cập nhật danh mục"
    btnUpdateCategory.addEventListener('click', function () {
        const row = document.querySelector("table tbody tr.editing-row");

        if (row) {
            const cells = row.getElementsByTagName('td');

            cells[1].textContent = editCategoryName.value; // Cập nhật tên danh mục
            cells[2].textContent = editParentCategory.options[editParentCategory.selectedIndex].text; // Cập nhật danh mục cha
            cells[3].textContent = editNumberPost.value; // Cập nhật số lượng bài báo

            row.classList.remove('editing-row'); // Xóa trạng thái chỉnh sửa
            editCategoryModal.style.display = "none"; // Đóng modal
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const deleteUserModal = document.getElementById("deleteUserModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");
    let currentRowToDelete = null;

    // Add event listeners to all delete buttons
    document.querySelectorAll(".User-btn-delete").forEach(button => {
        button.addEventListener("click", function() {
            currentRowToDelete = this.closest("tr");
            deleteUserModal.style.display = "flex";
        });
    });

    // Confirm delete - remove the row
    confirmDeleteBtn.addEventListener("click", function() {
        if (currentRowToDelete) {
            currentRowToDelete.remove();
            deleteUserModal.style.display = "none";
        }
    });

    // Cancel delete - close the modal
    cancelDeleteBtn.addEventListener("click", function() {
        deleteUserModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === deleteUserModal) {
            deleteUserModal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const deleteCommentModal = document.getElementById("deleteCommentModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");
    let currentRowToDelete = null;

    // Add event listeners to all delete buttons
    document.querySelectorAll(".Comment-btn-delete").forEach(button => {
        button.addEventListener("click", function() {
            currentRowToDelete = this.closest("tr");
            deleteCommentModal.style.display = "flex";
        });
    });

    // Confirm delete - remove the row
    confirmDeleteBtn.addEventListener("click", function() {
        if (currentRowToDelete) {
            currentRowToDelete.remove();
            deleteCommentModal.style.display = "none";
        }
    });

    // Cancel delete - close the modal
    cancelDeleteBtn.addEventListener("click", function() {
        deleteCommentModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === deleteCommentModal) {
            deleteCommentModal.style.display = "none";
        }
    });
});






