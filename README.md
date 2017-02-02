# ct_styleOptions
Product options with colour swatches and out of stock flags

So, you can quickly view the code here:
https://zedzdead.github.io/ct_styleOptions/ctProductStyleSelectors/demo/index.html

The main difference between the plugin and the original script is that the plugin targets specific style drop downs and does not apply the code to all.  This means that as more options become available only the options that a specific style needs is applied throught the options at instantiation.

## Instantiating the plugin

As with all jQuery instatiations:

	$( "#product_style_Mens_Chest" ).productStyle();

Where #product_style_Mens_chest is the id of the dropdown you wish to replace with clickable tiles.

This converts this drop-down into radio buttons.  It also identifies in-stock out-of-stock and none stock items for all the other styles on the page.  This enables the simple green red and grey default styles for the corresponding stock states but leaves them as drop downs.

## Adding Colour Styles

The prodStyles.js file holds all the styles which require a draphical selector, either colour or swatch/thumbnail.
```
var prodStyles = { 
  Colour: {
    "White":         "white",
    "Silver":        "silver",
    "Grey":          "grey",
    "Black":         "black",
    "Red":           "red",
    "Maroon":        "maroon",
    "Yellow":        "yellow",
    "Olive":         "olive",
    "Lime":          "lime",
    "Green":         "green",
    "Aqua":          "aqua",
    "Teal":          "teal",
    "Blue":          "blue",
    "Navy":          "navy",
    "Fuchsia":       "fuchsia",
    "Purple":        "purple"
  },
  Shirt_Colour: {
    "White":         "#fff",
    "Red":           "#f00",
    "Black":         "#000"  
  }
};
```



