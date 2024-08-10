// https://github.com/median-dispersion/Super-Simple-Full-Screen-Drag-And-Drop-JS

class SuperSimpleFullScreenDragAndDropJS extends EventTarget {

    // ============================================================================================
    // Public fields
    // ============================================================================================

    // The info text that is displayed when the drag and drop window appears
    text = "Drag and Drop";

    // The path or data of the icon that is displayed when the drag and drop window appears
    icon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512' fill='%23fff'%3E%3Cpath d='m80 32c-26.315 0-48 21.685-48 48v192c0 26.315 21.685 48 48 48h172.12l-110.06-110.06c-18.48-18.477-18.48-49.409 0-67.887 5.9579-5.9567 13.383-10.243 21.521-12.422 4.1269-1.1054 8.3314-1.6376 12.506-1.625 12.529 0.0378 24.786 4.9798 33.854 14.047a32.003 32.003 0 0 0 0 2e-3l110.06 110.06v-172.12c0-26.315-21.685-48-48-48zm97.395 128.06a16 16 0 0 0-5.5352 0.48437 16 16 0 0 0-7.1738 4.1406 16 16 0 0 0 0 22.629l140.11 140.11-12.111 12.111a16.002 16.002 0 0 0 7.1719 26.77l64.002 17.148a16.002 16.002 0 0 0 19.596-19.596l-17.148-64a16.002 16.002 0 0 0-16.053-11.848 16.002 16.002 0 0 0-3.543 0.53516 16.002 16.002 0 0 0-7.1738 4.1387l-12.111 12.111-140.11-140.11a16 16 0 0 0-9.9199-4.625zm174.61 31.939v32h48v-32zm80 0v32c9.1407 0 16 6.8593 16 16h32c0-26.315-21.685-48-48-48zm16 80v48h32v-48zm-256 80v48h32v-48zm256 0v48h32v-48zm-256 80c0 26.315 21.685 48 48 48v-32c-9.1407 0-16-6.8593-16-16zm256 0c0 9.1407-6.8593 16-16 16v32c26.315 0 48-21.685 48-48zm-176 16v32h48v-32zm80 0v32h48v-32z'/%3E%3C/svg%3E";

    // Z-Index, this should be the highest value of all the HTML elements on the site to make the window appear in front of everything
    zIndex = 1000;

    // Name of the event that is being dispatched
    eventName = "dropped";

    // Styling for the drag and drop window
    style = {

        window: {

            padding: "50px",
            color: "rgba(0, 0, 0, 0.5)",
            blur: "50px",
            animation: "100ms"

        },

        border: {

            width: "100%",
            height: "100%",
            size: "5px",
            color: "rgba(255, 255, 255, 1)",
            style: "dashed",
            radius: "50px",
            padding: "50px"

        },

        icon: {

            size: "150px",

        },

        text: {

            family: "Arial, Helvetica, sans-serif",
            size: "30px",
            color: "rgba(255, 255, 255, 1)",
            weight: "normal",
            style: "normal"

        }

    };

    // ============================================================================================
    // Private fields
    // ============================================================================================

    // A random suffix for element IDs to prevent naming conflicts
    #suffix = this.#getRandomString(16);

    // Flag for checking if the main window is visible
    #rendered = false;

    // Animation timer
    #timer = null;

    // References to the HTML elements that are being added to the DOM
    #element = {window: null, info: null, input: null, style: null};

    // CSS styling
    #css() {

