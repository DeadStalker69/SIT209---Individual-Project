const API_URL = 'http://localhost:5000/api';
const MQTT_URL = 'http://localhost:5001/mqtt';


$('#add_d_floor').on('change', function() {  
  var floor = $(this).val();
  var rooms = $('#add_d_room');

  rooms.empty();

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getFloorR?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#rem_floor_now').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#rem_room');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getFloorR?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#device_1_f').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#dev_1_r');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getFloorR?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});



$('#devs_2_f').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#devs_2_r');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getFloorR?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#devs_3_f').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#devs_3_r');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getFloorR?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#dev_1_r').on('change',function() {
  if ($('#dev_1_r') != undefined && $('#device_1_f') != undefined && ('#device_1_type') != undefined) {
    const devices = $('#device_1_device');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#device_1_f').val();
    const room = $('#dev_1_r').val();
    const type = $('#device_1_type').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/retrieveDevices?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});



$('#devs_2_r').on('change',function() {
  if ($('#devs_2_r') != undefined && $('#devs_2_f') != undefined && ('#devs_2_t') != undefined) {
    const devices = $('#devs_2_d');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#devs_2_f').val();
    const room = $('#devs_2_r').val();
    const type = $('#devs_2_t').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/retrieveDevices?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});

$('#devs_3_r').on('change',function() {
  if ($('#devs_3_r') != undefined && $('#devs_3_f') != undefined && ('#devs_3_t') != undefined) {
    const devices = $('#devs_3_d');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#devs_3_f').val();
    const room = $('#devs_3_r').val();
    const type = $('#devs_3_t').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/retrieveDevices?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});

$('#dev_d_floor').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#dev_d_r');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getFloorR?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#dev_d_btn').on('click', function() {
  var floor = $('#dev_d_floor').val();
  var room = $('#dev_d_r').val();
  var type = $('#dev_d_ty').val();
  var name = $('#dev_d_device').val();
  if ($('#dev_d_r') != undefined && $('#dev_d_floor') != undefined && ('#dev_d_ty') != undefined && ('#dev_d_device') != undefined) {
    $.ajax({
    url: `${API_URL}/sensor_data?floor=${floor}&type=${type}&room=${room}&name=${name}`,
    method: 'GET',
    success: (data) => {
      $('#data_container').empty();
      $('#data_container').append(`<h2 style="font-weight: bold; color:#ffffff; ">Device Data</h2><label style="font-weight: bold; color:#ffffff; ">Name: ${name}</label><br><label style="font-weight: bold; color:#ffffff; ">Type: ${type}</label><br><label style="font-weight: bold; color:#ffffff; ">Floor: ${floor}</label><br><label style="font-weight: bold; color:#ffffff; ">Room: ${room}</label><br><label style="font-weight: bold; color:#ffffff; ">Data: ${data}</label><br><br>`);
      var chartOptions = {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Device Data'
        },
        xAxis: {
          categories: 'DEVICE'
        },
        yAxis: {
          title: {
            text: 'Data'
          }
        },
        series: [{
          name: name,
          data: data
        }]
      };
      $(document).ready(function() {      $('#graph').highcharts(chartOptions);
    });
    },
    error: (err) => {
      console.log('Error:', err);
    }
  });
  }
});


$('#add_d').on('click', function(){
    var name = $('#add_d_name').val();
    var floor = $('#add_d_floor').val();
    var room = $('#add_d_room').val();
    var type = $('#add_d_type').val();
    console.log(name);
    console.log(room);
    console.log(floor);
    console.log(type);
    if (type == '1') {
        $.ajax({
            url: `${API_URL}/lighting`,
            type: "POST",
            data: {
              name: name, 
              floor: floor,
              room: room 
            },
            success: function(response) {
              console.log(response); 
            },
            error: function(xhr, status, error) {
              console.log("Error: " + error); 
            }
        });
    }
    else if(type == '2'){
        $.ajax({
            url: `${API_URL}/aircon`,
            type: "POST",
            data: {
              name: name, 
              floor: floor,
              room: room 
            },
            success: function(response) {
              console.log(response); 
            },
            error: function(xhr, status, error) {
              console.log("Error: " + error); 
            }
        });
    }
    else if(type == '3'){
        $.ajax({
            url: `${API_URL}/security`,
            type: "POST",
            data: {
              name: name, 
              floor: floor,
              room: room 
            },
            success: function(response) {
              console.log(response); 
            },
            error: function(xhr, status, error) {
              console.log("Error: " + error); 
            }
        });
    }

    $('#new_device_floor').val("");
});

