import React, { useEffect, useState } from "react";
import items from "./product.json";

const GameShop = () => {
  const [cart, setCart] = useState([]);
  const [listItems, setListItems] = useState();
  const [filter, setFilter] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [currState, setCurrState] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [Address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [check1, setCheck1] = useState(1); // Initialize check1 state to 0
  const [check2, setCheck2] = useState(1); // Initialize check1 state to 0
  const [check3, setCheck3] = useState(1); // Initialize check1 state to 0
  const [check4, setCheck4] = useState(1); // Initialize check1 state to 0
  const [check5, setCheck5] = useState(1); // Initialize check1 state to 0
  const [check6, setCheck6] = useState(1); // Initialize check1 state to 0
  const [check7, setCheck7] = useState(1); // Initialize check1 state to 0

  useEffect(() => {
    makeList();
  }, [filter]);

  useEffect(() => {
    makeList();
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    totalVal = totalVal * 1.06;
    totalVal = totalVal.toFixed(2);
    setCartTotal(totalVal);
  };

  const orderTime = () => {
    setCurrState(2);
  };

  const browseTime = () => {
    setCart([]);
    setCurrState(0);
  };

  function howMany(id) {
    let hm = cart.filter((cartItem) => cartItem.id === id);
    return hm.length;
  }

  const checkoutTime = () => {
    setFilter("");
    setCurrState(1);
  };

  const returnTime = () => {
    setCurrState(0);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartCount(cartCount + 1);
  };

  const removeFromCart = (product) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    setCart(hardCopy);
    setCartCount(cartCount - 1);
  };

  const makeCartList = () => {
    let copyList = [];
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (howMany(items[i]["id"]) != 0) {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setCartItems(
      copyList.map((product) => (
        <div key={product.id}>
          <img src={product.image} />
          <div>{product.title}</div>
          <div>${product.price}</div>
          <div>Quantity ordered: {howMany(product.id)}</div>
        </div>
      ))
    );
  };

  const makeOrderlist = () => {
    let copyList = [];
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (howMany(items[i]["id"]) != 0) {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setOrderItems(
      copyList.map((product) => (
        <div key={product.id}>
          <img src={product.image} />
          <div>{product.title}</div>
          <div>${product.price}</div>
          <div>Quantity ordered: {howMany(product.id)}</div>
        </div>
      ))
    );
  };

  const makeList = () => {
    let copyList = [];
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (items[i]["title"].toLowerCase().includes(filter.toLowerCase()) || filter === "") {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setListItems(copyList.map((product) => (
        <div key={product.id}>
          <div>
            <div><img src={product.image}/></div>
            <div>
              <div><strong>{product.title}</strong></div>
              <div>Category: {product.category}</div>
              <div>{product.description}</div>
            </div>
            <div>
              <div>${product.price}</div>
              <button type="button" variant="light" onClick={() => removeFromCart(product)}>
                {" "}-{" "}
              </button>
                {" "}
              <button type="button" variant="light" onClick={() => addToCart(product)}>
                {" "}+{" "}
              </button>
            </div>
            <div>Quantity ordered: {howMany(product.id)}</div>
          </div>
        </div>
    )));
  };

  if (currState === 0) {
    return (
      <div>
        <div>
          <h1>38's GameStop</h1>
          <div class="topnav">
            <button type="button"
              onClick={() => {
                checkoutTime();
                makeCartList();
              }} id="checkout">Checkout</button>
            <div class="search-container">
              <form action="/action_page.php">
                <input type="text" placeholder="Search.." name="search"
                  onChange={(e) => {
                    setFilter(e.target.value);
                    console.log(e.target.value);
                  }}></input>
              </form>
            </div>
          </div>
          <div class="grid-container">{listItems}</div>
        </div>
      </div>
    );
  } else if (currState === 1) {
    return (
      <div>
        <div>
          <h1>38's GameStop</h1>
          <div class="topnav">
            <button type="button" onClick={() => returnTime()} id="checkout">Return</button>
          </div>
          <div class="totalprice">Total: ${cartTotal}</div>
        </div>
        <div>
          <form id="payinfo">
            <h2>Payment Info</h2>
            <label for="fullname">Full Name: </label>
            <input required type="text" id="fullname" value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (!e.target.value) {
                  setCheck1(1); // Update check1 to 1 when fullName is empty
                } else {
                  setCheck1(0); // Reset check1 to 0 when fullName is not empty
                  console.log(e.target.value);
                }
              }}>
            </input>
            {!fullName && <span style={{ color: "red" }}> Must enter info in a correct format</span>} {/* Display error message */}
            <br></br>
            <label for="email">Email: </label>
            <input required type="email" id="email" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!e.target.value || !e.target.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
                  setCheck2(1); // Update check1 to 1 when fullName is empty
                } else {
                  setCheck2(0); // Reset check1 to 0 when fullName is not empty
                  console.log(e.target.value);
                }
              }}>
            </input>
            {!email && <span style={{ color: "red" }}> Must enter info in a correct format</span>} {/* Display error message */}
            <br></br>
            <label for="card">Card: </label>
            <input required type="number" inputMode="numeric" pattern="[0-9\s]{13,19}" placeholder="xxxxxxxxxxxxxxxx"
                    autocomplete="cc-number" maxlength="19" id="card" value={card}
              onChange={(e) => {
                e.target.value = e.target.value.slice(0, 16);
                setCard(e.target.value);
                if (!e.target.value || e.target.value.length != 16) {
                  setCheck3(1); // Update check1 to 1 when fullName is empty
                } else {
                  setCheck3(0); // Reset check1 to 0 when fullName is not empty
                  console.log(e.target.value);
                }
              }}>
            </input>
            {!card && <span style={{ color: "red" }}> Must enter info in a correct format</span>} {/* Display error message */}
            <br></br>
            <label for="address">Address: </label>
            <input required type="text" id="address" value={Address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (!e.target.value) {
                  setCheck4(1); // Update check1 to 1 when fullName is empty
                } else {
                  setCheck4(0); // Reset check1 to 0 when fullName is not empty
                  console.log(e.target.value);
                }
              }}>  
            </input>
            {!Address && <span style={{ color: "red" }}> Must enter info in a correct format</span>} {/* Display error message */}
            <br></br>
            <label for="city">City: </label>
            <input required type="text" id="city" value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (!e.target.value) {
                  setCheck5(1); // Update check1 to 1 when fullName is empty
                } else {
                  setCheck5(0); // Reset check1 to 0 when fullName is not empty
                  console.log(e.target.value);
                }
              }}>
            </input>
            {!city && <span style={{ color: "red" }}> Must enter info in a correct format</span>} {/* Display error message */}
            <br></br>
            <label for="state">State: </label>
            <input required type="text" id="state" value={state}
              onChange={(e) => {
                setState(e.target.value);
                if (!e.target.value) {
                  setCheck6(1); // Update check1 to 1 when fullName is empty
                } else {
                  setCheck6(0); // Reset check1 to 0 when fullName is not empty
                  console.log(e.target.value);
                }
              }}>  
            </input>
            {!state && <span style={{ color: "red" }}> Must enter info in a correct format</span>} {/* Display error message */}
            <br></br>
            <label for="zip">Zip: </label>
            <input required type="number" id="zip" value={zip} placeholder="xxxxx"
              onChange={(e) => {
                e.target.value = e.target.value.slice(0, 5);
                setZip(e.target.value);
                if (!e.target.value || e.target.value.length != 5) {
                  setCheck7(1); // Update check1 to 1 when fullName is empty
                } else {
                  setCheck7(0); // Reset check1 to 0 when fullName is not empty
                  console.log(e.target.value);
                }
              }}> 
            </input>
            {!zip && <span style={{ color: "red" }}> Must enter info in a correct format</span>} {/* Display error message */}
            <br></br>
            <br></br>
            {check1 === 0 && check2 === 0 && check3 === 0 && check4 === 0 && check5 === 0 && check6 === 0 && check7 === 0 &&( // Conditionally render the button if check1 equals 0
              <button type="button"
                onClick={() => {
                  makeOrderlist();
                  orderTime();
                  makeList();
                }}>Order
              </button>
            )}
          </form>
          {!(check1 === 0 && check2 === 0 && check3 === 0 && check4 === 0 && check5 === 0 && check6 === 0 && check7 === 0) && (
            <h2 style={{ color: "red" }}>PLEASE ENTER ALL INFO IN A CORRECT FORMAT</h2>
          )}
        </div>
        <h2 id="cart">Current Cart:</h2>
        <div class="grid-container2">{cartItems}</div>
      </div>
    );
  } else if (currState === 2) {
    return (
      <div>
        <div>
          <h1>38's GameStop</h1>
          <div class="topnav">
            <button type="button" onClick={() => browseTime()} id="checkout">Back to browse</button>
          </div>
          <div class="totalprice">Total: ${cartTotal}</div>
          <div>{fullName}</div>
          <div>{email}</div>
          <div>{card}</div>
          <div>{Address}</div>
          <div>{city}</div>
          <div>{state}</div>
          <div>{zip}</div>
          <div class="grid-container2">{orderItems}</div>
        </div>
      </div>
    );
  }
};

export default GameShop;