// https://github.com/median-dispersion/Super-Simple-Full-Screen-Drag-And-Drop-JS

// Set up the drag and drop window once the page has finished loading
document.addEventListener("DOMContentLoaded", () => {

    // Create a new drag and drop window object
    const dragAndDrop = new SuperSimpleFullScreenDragAndDropJS();

    // Settings -----
    // These options allow you to change certain settings of the drag and drop window

    // The info text that is displayed when the drag and drop window appears
    // dragAndDrop.text  = "Drag and Drop";

    // The path or data of the icon that is displayed when the drag and drop window appears
    // dragAndDrop.icon = "/path/to/my/icon.png";

    // The type of input field, i.e. "text" or "file"
    // dragAndDrop.type = "text";

    // Z-Index, this should be the highest value of all the HTML elements on the site to make the window appear in front of everything
    // dragAndDrop.zIndex = 1000;

    // Name of the event that is being dispatched
    // dragAndDrop.eventName = "dropped";

    // Styling -----
    // These options allow you to change the appearance of the drag and drop window

    // Main window styling
    // dragAndDrop.style.window.padding   = "50px";
    // dragAndDrop.style.background.color = "rgba(0, 0, 0, 0.5)";
    // dragAndDrop.style.background.blur  = "50px";

    // Border styling
    // dragAndDrop.style.border.size      = "5px";
    // dragAndDrop.style.border.color     = "rgba(255, 255, 255, 1)";
    // dragAndDrop.style.border.style     = "dashed";
    // dragAndDrop.style.border.radius    = "50px";
    // dragAndDrop.style.border.padding   = "50px";

    // Info icon styling
    // dragAndDrop.style.icon.size        = "150px";

    // Info text styling
    // dragAndDrop.style.text.family      = "Arial, Helvetica, sans-serif";
    // dragAndDrop.style.text.size        = "30px";
    // dragAndDrop.style.text.color       = "rgba(255, 255, 255, 1)";
    // dragAndDrop.style.text.weight      = "normal";
    // dragAndDrop.style.text.style       = "normal";

    // Add the eventlistner
    dragAndDrop.addEventListener("dropped", (event) => {

        // Use the value of the drop event
        alert(event.detail.value);

    });

    // Enable the drag and drop window
    dragAndDrop.enable();

    // Disable the drag and drop window
    // dragAndDrop.disable();

});