$('#dev_d_r').on('change',function() {
  if ($('#dev_d_r') != undefined && $('#dev_d_floor') != undefined && ('#dev_d_ty') != undefined) {
    const devices = $('#dev_d_device');
    devices.empty();
    
    const floor = $('#dev_d_floor').val();
    const room = $('#dev_d_r').val();
    const type = $('#dev_d_ty').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/retrieveDevices?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});


//REMOVE 
$('#rem_room').on('change',function() {
  if ($('#rem_floor_now') != undefined && $('#rem_room') != undefined && ('#rem_dev_type') != undefined) {
    const devices = $('#remove_dev');
    devices.empty();
    
    const floor = $('#rem_floor_now').val();
    const room = $('#rem_room').val();
    const type = $('#rem_dev_type').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/retrieveDevices?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});


$('#remove_dev_button').on('click', function () {
  const type = $('#rem_dev_type').val();
  const floor = $('#rem_floor_now').val();
  const room = $('#rem_room').val();
  const device = $('#remove_dev').val();

  if (type && floor && room && device) {
    $.ajax({
      url: `${API_URL}/removeDevice`,
      type: 'DELETE',
      data: { type: type, floor: floor, room: room, device: device },
      success: function () {
        console.log('Device retrieveDevicesd successfully');
        $('#rem_floor_now').val("");
  
      },
      error: function (xhr, status, error) {
        console.error('Error removing device:', error);
      }
    });
  } else {
    console.error('Missing required fields');
  }
});

$('#d_preference').on('click', function () {
  const type1 = $('#device_1_type').val();
  const floor1 = $('#loor').val();
  const room1 = $('#dev_1_r').val();
  const device1 = $('#device_1_d').val();
  const type2 = $('#devs_2_t').val();
  const floor2 = $('#devs_2_f').val();
  const room2 = $('#devs_2_r').val();
  const device2 = $('#devs_2_d').val();
  const type3 = $('#devs_3_t').val();
  const floor3 = $('#devs_3_f').val();
  const room3 = $('#devs_3_r').val();
  const device3 = $('#devs_3_d').val();

  if (type1 && floor1 && room1 && device1 && type2 && floor2 && room2 && device2 && type3 && floor3 && room3 && device3) {
    $.ajax({
      url: `${MQTT_URL}/pref`,
      type: 'POST',
      data: { d1:{type: type1, floor: floor1, room: room1, device: device1}, d2:{type: type2, floor: floor2, room: room2, device: device2}, d3:{type: type3, floor: floor3, room: room3, device: device3}},
      success: function () {
        console.log('Pref set, successfully');
        // $('#rem_floor_now').val("");
  
      },
      error: function (xhr, status, error) {
        console.error('Error pref device:', error);
      }
    });
  } else {
    console.error('Missing required fields');
  }
});

$(document).ready(function() {
    const table = $('#lighting_devs');
    console.log('yep')
    $.ajax({
      url: `${API_URL}/lighting`,
      method: 'GET',
      success: function(data) {
        data.forEach(function(lighting) {
          const row = $('<tr></tr>');
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.name).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.room).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.floor).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.status).appendTo(row);
          table.append(row);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
      }
    });
  });
  
  $('#new_device_floor').on('change', function() {

  });

  $(document).ready(function() {
    const table = $('#security_device');
    $.ajax({
      url: `${API_URL}/security`,
      method: 'GET',
      success: function(data) {
        data.forEach(function(lighting) {
          const row = $('<tr></tr>');
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.name).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.room).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.floor).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.status).appendTo(row);
          table.append(row);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
      }
    });
  });
  
  $(document).ready(function() {
    const table = $('#acondit_device');
    console.log('yep')
    $.ajax({
      url: `${API_URL}/aircon`,
      method: 'GET',
      success: function(data) {
        data.forEach(function(lighting) {
          const row = $('<tr></tr>');
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.name).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.room).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.floor).appendTo(row);
          $('<td style="font-weight: bold; background-color: #a3d0ed;"></td>').text(lighting.status).appendTo(row);
          table.append(row);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
      }
    });
  });

// mqtt stuff

$('#send-command').on('click', function() {
  const deviceId = $('#deviceId').val();
  const command = $('#command').val();
  $.post(MQTT_URL, { deviceId, command })
  .then(response => {
  location.href = '/';
  })

});


