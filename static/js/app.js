// Build the metadata panel
function buildMetadata(sample) {
  console.log(">> buildMetadata()");
  console.log("-- buildMetadata() - sample: ", sample);

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field


    // Filter the metadata for the object with the desired sample number


    // Use d3 to select the panel with id of `#sample-metadata`


    // Use `.html("") to clear any existing metadata


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.


// -------

// var metadata = data.metadata.find(item => item.id === sample);
var metadata = data.metadata.find(item => item.id == sample);


    console.log(metadata);

    var metadataPanel = d3.select("#sample-metadata");

    metadataPanel.html("");

    // Check if metadata for the selected sample exists
    if (!metadata) {
      metadataPanel.append("p").text(`No metadata found for sample ${sample}`);
      return;
    }
    else {
      metadataPanel.append("p").text(`Sucessful metadata found for sample ${sample}`);
    }

    // Append tags for each key-value pair in the metadata
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });

    console.log("<< buildMetadata()");
  }).catch((error) => {
    console. error("Error loading metadata:", error);    
  });
}

// function to build both charts
function buildCharts(sample) {
  console.log(">> buildCharts()");
  console.log("-- buildCharts - sample: ", sample);
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleField = data.samples;

    // Filter the samples for the object with the desired sample number
    let array = sampleField.filter(sampleObject => sampleObject.id == sample);
    let result = array[0];

    console.log("-- buildCharts - result: ", result);


    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart

    // https://plotly.com/javascript/bubble-charts/
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        opacity: [1, 0.8, 0.6, 0.4],
        size: sample_values
      }
    };


    console.log(otu_ids);
    console.log(sample_values);


    var data = [trace1];

    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height:600,
      width: 800,
      xaxis: {'title': "OTU ID"},
      yaxis: {'title': "Number of Bacteria"}
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

    console.log("<< buildCharts()");


    console.log(">> buildCharts() PART 2");

    // let result = array[0];

    // // Get the otu_ids, otu_labels, and sample_values
    // let otu_ids = result.otu_ids;
    // let otu_labels = result.otu_labels;
    // let sample_values = result.sample_values;

    // Get the otu_ids, otu_labels, and sample_values
    let first_10_otu_ids = otu_ids.slice(0, 10);
    let first_10_otu_labels = otu_labels.slice(0, 10);
    let first_10_sample_values = sample_values.slice(0, 10);

    // // Assuming you have sorted and sliced the data to get the top 10 bacteria cultures
    // let topBacteriaCultures = [...]; // Your sorted and sliced data

    // // Extract the necessary data for the chart
    // let bacteriaNames = topBacteriaCultures.map(data => data.bacteriaName);
    // let sampleValues = topBacteriaCultures.map(data => data.sampleValue);


    // let bacteriaNames = first_10_otu_labels;
    let bacteriaNames = first_10_otu_ids;
    let sampleValues = first_10_sample_values;
    //
    let bacteriaText = first_10_otu_labels;

    console.log("bacteriaNames: ", bacteriaNames);
    console.log("sampleValues: ", sampleValues);
    console.log("bacteriaText: ", bacteriaText);

    let bacteriaNamesWithPrefix = bacteriaNames.map(name => "OTU " + name);
    console.log("bacteriaNamesWithPrefix: ", bacteriaNamesWithPrefix);
    
    // Reverse the order of the bacteriaNamesWithPrefix list
    bacteriaNamesWithPrefix.reverse();
    sampleValues.reverse();
    bacteriaText.reverse();
    console.log("bacteriaNamesWithPrefix (REVERSE): ", bacteriaNamesWithPrefix);
    console.log("sampleValues (REVERSE): ", sampleValues);
    console.log("bacteriaText (REVERSE): ", bacteriaText);

    // // Create a trace for the horizontal bar chart
    // let trace2 = {
    //   x: sampleValues,
    //   y: bacteriaNamesWithPrefix,      //bacteriaNames,
    //   type: 'bar',
    //   orientation: 'h'
    // };

    // Create a trace for the horizontal bar chart
    let trace2 = {
      x: sampleValues,
      y: bacteriaNamesWithPrefix,
      type: 'bar',
      orientation: 'h',
      hovertemplate: '<b>%{y}</b><br>' + 'Number of Bacteria: %{x}<br>' + 'Bacteria Text: %{text}<extra></extra>',  // Custom hover text using associated value from otu labels
      text: bacteriaText  // Add the text property with the otu labels
    };

    // Create the layout for the chart
    let layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      // yaxis: { title: 'Bacteria Names' }
    };

    // // Create the layout for the chart
    // let layout2 = {
    //   title: 'Top 10 Bacteria Cultures Found',
    //   xaxis: { title: 'Number of Bacteria' },
    //   yaxis: {
    //     title: 'Bacteria Names',
    //     tickmode: 'array',
    //     tickvals: bacteriaNames, // Provide the exact values for the y-axis
    //     ticktext: bacteriaNames // Use the exact values for the tick labels
    //   }
    // };


    // Create the data array for the plot
    let data2 = [trace2];

    // Plot the chart using Plotly
    Plotly.newPlot('bar', data2, layout2);

    console.log("<< buildCharts() PART 2");


  });
}

// Function to run on page load
function init() {
  console.log(">> init()");
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample


// ----
    var dropdown = d3.select("#selDataset");

    if (data.metadata && data.metadata.length > 0) {

      
      var namesField = data.metadata.map(item => item.id);  // Extract
      console.log("Sample names:", namesField);
      
      // Populte dropdown options with sample names
      namesField.forEach((name) => {
        dropdown.append("option")
          .attr("value", name)
          .text(name);
      });

      // Get the first sample from the list
      var firstSampleId = namesField[0];
      console.log("First sample:", firstSampleId);
      
      // Build charts and metadata panel with the first sample
      buildCharts(firstSampleId); // Function to build charts
      buildMetadata(firstSampleId); // Function to populate metadata
      
      // // Event listener for dropdown change
      // dropdown.on("change", function(event) {

      //   console.log("change event:", event);

      //   var selectedSampleId = d3.event.target.value;
      //   console.log("Selected sample ID:", selectedSampleId);
      
      //   // Call functions to update charts and metadata panel based
      //   buildCharts(selectedSampleId);
      //   buildMetadata(selectedSampleId);
      // });
    } else {
      console.log("No metadata found or metadata is empty.");
    }
    console.log("<< init()");
  }).catch((error) => {
    console.error("Error loading JSON:", error);
  });
}

// Function for event listener
function optionChanged(newSample) {
  console.log(">> optionChanged()");
  // Build charts and metadata panel each time a new sample is selected
  console.log("-- optionChanged() - newsample: ", newSample);

  // Call functions to update charts and metadata panel based
  buildCharts(newSample);
  buildMetadata(newSample);

  console.log("<< optionChanged()");
}

// Initialize the dashboard
init();
