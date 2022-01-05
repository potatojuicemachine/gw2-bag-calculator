/**
 * A structure that is used for classes that need callbacks
 */
export class EventStructure{
    /** All registered events */
    private events: {[event: string]: ((...args:any)=>void)[]} = {};

    /**
     * Registers a callback for a event
     * @param event The event to register
     * @param callback callback function for the event
     * @returns index of the callback. Used for unregistering callback.
     */
    public on(event: string, callback: (...args:any)=>void): number{
        if(!this.events[event]){
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return this.events[event].length - 1;
    }

    /**
     * Removes a callback from the callback list
     * @param event event of the callback
     * @param event_index event index of the callback
     */
    public unregister(event:string, event_index: number){
        if(!this.events[event]){
            return;
        }
        this.events[event][event_index] = undefined;
    }

    /**
     * calls all registered event listeners
     * @param event event to trigger
     * @param args args for the callback function
     */
    protected emit(event: string, ...args:any){
        if(!this.events[event]){
            return;
        }
        for(let callback of this.events[event]){
            if(callback !== undefined) callback(...args);
        }
    }
}