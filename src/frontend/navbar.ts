import { Logger } from "../helper/Logger";
import { release } from "../helper/constants";
import { NavigationController } from "./navigationController";

export class Navbar {

    constructor(private navigation_controller: NavigationController) {
        if (!release) {
            //@ts-ignore
            window.navbar = this;
        }

        navigation_controller.on("update_navigation", () => { this.update() });

        this.update();
    }

    public update(): void {
        Logger.log("Navbar", "update");
        this.render(this.navigation_controller.getSites());
    }

    private select(entry: string): void {
        this.navigation_controller.changeSite(entry);
    }

    private addSite(){
        Logger.log("Navbar", "addSite");
    }

    private render(entries: string[]): void {
        Logger.log("Navbar", "render", entries, $("#navbar"));
        const navbar = $("#navbar");
        navbar.empty();
        for (const entry of entries) {
            const a = $("<div class='navbar-link'></div>");
            a.text(entry);
            if (entry == this.navigation_controller.getActiveSiteName()) {
                a.addClass("active");
            }
            navbar.append(a);
            a.on("click", () => {
                this.select(entry);
            })
        }

        const a = $("<div class='navbar-link'>+</div>");
        navbar.append(a);
        a.on("click", () => {
            this.addSite();
        })
    }
}