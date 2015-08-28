Donate({
    container: ".donate"
  , prefix: "$"
  , classes: {
        active: "active"
    }
  , amounts: [
        50
      , 100
      , 200
      , 300
      , 400
      , 500
      , 700
    ]
  , custom: true
  , format: function (val) {
      return val > 1000
           ? (val = val.toString()).substring(0, 1) + "," + val.substring(1)
           : val
           ;
    }
  , onChange: function (val, li, e) {
        document.querySelector("[name=amount]").value = val;
    }
  , defaultValue: 20
});
