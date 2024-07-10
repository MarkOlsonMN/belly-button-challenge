// Build the metadata panel
function buildMetadata(sample) {
  console.log(">> buildMetadata()");
  console.log("-- buildMetadata() - sample: ", sample);

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field

    // Filter the metadata for the object with the desired sample number
    var metadata = data.metadata.find(item => item.id == sample);
    console.log("-- buildMetadata() - metadata: ", metadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    var metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Check if metadata for the selected sample exists
    if (!metadata) {
      metadataPanel.append("p").text(`No metadata found for sample ${sample}`);
      return;
    }

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel
        .append("span")
        .text(`${key.toUpperCase()}: ${value}`)
        .append("br");
    });

    console.log("<< buildMetadata()");
  }).catch((error) => {
    console. error("Error building metadata:", error);    
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
    var bubbleChart = {
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

    var data = [bubbleChart];

    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 900,
      xaxis: {'title': "OTU ID"},
      yaxis: {'title': "Number of Bacteria"}
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", data, layout);

    // Get the top ten otu_ids, otu_labels, and sample_values
    otu_ids       = otu_ids.slice(0, 10);
    otu_labels    = otu_labels.slice(0, 10);
    sample_values = sample_values.slice(0, 10);

    console.log("otu_ids: ",       otu_ids);
    console.log("otu_labels: ",    otu_labels);
    console.log("sample_values: ", sample_values);

    let otu_ids_w_prefix = otu_ids.map(name => "OTU " + name + "  ");
    otu_ids = otu_ids_w_prefix;

    console.log("otu_ids: ", otu_ids);
    
    // Reverse the order of the lists
    otu_ids.reverse();
    otu_labels.reverse();
    sample_values.reverse();

    console.log("otu_ids (REVERSE): ",       otu_ids);
    console.log("otu_labels (REVERSE): ",    otu_labels);
    console.log("sample_values (REVERSE): ", sample_values);

    // Create a trace for the horizontal bar chart
    let barChart = {
      x: sample_values,
      y: otu_ids,
      type: 'bar',
      orientation: 'h',
      hovertemplate: '<b>%{y}</b><br>' + 'Number of Bacteria: %{x}<br>' + 'Labels: %{text}<extra></extra>',  // Custom hover text using associated value from otu_labels
      text: otu_labels
    };

    // Create the data array for the plot
    let data2 = [barChart];

    // Create the layout for the chart
    let layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      // yaxis: { title: 'Bacteria Names' }
    };

    // Render the Bar Chart
    // Plot the chart using Plotly
    Plotly.newPlot('bar', data2, layout2);

    console.log("<< buildCharts()");

  });
}

// Function to run on page load
function init() {
  console.log(">> init()");
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Use d3 to select the dropdown with id of `#selDataset`
    var dropdown = d3.select("#selDataset");

    if (data.metadata && data.metadata.length > 0) {

    // Get the names field
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

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

  console.log("-- optionChanged() - newsample: ", newSample);

  // Build charts and metadata panel each time a new sample is selected
  // Call functions to update charts and metadata panel based
  buildCharts(newSample);
  buildMetadata(newSample);

  console.log("<< optionChanged()");
}

// Initialize the dashboard
init();