        return `

            <style id="ssfsdadjs-style-${this.#suffix}">

                #ssfsdadjs-${this.#suffix} {
                    display: none;
                    position: fixed;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    padding: ${this.style.window.padding};
                    background-color: ${this.style.window.color};
                    backdrop-filter: blur(${this.style.window.blur});
                    opacity: 0;
                    z-index: ${this.zIndex};
                }

                #ssfsdadjs-border-${this.#suffix} {
                    position: relative;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    max-width: ${this.style.border.width};
                    max-height: ${this.style.border.height};
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(0.9);
                    transform-origin: center;
                    padding: ${this.style.border.padding};
                    border: ${this.style.border.size};
                    border-color: ${this.style.border.color};
                    border-style: ${this.style.border.style};
                    border-radius: ${this.style.border.radius};
                    pointer-events:none;
                }

                #ssfsdadjs-info-${this.#suffix} {
                    position: relative;
                    top: 50%;
                    transform: translateY(-50%);
                }

                #ssfsdadjs-icon-${this.#suffix} {
                    width: 100%;
                    height: ${this.style.icon.size};
                    background-image: url("${this.icon}");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                }

                #ssfsdadjs-text-${this.#suffix} {
                    width: 100%;
                    font-family: ${this.style.text.family};
                    font-size: ${this.style.text.size};
                    color: ${this.style.text.color};
                    font-weight: ${this.style.text.weight};
                    font-style: ${this.style.text.style};
                    text-align: center;
                }

                .ssfsdadjs-scale-${this.#suffix} { animation: ssfsdadjs-animation-scale-${this.#suffix} ${this.style.window.animation} ease forwards; }
                @keyframes ssfsdadjs-animation-scale-${this.#suffix} {
                    0%   { transform: translate(-50%, -50%) scale(0.9); }
                    100% { transform: translate(-50%, -50%) scale(1.0); }
                }

                .ssfsdadjs-fade-in-${this.#suffix} { animation: ssfsdadjs-animation-fade-in-${this.#suffix} ${this.style.window.animation} ease forwards; }
                @keyframes ssfsdadjs-animation-fade-in-${this.#suffix} {
                    0%   { opacity: 0; }
                    100% { opacity: 1; }
                }

                .ssfsdadjs-fade-out-${this.#suffix} { animation: ssfsdadjs-animation-fade-out-${this.#suffix} ${this.style.window.animation} ease forwards; }
                @keyframes ssfsdadjs-animation-fade-out-${this.#suffix} {
                    0%   { opacity: 1; }
                    100% { opacity: 0; }
                }
        
            </style>

        `;

    }

    // HTML elements
    #html() {

        return `
        
            <div id="ssfsdadjs-${this.#suffix}">

                <div id="ssfsdadjs-border-${this.#suffix}">

                    <div id="ssfsdadjs-info-${this.#suffix}">

                        <div id="ssfsdadjs-icon-${this.#suffix}"></div>
                        <div id="ssfsdadjs-text-${this.#suffix}">${this.text}</div>

                    </div>

                </div>

            </div>

        `;

    }

    // ============================================================================================
    // Generate a random string
    // ============================================================================================
    #getRandomString(length = 8) {

        // Allowed characters
        const characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        let result = "";

        // Loop until the desired length is reached
        for (let i = 0; i < length; i++) {

            // Select a random character from the list of allowed characters and add it to the result
            result += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
            
        }

        return result;

    }

    // ============================================================================================
    // Show the drag and drop window
    // ============================================================================================
    #show() {

        // Check if window is currently not visible
        if (!this.#rendered) {

            // Clear any running animation timers
            clearTimeout(this.#timer);

            // Remove all classes
            this.#element.window.removeAttribute("class");
            this.#element.info.removeAttribute("class");

            // Add the animation classes to play the animations
            this.#element.window.setAttribute("class", `ssfsdadjs-fade-in-${this.#suffix}`);
            this.#element.info.setAttribute("class", `ssfsdadjs-scale-${this.#suffix}`);

            // Set the display style to "block" so that the drag and drop window will be rendered
            this.#element.window.style.display = "block";

            // Set the render flag to true
            this.#rendered = true;

        }

    }

    // ============================================================================================
    // Hide the drag and drop window
    // ============================================================================================
    #hide() {

        // Check if window is currently visible
        if (this.#rendered) {

            // Add the animation class to play the animation
            this.#element.window.setAttribute("class", `ssfsdadjs-fade-out-${this.#suffix}`);

            // If the animation duration is specified in milliseconds set a multiplier of x1, else it is in seconds so use a multiplier of x1000
            const multiplier = (this.style.window.animation.includes("ms")) ? 1 : 1000;

            // Set timer for animation to play +1 ms
            this.#timer = setTimeout(() => {

                // Set the display style to "none" so that the drag and drop window will not be rendered
                this.#element.window.style.display = "none";

                // Remove all classes
                this.#element.window.removeAttribute("class");
                this.#element.info.removeAttribute("class");

            }, (parseFloat(this.style.window.animation) * multiplier) + 1);
            
            // Set the render flag to false
            this.#rendered = false;

        }

    }

    // ============================================================================================
    // Dispatch the drop event
    // ============================================================================================
    #dispatchDropEvent(event) {

        let value;

        // Check if the dropped input is a file
        if (event.dataTransfer.files.length) {

            // If so, set the return value to an array of files
            value = event.dataTransfer.files;

        }else {

            // If not, set the return value to a string of the dropped input
            value = event.dataTransfer.getData("text/plain");

        }

        // Create a new event that is dispatched when something is dropped
        // The new event contains the value dropped input
        const dropEvent = new CustomEvent(this.eventName, { 
            detail: { 
                value
            } 
        });

        // Dispatch the event
        this.dispatchEvent(dropEvent);

    }

    // ============================================================================================
    // Prevent the default behavior of an event
    // ============================================================================================
    #preventEventDefaults(event) {

        event.preventDefault();
        event.stopPropagation();

    }

    // ============================================================================================
    // Event listener binding functions
    // ============================================================================================
    #showEvent = this.#show.bind(this);
    #hideEvent = this.#hide.bind(this);
    #dropEvent = this.#dispatchDropEvent.bind(this);

    // ============================================================================================
    // Enable the drag and drop window
    // ============================================================================================
    enable() {

        // Append the CSS styling and HTML elements to the DOM
        document.head.insertAdjacentHTML("beforeend", this.#css());
        document.body.insertAdjacentHTML("beforeend", this.#html());

        // Set the references for the added HTML elements
        this.#element.window = document.getElementById(`ssfsdadjs-${this.#suffix}`);
        this.#element.info   = document.getElementById(`ssfsdadjs-border-${this.#suffix}`);
        this.#element.style  = document.getElementById(`ssfsdadjs-style-${this.#suffix}`);

        // Prevent default dragging behaviors of the the browser window
        ["dragenter", "dragleave", "dragover", "drop"].forEach(event => {
            window.addEventListener(event, this.#preventEventDefaults);
        });

        // Prevent default dragging behaviors of the drag and drop window
        ["dragleave", "drop"].forEach(event => {
            this.#element.window.addEventListener(event, this.#preventEventDefaults);
        });

        // Add an event listener to the browser window that listens for a drag event. When dragging something, show the drag and drop window
        ["dragenter", "dragover"].forEach(event => {
            window.addEventListener(event, this.#showEvent);
        });

        // Add an event listener to drag and drop window. When dragging stops or something is dropped, hide the drag and drop window
        ["dragleave", "drop"].forEach(event => {
            this.#element.window.addEventListener(event, this.#hideEvent);
        });

        // Add an event listener for dropping something onto the drag and drop window
        this.#element.window.addEventListener("drop", this.#dropEvent);

    }

    // ============================================================================================
    // Disable the drag and drop window
    // ============================================================================================
    disable() {

        // Remove all event listeners
        ["dragenter", "dragleave", "dragover", "drop"].forEach(event => {

            window.removeEventListener(event, this.#preventEventDefaults);
            window.removeEventListener(event, this.#showEvent);
            this.#element.window.removeEventListener(event, this.#preventEventDefaults);
            this.#element.window.removeEventListener(event, this.#hideEvent);
            this.#element.window.removeEventListener(event, this.#dropEvent);

        });

        // Remove all HTML elements from the DOM
        this.#element.window.remove();
        this.#element.style.remove();

    }

}