# Responsive Background Images

Easy rsponsive background images until [we can use image-set](http://caniuse.com/#search=image-set).

## Markup

```
<div class="cover"
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

