import { Logger } from "../helper/Logger";
import { release } from "../helper/constants";
import { EventStructure } from "../helper/eventStructure";

export class NavigationController extends EventStructure {
    /** All available sites for navigation */
    private sites: string[] = ["TestSite1", "TestSite2"];
    /** Name of the active site */
    private active_site_name: string = "TestSite1";

    constructor() {
        super();
        if (!release) {
            //@ts-ignore
            window.navigation_controller = this;
        }
    }

    /**
     * Returns all available sites
     */
    public getSites(): string[] {
        return this.sites;
    }

    /**
     * Returns the name of the active site
     */
    public getActiveSiteName(): string {
        return this.active_site_name;
    }

    /**
     * changes the active site
     * @param name name of the site to activate
     */
    public changeSite(name: string) {
        Logger.log("NavigationController", "changeSite", name);
        if (name == this.active_site_name) {
            return;
        }
        this.active_site_name = name;
        this.emit("update_navigation");
        this.emit("update_site");
    }

    /**
     * Updates the available sites
     * @param sites All available sites
     */
    public updateAvailableSites(sites: string[]) {
        Logger.log("NavigationController", "updateAvailableSites", sites);
        if (sites.length == 0) {
            return;
        }
        this.sites = sites;
        if (this.active_site_name.length === 0 || sites.indexOf(this.active_site_name) === -1) {
            this.active_site_name = sites[0];
            this.emit("update_site");
        }
        this.emit("update_navigation");
    }
}