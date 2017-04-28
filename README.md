# Responsive Background Images

Easy responsive background images until [we can use image-set](http://caniuse.com/#search=image-set) with a width modifier. 
In it's current form, the image-set property only supports resolution modifiers (eg 1x, 2x) and not the width modifiers that
you will find with the img srcset attribute (eg. 640w, 768w). Therefore, even with a polyfill for browsers that don't support 
the image-set attribute, there's not a css solution for width-based responsive images. This library is a simple solution to that problem.

## Markup

```
<div class="cover"
     data-src-xxs="/assets/xxs.jpg" 
     data-src-xs="/assets/xs.jpg" 
     data-src-sm="/assets/small.jpg" 
     data-src-md="/assets/medium.jpg" 
     data-src-lg="/assets/large.jpg">
</div>
```


## Process Backgrounds

```
new ResponsiveBackgrounds(); // uses selector '.cover'
```
```
new ResponsiveBackgrounds('.my-responsive-backgrounds');

```
Set custom breakpoints:
```
new ResponsiveBackgrounds('.cover', {xxs: 222, xs: 356, sm: 650, md: 999, lg: 1400});

```

