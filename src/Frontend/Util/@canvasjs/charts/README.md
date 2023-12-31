<div align="center">
	<a href="https://www.npmjs.com/~canvasjs" target="_blank">
		<img src="https://canvasjs.com/wp-content/uploads/images/logo/canvasjs-logo-240x100.png" alt="CanvasJS"/>
	</a>
</div>

# CanvasJS JavaScript Charts
CanvasJS is a JavaScript Charting Library for creating interactive charts & graphs for your web pages. Library supports a wide range of chart types including bar, line, area, pie, doughnut charts, etc. Charts work with all the popular Technologies & Frameworks like React, Angular, jQuery, PHP, etc.
<br/><br/>

<a href="https://canvasjs.com/javascript-charts/"><img src="https://canvasjs.com/wp-content/uploads/images/npm/javascript-chart-types.jpg" alt="JavaScript Charts"></a>
<br/><br/>
## Links
- [Official Website](https://canvasjs.com/)
- [JavaScript Charts Demo](https://canvasjs.com/javascript-charts/)
- [Download CanvasJS](https://canvasjs.com/download-html5-charting-graphing-library/)
- [Chart Documentation](https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/)
- [CanvasJS Support Forum](https://canvasjs.com/forums/)
<br/><br/>

## Installing CanvasJS JavaScript Charts
There are multiple ways to install CanvasJS JavaScript Charts. You can directly add script-tag to include it from [CDN or download it from official site](https://canvasjs.com/download-html5-charting-graphing-library/) or install it from [NPM registry](https://npmjs.org/package/@canvasjs/charts). Please refer [documentation page](https://canvasjs.com/docs/charts/intro/installation/) for more information.


#### Install Charts via NPM
```
npm install --save @canvasjs/charts
```
See [npm documentation](https://docs.npmjs.com/) to know more about npm usage.
After CanvasJS script is installed, it can be imported using different module formats like AMD, CommonJS, etc.
```
//Load CanvasJS Charts
import * as CanvasJS from "@canvasjs/charts";
//var CanvasJS = require("@canvasjs/charts");

//Intantiate Chart
var chart = new CanvasJS.Chart("container", {
    //Chart Options - Check https://canvasjs.com/docs/charts/chart-options/
	title:{
		text: "Basic Column Chart in JavaScript"              
	},
	data: [{
	  type: "column",
	  dataPoints: [
		{ label: "apple",  y: 10  },
		{ label: "orange", y: 15  },
		{ label: "banana", y: 25  },
		{ label: "mango",  y: 30  },
		{ label: "grape",  y: 28  }
	  ]
	}]
});
//Render Chart
chart.render();
```
<br/><br/>
<img src="https://canvasjs.com/wp-content/uploads/images/npm/javascript-column-chart.jpg" alt="JavaScript Column Chart">

#### Using CanvasJS Charts via CDN
You can access CanvasJS Charts from our CDN  directly.
```
<script src="https://cdn.canvasjs.com/ga/canvasjs.min.js"></script>
```


#### Download from Official Site
You can download the JavaScript charting library along with examples from our official [download page](https://canvasjs.com/download-html5-charting-graphing-library/). Save it in your project directory & add it in your application.
```
<script src="canvasjs.min.js"></script>
```

<br/>

### Wrappers for Frameworks
* [CanvasJS Angular Charts](https://www.npmjs.com/package/@canvasjs/angular-charts)
* [CanvasJS React Charts](https://www.npmjs.com/package/@canvasjs/react-charts)
* [CanvasJS Vue Charts](https://www.npmjs.com/package/@canvasjs/vue-charts)

<br/>

#### Interactive JavaScript Charts
<a href="https://canvasjs.com/javascript-charts/column-line-area-chart/"><img src="https://canvasjs.com/wp-content/uploads/images/npm/chart-interactivity.gif" alt="JavaScript Interactive Charts"></a>

<br/>

#### JavaScript Chart with Multiple Y-axes
<a href="https://canvasjs.com/javascript-charts/multiple-axis-column-chart/"><img src="https://canvasjs.com/wp-content/uploads/images/npm/mulitple-y-axes.gif" alt="JavaScript Chart with Multiple Y-axes"></a>

<br/>

#### JavaScript Chart with Zooming / Panning
<a href="https://canvasjs.com/javascript-charts/chart-zoom-pan/"><img src="https://canvasjs.com/wp-content/uploads/images/npm/chart-with-zooming.gif" alt="JavaScript Chart with Zooming / Panning"></a>

<br/><br/>

## License
Commercial use of CanvasJS Chart requires a commercial license. Without a commercial license you can use it for evaluation (or demonstrations/testing) purposes. Students, Educational Institutions, Personal Websites using CanvasJS for non-commercial purposes are qualified for the free license. Check out [License Page](https://canvasjs.com/license/) to know more about licenses.