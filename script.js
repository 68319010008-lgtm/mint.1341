/**
 * ==========================================================================
 * JavaScript ฟังก์ชันคุมพฤติกรรมเว็บเพจและลอจิก SPA (Single Page Application)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. ประกาศตัวแปรเก็บตำแหน่งของออบเจกต์และดอม (DOM Elements) ---
    const pages = document.querySelectorAll(".page-section");
    const navLinks = document.querySelectorAll(".nav-link");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageIndicator = document.getElementById("pageIndicator");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const demoAlertBtn = document.getElementById("demoAlertBtn");

    let currentPageIndex = 0; // หน้ารายการเริ่มต้น (Index 0 = หน้าที่ 1)
    const totalPages = pages.length;

    // --- 2. ฟังก์ชันหลักสำหรับเปลี่ยนหน้าและอัปเดตสถานะ (State Manager) ---
    function updatePageVisibility(index) {
        // อัปเดตอินเด็กซ์ปัจจุบันให้อยู่ในขอบเขตที่ถูกต้อง
        currentPageIndex = index;

        // วนลูปสลับคลาส CSS เพื่อแอนิเมชันเปิด/ปิด หน้าเนื้อหา
        pages.forEach((page, idx) => {
            if (idx === currentPageIndex) {
                page.classList.add("active-section");
            } else {
                page.classList.remove("active-section");
            }
        });

        // อัปเดตสถานะของแท็บบาร์เมนูด้านบน (Active Menu Item)
        navLinks.forEach((link, idx) => {
            if (idx === currentPageIndex) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // เปิด-ปิดสิทธิ์การกดปุ่มย้อนกลับและถัดไป (Button Control)
        prevBtn.disabled = (currentPageIndex === 0);
        nextBtn.disabled = (currentPageIndex === totalPages - 1);

        // อัปเดตเลขตัวบ่งชี้หน้าปัจจุบัน (Page Indicator)
        pageIndicator.textContent = `หน้า ${currentPageIndex + 1} / ${totalPages}`;

        // เลื่อนหน้าจอกลับไปด้านบนสุดโดยอัตโนมัติเมื่อกดเปลี่ยนหน้า
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // --- 3. การดักจับอีเวนต์ผู้ใช้สำหรับการกดเมนูด้านบน ---
    navLinks.forEach((link, idx) => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // บล็อกไม่ให้เบราว์เซอร์รีเฟรชหรือเปลี่ยน URL
            updatePageVisibility(idx);

            // หากเมนูบนมือถือถูกเปิดอยู่ ให้ปิดเมนูหลังจากกดเลือกหัวข้อแล้ว
            if (navMenu.classList.contains("active")) {
                toggleMobileMenu();
            }
        });
    });

    // --- 4. การดักจับอีเวนต์กดปุ่มลูกศรนำทาง ด้านล่าง (Next / Prev) ---
    prevBtn.addEventListener("click", function() {
        if (currentPageIndex > 0) {
            updatePageVisibility(currentPageIndex - 1);
        }
    });

    nextBtn.addEventListener("click", function() {
        if (currentPageIndex < totalPages - 1) {
            updatePageVisibility(currentPageIndex + 1);
        }
    });

    // --- 5. ระบบเปิด-ปิด แถบเมนูสำหรับหน้าจอมือถือ (Hamburger Menu) ---
    function toggleMobileMenu() {
        navMenu.classList.toggle("active");
        
        // แอนิเมชันเปลี่ยนรูปทรงปุ่มสามขีด (Hamburger Animation)
        const spans = menuToggle.querySelectorAll("span");
        if (navMenu.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    }

    menuToggle.addEventListener("click", toggleMobileMenu);

    // --- 6. อีเวนต์ฟังก์ชันทดสอบคำสั่งภายในหน้าเว็บบนหน้า 10 ---
    if (demoAlertBtn) {
        demoAlertBtn.addEventListener("click", function() {
            alert("สวัสดี JavaScript! ชุดคำสั่งฝั่ง Client-Side ประมวลผลและทำงานสมบูรณ์แล้ว 🎉");
        });
    }

    // --- 7. รันคำสั่งเริ่มต้นเมื่อตัวเว็บโหลดครั้งแรก ---
    updatePageVisibility(0);
});