# Super Simple Full Screen Drag And Drop JS

<p align="center"><img src="https://github.com/median-dispersion/Super-Simple-Full-Screen-Drag-And-Drop-JS/blob/main/Assets/Banner.png" alt="Banner"/></p>

<p align="center">A super simple, one file JavaScript solution to add a full screen drag and drop window to any web page.</p>

## 🔨 Quick setup

Include the script via an HTML `<script>` tag.

```html
<script src="./mini_SuperSimpleFullScreenDragAndDrop.js"></script>
```

Set up the full screen drag and drop window like so:

```javascript
// Create a new drag and drop window object
const dragAndDrop = new SuperSimpleFullScreenDragAndDropJS();

// Add the eventlistner
dragAndDrop.addEventListener("dropped", (event) => {

    // Use the value of the drop event
    alert(event.detail.value);

});

// Enable the drag and drop window
dragAndDrop.enable();
```

### Considerations

To avoid issues, consider adding an event listener to check if the page has fully loaded before setting up the drag and drop window.

```javascript

// Add an event listener to check if the page has fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Setup code for the drag and drop window

};

```

## 🛠️ Advanced setup

### Adjust window properties

These are the properties / settings that can be adjusted before enabling the main window.

```javascript
// The info text that is displayed when the drag and drop window appears
dragAndDrop.text  = "Drag and Drop";

// The path or data of the icon that is displayed when the drag and drop window appears
dragAndDrop.icon = "/path/to/my/icon.png";

// The type of input field, i.e. "text" or "file"
dragAndDrop.type = "text";

// Z-Index, this should be the highest value of all the HTML elements on the site to make the window appear in front of everything
dragAndDrop.zIndex = 1000;

// Name of the event that is being dispatched
dragAndDrop.eventName = "dropped";
```

### Adjust window styling

These are the styling options that can be adjusted before enabling the main window. The value syntax is standard CSS.

```javascript
// Main window styling
dragAndDrop.style.window.padding   = "50px";
dragAndDrop.style.background.color = "rgba(0, 0, 0, 0.5)";
dragAndDrop.style.background.blur  = "50px";

// Border styling
dragAndDrop.style.border.size      = "5px";
dragAndDrop.style.border.color     = "rgba(255, 255, 255, 1)";
dragAndDrop.style.border.style     = "dashed";
dragAndDrop.style.border.radius    = "50px";
dragAndDrop.style.border.padding   = "50px";

// Info icon styling
dragAndDrop.style.icon.size        = "150px";

// Info text styling
dragAndDrop.style.text.family      = "Arial, Helvetica, sans-serif";
dragAndDrop.style.text.size        = "30px";
dragAndDrop.style.text.color       = "rgba(255, 255, 255, 1)";
dragAndDrop.style.text.weight      = "normal";
dragAndDrop.style.text.style       = "normal";
```

### Module usage

This script can also be loaded as an ES6 module by using the module version. The standard behavior of the module is to `exoport default` the class that can then be import by doing:

```javascript
import SuperSimpleFullScreenDragAndDropJS from "./mini_module_SuperSimpleFullScreenDragAndDrop.js"
```

The rest of the setup is the same as previously shown, except for the HTML `<script>` tag loading the regular version, which isn't required any more.

## ✨ Example

An example page using this script can be found at `Example/index.html`. The `Example/main.js` file illustrates a simple implementation on how to use the drag and drop window. The example uses the fully written out version of the main script from `Source/SuperSimpleFullScreenDragAndDrop.js`, for a "production" environment one of the `Release/mini_*` version should be used.

### Demo

A short demo video showing off the drag and drop window.

<p align="center"><video alt="Demo video" src="https://github.com/user-attachments/assets/40e5fb72-111b-4184-af7d-b16d21d741d4"></video></p>