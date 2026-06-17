(function() {
    const MAINTENANCE_ACTIVE = true;
    
    if (MAINTENANCE_ACTIVE) {
        // Option pour effacer le bypass via ?admin=clear
        if (window.location.search.includes("admin=clear")) {
            localStorage.removeItem("bypass_maintenance");
        }
        
        const isBypass = window.location.search.includes("admin=true") || localStorage.getItem("bypass_maintenance") === "true";
        
        if (window.location.search.includes("admin=true")) {
            localStorage.setItem("bypass_maintenance", "true");
        }
        
        // Obtenir le nom de la page courante
        const path = window.location.pathname;
        const isMaintenancePage = path.endsWith("maintenance.html");
        
        if (!isBypass && !isMaintenancePage) {
            window.location.replace("maintenance.html");
        }
    }
})();
