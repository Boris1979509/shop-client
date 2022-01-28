import {ref, onMounted} from "vue";

export const useSidebar = () => {
    const isMobileSidebarOpen = ref(false);
    const isSidebarOpen = ref(false);

    const openMobileSidebar = () => {
        isMobileSidebarOpen.value = true;
    };

    const toggleSidebar = () => {
        if (window.innerWidth >= 1024) {
            isSidebarOpen.value = !isSidebarOpen.value;
        } else {
            openMobileSidebar();
        }
    };
    const closeMobileSidebar = () => {
        isMobileSidebarOpen.value = false;
    };

    onMounted(() => {
        onResize();
        window.addEventListener('resize', onResize);
    });
    const onResize = () => {
        if (window.innerWidth < 768 || window.innerWidth < 1024) {
            isSidebarOpen.value = false;
        } else {
            isSidebarOpen.value = true;
            closeMobileSidebar();
        }
    };
    return {
        isMobileSidebarOpen,
        isSidebarOpen,
        openMobileSidebar,
        toggleSidebar,
        closeMobileSidebar,
        onResize
    }
};
