/*
 * viz.js
 *
 * Defines:
 * - The data to be visualized in the chart.
 * - The options for the look of the chart to be drawn.
 * - How to draw the chart.
 *
 * @author: Tanya L. Crenshaw
 * @since: Jan 6, 2015
 *
 * @author: Shamus Murray
 */

var librs = librs || {};

google.load('visualization', '1', {
    packages: ['corechart']
});

google.setOnLoadCallback(vizInit);

// Define the variables to hold the entire fusion table,
// and a collection of views, one for each year.
var data;
var views = {};
var totals = {};

// Define the variable to hold the chart.
var chart;

// At the start of execution, the year is 2013-2014, the most
// recent academic year that has 12 months of data.  To represent
// an academic year, use a pair of values.
var year = [2013, 2014];

// Set the options for the chart to be drawn.  This include the
// width, height, title, horizontal axis, vertical axis.  Finally
// turn off the legend.
var options = {};

function vizController(thisYear) {

    console.log(thisYear);

    //I made vizInit take the year passed in as a parameter so it just filters the year
    //within the function creating and rendering the data.
    vizInit(thisYear);
}

function vizInit(yearPassed) {
    // Create a new viz object using the google API -- specifically,
    // we are going to make a column chart inside the div called ex0
    // in the html file.
    chart = new google.visualization.ColumnChart(document.getElementById('ex0'));

    // Make the initial query to get the whole Fusion table.
    var query = "SELECT Month, Year, AY, Sessions FROM 1P23PE35fnBA8V9Bf4u2C3jqqwr-O0i-s8pjrSEjD";
    var opts = {
        sendMethod: 'auto'
    };
    var queryObj = new google.visualization.Query('https://www.google.com/fusiontables/gvizdata?tq=', opts);

    // Send the query and handle the response by logging the data
    // to the console.
    queryObj.setQuery(query);
    queryObj.send(function (e) {

        data = e.getDataTable();

        console.log(data);


        var thisYear;
        //if the yearPassed from the filter is valid then change year
        if (yearPassed) {
            thisYear = yearPassed;
        } else {
            // Create a view for academic year 2013-2014 that
            // is the first two columns of the data, just the
            // rows that have 2013-2014 for the value.
            
            // First, get the textualized range of the year.
            thisYear = "" + year[0] + "-" + year[1];
        }

        console.log(thisYear);

        // Next, create the object and get the rows
        // corresponding to "thisYear".
        views[thisYear] = new google.visualization.DataView(data);

        views[thisYear].setRows(views[thisYear].getFilteredRows([{
            column: 2,
            value: thisYear
		}]));

        // Get a subset of the columns.
        views[thisYear].setColumns([0, 3]);

        // Draw the chart for the initial academic year.
        chart.draw(views[thisYear].toDataTable(), options);

    });

}