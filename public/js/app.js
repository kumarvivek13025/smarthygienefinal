// Execute the following code when the document is ready
$(document).ready(function () {
  // Chart 1
  const ctx1 = document.getElementById("chart1").getContext("2d");
  const chart1 = new Chart(ctx1, {
    type: "line",
    data: {
      datasets: [{ label: "NH3", }],  // Dataset configuration for NH3 chart
    },
    options: {
      borderWidth: 3,
      borderColor: ['#f6d433'],  // Border color for NH3 chart
    },
  });

  // Chart 2
  const ctx2 = document.getElementById("chart2").getContext("2d");
  const chart2 = new Chart(ctx2, {
    type: "line",
    data: {
      datasets: [{ label: "H2S", }],  // Dataset configuration for H2S chart
    },
    options: {
      borderWidth: 3,
      borderColor: ['#34a5d1'],  // Border color for H2S chart
    },
  });

  // Chart 3
  const ctx3 = document.getElementById("chart3").getContext("2d");
  const chart3 = new Chart(ctx3, {
    type: "line",
    data: {
      datasets: [{ label: "Temp", }],  // Dataset configuration for Temp chart
    },
    options: {
      borderWidth: 3,
      borderColor: ['#8c8c8c'],  // Border color for Temp chart
    },
  });

  // Function to add data to a given chart
  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();  // Update the chart to reflect the changes
  }

  // Function to remove the oldest data point from a given chart
  function removeFirstData(chart) {
    chart.data.labels.splice(0, 1);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }

  const MAX_DATA_COUNT = 10;  // Maximum number of data points to display in the chart

  // Connect to the socket server
  var socket = io.connect();

  // Receive details from the server for Chart 1
  socket.on("updateSensorData1", function (msg) {
    console.log("Received sensorData for Chart 1 :: " + msg.date + " :: " + msg.value);
    if (chart1.data.labels.length > MAX_DATA_COUNT) {
      removeFirstData(chart1);
    }
    addData(chart1, msg.date, msg.value);
  });

  // Receive details from the server for Chart 2
  socket.on("updateSensorData2", function (msg) {
    console.log("Received sensorData for Chart 2 :: " + msg.date + " :: " + msg.value);
    if (chart2.data.labels.length > MAX_DATA_COUNT) {
      removeFirstData(chart2);
    }
    addData(chart2, msg.date, msg.value);
  });

  // Receive details from the server for Chart 3
  socket.on("updateSensorData3", function (msg) {
    console.log("Received sensorData for Chart 3 :: " + msg.date + " :: " + msg.value);
    if (chart3.data.labels.length > MAX_DATA_COUNT) {
      removeFirstData(chart3);
    }
    addData(chart3, msg.date, msg.value);
  });
});
