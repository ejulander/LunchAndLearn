  const username = "eric";
  const connectionTest = new WebSocket("wss://etl.homecarepulse.com:777/lunchnlearn/connect");
  let user_file = {
      username: username,
      room_key: "Weji7985@",
      user_data: {
          route: "",
          hasGold: false,
          hasBidet: false,
          hasSneakers: false,
      }
  }
  let connected = false;
  connectionTest.onopen = (event) => {
      if (!connected) {
          connected = true
          console.log(event)
          console.log("connected");
          start()
      }
  }
  let pathIndex = [0, 1, 1, 0];
  connectionTest.addEventListener("message", (event) => {
      let response = null;
      if (event.data)
          response = JSON.parse(event.data);
      console.log(response);
      if (response && response.route.length >= 0) {
          if (response.route == "_") {
              response.route = "";
              user_file.user_data.route = "";
          }
          if (response.hasGold) {
              user_file.user_data.hasGold = true;
              document.getElementById("gold").classList.remove("hidden");
              console.log(user_file)
          } else if (!user_file.user_data.hasGold) {
              document.getElementById("gold").classList.add("hidden");
          }
          if (response.hasBidet) {
              user_file.user_data.hasBidet = true;
              document.getElementById("bidet").classList.remove("hidden");
              console.log(user_file)
          } else if (!user_file.user_data.hasBidet) {
              document.getElementById("bidet").classList.add("hidden");
          }
          if (response.hasSneakers) {
              user_file.user_data.hasSneakers = true;
              document.getElementById("shoes").classList.remove("hidden");
              console.log(user_file)
          } else if (!user_file.user_data.hasSneakers) {
              document.getElementById("shoes").classList.add("hidden");
          }
          if (response.isDead) {
              user_file.user_data.hasGold = false;
              user_file.user_data.hasBidet = false;
              user_file.user_data.hasSneakers = false;
              console.log(user_file)
          }
          let options = (JSON.parse(response.options));
          document.getElementById("adventuremsg").innerText = response.message;
          populateOptionsButtons(options)
          console.log(options);
      }
  })

  function goRoute(route) {
      console.log(route);
      chooseOption(route);
  }

  function populateOptionsButtons(options) {
      let innerHTML = options.map(option => {
          return `<div class="button" onclick="goRoute('${option.route}')"}">${option.name}</div>`;
      }).join("");
      document.getElementById("buttons").innerHTML = innerHTML;

  }

  function chooseOption(route) {
      user_file.user_data.route += ":" + route;
      console.log(user_file.user_data.route);
      connectionTest.send(JSON.stringify(user_file));
  }

  function start(pathIndexs) {
      connectionTest.send(JSON.stringify(user_file));
  }